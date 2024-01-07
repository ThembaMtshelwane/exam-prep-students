import ActiveQuiz from '@/src/components/DashboardPage/ActiveQuiz'
import PageContent from '@/src/components/Layout/PageContent'
import { auth } from '@/src/firebase/clientApp'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [user] = useAuthState(auth)
  return (
    <>
      <PageContent>
        <Box p={5} m={0} fontSize="20px" fontWeight={700}>
          <p> Welcome {user?.email},</p>
        </Box>
        <ActiveQuiz />
      </PageContent>
    </>
  )
}

export default Dashboard
