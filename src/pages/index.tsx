import { Button, Flex, Heading, Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from '../components/modal/auth/Login'
import { auth } from '../firebase/clientApp'

export default function Home() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [proceed, setContinue] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      setContinue(true) 
    }
  });

  const start = () =>{
    if(user){
      router.push('/dashboard')
    }
  }

  return (
    <>
      <Flex bg='#265e9e' height='92vh'>
        <Flex direction='column' alignSelf='center'width='50%' margin={10}>
  
            <Heading color='white' mb={2}>
                WITS EXAM PREP
            </Heading> 

            <Text color='white' mb={2}>
                  Description:Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat perspiciatis cumque voluptate asperiores beatae fugit velit eveniet alias hic! Id, esse! Nemo temporibus alias molestiae!
            </Text>  

            {proceed?
               <Button mt={2} color='#265e9e' width='30%'
                 _hover={{boxShadow:'5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',}}
                onClick={start}>
                 Continue
              </Button>   
            :''}

        </Flex>
      </Flex>
    </>
  )
}
