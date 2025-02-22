import { Box, Button, Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { Topic } from '@/src/atom/quizAtoms'

interface TopicCardProps {
  quizInfo: Topic
  isLoading: boolean
  onLoadPage: (topicID: string) => void
}

const TopicCard: React.FC<TopicCardProps> = ({
  quizInfo,
  isLoading,
  onLoadPage,
}) => {
  return (
    <Box>
      <Link
        href={`quiz/${quizInfo.topicID}`}
        style={{ width: '100%' }}
        _hover={{ textDecoration: 'none' }}
      >
        <Button
          fontWeight={700}
          bg="white"
          boxShadow="lg"
          p={4}
          width="100%"
          height="100%"
          borderRadius="10px"
          textAlign="left"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          _hover={{
            bg: 'blue.500',
            color: 'white',
            transform: 'scale(1.02)',
          }}
          isLoading={isLoading}
          onClick={() => onLoadPage(quizInfo.topicID)}
        >
          <Flex direction="column" w="100%">
            <Text fontSize="lg" fontWeight="bold" isTruncated>
              {quizInfo.topicID}
            </Text>
            <Text fontSize="sm" color="gray.600 hover:gray.700" isTruncated>
              Course Code: {quizInfo.courseCode}
            </Text>
            <Text fontSize="sm" color="gray.600 hover:gray.700">
              Objectives: {quizInfo.numberOfLearningObjectives}
            </Text>
            <Text fontSize="xs" color="gray.500 hover:gray.700">
              Created on:{' '}
              {quizInfo.createdAt
                ? new Date(
                    quizInfo.createdAt.seconds * 1000
                  ).toLocaleDateString('en-GB')
                : 'No Date'}
            </Text>
          </Flex>
        </Button>
      </Link>
    </Box>
  )
}

export default TopicCard
