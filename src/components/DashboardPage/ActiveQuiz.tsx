import { SimpleGrid, Box, Text, List } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getTopicInfo } from '../../pages/api/TopicData'
import { Topic } from '@/src/atom/quizAtoms'
import TopicCard from '../TopicCard'

const ActiveQuiz: React.FC = () => {
  const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>({})
  const [topicData, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopicInfo()
      setTopics(data?.props.topicData)
    }
    fetchTopics()
  }, [])

  function loadPage(topicID: string) {
    setLoadingMap((prev) => ({ ...prev, [topicID]: true }))
  }

  return (
    <Box m={4} p={5} width="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Active Quizzes
      </Text>

      <List>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {topicData.length > 0 ? (
            topicData.map((quizInfo) => (
              <TopicCard
                key={quizInfo.topicID}
                quizInfo={quizInfo}
                isLoading={loadingMap[quizInfo.topicID] || false}
                onLoadPage={loadPage}
              />
            ))
          ) : (
            <Text textAlign="center" width="100%">
              No Available Quiz
            </Text>
          )}
        </SimpleGrid>
      </List>
    </Box>
  )
}

export default ActiveQuiz
