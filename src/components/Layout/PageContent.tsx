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
        border='1px solid #265e9e'
         >
            {/* The main layer = The white foreground */}
            <Flex 
            direction='column'  
            width='95%'
            height='100%'
            alignContent='center'
            maxWidth='860px'
            border='2px solid #265e9e' 
            bg='white'
            borderRadius='20px'  
            m={1}  
            pt={0}
            >
                {children && children}
            </Flex> 
        </Flex>
        </>
    )
}
export default PageContent;