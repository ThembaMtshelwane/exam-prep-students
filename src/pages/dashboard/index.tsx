import {TopicSnippet } from '@/src/atom/quizAtoms';
import ActiveQuiz from '@/src/components/DashboardPage/ActiveQuiz';
import PreviousQuiz from '@/src/components/DashboardPage/PreviousQuiz';
import PageContent from '@/src/components/Layout/PageContent';
import React from 'react';

type DashboardProps = {
    topicData: TopicSnippet
};

const Dashboard:React.FC<DashboardProps> = ({topicData}) => {
    
    return (
        <>
         <PageContent>
            <ActiveQuiz/>
            <PreviousQuiz/>
         </PageContent>
        </>
    )
    
}
export default Dashboard;