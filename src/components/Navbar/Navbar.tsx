import { auth } from '@/src/firebase/clientApp';
import { Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LogOut from '../modal/auth/LogOut';
import AuthButtons from './authButtons';

const Navbar:React.FC = () => {
    const [user,loading,error] = useAuthState(auth)
    
    return(
        <Flex bg='white' height='44px' padding='6px 12px'> 
            <Spacer />
            <Flex justify='end' align = 'center'>
                {user?<LogOut/> :<AuthButtons/>}
            </Flex>
        </Flex>
    )
}
export default Navbar;