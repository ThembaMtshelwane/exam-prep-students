import { Topic } from '@/src/atom/quizAtoms';
import ActiveQuiz from '@/src/components/DashboardPage/ActiveQuiz';
import PreviousQuiz from '@/src/components/DashboardPage/PreviousQuiz';
import PageContent from '@/src/components/Layout/PageContent';
import { firestore,auth } from '@/src/firebase/clientApp';
import { Box,Text } from '@chakra-ui/react';
import { getDocs, collection } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { useAuthState } from 'react-firebase-hooks/auth';

type DashboardProps = {
    topicInfo:Topic[]
};

const Dashboard:React.FC<DashboardProps> = ({topicInfo}) => {
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