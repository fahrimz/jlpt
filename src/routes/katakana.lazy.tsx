import { createLazyFileRoute } from '@tanstack/react-router'
import { katakana } from '@data';
import { LearnTable, QuizPage } from '@pages';
import { useState } from 'react';
import { Header } from '@components';

export const Route = createLazyFileRoute('/katakana')({
  component: RouteComponent,
})

const questionBank = katakana;
const answerBank = katakana;

function RouteComponent() {
  const [tab, setTab] = useState<'learn' | 'quiz'>('learn');
    return (
      <div className='flex flex-col w-full md:w-[500px]'>
        <Header title='Katakana' />
        <div className='flex gap-4 justify-center items-center mb-4'>
          <button className={`flex-1 ${tab === 'learn' ? 'bg-black text-white' : ''}`} onClick={() => {setTab('learn')}}>Learn</button>
          <button className={`flex-1 ${tab === 'quiz' ? 'bg-black text-white' : ''}`} onClick={() => {setTab('quiz')}}>Quiz</button>
        </div>
        {
          tab === 'learn' 
            ? <LearnTable data={questionBank} /> 
            : <QuizPage quizType="katakana" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />
        }
      </div>
    )
}