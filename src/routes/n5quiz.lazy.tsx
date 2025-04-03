import { createLazyFileRoute } from "@tanstack/react-router";
import { QuizPage } from "@pages";
import { n5Dictionary } from "@data";

export const Route = createLazyFileRoute("/n5quiz")({
  component: RouteComponent,
});

const questionBank = n5Dictionary;
const answerBank = n5Dictionary;

function RouteComponent() {

  return <QuizPage title="N5 Vocabolary" quizType="n5" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />;
}
