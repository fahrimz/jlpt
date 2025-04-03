import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { katakana } from '@data';
import { LearnTable, QuizPage } from '@pages';
import { useState } from 'react';

export const Route = createLazyFileRoute('/katakana')({
  component: RouteComponent,
})

const questionBank = katakana;
const answerBank = katakana;

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
            ? <LearnTable title='Katakana' data={questionBank} /> 
            : <QuizPage title='Katakana' quizType="katakana" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />
        }
      </div>
    )
}