import { ABSTRACTS } from './dataset.js'
import { computeMetrics, formatReport } from './evaluate.js'
import { createMockScreener, createOpenAIScreener, createMistralScreener, sleep } from './screener.js'

function usage() {
  console.error(`Usage:
  node run.js mock [accuracy] [seed] [delayMs]
  node run.js openai [delayMs]
  node run.js mistral [delayMs]`)
  process.exit(1)
}

function envOrExit(name) {
  const val = process.env[name]
  if (!val) {
    console.error(`Set ${name} environment variable.`)
    process.exit(1)
  }
  return val
}

function parseArgs(argv) {
  const mode = argv[2] || 'mock'
  let screener, label, delayMs

  switch (mode) {
    case 'mock': {
      const accuracy = parseFloat(argv[3]) || 0.8
      const seed = parseInt(argv[4]) || 42
      screener = createMockScreener({ accuracy, seed, dataset: ABSTRACTS })
      label = `Mock Screener (accuracy=${accuracy}, seed=${seed})`
      delayMs = parseInt(argv[5]) || 2000
      break
    }
    case 'openai': {
      screener = createOpenAIScreener({
        apiKey: envOrExit('OPENAI_API_KEY'),
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      })
      label = `OpenAI Screener (${process.env.OPENAI_MODEL || 'gpt-4o-mini'})`
      delayMs = parseInt(argv[3]) || 2000
      break
    }
    case 'mistral': {
      screener = createMistralScreener({
        apiKey: envOrExit('MISTRAL_API_KEY'),
        model: process.env.MISTRAL_MODEL || 'mistral-large-latest',
      })
      label = `Mistral Screener (${process.env.MISTRAL_MODEL || 'mistral-large-latest'})`
      delayMs = parseInt(argv[3]) || 2000
      break
    }
    default: {
      usage()
    }
  }

  return { screener, label, delayMs }
}

async function main() {
  const { screener, label, delayMs } = parseArgs(process.argv)
  console.log(`\n  Evaluating: ${label}`)
  console.log(`  Abstracts:  ${ABSTRACTS.length}`)
  console.log(`  Delay:      ${delayMs}ms between requests`)

  console.time('  Duration')
  const results = []
  for (const abstract of ABSTRACTS) {
    try {
      const r = await screener(abstract)
      results.push({
        id: abstract.id,
        expected: abstract.expected,
        predicted: r.predicted,
        confidence: r.confidence,
      })
    } catch (err) {
      results.push({
        id: abstract.id,
        expected: abstract.expected,
        predicted: 'error',
        error: err.message,
      })
    }
    await sleep(delayMs)
  }
  console.timeEnd('  Duration')

  const metrics = computeMetrics(results)
  const report = formatReport(label, metrics, results, true)
  console.log(report)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
