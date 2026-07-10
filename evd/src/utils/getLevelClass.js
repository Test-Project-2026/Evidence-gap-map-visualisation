export default function getLevelClass(count) {
  if (count === 0) return "cell--empty";
  if (count === 1) return "cell--level-1";
  if (count <= 3) return "cell--level-2";
  if (count <= 5) return "cell--level-3";
  return "cell--level-4";
}
