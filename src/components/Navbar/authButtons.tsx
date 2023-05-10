import React from 'react';
import { Button } from '@chakra-ui/react';
import AuthModal from '../modal/auth/authModal';
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atom/authModalAtom';

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
        <>
            <AuthModal/>
            <Button 
                bg= "#265e9e"
                color="white"
                margin="2px"
                _hover={{ boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                onClick={()=> setAuthModalState({open:true, view:"login"})}
            >Login</Button>

            <Button
                bg= "#265e9e"
                color="white" 
                margin="2px"
                _hover={{ boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                onClick={()=> setAuthModalState({open:true, view:"register"})}
            >Register</Button>
        </>
    ) 
}
export default AuthButtons;