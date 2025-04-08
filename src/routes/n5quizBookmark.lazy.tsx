import { Header } from '@components';
import { n5BookmarkDictionary, n5Dictionary } from '@data';
import { QuizPage } from '@pages';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/n5quizBookmark')({
  component: RouteComponent,
})

const questionBank = n5BookmarkDictionary();
const answerBank = n5Dictionary;

function RouteComponent() {
    return (
      <div className='flex flex-col w-full md:w-[500px]'>
        <Header title='N5 Bookmarked Vocabolary' />
        <QuizPage quizType="n5Bookmark" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />
      </div>
    )
}
