import { Box, Flex, List, Stack,Text,ListItem } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

type PreviousQuizProps = {
   // Get topic snippets => topic name, date created, isComplete
};

const PreviousQuiz:React.FC<PreviousQuizProps> = () => {
    
    return (
        <>
            <Box m ={2} p={5} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)' >
            <Box fontSize='16px' fontWeight={700} color='gray.700' p={2}>
              <p> Previous Quiz</p>
            </Box>
            <Flex direction='row'  pr={2} m={2} >
                 
             <List width='100%'>
                <Stack spacing={5}>
                  <ListItem>
                    <Box  cursor='pointer' fontWeight={700} 
                     bg='white' boxShadow='1px 1px 1px 2px rgba(97, 143, 217, .75)'p='10px'
                      _hover={{
                        bg:'#265e9e', color:'white',
                      }}>
                        <Text >Topic: Fractions</Text>
                        <Text>Time:</Text>
                        <Text>Status:</Text>
                    </Box>
                  </ListItem>
                </Stack>
             </List>
                </Flex>
          </Box>
        </>
    )
}
export default PreviousQuiz;