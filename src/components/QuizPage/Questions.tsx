import { QuestionTemplate } from '@/src/atom/quizAtoms'
import React, { useState } from 'react'
import Results from '../Results/Results'

import QuestionCard from './QuestionCard'

type QuestionsProps = {
  // Here are the questions from the database
  questions: QuestionTemplate[]
  topicName: string
}

const Questions: React.FC<QuestionsProps> = ({ questions, topicName }) => {
  // Used to set the state for all available questions
  const [allQuestions, setAllQuestions] = useState<Array<Array<any>>>([[]])

  // Used to set the question count eg, 1 of ...
  const [questionNumber, setQuestionNumber] = useState<number>(0)

  // Used to set the level of each question. eg level 1 will show the first question
  const [levelNumber, setLevelNumber] = useState(1)

  // Used to set the first question data. From the text, options, question id and answer
  const [questionText, setQuestionText] = useState<string>('')
  const [file, setQuestionFile] = useState<string>('')
  const [options, setOptions] = useState<string[]>(['', '', '', ''])
  const [qid, setQuestionID] = useState<string>('')
  const [answer, setAnswer] = useState('')
  const [loText, setQuestionLO] = useState<string>('')
  const [questionResources, setQuestionResources] = useState<string[]>(['', '', '', ''])

  // Used to get the previous question information ( question id) and stores it
  const [previousQuestionsID, setPreviousQuestionsID] = useState<string[]>([])
  const [data, setData] = useState<any[]>([{}])
  const [incorrectCollection, setIncorrectCollection] = useState<string[]>([])
  const [studentResultsData, setStudentResultsData] = useState<any[]>([{}])

  // Used as a collection of the following questions
  const [currentLevelQuestions, setCurrentLevelQuestions] = useState<
    Array<any>
  >([])
  //*************************
  // Boolean values used to render a specific output
  const [isDisplayFirst, setIsDisplayFirst] = useState<boolean>(false)
  const [isDisplaySecondAndBeyond, setIsDisplaySecondAndBeyond] =
    useState<boolean>(false)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [endQuiz, setEndQuiz] = useState<boolean>(false)
  // Used to allow the student to answer the current question before going to the next
  const [isAnswered, setIsAnswered] = useState<boolean>(true)

  const [LAST_LAYER, setLastLayer] = useState<number>(0)
  const FIRST_LAYER = 1
  let emptyCollection: any[] = []

  //Process the questions => Arrange according to levels
  function sortData() {
    if (questions.length === 0) {
      // console.log('Questions do not exist')
      return
    }
    const mainQs: any[] = [] // Stores level 1 questions
    const secQs: any[] = [] // Stores level 2 questions
    const terQs: any[] = [] // Stores level 3 questions
    const quadQ: any[] = [] // Stores level 4 questions

    questions.forEach((q: any) => {
      if (q.questionLevel === 1) {
        mainQs.push(q)
      } else if (q.questionLevel === 2) {
        secQs.push(q)
      } else if (q.questionLevel === 3) {
        terQs.push(q)
      } else if (q.questionLevel === 4) {
        quadQ.push(q)
      }
    })
    return [mainQs, secQs, terQs, quadQ]
  }

  // Start Quiz
  function startQuiz() {
    /*
      This function is called when the START button is pressed and starts the quiz
      Here the first question's information is retrieved using getLevel() and set by using setQuestion()
      Remember the default levelNumber =1 
    */
    setIsStart(true)
    setIsDisplayFirst(true)
    const sortedQuestions = sortData() // =[mainQs, secQs, terQs,quadQ]
    // console.log('sorted questions', sortedQuestions)
    if (sortedQuestions) {
      setAllQuestions(sortedQuestions) // set all available questions
      setLastLayer(sortedQuestions.length)
      setQuestionNumber(1) // set the question count to 1
      // set the first question
      setQuestion(getLevel(sortedQuestions, levelNumber))
    }
  }

  function getLevel(dataArray: any[][], level: number) {
    return dataArray[level - 1]
  }

  function setQuestion(dataArray: any[]) {
    setQuestionText(dataArray[questionNumber].question)
    setQuestionFile(dataArray[questionNumber].fileURL)
    setOptions(dataArray[questionNumber].questionOptions)
    setAnswer(dataArray[questionNumber].questionAnswer)
    setQuestionID(dataArray[questionNumber].questionID)
    setQuestionLO(dataArray[questionNumber].questionLearningObjectives)
    setQuestionResources(dataArray[questionNumber].questionResources)
  }

  function nextQuestions() {
    /*
      After the first question is answered, the student may activate this function by clicking the NEXT button.
      This function will determine the appropriate questions to display based on the previous question's result
      Here the question counter and questions will be updated. The following questions are determined here as well
    */
    setIsDisplayFirst(false) // remove the first question from view
    setIsDisplaySecondAndBeyond(true) // show the second level and beyond

    // Before loading the next questions check if the current question is answered
    if (isAnswered) {
      // Increment the question count
      setQuestionNumber(questionNumber + 1)
      // set the previous question id
      setPreviousQuestionsID((current) => [...current, getIncorrect()])
      setData((current) => [...current, studentResults()])

      // If the question number is equal to the available questions therefore all questions are answered
      // if the current level questions(questions to be displayed) are NOT available (which is likely at the beginning)
      //  -compare the question number to the number of available questions(which is likely to be 1 since there is 1 question)
      // if the current level questions(questions to be displayed) ARE AVAILABLE (which is likely at for beyond the main question)
      //  -compare the question number to the number of the current level questions(which is likely at the first qurstion beginning)
      if (
        currentLevelQuestions.length === 0
          ? questionNumber === allQuestions[levelNumber - 1].length
          : questionNumber === currentLevelQuestions.length
      ) {
        // All current level questions are answered, therefore go to the next level and reset question number to 1
        setLevelNumber((levelNumber) => levelNumber + 1)
        setQuestionNumber(1)

        // Reset the current level questions, so we can generate new questions
        setCurrentLevelQuestions([])
        // Get all the candidate questions/ possible questions. These will be filtered based on previous questions
        const canidateQuestions = allQuestions[levelNumber]
        // console.log('canidateQuestions', canidateQuestions)

        // Quiz Ending conditions
        // quizEndingConditions()
        // case 1/Best case: Answers the first question correctly
        if (getIncorrect() === 'empty' && levelNumber === FIRST_LAYER) {
          setEndQuiz(true)
          // console.log('Best case END')
          return
        }

        // case 3/Worst case: Answers the ALL question Incorrectly
        if (
          questionNumber === currentLevelQuestions.length &&
          levelNumber === LAST_LAYER
        ) {
          setEndQuiz(true)
          // console.log('Worst case END')
          return
        }

        // If there is previous question information
        if (previousQuestionsID.length != 0) {
          // console.log('previousQuestionsID', previousQuestionsID)
          // console.log('getIncorrect()', getIncorrect())
          // Go through all the previous question ids
          const newnew = [...previousQuestionsID, getIncorrect()].filter(
            (prev: string) => {
              //edit the previous ids to make comparing easier eg 1.1 becomes 11
              // console.log('prev', prev)
              const prevEdited = prev.replace(/[.]/g, '')
              // console.log('prev id', prevEdited)

              // Filter through the candidate question ids
              const updated = canidateQuestions.filter(
                (currentQuestionID: any) => {
                  //edit the previous ids to make comparing easier
                  // for these ids remove the last character  eg 1.1.1 becomes 11
                  const currEdited = currentQuestionID.questionID
                    .replace(/[.]/g, '')
                    .substring(0, levelNumber)
                  // console.log('curr id', currEdited)
                  // console.log(prevEdited === currEdited)
                  // if the ids match, it means candidate question is valid to be added to the new current level questions
                  return prevEdited === currEdited
                }
              )
              // console.log('updated', updated)

              // Add the valid question to the current level questions
              setCurrentLevelQuestions((current) => [...current, ...updated])
              emptyCollection = [...emptyCollection, ...updated]
            }
          )
        } else {
          // If there is no previous question information, the candidate questions automatically
          // becomes the new current level questions
          setCurrentLevelQuestions(canidateQuestions)
        }

        // Quiz Ending conditions continued
        // case 2: A mix of correct and incorrect
        if (emptyCollection.length === 0 && levelNumber > FIRST_LAYER) {
          // console.log('A mix END')
          setEndQuiz(true)
          return
        }
      }

      setIsAnswered(false)
    }
  }

  // Evaluate choices
  function checkAnswer(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
    answer: string,
    q: string,
    loText: string,
    resourceList: string[]
  ) {
    setIsAnswered(true)
    const selectedAnswer = event.currentTarget.innerText
    if (selectedAnswer === answer) {
      // correct answer
      // console.log('correct answer')
      // If the question is ANSWERED CORRECTLY add empty instead of the question id
      setIncorrectCollection((current) => [...current, 'empty'])
      setStudentResultsData((current) => [
        ...current,
        {
          question: q,
          result: 'correct',
          resources: [''],
          answer: answer,
          loText: loText,
        },
      ])
    } else {
      // incorrect answer
      // console.log('incorrect answer')
      // console.log('qid from incorrect answer',id)
      // If the question is NOT ANSWERED CORRECTLY add the question id
      setIncorrectCollection((current) => [...current, id])
      // console.log('resource from incorrect answer NONE GIVEN', resourceList)
      setStudentResultsData((current) => [
        ...current,
        {
          question: q,
          result: 'wrong',
          resources: resourceList ? resourceList : ['', '', '', ''],
          answer: answer,
          loText: loText,
        },
      ])
    }
  }

  function getIncorrect() {
    // Gets the final choice for that questions
    return incorrectCollection[incorrectCollection.length - 1]
  }

  const studentResults = () => {
    return studentResultsData[studentResultsData.length - 1]
  }

  return (
    <>
      <QuestionCard
        startQuiz={startQuiz}
        allQuestions={allQuestions}
        questionText={questionText}
        fileURL={file}
        options={options}
        questionNumber={questionNumber}
        levelNumber={levelNumber}
        checkAnswer={checkAnswer}
        nextQuestions={nextQuestions}
        currentLevelQuestions={currentLevelQuestions}
        isDisplayFirst={isDisplayFirst}
        qid={qid}
        answer={answer}
        isStart={isStart}
        isDisplaySecondAndBeyond={isDisplaySecondAndBeyond}
        endQuiz={endQuiz}
        loText={loText}
        questionResources={ questionResources ? questionResources : ['', '', '', '']}
      />
      <Results endQuiz={endQuiz} data={data} topicID={topicName} />
    </>
  )
}

export default Questions
