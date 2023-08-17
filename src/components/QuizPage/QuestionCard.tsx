import { Flex, Button, Text, Box, Stack,Image, Link } from '@chakra-ui/react';
import {useRouter} from 'next/router'

import React  from 'react';
type QuestionCardProps = {
  startQuiz: any
  allQuestions: any
  questionText: string
  fileURL:string
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
  startQuiz, allQuestions,questionText,fileURL, options,
  questionNumber, levelNumber,
  checkAnswer,nextQuestions,currentLevelQuestions
  ,isDisplayFirst,qid,answer,isStart,
  isDisplaySecondAndBeyond,endQuiz

}) => {

   console.log('CARD currentLevelQuestions',currentLevelQuestions)
   const router = useRouter()

  return (
    <>   
    {/* { endQuiz  &&  router.push('/results')  } */}
    {!isStart && <> 
      <Box  borderRadius={5} m ={2} p={5}
      >
        <Flex direction=  'column' p={2} m={2} > 
          <Button bg='#265e9e' color='white'
            boxShadow='5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)'
            _hover={{transform: 'scale(0.95)',}}
            onClick={startQuiz} width='100%' 
          > 
           Start Quiz
          </Button><br/>
          
          <Link href='/dasgboard'>
            <Button bg='#265e9e' color='white' 
               boxShadow='5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)'
               _hover={{
                transform: 'scale(0.95)',
              }}
              width='100%'
             > Back </Button><br/>
          </Link>
        </Flex>  
        </Box>
    </> }
    
    {/* FOR THE FIRST QUESTION */}
       {isDisplayFirst && <Box  borderRadius={0} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)' m ={2} p={5}>
        
         <Text fontWeight={700}>Question {questionNumber} of {allQuestions[levelNumber-1].length} </Text>
         <Text >{questionText}</Text> 
         <Image
          objectFit='cover'
          src={fileURL}
          alt='question'
         />
         
         <Flex direction=  'column' p={2} m={2} > 
             <Stack spacing={2} align='center'>
             {
              options.map((option:string,index:number) => (
                <Button color='black' border='2px solid #265e9e' width='100%' key={index} 
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg:' #618fd9',
                  color:'white' 
                }}
                 onClick={(e) => {
                  checkAnswer(e,qid,answer,questionText) 
                }}
                 
                 >
                  {option } 
                 </Button>
              ))
            }
             </Stack> <br/> 
             
             {isStart && <>  <Button bg='#265e9e' color='white' onClick={nextQuestions}
              boxShadow='5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)'
              _hover={{transform: 'scale(0.95)',}}
             > Next </Button><br/> </> } 
         </Flex>  
      </Box>
      }
    {/* FOR THE SECOND QUESTION AND BEYOND */}
      { (isDisplaySecondAndBeyond && !endQuiz ) && <Box borderRadius={0} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)' m ={2} p={5}>
        
        <Text fontWeight={700}>Question {questionNumber} of {currentLevelQuestions.length} </Text>
        <Text >{currentLevelQuestions[questionNumber-1].question}</Text>  
        
        {currentLevelQuestions[questionNumber-1].fileURL != '' ? 
        <Image
          objectFit='cover'
          src={currentLevelQuestions[questionNumber-1].fileURL}
          alt='question'
         />        
        :''}

        
        <Flex direction=  'column' p={2} m={2} > 
            <Stack spacing={2} align='center'>
              {
                currentLevelQuestions[questionNumber-1].questionOptions.map((option:string,index:number) => (
                  <Button bg='white' color='black' border='2px solid #265e9e' width='100%'key={index} 
                  _active={{
                    transform: 'scale(0.98)',
                  }}
                  _focus={{
                    boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    bg:' #618fd9',
                    color:'white' 
                  }}
                  onClick={(e) => {
                    checkAnswer(e,currentLevelQuestions[questionNumber-1].questionID,
                                currentLevelQuestions[questionNumber-1].questionAnswer,
                                currentLevelQuestions[questionNumber-1].question,
                                currentLevelQuestions[questionNumber-1].questionResources
                                )
                    console.log('CARD resources ',currentLevelQuestions[questionNumber-1].questionResources)
                              }
                                
                                }>
                    {option}
                  </Button>
                ))
              }
            </Stack> <br/> 
         
            {isStart && <>  
              <Button bg='#265e9e' color='white' onClick={nextQuestions}  
               boxShadow='5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)'
               _hover={{transform: 'scale(0.95)',}}
              > Next </Button><br/> </> } 
        </Flex>  
     </Box>
     }
    </>
   )
}

export default QuestionCard;
