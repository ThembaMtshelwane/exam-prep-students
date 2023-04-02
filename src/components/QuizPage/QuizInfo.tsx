import { Box, Flex,Heading,Text } from '@chakra-ui/react';
import React from 'react';

type QuizInfoProps = {
   
};

const QuizInfo:React.FC<QuizInfoProps> = () => {

    return (
         <>  
        <Box  m ={2} p={5}>
            <Heading>Fractions Quiz</Heading>
            <Flex direction='row' border='2px solid #265e9e' borderRadius={5} p={2} m={2} >  
                list of learning concepts
            </Flex>
        </Box>
        </>
        )
}
export default QuizInfo;