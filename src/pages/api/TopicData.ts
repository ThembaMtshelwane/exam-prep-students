import { firestore } from '@/src/firebase/clientApp';
import { collection, getDocs } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";

export const getTopicInfo = async () =>{
    
    try {
        const topicCollectionRef = '/topics'// the topic collection reference
        const topicInfoFromDB = await getDocs(collection(firestore,topicCollectionRef)) // get the topic collection from database
                
         let topics:any[] =[]
 
         // store all topics from the database into the questions array
         topicInfoFromDB.forEach((doc) => {
            topics.push({ ...doc.data()})
         });
 
 
         return { //This will make sure the topics are available gloabally
             props:{
                 topicData:topics.length!==0
                 ? JSON.parse(safeJsonStringify(
                     topics
                 ))
                 :"",
             }
         }
 
     } catch (error) {
         console.log('getServerSideProps error',error)   
     }
}