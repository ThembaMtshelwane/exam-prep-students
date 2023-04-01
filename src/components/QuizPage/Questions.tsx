import { QuestionTemplate } from '@/src/atom/quizAtoms';
import { Flex, Stack, Button, Text, Box } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';


type QuestionsProps = {
    questions:QuestionTemplate[]
};

const Questions:React.FC<QuestionsProps> = ({questions}) => {
  console.log('Run once');
  // const questionssss = [
  //   {
  //       question:'LO1 to LO8',
  //       questionAnswer:'Option A-1',
  //       questionID:'1',
  //       questionLevel:1,
  //       questionOptions:['Option A-1','Option B-1','Option C-1','Option D-1'],
  //   },
  //   {
  //       question:'LO1 to LO4',
  //       questionAnswer:'Option A-1-1',
  //       questionID:'1.1',
  //       questionLevel:2,
  //       questionOptions:['Option A-1-1','Option B-1-1','Option C-1','Option D-1-1'],
  //   },
  //   {
  //       question:'LO5 to LO8',
  //       questionAnswer:'Option A-1-2',
  //       questionID:'1.2',
  //       questionLevel:2,
  //       questionOptions:['Option A-1-2','Option B-1-2','Option C-1-2','Option D-1-2'],
  //   },
  //   {
  //       question:'LO1 to LO2',
  //       questionAnswer:'Option A-1-1-1',
  //       questionID:'1.1.1',
  //       questionLevel:3,
  //       questionOptions:['Option A-1-1-1','Option B-1-1','Option C-1-1','Option D-1-1'],
  //   },
  //   {
  //       question:'LO3 to LO4',
  //       questionAnswer:'Option A-1-1-2',
  //       questionID:'1.1.2',
  //       questionLevel:3,
  //       questionOptions:['Option A-1-1-2','Option B-1','Option C-1','Option D-1'],
  //   },
  //   {
  //       question:'LO5 to LO6',
  //       questionAnswer:'Option A-1-2-1',
  //       questionID:'1.2.1',
  //       questionLevel:3,
  //       questionOptions:['Option A-1-2-1','Option B-1','Option C-1','Option D-1'],
  //   },
  //   {
  //       question:'LO7 to LO8',
  //       questionAnswer:'Option A-1-2-2',
  //       questionID:'1.2.2',
  //       questionLevel:3,
  //       questionOptions:['Option A-1-2-2','Option B-1','Option C-1','Option D-1'],
  //   },
  //   {
  //       question:'LO1',
  //       questionAnswer:'Option A-1-1-1-1',
  //       questionID:'1.1.1.1',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-1-1-1','Option B-1','Option C-1','Option D-1'],
  //   },
  //   {
  //       question:'LO2',
  //       questionAnswer:'Option A-1-1-1-2',
  //       questionID:'1.1.1.2',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-1-1-2','Option B-1','Option C-1','Option D-1'],
  //   } ,
  //   {
  //       question:'LO3',
  //       questionAnswer:'Option A-1-1-2-1',
  //       questionID:'1.1.2.1',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-1-2-1','Option B-1','Option C-1','Option D-1'],
  //   } ,
  //   {
  //       question:'LO4',
  //       questionAnswer:'Option A-1-1-2-2',
  //       questionID:'1.1.2.2',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-1-2-2','Option B-1','Option C-1','Option D-1'],
  //   } ,
  //   {
  //       question:'LO5',
  //       questionAnswer:'Option A-1-2-1-1',
  //       questionID:'1.2.1.1',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-2-1-1','Option B-1','Option C-1','Option D-1'],
  //   } ,
  //   {
  //       question:'LO6',
  //       questionAnswer:'Option A-1-2-1-2',
  //       questionID:'1.2.1.2',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-2-1-2','Option B-1','Option C-1','Option D-1'],
  //   } ,
  //   {
  //       question:'LO7',
  //       questionAnswer:'Option A-1-2-2-1',
  //       questionID:'1.2.2.1',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-2-2-1','Option B-1','Option C-1','Option D-1'],
  //   }
  //    ,
  //   {
  //       question:'LO8',
  //       questionAnswer:'Option A-1-2-2-2',
  //       questionID:'1.2.2.2',
  //       questionLevel:4,
  //       questionOptions:['Option A-1-2-2-2','Option B-1','Option C-1','Option D-1'],
  //   }   
  // ]
  // Used to set the state for all available questions 
  const [allQuestions, setAllQuestions] = useState<Array<Array<any>>>([[]]);

  // Used to set the question count eg, 1 of ...
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  // Used to set the level of each question. eg level 1 will show the first question
  const [levelNumber, setLevelNumber] = useState(1);
  
  // Used to set the first question data. From the text, options, question id and answer
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['','','','']);
  const [qid, setQuestionID] = useState<string>('');
  const [answer, setAnswer] = useState('');

  // Used to get the previous question information ( question id) and stores it
  const [previousQuestionsID, setPreviousQuestionsID] = useState<string[]>([]);
  const [incorrectCollection, setIncorrectCollection] = useState<string[]>([]);
  
  // Used as a colletion of the following questions
  const [currentLevelQuestions, setCurrentLevelQuestions] = useState<Array<any>>([]);
