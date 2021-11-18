export default function Shuffle(quiz) {
  const results = [...quiz.incorrect_answers, quiz.correct_answer];
  //shuffle

  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [results[i], results[j]] = [results[j], results[i]];
  }
  return results;
}
