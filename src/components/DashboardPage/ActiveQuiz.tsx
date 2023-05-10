import { Topic } from '@/src/atom/quizAtoms';
import { auth, } from '@/src/firebase/clientApp';
import { Box, Button, Flex, List, ListItem, Stack, Text, } from '@chakra-ui/react';
import {useRouter} from 'next/router'
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type ActiveQuizProps = {
   /* Get topic snippets => -topic name, date created, isComplete
                            -use topic snippet from topics to create
                             the active quiz list.
                            -From the active quiz list allow the user
                             to pick a quiz to attempt
      
    When a student picsk a quiz add it to the student's quiz history.
    Add the quiz name, if its completed, when was the attempt, and the results

*/
  topicInfo:Topic[]
};

const ActiveQuiz:React.FC<ActiveQuizProps> = ({topicInfo}) => {
    
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user] = useAuthState(auth)
    
    const goToQuiz =() =>{
      setLoading(true)
      router.push(`quiz/fractions`)
    }

    return (
        <>
          <Box onClick={goToQuiz} m ={2} p={5} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)' >
            <Box fontSize='16px' fontWeight={700} color='gray.700' p={2}>
               Current Quiz
            </Box>
            <Flex direction='row' pr={2} m={2} >
                 
            <List width='100%'>
                <Stack spacing={5}>
                  <ListItem> 
                    <Button fontWeight={700} bg='white' boxShadow='1px 1px 1px 2px rgba(97, 143, 217, .75)'p='10px'
                      _hover={{ bg:'#265e9e', color:'white',transform: 'scale(0.98)'}}
                      isLoading={loading} width='95%' height='50%' borderRadius={0}
                      >
                        <Flex direction='column'>
                          <Text >Topic: Fractions</Text>
                          <Text>Time:</Text>
                          <Text>Status:</Text>
                        </Flex>
                    </Button>
                  </ListItem>
                </Stack>
             </List>
                </Flex>
          </Box>
        </>
    )
}
export default ActiveQuiz;