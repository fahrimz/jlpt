import { n5BookmarkDictionary, n5Dictionary } from '@data';
import { QuizPage } from '@pages';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/n5quizBookmark')({
  component: RouteComponent,
})

const questionBank = n5BookmarkDictionary();
const answerBank = n5Dictionary;

function RouteComponent() {
  return <QuizPage title='N5 Bookmarked Vocabolary' quizType="n5Bookmark" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />;
}
