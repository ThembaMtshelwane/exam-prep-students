import { Box, Flex, Stack,Text } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

type PreviousQuizProps = {
   // Get topic snippets => topic name, date created, isComplete
};

const PreviousQuiz:React.FC<PreviousQuizProps> = () => {
    
    return (
        <>
            <Box border='2px solid blue' 
             m ={2} p={5}
             >  
                <Text> Previous Quiz</Text>
            </Box>
        </>
    )
}
export default PreviousQuiz;