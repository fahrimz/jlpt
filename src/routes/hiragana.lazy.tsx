import { Header } from '@components';
import { hiragana } from '@data';
import { LearnTable, QuizPage } from '@pages';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createLazyFileRoute('/hiragana')({
  component: RouteComponent,
})

const questionBank = hiragana;
const answerBank = hiragana;

function RouteComponent() {
  const [tab, setTab] = useState<'learn' | 'quiz'>('learn');
  return (
    <div className='flex flex-col w-full md:w-[500px]'>
      <Header title='Hiragana' />
      <div className='flex gap-4 justify-center items-center mb-4'>
        <button className={`flex-1 ${tab === 'learn' ? 'bg-black text-white' : ''}`} onClick={() => {setTab('learn')}}>Learn</button>
        <button className={`flex-1 ${tab === 'quiz' ? 'bg-black text-white' : ''}`} onClick={() => {setTab('quiz')}}>Quiz</button>
      </div>
      {
        tab === 'learn' 
          ? <LearnTable data={questionBank} /> 
          : <QuizPage quizType="hiragana" questionBank={questionBank} answerBank={answerBank} preferredTotalQuestions={10} />
      }
    </div>
  )
}
