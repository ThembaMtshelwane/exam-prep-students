import { Flex, Stack, Button,Box,Text } from '@chakra-ui/react';
import React from 'react';
//import { availableQuestions, questionsCounter } from './Questions';


type QuestionCardProps = {
    availableQuestions:any,
    questionsCounter:any,
    checkAnswer:any,
    endQuiz:boolean,
    submitAnswer:any,
};

const QuestionCard:React.FC<QuestionCardProps> = ({
    availableQuestions,
    questionsCounter,
    checkAnswer,
    endQuiz,
    submitAnswer,
}) => {

    console.log('QCARD questions') 
    console.log(availableQuestions) 

    console.log('QCARD number') 
    console.log(questionsCounter) 
    
    return (
        <>    
          <Box  border='2px solid #265e9e' borderRadius={5} m ={2} p={5}>
  
            <Text fontWeight={700}>Question {questionsCounter} of {availableQuestions.length}</Text>
  
              <Text >{availableQuestions[questionsCounter-1].question}</Text> 
  
              <Flex direction=  'column' p={2} m={2} > 
                  
                  <Stack spacing={2} align='center'>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>
                        {availableQuestions[questionsCounter-1].choice1}
                    </Button>

                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>
                        {availableQuestions[questionsCounter-1].choice2}
                    </Button>

                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>
                        {availableQuestions[questionsCounter-1].choice3}
                    </Button>

                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>
                        {availableQuestions[questionsCounter-1].choice4}
                    </Button>

                  </Stack> <br />
  
                  <Button bg='#265e9e' color='white' onClick={() =>submitAnswer() }>
                  {endQuiz ?'DONE' :'NEXT' }
                  </Button><br />
              </Flex> 
          </Box>
        </>
      )
}
export default QuestionCard;