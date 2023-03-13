import { QuestionTemplate } from '@/src/atom/quizAtoms';
import { Box, Button, Flex,Text, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type QuestionsProps = {
    questions:QuestionTemplate[]
};

const Questions:React.FC<QuestionsProps> = ({questions}) => {
    let isStart = false
    const [questionText, setQuestionText] = useState(isStart ? '' : '')
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
    let score =0
    let incorrectCollection: any[] =[]
    let FIRST_LAYER = 0
    let LAST_LAYER = 0
    let allQuestions: any[]=[]
    let storeAllPrevIncorrects: any[] =[]
    let levelCounter =1
    let mainQs:any[] = []; let secQs:any[] = []; let terQs:any[] = [];
    let availableQuestionsADV :any[] = [];
    let isAnswered = false
    let quizResult:any[] = [];
    let finalResult:{}= {};
    let questionTextsss:string='lols'

    let opt1:string=''
    let opt2:string=''
    let opt3:string=''
    let opt4:string=''

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
      
        console.log('ADV currentLevel',currentLevel)
        // Get the current questions based on current level
        //      eg get available questions at level 2 (level+1=2)
        currQuestions = getLevelQuestions(currentLevel,allQuestions)
        console.log('ADV following questions')
        console.log(currQuestions)
               
        // get the previous questions that are answered incorrectly
        availableQuestionsADV =  previousQuestionCollection.filter(function(prevQuestion:any) {
            // get the id of previous question 
            //       eg prevQ.id =1
            // strip all the ids (remove .) 
            const prevID = prevQuestion.id.replace('.', '')
            console.log('prevID',prevID)
            
            // compare level 1 ids and level2 ids at level 1 ref
            //      eg if the whole  of level 1 matches with level 2 id from 0 to level2
            //      return those questions to new questions variable
            newQuestions =  currQuestions.filter(function(currQuestion) {
                // get the id of current question 
                //       eg prevQ.id =1.1 and 1.2
                // strip all the ids (remove .) = 11 or 12
                const currID = currQuestion.id.replace('.', '')
                console.log('currID',currID)
                
                // edit the current id in order to perform comparison
                const editedCurrID = currID.substring(0,currentLevel-1)
                console.log('editedCurrID',editedCurrID)
                console.log('prevID  === editedCurrID',prevID  === editedCurrID)
                // if the ids match the questions are related and return the appropriate current question
                return prevID  === editedCurrID
            })
            console.log('new questions')
            console.log(newQuestions)
                 
            // store each result of comparison 
            storeQs.push(newQuestions)
            storeQs = storeQs.flat()
            console.log('storeQs')
            console.log(storeQs)
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
        console.log('availableQuestionsADV')
        console.log(availableQuestionsADV)
      
        // return questions for next level
        return availableQuestionsADV
    }
 
    // // Display the next questions
    function nextQuestion (levelIndex:any, prevInfo:any,allQuestions:any) {
        const index = prevInfo.indexOf('empty');
        if (index > -1) { // only splice array when item is found
          prevInfo.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log('all wrongs')
        console.log(prevInfo)

        console.log('prevInfo.length',prevInfo.length)
        if(/*prevInfo.length===0 &&*/ levelIndex===1){ 
          questionsCounter++
          console.log('----NXT-Q questions counter at level 1',questionsCounter)
          availableQuestions = getLevelQuestions(levelIndex,allQuestions)
          MAX_QUESTIONS = availableQuestions.length
          currentQestion = availableQuestions[questionsCounter - 1]
          //setQuestionText(availableQuestions[questionsCounter-1].question)
          questionTextsss =availableQuestions[questionsCounter-1].question
          console.log('questionTextsss',questionTextsss)
        }
        else{
         submitQuiz(endQuiz)
         
         questionsCounter++
         console.log('NXT-Q Counter at level 2 and above',questionsCounter)

         availableQuestions = getLevelQuestionsAdvanced(prevInfo,levelIndex,allQuestions) as []; 
         console.log('NXT-Q availableQuestions at level 2 and above')
         console.log(availableQuestions)

         MAX_QUESTIONS = availableQuestions.length
         console.log('NXT-Q MAX_QUESTIONS at level 2 and above',MAX_QUESTIONS)

         currentQestion = availableQuestions[questionsCounter - 1]
         //setQuestionText(availableQuestions[questionsCounter-1].question)
         questionTextsss =availableQuestions[questionsCounter-1].question
         console.log('questionTextsss',questionTextsss)
        }

        // Display all the choices/options for the current question
            // setOptionText1(availableQuestions[questionsCounter-1].choice1)
            // setOptionText2(availableQuestions[questionsCounter-1].choice2)
            // setOptionText3(availableQuestions[questionsCounter-1].choice3)
            // setOptionText4(availableQuestions[questionsCounter-1].choice4)
           opt1= availableQuestions[questionsCounter-1].choice1
           opt2= availableQuestions[questionsCounter-1].choice2
           opt3= availableQuestions[questionsCounter-1].choice3
           opt4= availableQuestions[questionsCounter-1].choice4
    }
    
    // //End quiz 
    function submitQuiz(endQuiz:boolean){
        if(endQuiz){
            finalResult = {
                result :quizResult,
                finalScore: score
            }
         return
        }
    }

    // Evaluate choices
    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>): void=>{
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
            // setCounter(counter + 1)
            console.log('BEFORE sub level ',levelCounter)
            console.log('BEFORE sub max questions ',MAX_QUESTIONS)
            let level = updateLevel(allQuestions)
            console.log('AFTER sub level ',levelCounter)
            console.log('AFTER sub max questions ',MAX_QUESTIONS)

            FIRST_LAYER =1
            storeAllPrevIncorrects.push( getInorrect())
            
            console.log('current level')
            console.log(level)

            console.log('storeAllPrevIncorrects')
            console.log(storeAllPrevIncorrects)

            if(storeAllPrevIncorrects[0] ==='empty' && ((level as number)-1) === FIRST_LAYER ){return}
            nextQuestion(level, storeAllPrevIncorrects,allQuestions) // Load new questions
        }  
}

    // // Move to next level
    function updateLevel (allQuestions:any) {
        
        console.log('updateLevel ',questionsCounter)

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
    return incorrectCollection[incorrectCollection.length-1]
    }

    useEffect(()=>{
       setAll(questionsCounter)
	}, [])

    const setAll = (questionsCounter:number)=>{
        console.log('xxxxxx setAll counter ',questionsCounter)
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

            <Text>{questionTextsss}</Text>

            <Flex direction=  'column' p={2} m={2} > 
                <Stack spacing={2} align='center'>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option1}</Button>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option2}</Button>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option3}</Button>
                    <Button bg='white' color='black' border='2px solid #265e9e' width='100%' onClick={checkAnswer}>{option4}</Button>
                </Stack> <br />
                <Button bg='#265e9e' color='white' onClick={submitAnswer}>
                {endQuiz ?'DONE' :'NEXT' }
                </Button><br />
            </Flex>
        </Box>
        </>
    )
}
export default Questions;
