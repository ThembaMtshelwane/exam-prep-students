import { QuestionTemplate, Topic } from '@/src/atom/quizAtoms';
import PageContent from '@/src/components/Layout/PageContent';
import Questions from '@/src/components/QuizPage/Questions';
import QuizInfo from '@/src/components/QuizPage/QuizInfo';
import { firestore } from '@/src/firebase/clientApp';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify'

type QuizPageProps = {
    // All topic data=> questions, options...
    topicQuestionData:QuestionTemplate[],
    topicInfoData:Topic[],
};

const QuizPage:React.FC<QuizPageProps> = ({topicQuestionData,topicInfoData}) => {
    
    return (
        <>
          <PageContent>
              <QuizInfo/>
              <Questions questions={topicQuestionData}/>
            </PageContent>   
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // let questionsFromDB: QuestionTemplate[] =[]
    // Get topic data from database and pass it to the client
    try {
        const testQuestionsRef =  '/topics/fractions/questions'
        const questionsFromDB = await getDocs(collection(firestore,testQuestionsRef)) // get questions collection from database
      
       // const topicQuestionsCollectionRef = `topics/${context.query.topicID as string}/questions`// get the approprate collection based on the router input
       // const questionsFromDB = await getDocs(collection(firestore,topicQuestionsCollectionRef)) // get questions collection from database
               
        let questions:any[] =[]

        // store all questions from the database into the questions array
        questionsFromDB.forEach((doc) => {
            questions.push({ ...doc.data()})
        });


        return { //This will make sure the questions are available gloabally
            props:{
                topicQuestionData:questions.length!==0
                ? JSON.parse(safeJsonStringify(
                    questions
                ))
                :"",
            }
        }

    } catch (error) {
        console.log('getServerSideProps error',error)   
    }
}

export default QuizPage;