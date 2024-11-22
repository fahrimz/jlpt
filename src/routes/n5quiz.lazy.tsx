import { createLazyFileRoute } from "@tanstack/react-router";
import { QuizPage } from "@pages";

export const Route = createLazyFileRoute("/n5quiz")({
  component: RouteComponent,
});

function RouteComponent() {
  return <QuizPage quizType="n5" preferredTotalQuestions={10} />;
}
