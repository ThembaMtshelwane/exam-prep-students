import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContent:React.FC<Props> = ({children}) => {
    
    return (
        <>
        {/* Outter most layer = The grey background */}
        <Flex justifyContent='center' p='16px 0px'
         >
            {/* The main layer = The white foreground */}
            <Flex 
            direction='column'  
            width='95%'
            height='100%'
            alignContent='center'
            maxWidth='860px'
            bg='white'
            borderRadius='0'  
            m={1}  
            p={5}
            boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)'
            >
                {children && children}
            </Flex> 
        </Flex>
        </>
    )
}
export default PageContent;