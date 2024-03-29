import { authModalState } from '@/src/atom/authModalAtom';
import { Flex } from '@chakra-ui/react';
import {useRecoilValue} from 'recoil'
import React from 'react';
import Login from './Login';
import Register from './Register';

type AuthInputsProps = {
    
};

const AuthInputs:React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState)
    return (
    <Flex direction='column' align='center' width='100%' mt={4}>
        {modalState.view === 'login' &&  <Login/> }
        {modalState.view === 'register' &&  <Register/> }
    </Flex>
    )
}
export default AuthInputs;