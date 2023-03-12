import { Button, Flex, Heading, Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from '../components/modal/auth/Login'
import { auth } from '../firebase/clientApp'

export default function Home() {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const start = () =>{
    if(user){
      router.push('/dashboard')
    }else{

    }
  }

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

            <Button mt={2} color='#265e9e' width='30%' onClick={start}>
              Start Quiz
            </Button>   
        </Flex>
      </Flex>
    </>
  )
}
