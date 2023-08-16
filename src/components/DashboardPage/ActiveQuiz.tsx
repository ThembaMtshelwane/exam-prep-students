import { Topic } from '@/src/atom/quizAtoms';
import { Box, Button, Flex, List, ListItem, Stack, Text, Link} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getTopicInfo } from '../../pages/api/TopicData';

type ActiveQuizProps = {
   /* Get topic snippets => -topic name, date created, isComplete
                            -use topic snippet from topics to create
                             the active quiz list.
                            -From the active quiz list allow the user
                             to pick a quiz to attempt
      
    When a student picsk a quiz add it to the student's quiz history.
    Add the quiz name, if its completed, when was the attempt, and the results

*/

};

const ActiveQuiz:React.FC<ActiveQuizProps> = ({}) => {
    
  const [loading, setLoading] = useState(false)
  const [topicData, setTopics] = useState<Topic[]>([]);

   useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopicInfo();
      setTopics(data?.props.topicData);
    };
    fetchTopics();
  }, []);

  console.log('topic data for students',topicData)
  return (
    <>
      <Box m ={2} p={5} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)'>
        <Box fontSize='16px' fontWeight={700} color='gray.700' p={2}>
           Current Quiz
        </Box>
        <Flex direction='row' pr={2} m={2} >

        <List width='100%'>
          <Stack spacing={5}>
          {
            topicData.length!=0 ? 
            topicData.map((prevID:Topic,index:number) => (
              <ListItem key={index}> 
                <Link href={`quiz/${prevID.topicID}`}>
                  <Button fontWeight={700} bg='white' boxShadow='1px 1px 1px 2px rgba(97, 143, 217, .75)'p='10px'
                    _hover={{ bg:'#265e9e', color:'white',transform: 'scale(0.98)'}}
                    isLoading={loading} width='95%' height='50%' borderRadius={0}
                  >
                    <Flex direction='column'>
                      <Text >Course Code: {prevID.courseCode}</Text>
                      <Text >Topic: {prevID.topicID}</Text>
                      {/* <Text>Created At: {prevID.createdAt}</Text> */}
                      <Text>Number of Learning Objectives: {prevID.numberOfLearningObjectives}</Text>
                    </Flex> 
                  </Button>
                </Link>
              </ListItem>
            )):
            <Flex direction='column'>
              <Text >No Available Quiz</Text>
            </Flex> 
          }
          </Stack>
         </List>
            </Flex>
      </Box>
    </>
    )
}
export default ActiveQuiz;