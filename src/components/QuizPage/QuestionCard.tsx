import { Flex, Button, Text, Box, Stack } from '@chakra-ui/react';

import React  from 'react';
type QuestionCardProps = {
  startQuiz: any
  allQuestions: any
  questionText: string
  options: string[]
  questionNumber: number
  levelNumber: number
  checkAnswer: any
  nextQuestions: any
  currentLevelQuestions: any
  isDisplayFirst:boolean
  qid: string
  answer: string  
  isStart:boolean
  isDisplaySecondAndBeyond:boolean
  endQuiz:boolean
};
const QuestionCard: React.FC <QuestionCardProps>  = ({
  startQuiz, allQuestions,questionText, options,
  questionNumber, levelNumber,
  checkAnswer,nextQuestions,currentLevelQuestions
  ,isDisplayFirst,qid,answer,isStart,
  isDisplaySecondAndBeyond,endQuiz

}) => {

   console.log('currentLevelQuestions',currentLevelQuestions)

  return (
    <>   
    {!isStart && <> 
      <Box  border='2px solid #265e9e' borderRadius={5} m ={2} p={5}>
        <Flex direction=  'column' p={2} m={2} > 
          <Button bg='#265e9e' color='white' onClick={startQuiz}> Start </Button><br/>
        </Flex>  
        </Box>
    </> }
    
    {/* FOR THE FIRST QUESTION */}
       {isDisplayFirst && <Box  border='2px solid #265e9e' borderRadius={5} m ={2} p={5}>
        
         <Text fontWeight={700}>Question {questionNumber} of {allQuestions[levelNumber-1].length} </Text>
         <Text >{questionText}</Text>  
         
         <Flex direction=  'column' p={2} m={2} > 
             <Stack spacing={2} align='center'>
             {
              options.map((option:string,index:number) => (
                <Button bg='white' color='black' border='2px solid #265e9e' width='100%' key={index} 
                 onClick={(e) => {checkAnswer(e,qid,answer,questionText) }}>
                  {option } 
                 </Button>
              ))
            }
             </Stack> <br/> 
             
             {isStart && <>  <Button bg='#265e9e' color='white' onClick={nextQuestions}> Next </Button><br/> </> } 
         </Flex>  
      </Box>
      }
    {/* FOR THE SECOND QUESTION AND BEYOND */}
      { (isDisplaySecondAndBeyond && !endQuiz ) && <Box  border='2px solid #265e9e' borderRadius={5} m ={2} p={5}>
        
        <Text fontWeight={700}>Question {questionNumber} of {currentLevelQuestions.length} </Text>
        <Text >{currentLevelQuestions[questionNumber-1].question}</Text>  
        
        <Flex direction=  'column' p={2} m={2} > 
            <Stack spacing={2} align='center'>
              {
                currentLevelQuestions[questionNumber-1].questionOptions.map((option:string,index:number) => (
                  <Button bg='white' color='black' border='2px solid #265e9e' width='100%'key={index} 
                  onClick={(e) => {checkAnswer(e,currentLevelQuestions[questionNumber-1].id, currentLevelQuestions[questionNumber-1].answer,currentLevelQuestions[questionNumber-1].question) }}>
                    {option}
                  </Button>
                ))
              }
            </Stack> <br/> 
         
            {isStart && <>  <Button bg='#265e9e' color='white' onClick={nextQuestions}> Next </Button><br/> </> } 
             {!isStart && <> <Button bg='#265e9e' color='white' onClick={startQuiz}> Start </Button><br/></> }
        </Flex>  
     </Box>
     }
    </>
   )
}

export default QuestionCard;
