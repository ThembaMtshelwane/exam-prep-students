import PageContent from '@/src/components/Layout/PageContent';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify'

type QuizPageProps = {
    
};

const QuizPage:React.FC<QuizPageProps> = () => {
    
    return (
        <>
            <PageContent>
            {/* Quiz Info 
            Questions */}
            {/* <AddQuestion topicID={topicData.id}/>   */}
            </PageContent>   
        </>
    )
}
export default QuizPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    
    // Get topic data and pass it to the client
    try {
        const topicDocRef = doc(
            firestore,
            'topics',
            context.query.topicID as string
            )
    const topicDoc = await getDoc(topicDocRef)

    return {
        props:{
            topicData: topicDoc.exists() 
            ? JSON.parse(safeJsonStringify({
                id: topicDoc.id,
                ...topicDoc.data()
            }))
            :""
        }
    }

    } catch (error) {
        console.log('getServerSideProps error',error)   
}
}