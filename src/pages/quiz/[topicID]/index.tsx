import { QuestionTemplate, Topic } from '@/src/atom/quizAtoms';
import PageContent from '@/src/components/Layout/PageContent';
import Questions from '@/src/components/QuizPage/Questions';
import QuizInfo from '@/src/components/QuizPage/QuizInfo';

import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { getQuestion } from '../../api/QuestionData';

type QuizPageProps = {
    // All topic data=> questions, options...
    topicQuestionData:QuestionTemplate[],
    context: GetServerSidePropsContext
};

const QuizPage:React.FC<QuizPageProps> = ({topicQuestionData,context}) => {
    
    return (
        <>
          <PageContent>
              <QuizInfo />
              <Questions questions={topicQuestionData}/>
            </PageContent>   
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   return getQuestion(context)
}

export default QuizPage;