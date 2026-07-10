import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { ABSTRACTS } from './dataset.js'
import { computeMetrics, formatReport } from './evaluate.js'
import { createMockScreener } from './screener.js'

async function evaluateScreener(screenerFn, dataset = ABSTRACTS) {
  const results = []
  for (const abstract of dataset) {
    try {
      const result = await screenerFn(abstract)
      results.push({
        id: abstract.id,
        expected: abstract.expected,
        predicted: result.predicted,
        confidence: result.confidence,
      })
    } catch (err) {
      results.push({
        id: abstract.id,
        expected: abstract.expected,
        predicted: 'error',
        error: err.message,
      })
    }
  }
  return results
}

function validateDataset(dataset) {
  const errors = []
  if (!Array.isArray(dataset)) {
    return ['Dataset must be an array']
  }
  if (dataset.length === 0) {
    return ['Dataset is empty']
  }
  for (const a of dataset) {
    if (!a.id) errors.push(`Entry missing 'id'`)
    if (!a.title) errors.push(`Entry #${a.id} missing 'title'`)
    if (!a.abstract) errors.push(`Entry #${a.id} missing 'abstract'`)
    if (!a.expected) errors.push(`Entry #${a.id} missing 'expected'`)
    if (a.expected && !['include', 'exclude'].includes(a.expected)) {
      errors.push(`Entry #${a.id} has invalid expected value '${a.expected}'`)
    }
  }
  return errors
}

describe('Dataset Validation', () => {
  it('should contain exactly 20 abstracts', () => {
    assert.strictEqual(ABSTRACTS.length, 20)
  })

  it('should have no validation errors', () => {
    const errors = validateDataset(ABSTRACTS)
    assert.deepStrictEqual(errors, [], `Dataset validation failed:\n  ${errors.join('\n  ')}`)
  })

  it('should have unique IDs', () => {
    const ids = ABSTRACTS.map(a => a.id)
    const uniqueIds = new Set(ids)
    assert.strictEqual(uniqueIds.size, ids.length, 'Duplicate IDs found')
  })

  it('should have both include and exclude decisions', () => {
    const decisions = new Set(ABSTRACTS.map(a => a.expected))
    assert.ok(decisions.has('include'), 'No include decisions in dataset')
    assert.ok(decisions.has('exclude'), 'No exclude decisions in dataset')
  })
})

describe('Metrics Computation', () => {
  it('should compute perfect metrics when all predictions are correct', () => {
    const items = ABSTRACTS.map(a => ({
      id: a.id,
      expected: a.expected,
      predicted: a.expected,
    }))
    const m = computeMetrics(items)
    assert.strictEqual(m.accuracy, 1)
    assert.strictEqual(m.precision, 1)
    assert.strictEqual(m.recall, 1)
    assert.strictEqual(m.f1, 1)
  })

  it('should compute zero recall when nothing is predicted include', () => {
    const items = ABSTRACTS.map(a => ({
      id: a.id,
      expected: a.expected,
      predicted: 'exclude',
    }))
    const m = computeMetrics(items)
    assert.strictEqual(m.recall, 0)
    assert.strictEqual(m.precision, 0)
    assert.strictEqual(m.specificity, 1)
  })

  it('should compute zero precision when all include predictions are wrong', () => {
    const items = ABSTRACTS.map(a => ({
      id: a.id,
      expected: a.expected,
      predicted: a.expected === 'include' ? 'exclude' : 'include',
    }))
    const m = computeMetrics(items)
    assert.strictEqual(m.precision, 0)
    assert.strictEqual(m.recall, 0)
  })

  it('should produce correct confusion matrix counts', () => {
    const items = [
      { id: 1, expected: 'include', predicted: 'include' },
      { id: 2, expected: 'include', predicted: 'exclude' },
      { id: 3, expected: 'exclude', predicted: 'include' },
      { id: 4, expected: 'exclude', predicted: 'exclude' },
    ]
    const m = computeMetrics(items)
    assert.strictEqual(m.tp, 1)
    assert.strictEqual(m.fn, 1)
    assert.strictEqual(m.fp, 1)
    assert.strictEqual(m.tn, 1)
    assert.strictEqual(m.accuracy, 0.5)
    assert.strictEqual(m.precision, 0.5)
    assert.strictEqual(m.recall, 0.5)
  })

  it('should handle divide-by-zero when there are no include predictions', () => {
    const items = [
      { id: 1, expected: 'include', predicted: 'exclude' },
      { id: 2, expected: 'exclude', predicted: 'exclude' },
    ]
    const m = computeMetrics(items)
    assert.strictEqual(m.tp, 0)
    assert.strictEqual(m.fp, 0)
    assert.strictEqual(m.precision, 0)
    assert.strictEqual(m.recall, 0)
  })

  it('should handle empty results array', () => {
    const m = computeMetrics([])
    assert.strictEqual(m.tp, 0)
    assert.strictEqual(m.fp, 0)
    assert.strictEqual(m.fn, 0)
    assert.strictEqual(m.tn, 0)
    assert.strictEqual(m.accuracy, 0)
  })
})

