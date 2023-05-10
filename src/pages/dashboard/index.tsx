import { Topic } from '@/src/atom/quizAtoms';
import ActiveQuiz from '@/src/components/DashboardPage/ActiveQuiz';
import PreviousQuiz from '@/src/components/DashboardPage/PreviousQuiz';
import PageContent from '@/src/components/Layout/PageContent';
import {auth } from '@/src/firebase/clientApp';
import { Box, } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type DashboardProps = {
    topicInfo:Topic[]
};

const Dashboard:React.FC<DashboardProps> = () => {
    const [user] = useAuthState(auth)
    return (
        <>
         <PageContent>
         <Box  p={5} m={0} fontSize='20px' fontWeight={700}>
             <p> Welcome {user?.email},</p>
          </Box>
            <ActiveQuiz/>
            <PreviousQuiz/>
         </PageContent>
        </>
    )   
}

export default Dashboard;