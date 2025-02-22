import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const PageContent: React.FC<Props> = ({ children }) => {
  return (
    <>
      {/* Outer layer - Grey background */}
      <Flex justifyContent="center" p={{ base: '8px', md: '16px 0px' }}>
        {/* Inner layer - White foreground */}
        <Flex
          direction="column"
          width="100%"
          maxWidth={{ base: '100%', md: '850px', lg: '1024px' }}
          bg="white"
          borderRadius="lg"
          m={{ base: 0, md: 1 }}
          p={{ base: 3, md: 5 }}
          boxShadow="md"
        >
          {children}
        </Flex>
      </Flex>
    </>
  )
}

export default PageContent
