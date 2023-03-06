import { Box, Flex, Stack,Text } from '@chakra-ui/react';
import React from 'react';

type PreviousQuizProps = {
    
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