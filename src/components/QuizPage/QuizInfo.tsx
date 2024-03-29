import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

type QuizInfoProps = {
  topicName: String
}

const QuizInfo: React.FC<QuizInfoProps> = ({ topicName }) => {
  return (
    <>
      <Box m={2} p={5}>
        <Heading textAlign="center" mx="auto">
          {topicName} Quiz
        </Heading>
        {/* <Flex direction='row' boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)' borderRadius={0} m ={2} p={5} >  
                list of learning concepts
            </Flex> */}
      </Box>
    </>
  )
}
export default QuizInfo
