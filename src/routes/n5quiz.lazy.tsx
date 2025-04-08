import { createLazyFileRoute } from "@tanstack/react-router";
import { QuizPage } from "@pages";
import { n5Dictionary } from "@data";
import { Header } from "@components";

export const Route = createLazyFileRoute("/n5quiz")({
  component: RouteComponent,
});

const questionBank = n5Dictionary;
const answerBank = n5Dictionary;

function RouteComponent() {

  return (
    <div className='flex flex-col w-full md:w-[500px]'>
      <Header title='N5 Dictionary' />
      <QuizPage quizType="n5" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />
    </div>
  )
}
