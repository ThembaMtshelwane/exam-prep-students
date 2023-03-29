import { QuestionTemplate } from '@/src/atom/quizAtoms';
import { Flex, Stack, Button, Text, Box } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';


type QuestionsProps = {
    questions:QuestionTemplate[]
};

const Questions:React.FC<QuestionsProps> = ({questions}) => {

  let currentQestion: any;
  let currQuestions: any[] = [];
  let storeQs:any[] =[]
  let availableQuestions: any[] = [];
  let questionsCounter =1
  let MAX_QUESTIONS =1
  let endQuiz = false
  let newQuestions:any[] =[]
  let score =0
  let incorrectCollection: any[] =[]
  let FIRST_LAYER = 0
  let LAST_LAYER = 0
  let allQuestions:any[]=[]
  let storeAllPrevIncorrects: any[] =[]
  let levelCounter =1
  let mainQs:any[] = []; let secQs:any[] = []; let terQs:any[] = []; let quadQ:any[] = [];
  let availableQuestionsADV :any[] = [];
  let isAnswered = false
  let quizResult:any[] = [];

  console.log('Run once') 
  const [questionNumber, setQuestionNumber] =useState(1)
  const [levelNumber, setLevelNumber] =useState(1)
  const [maxQuestions, setMaxQuestions] =useState(1)
  const [loading, setLoading] =useState(false)
  const [AllNewQuestions, setAllQuestions] =useState([{}])
  const [PreviousQuestions, setPreviousQuestions] =useState([{}])
  const [question, SetQuestion] =useState('') 
  

  //Process the questions => Arrange according to levels
  function sortData(){
    if(questions.length===0){
      console.log('Questions do not exist')
      return
    }
     questions.forEach((q:any) => {
       if (q.level === 1) {
         mainQs.push(q)
       } else if (q.level === 2) {
         secQs.push(q)
       } else if (q.level === 3) {
         terQs.push(q)
       } else if (q.level === 4) {
        quadQ.push(q)
      }
     })
    return [mainQs, secQs, terQs]
  }
  
  // start the quiz
  const startQuiz = () => {
    console.log('START QUIZ ',levelCounter===1) 
    if(levelCounter===1){  
      const sortedQuestions = sortData();
      allQuestions = sortData()!
      questionsCounter = 0
      nextQuestion(1,[],allQuestions)
    }
  }

  // Get the next questions based on the current level
  const getLevelQuestions = (levelIndex:number,allQuestions:any) => {
  return allQuestions[levelIndex-1]
  }

  const getLevelQuestionsAdvanced = (previousQuestionCollection:any[],currentLevel:number,allQuestions:any) => {
      // get the previous questions that are answered incorrectly
      // = previousQuestionCollection
    
      // Get the current questions based on current level
      //      eg get available questions at level 2 (level+1=2)
      currQuestions = getLevelQuestions(currentLevel,allQuestions)
             
      // get the previous questions that are answered incorrectly
      availableQuestionsADV =  previousQuestionCollection.filter(function(prevQuestion:any) {
          // get the id of previous question 
          //       eg prevQ.id =1
          // strip all the ids (remove .) 
          const prevID = prevQuestion.id.replace('.', '')
          
          // compare level 1 ids and level2 ids at level 1 ref
          //      eg if the whole  of level 1 matches with level 2 id from 0 to level2
          //      return those questions to new questions variable
          newQuestions =  currQuestions.filter(function(currQuestion) {
              // get the id of current question 
              //       eg prevQ.id =1.1 and 1.2
              // strip all the ids (remove .) = 11 or 12
              const currID = currQuestion.id.replace('.', '')
              
              // edit the current id in order to perform comparison
              const editedCurrID = currID.substring(0,currentLevel-1)
              // if the ids match the questions are related and return the appropriate current question
              return prevID  === editedCurrID
          })
              
          // store each result of comparison 
          storeQs.push(newQuestions)
          storeQs = storeQs.flat()
      })  
    
      // if update the questions need for next level
      if(storeQs.length === 0){
        availableQuestionsADV =[]
        endQuiz = true
        return
      }
      else{
          availableQuestionsADV = storeQs.filter(function(newQuestion) {
              return Object.keys(newQuestion).length !== 0;
          })
      }      
      // empty storage
      storeQs=[]
      newQuestions =[]
      // return questions for next level
      return availableQuestionsADV
  }
  
  function getQs (levelIndex:any, prevInfo:any,allQuestions:any) {
    const index = prevInfo.indexOf('empty');
    if (index > -1) { // only splice array when item is found
      prevInfo.splice(index, 1); // 2nd parameter means remove one item only
    }
   // console.log('prevInfo') 
    //console.log(prevInfo) 
    if(/*prevInfo.length===0 &&*/levelIndex===1){ 
      availableQuestions = getLevelQuestions(levelIndex,allQuestions)
     // console.log('at level 1') 
      //console.log(availableQuestions) 
    }
    else{
     submitQuiz(endQuiz)     
     availableQuestions = getLevelQuestionsAdvanced(prevInfo,levelIndex,allQuestions) as []; 
     //console.log('at level 2') 
     //console.log(availableQuestions) 
    }
    return availableQuestions
  }

  // Display the next questions
  function nextQuestion (levelIndex:any, prevInfo:any,allQuestions:any) {
    const index = prevInfo.indexOf('empty');
    if (index > -1) { // only splice array when item is found
      prevInfo.splice(index, 1); // 2nd parameter means remove one item only
    }
    //console.log('prevInfo') 
    //console.log(prevInfo) 
    if(/*prevInfo.length===0 &&*/levelIndex===1){ 
      availableQuestions = getLevelQuestions(levelIndex,allQuestions)
      //console.log('at level 1') 
      //console.log(availableQuestions) 
    }
    else{
     submitQuiz(endQuiz)     
     availableQuestions = getLevelQuestionsAdvanced(prevInfo,levelIndex,allQuestions) as []; 
     //console.log('at level 2') 
     //console.log(availableQuestions) 
    }
    questionsCounter++ 
    currentQestion = availableQuestions[questionsCounter - 1]
   
    console.log('new questions')
    // console.log(AllNewQuestions)  
    console.log(availableQuestions) 

    // console.log('new max questions')
    // console.log(maxQuestions) 

    // console.log('new question counter')
    // console.log(questionNumber) 

    // console.log('new level')
    // console.log(levelNumber) 

    // console.log('PreviousQuestions')
    // console.log(PreviousQuestions) 
  }

  //End quiz 
  function submitQuiz(endQuiz:boolean){
      if(endQuiz){
          // finalResult = {
          //     result :quizResult,
          //     finalScore: score
          // }
        return
      }
  }

  // Evaluate choices
  function checkAnswer(event: React.MouseEvent<HTMLButtonElement>){
    incorrectCollection=[]
    isAnswered = true
    const selectedAnswer = event.currentTarget.innerText
    const correct = availableQuestions[questionsCounter-1].answer
    if (selectedAnswer === correct) { // correct answer
      currentQestion.status = true
      score = score + currentQestion.marks
      console.log('correct answer')
      incorrectCollection.push('empty')
      score = score +currentQestion.marks
    } 
    else{ // incorrect answer
      currentQestion.status = false
      console.log('incorrect answer')
      incorrectCollection.push(currentQestion)
    }
    quizResult.push({
      question:currentQestion.questionText,
      isCorrect: currentQestion.status       
    })
  }

  // Submit final answer
  function submitAnswer(){
    if(isAnswered){
      // Generate the next level questions
      let level = updateLevel(allQuestions)
      FIRST_LAYER =1
      storeAllPrevIncorrects.push( getInorrect())
      //setPreviousQuestions(storeAllPrevIncorrects)

      if(storeAllPrevIncorrects[0] ==='empty' && ((level as number)-1) === FIRST_LAYER ){return}
      
      // setPreviousQuestions(storeAllPrevIncorrects)

      // console.log('PreviousQuestions')
      // console.log(PreviousQuestions)

      // console.log('levelNumber')
      // console.log(levelNumber)

      nextQuestion(level, storeAllPrevIncorrects,allQuestions) // Load new questions

      // console.log('getQs')
      // console.log(getQs(levelNumber, PreviousQuestions,allQuestions) )
      
      //setAllQuestions(availableQuestions)      
     // setMaxQuestions(availableQuestions.length) 

      isAnswered = false
    }  
  }
    
  // Move to next level
  function updateLevel (allQuestions:any) {
    LAST_LAYER = allQuestions.length
    //setQuestionNumber(questionNumber+1)
    console.log('questionsCounter === MAX_QUESTIONS')
    console.log(questionsCounter === MAX_QUESTIONS)
    
    if (levelCounter> LAST_LAYER) { // if all questions OF THE QUIZ are answered,....
      // end quiz
      return
    
    } else if (questionsCounter === MAX_QUESTIONS) { // if all questions OF THE LEVEL are answered
      // console.log('questionsCounter')
      // console.log(questionsCounter)
      
      // console.log('MAX_QUESTIONS')
      // console.log(MAX_QUESTIONS)
      
      levelCounter++ // move to next level
      //setLevelNumber(levelNumber+1) 
      questionsCounter = 0
      //setQuestionNumber(1) 
      //console.log('update reset count',questionNumber)
    }
    return levelCounter
  }

  // Get the previous question
  function getInorrect () {
  return incorrectCollection[incorrectCollection.length-1]
  }

  startQuiz()
  
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

export default Questions;
