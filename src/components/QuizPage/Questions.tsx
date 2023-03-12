import { QuestionTemplate } from '@/src/atom/quizAtoms';
import { firestore } from '@/src/firebase/clientApp';
import { Box, Button, Flex,Text, Stack } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type QuestionsProps = {
    questions:QuestionTemplate[]
};

let questionCounter =0
const Questions:React.FC<QuestionsProps> = ({questions}) => {

    const [questionText, setQuestionText] = useState('')

    const [option1, setOptionText1] = useState('')  
    const [option2, setOptionText2] = useState('')  
    const [option3, setOptionText3] = useState('')  
    const [option4, setOptionText4] = useState('')  
    
   // console.log('AllQuestions',AllQuestions.questions)
    let currentQestion: any;
    let currQuestions: any[] = [];
    let storeQs:any[] =[]
    let availableQuestions: any[] = [];
    let questionsCounter =1
    let MAX_QUESTIONS =1
    let endQuiz = false
    let newQuestions:any[] =[]
    let quizResult = [{}]
    let score =0
    let incorrectCollection: any[] =[]
    let FIRST_LAYER = 0
    let LAST_LAYER = 0
    let allQuestions: any[]=[]
    let storeAllPrevIncorrects: any[] =[]
    let levelCounter =1
    let mainQs:any[] = []; let secQs:any[] = []; let terQs:any[] = [];
    let availableQuestionsADV :any[] = [];

  //Process the questions => Arrange according to levels
    function sortData(){
       questions.forEach((q:any) => {
         if (q.level === 1) {
           mainQs.push(q)
         } else if (q.level === 2) {
           secQs.push(q)
         } else if (q.level === 3) {
           terQs.push(q)
         }
       })
      return [mainQs, secQs, terQs]
    }
  
    // start the quiz
    const startQuiz = () => {
        allQuestions = sortData()
        questionsCounter = 0
        nextQuestion(1,[],allQuestions)
    }

    // // Get the next questions based on the current level
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
        const editedCurrID = currID.substring(0,currentLevel)
        // if the ids match the questions are related and return the appropriate current question
          return prevID  === editedCurrID
        })
     
        // store each result of comparison 
        storeQs.push(newQuestions)
        storeQs = storeQs.flat()
        })  
        //console.log('availableQuestionsADV',availableQuestionsADV)
      
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

    // // Display the next questions
    function nextQuestion (levelIndex:any, prevInfo:any,allQuestions:any) {
        const index = prevInfo.indexOf('empty');
        if (index > -1) { // only splice array when item is found
          prevInfo.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log('prevInfo.length',prevInfo.length)
        if(prevInfo.length===0 && levelIndex===1){ 
          questionsCounter++
          availableQuestions = getLevelQuestions(levelIndex,allQuestions)
          console.log('level 1 question counter',questionsCounter)
          console.log('level 1 availableQuestions',availableQuestions)
          MAX_QUESTIONS = availableQuestions.length
          console.log('level 1 MAX_QUESTIONS',MAX_QUESTIONS)
          currentQestion = availableQuestions[questionsCounter - 1]
          console.log('level 1 question',availableQuestions[questionsCounter-1].question)
         // setQuestionText(availableQuestions[questionsCounter-1].question)
        }
        else{
         submitQuiz(endQuiz)
         
         questionsCounter++
         //availableQuestions = getLevelQuestionsAdvanced(prevInfo,levelIndex,allQuestions) as []; 
         availableQuestions = getLevelQuestions(levelIndex,allQuestions)
         console.log('level 2 question counter',questionsCounter)
         console.log('level 2 availableQuestions',availableQuestions)
         MAX_QUESTIONS = availableQuestions.length
         console.log('level 2 MAX_QUESTIONS',MAX_QUESTIONS)
         currentQestion = availableQuestions[questionsCounter - 1]
         console.log('level 2 question',availableQuestions[questionsCounter-1].question)
         //setQuestionText(availableQuestions[questionsCounter-1].question)
        }

        // Display all the choices/options for the current question
        // setOptionText1(availableQuestions[questionsCounter-1].choice1)
        // setOptionText2(availableQuestions[questionsCounter-1].choice2)
        // setOptionText3(availableQuestions[questionsCounter-1].choice3)
        // setOptionText4(availableQuestions[questionsCounter-1].choice4)

       // acceptAnswers = true
    }
    
    // //End quiz 
    function submitQuiz(endQuiz:boolean){
        if(endQuiz){
            // finalResult = {
            //     result :quizResult,
            //     finalScore: score
            // }
         return
        }
    }

    // // Evaluate choices
    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>): void=>{
        incorrectCollection=[]
        const selectedAnswer = event.currentTarget.innerText
        console.log('check answer question counter',questionsCounter)
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
        // quizResult.push({
        //   question:currentQestion.questionText,
        //   isCorrect: currentQestion.status       
        // })
    }

    // Submit final answer
    function submitAnswer(){
        let level = updateLevel(allQuestions)
        console.log('submit level count',level)
        FIRST_LAYER =1
        storeAllPrevIncorrects.push( getInorrect())
        console.log('submit storeAllPrevIncorrects')
        console.log(storeAllPrevIncorrects)
        if(storeAllPrevIncorrects[0] ==='empty' && ((level as number)-1) === FIRST_LAYER ){return}
        nextQuestion(level, storeAllPrevIncorrects,allQuestions) // Load new questions
    }

    // // Move to next level
    function updateLevel (allQuestions:any) {
        console.log('update level questionsCounter',questionsCounter)
        console.log('update level  MAX_QUESTIONS',MAX_QUESTIONS)
        LAST_LAYER = allQuestions.length
        if (levelCounter> LAST_LAYER) { // if all questions OF THE QUIZ are answered,....
          // end quiz
          return
        
        } else if (questionsCounter === MAX_QUESTIONS) { // if all questions OF THE LEVEL are answered
          levelCounter++ // move to next level
         // currentQestion = {}
          questionsCounter = 0
        }
        return levelCounter
    }
    
    // // Get the previous question
    function getInorrect () {
        console.log('getIncorrect')
        console.log(incorrectCollection[incorrectCollection.length-1])
    return incorrectCollection[incorrectCollection.length-1]
    }

    useEffect(()=>{
        setAll()
	}, [])

    const setAll = ()=>{
        console.log('xxxx xxxx question counter use effect',questionsCounter)
		setQuestionText(availableQuestions[questionsCounter-1].question)
        setOptionText1(availableQuestions[questionsCounter-1].choice1)
        setOptionText2(availableQuestions[questionsCounter-1].choice2)
        setOptionText3(availableQuestions[questionsCounter-1].choice3)
        setOptionText4(availableQuestions[questionsCounter-1].choice4)
    }
    
    startQuiz() 

    return (
        <>    
        <Box  border='2px solid black' m ={2} p={5}>

            <Text fontWeight={700}>Question {questionsCounter} of {MAX_QUESTIONS}</Text>

            <Text>{questionText}</Text>

            <Flex direction=  'column' p={2} m={2} > 
                <Stack spacing={2} align='center'>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option1}</Button>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option2}</Button>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option3}</Button>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option4}</Button>
                </Stack> <br />
                <Button bg='#265e9e' color='white' onClick={submitAnswer}>Next</Button><br />
                {/* <Button bg='#265e9e' color='white'>Done</Button> */}
            </Flex>
        </Box>
        </>
        )
}
export default Questions;
