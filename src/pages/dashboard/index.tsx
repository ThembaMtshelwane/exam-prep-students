import ActiveQuiz from '@/src/components/DashboardPage/ActiveQuiz';
import PreviousQuiz from '@/src/components/DashboardPage/PreviousQuiz';
import PageContent from '@/src/components/Layout/PageContent';
import React from 'react';

type DashboardProps = {
    
};

const Dashboard:React.FC<DashboardProps> = () => {
    
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