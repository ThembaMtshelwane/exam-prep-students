import { Button, Link } from '@chakra-ui/react'
import React from 'react';

type BackButtonProps = {
    
};

const BackButton:React.FC<BackButtonProps> = () => {
    
    return (
      <Link href="/dashboard">
        <Button
          bg="#265e9e"
          color="white"
          boxShadow="5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)"
          _hover={{
            transform: 'scale(0.95)',
          }}
          width="100%"
        >
          {' '}
          Back{' '}
        </Button>
        <br />
      </Link>
    )
}
export default BackButton;