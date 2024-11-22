import { QuizPage } from '@pages';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/n5quizBookmark')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QuizPage quizType="n5Bookmark" preferredTotalQuestions={10} />;
}