describe('Mock Screener', () => {
  let screener
  let results

  before(async () => {
    screener = createMockScreener({ accuracy: 0.8, seed: 42, dataset: ABSTRACTS })
    results = await evaluateScreener(screener)
  })

  it('should return a result for every abstract', () => {
    assert.strictEqual(results.length, ABSTRACTS.length)
  })

  it('should have include and exclude predictions', () => {
    const predicted = results.map(r => r.predicted)
    assert.ok(predicted.includes('include'))
    assert.ok(predicted.includes('exclude'))
  })

  it('should have no errors', () => {
    const errors = results.filter(r => r.error)
    assert.deepStrictEqual(errors, [])
  })

  it('should produce valid metrics', () => {
    const m = computeMetrics(results)
    assert.ok(m.accuracy > 0)
    assert.ok(m.precision > 0)
    assert.ok(m.recall > 0)
    assert.ok(m.f1 > 0)
    assert.ok(m.tp + m.fp + m.fn + m.tn > 0)
  })
})

describe('Screener Swappability', () => {
  it('should produce different results with different accuracy settings', async () => {
    const lowAcc = createMockScreener({ accuracy: 0.5, seed: 99, dataset: ABSTRACTS })
    const highAcc = createMockScreener({ accuracy: 1.0, seed: 99, dataset: ABSTRACTS })
    const lowResults = await evaluateScreener(lowAcc)
    const highResults = await evaluateScreener(highAcc)
    const lowMetrics = computeMetrics(lowResults)
    const highMetrics = computeMetrics(highResults)
    assert.ok(highMetrics.accuracy > lowMetrics.accuracy,
      `Expected high accuracy (${highMetrics.accuracy}) > low accuracy (${lowMetrics.accuracy})`)
  })

  it('should accept any async function following the screener interface', async () => {
    const customScreener = async (abstract) => ({
      id: abstract.id,
      predicted: abstract.abstract.length > 300 ? 'include' : 'exclude',
      confidence: 0.6,
    })
    const results = await evaluateScreener(customScreener)
    const m = computeMetrics(results)
    assert.ok(typeof m.accuracy === 'number')
  })
})

describe('End-to-End Evaluation', () => {
  let metrics
  let results

  before(async () => {
    const screener = createMockScreener({ accuracy: 0.8, seed: 42, dataset: ABSTRACTS })
    results = await evaluateScreener(screener)
    metrics = computeMetrics(results)
  })

  it('should produce non-zero metrics across all dimensions', () => {
    assert.ok(metrics.tp > 0, 'expected true positives')
    assert.ok(metrics.tn > 0, 'expected true negatives')
    assert.ok(metrics.accuracy > 0.5, `expected accuracy > 50%, got ${metrics.accuracy}`)
    assert.ok(metrics.precision > 0.5, `expected precision > 50%, got ${metrics.precision}`)
    assert.ok(metrics.recall > 0.5, `expected recall > 50%, got ${metrics.recall}`)
    assert.ok(metrics.f1 > 0.5, `expected f1 > 50%, got ${metrics.f1}`)
  })

  it('should count total items equal to dataset length', () => {
    const total = metrics.tp + metrics.fp + metrics.fn + metrics.tn
    assert.strictEqual(total, ABSTRACTS.length)
  })

  it('should format a report without throwing', () => {
    const report = formatReport('Test', metrics, results, true)
    assert.ok(report.includes('Accuracy'))
    assert.ok(report.includes('Confusion Matrix'))
  })
})
