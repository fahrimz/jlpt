import { hiragana } from '@data';
import { LearnTable, QuizPage } from '@pages';
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createLazyFileRoute('/hiragana')({
  component: RouteComponent,
})

const questionBank = hiragana;
const answerBank = hiragana;

function RouteComponent() {
  const [tab, setTab] = useState<'learn' | 'quiz'>('learn');
  return (
    <div className='flex flex-col'>
      <div className='flex gap-4 justify-center items-center mb-4'>
        <Link to="/">Go Back</Link>
        <button onClick={() => {setTab('learn')}}>Learn</button>
        <button onClick={() => {setTab('quiz')}}>Quiz</button>
      </div>
      {
        tab === 'learn' 
          ? <LearnTable title='Hiragana' data={questionBank} /> 
          : <QuizPage title='Hiragana' quizType="hiragana" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />
      }
    </div>
  )
}
