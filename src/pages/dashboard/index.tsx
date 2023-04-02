import { Topic } from '@/src/atom/quizAtoms';
import ActiveQuiz from '@/src/components/DashboardPage/ActiveQuiz';
import PreviousQuiz from '@/src/components/DashboardPage/PreviousQuiz';
import PageContent from '@/src/components/Layout/PageContent';
import { firestore } from '@/src/firebase/clientApp';
import { getDocs, collection } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';

type DashboardProps = {
    topicInfo:Topic[]
};

const Dashboard:React.FC<DashboardProps> = ({topicInfo}) => {
    
    return (
        <>
         <PageContent>
            <ActiveQuiz topicInfo= {topicInfo}/>
            <PreviousQuiz/>
         </PageContent>
        </>
    )   
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // let questionsFromDB: QuestionTemplate[] =[]
    // Get topic data from database and pass it to the client
    try {
       const testTopicssRef =  '/topics'
       const topicInfoFromDB = await getDocs(collection(firestore,testTopicssRef)) // get topic collection from database
       let topicInfo:any[] =[]
       // store all topics from the database into the topicInfo array
       topicInfoFromDB.forEach((doc) => {
          topicInfo.push({ ...doc.data()})
       });

        return { //This will make sure the questions are available gloabally
            props:{
                topicInfoData:topicInfo.length!==0
                ? JSON.parse(safeJsonStringify(
                    topicInfo
                ))
                :"",
            }
        }

    } catch (error) {
        console.log('getServerSideProps error',error)   
    }
}
export default Dashboard;