import { Button, Flex,Text } from '@chakra-ui/react';
import React from 'react';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/clientApp'

const OAuthButtons:React.FC = () => {

    const [signInWithGoogle, user, loading,  error, ] = useSignInWithGoogle(auth)
    return (
        <Flex direction="column" width='100%' mb={4}>
            <Button bg="#265e9e" color="white" mb={2} mt={2} type='submit' width='100%'
              isLoading={loading}  _hover={{bg:"#265e9e" ,boxShadow:'5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)'}} 
              onClick={()=> signInWithGoogle()}
            > 
                Continue with Student Email
            </Button>
            {error && <Text>{error.message}</Text>}
        </Flex>
    )
}
export default OAuthButtons;