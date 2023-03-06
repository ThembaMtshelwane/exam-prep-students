import { Box, Button, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type ActiveQuizProps = {
    
};

const attemptRecord = () =>{
    
}

const ActiveQuiz:React.FC<ActiveQuizProps> = () => {
    
    return (
        <>
            <Box border='2px solid black'>
                <Heading p={5} m={0}> Welcome student</Heading>
            </Box><br />
            <Box 
            border='2px solid red' 
            m ={2} p={5}>
                <Text> Current Quiz</Text>
                <Flex direction='row' border='2px solid red' p={2} m={2} >
                    <Box>
                    <Text>1 Quiz Name</Text>
                    <Text> Quiz Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat perspiciatis cumque voluptate asperiores </Text>
                    <Text> Timestamp</Text>
                    </Box>
                    <Spacer/>
                    <Button alignSelf='center' onClick={attemptRecord}>Start</Button>
                </Flex>
            </Box>
        </>
    )
}
export default ActiveQuiz;