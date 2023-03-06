import { Button, Flex, Heading, Text} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Flex bg='#265e9e' height='92vh'>
        <Flex direction='column' alignSelf='center'
        width='50%' margin={10}>
  
            <Heading color='white' mb={2}>
                WITS EXAM PREP
            </Heading> 

            <Text color='white' mb={2}>
                  Description:Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat perspiciatis cumque voluptate asperiores beatae fugit velit eveniet alias hic! Id, esse! Nemo temporibus alias molestiae!
            </Text>  

            <Button mt={2} color='#265e9e' width='30%'>
              Start Quiz
            </Button>   
        </Flex>
      </Flex>
    </>
  )
}