//*************************
  // Boolean values used to render a specific output
  const [isDisplayFirst, setIsDisplayFirst] = useState<boolean>(false);
  const [isDisplaySecondAndBeyond, setIsDisplaySecondAndBeyond] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);
  // Used to allow the student to answer the current question before going to the next
  const [isAnswered, setIsAnswered] = useState<boolean>(true);

  const [LAST_LAYER, setLastLayer] = useState<number>(0);
  const FIRST_LAYER =1
  let emptyCollection: any[] = [];

  //Process the questions => Arrange according to levels
  function sortData() {
    if (questions.length === 0) {
      console.log('Questions do not exist');
      return;
    }
    const mainQs: any[] = [];  // Stores level 1 questions
    const secQs: any[] = [];   // Stores level 2 questions  
    const terQs: any[] = [];   // Stores level 3 questions
    const quadQ: any[] = [];   // Stores level 4 questions

    questions.forEach((q: any) => {
      if (q.questionLevel === 1) {
        mainQs.push(q);
      } else if (q.questionLevel === 2) {
        secQs.push(q);
      } else if (q.questionLevel === 3) {
        terQs.push(q);
      } else if (q.questionLevel === 4) {
        quadQ.push(q);
      }
    });
    return [mainQs, secQs, terQs,quadQ];
  }

  // Start Quiz
  function startQuiz() {
    /*
      This function is called when the START button is pressed and starts the quiz
      Here the first question's information is retrived using getLevel() and set by using setQuestion()
      Remember the default levelNumber =1 
    */
    setIsStart(true)
    setIsDisplayFirst(true)
    const sortedQuestions = sortData()  // =[mainQs, secQs, terQs,quadQ]
    if (sortedQuestions) {
     setAllQuestions(sortedQuestions); // set all available questions
     setLastLayer (sortedQuestions.length)
     setQuestionNumber(1);  // set the question count to 1
      // set the first question
     setQuestion(getLevel(sortedQuestions,levelNumber)) 
    }
  }

  function getLevel(dataArray: any[][],level: number) {
    return dataArray[level-1]
  }

  function setQuestion(dataArray: any[]) {
    setQuestionText(dataArray[questionNumber].question)
    setOptions(dataArray[questionNumber].questionOptions)
    setAnswer(dataArray[questionNumber].questionAnswer)
    setQuestionID(dataArray[questionNumber].questionID)
  }

  function nextQuestions() {
    /*
      After the first question is answered, the student may activate this function by clicking the NEXT button.
      This function will determine the appropriate questions to display based on the previous question's result
      Here the question counter and questions will be updated. The following quetions ware determined here as well
    */
    setIsDisplayFirst(false)
    setIsDisplaySecondAndBeyond(true)
    // Before loading the next questions check if the current question is answered
    if(isAnswered){
      // Increment the question count 
      setQuestionNumber(questionNumber+1)
      // set the previous question id
      setPreviousQuestionsID(current => [ ...current,getIncorrect()])

      // If the question number is equal to the available questions therefore all questions are answered
        // if the current level questions(questions to be displayed) are NOT available (which is likely at the beginning) 
            //  -comapare the question number to the number of available questions(which is likely to be 1 since there is 1 question) 
        // if the current level questions(questions to be displayed) ARE AVAILABLE (which is likely at for beyond the main question)
           //  -comapare the question number to the number of the current level questions(which is likely at the first qurstion beginning) 
      if( (currentLevelQuestions.length ===0)? questionNumber === allQuestions[levelNumber-1].length: questionNumber === currentLevelQuestions.length) {
          // All current level questions are answered, therefore go to the next level and reset question number to 1 
          setLevelNumber(levelNumber=>levelNumber+1)
          setQuestionNumber(1)

          // Reset the current level questions, so we can generate new questions
          setCurrentLevelQuestions([]) 
          // Get all the candidate questions/ possible questions. These will be filtered based on previous questions
          const canidateQuestions = allQuestions[levelNumber] 
          console.log('canidateQuestions',canidateQuestions)
         
          // Quiz Ending conditions
          // quizEndingConditions() 
          // case 1/Best case: Answers the first question correctly
          if( (getIncorrect() === 'empty')  && (levelNumber===FIRST_LAYER ) ){ setEndQuiz(true)
            return
          }

          // case 3/Worst case: Answers the ALL question Incorrectly
          if( (questionNumber === currentLevelQuestions.length) && (levelNumber===LAST_LAYER ) ){setEndQuiz(true)
            return
          } 

          // If there is previous question information
          if(previousQuestionsID.length !=0){
            // Go through all the previous question ids
            const newnew = [...previousQuestionsID,(getIncorrect())].filter((prev:any) =>{
              //edit the previous ids to make comapring easier eg 1.1 becomes 11
              const prevEdited =prev.replace(/[.]/g,'')
              console.log('prev id',prevEdited)

              // Filter through the candidate question ids
              const updated = canidateQuestions.filter((currentQuestionID:any) =>{
                //edit the previous ids to make comapring easier
                // for these ids remove the last character  eg 1.1.1 becomes 11
                const currEdited = currentQuestionID.questionID.replace(/[.]/g,'').substring(0,levelNumber)
                console.log('curr id',currEdited)
                console.log(prevEdited === currEdited)
                // if the ids match, it means candidate question is valid to be added to the new current level questions
                return prevEdited === currEdited
              })
              // Add the valid question to the current level questions
              setCurrentLevelQuestions(current => [ ...current, ...updated]) 
              emptyCollection =[...emptyCollection, ...updated] 
            })
          }else{
            // If there is no previous question information, the candidate questions automatically 
            // becomes the new current level questions
            setCurrentLevelQuestions(canidateQuestions) 
          }   

          // Quiz Ending conditions continued
          // case 2 A mix of correct and incorrect
          if ( (emptyCollection.length ===0) && (levelNumber> FIRST_LAYER )) {setEndQuiz(true)
            return
          }      
        }
        
      setIsAnswered(false)
    } 
  }

 // Evaluate choices
  function checkAnswer(event: React.MouseEvent<HTMLButtonElement> , qid:string, answer:string){
    setIsAnswered(true)
    const selectedAnswer = event.currentTarget.innerText
    if (selectedAnswer === answer) { // correct answer
      console.log('correct answer')
      // If the question is ANSWERED CORRECTLY add empty instead of the question id
      setIncorrectCollection(current =>[...current,'empty'])
    } 
    else{ // incorrect answer
      console.log('incorrect answer')
      // If the question is NOT ANSWERED CORRECTLY add the question id
      setIncorrectCollection(current =>[...current,qid])
    }
  }

  function getIncorrect() {
    // Gets the final choice for that questions
    return incorrectCollection[incorrectCollection.length-1]
  }

  return (
   <>  
      <QuestionCard 
          startQuiz = {startQuiz} 
          allQuestions = {allQuestions}
          questionText = {questionText}
          options = {options}
          questionNumber = {questionNumber}
          levelNumber = {levelNumber}
          checkAnswer= {checkAnswer} 
          nextQuestions= {nextQuestions} 
          currentLevelQuestions ={currentLevelQuestions}
          isDisplayFirst={isDisplayFirst}
          qid ={qid}
          answer ={answer}
          isStart={isStart}
          endQuiz ={endQuiz}
          isDisplaySecondAndBeyond={isDisplaySecondAndBeyond}
      />   
   </>
  )
}

export default Questions;
