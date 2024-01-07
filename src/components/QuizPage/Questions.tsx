import { QuestionTemplate, StudentDataTemplate } from '@/src/atom/quizAtoms'
import React, { useEffect, useState } from 'react'
import Results from '../Results/Results'

import QuestionCard from './QuestionCard'

type QuestionsProps = {
  // Here are the questions from the database
  questions: QuestionTemplate[]
  topicName: string
}

const Questions: React.FC<QuestionsProps> = ({ questions, topicName }) => {
  // Used to set the state for all available questions
  const [allQuestions, setAllQuestions] = useState<
    Array<Array<QuestionTemplate>>
  >([[]])

  // Used to set the question count eg, 1 of ...
  const [questionNumber, setQuestionNumber] = useState<number>(0)

  // Used to set the level of each question. eg level 1 will show the first question
  const [levelNumber, setLevelNumber] = useState(1)

  const [firstQuestionData, setFirstQuestionData] = useState<QuestionTemplate>({
    question: '',
    fileURL: '',
    questionOptions: ['', '', '', ''],
    questionAnswer: '',
    questionID: '',
    questionLearningObjectives: '',
    questionResources: ['', '', '', ''],
    questionLevel: 1,
    timestamp: new Date('1999-03-01'),
  })

  // Used to get the previous question information ( question id) and stores it
  const [previousQuestionsID, setPreviousQuestionsID] = useState<string[]>([])
  const [data, setData] = useState<StudentDataTemplate[]>([])
  const [incorrectCollection, setIncorrectCollection] = useState<string[]>([])
  const [studentResultsData, setStudentResultsData] = useState<
    StudentDataTemplate[]
  >([])

  // Used as a collection of the following questions
  const [currentLevelQuestions, setCurrentLevelQuestions] = useState<
    QuestionTemplate[]
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
  let emptyCollection: QuestionTemplate[] = []

  //Process the questions => Arrange according to levels
  function sortData() {
    if (questions.length === 0) {
      // console.log('Questions do not exist')
      return []
    }
    const mainQs: QuestionTemplate[] = [] // Stores level 1 questions
    const secQs: QuestionTemplate[] = [] // Stores level 2 questions
    const terQs: QuestionTemplate[] = [] // Stores level 3 questions
    const quadQ: QuestionTemplate[] = [] // Stores level 4 questions

    questions.forEach((q: QuestionTemplate) => {
      if (q.questionLevel === 1) {
        mainQs.push(q) // add one question [{..}]
      } else if (q.questionLevel === 2) {
        secQs.push(q) // add two questions [{..},{..}]
      } else if (q.questionLevel === 3) {
        terQs.push(q) // add four questions [{..},{..},{..},{..}]
      } else if (q.questionLevel === 4) {
        quadQ.push(q) // add eight questions [{..},{..},{..},{..},{..},{..},{..},{..}]
      }
    })
    return [mainQs, secQs, terQs, quadQ]
  }

  // This useEffect will trigger when 'questions' state changes
  useEffect(() => {
    /*
      Here the first question's information is retrieved using getLevel() and set by using setQuestion()
      Remember the default levelNumber =1 
    */
    const sortedQuestions = sortData() // =[mainQs, secQs, terQs,quadQ]
    if (sortedQuestions) {
      setAllQuestions(sortedQuestions)
      setAllQuestions(sortedQuestions) // set all available questions
      setLastLayer(sortedQuestions.length)
      setQuestionNumber(1) // set the question count to 1
      // set the first question
      setFirstQuestion(getLevel(sortedQuestions, levelNumber))
    }
  }, [questions])

  function startQuiz() {
    setIsStart(true)
    setIsDisplayFirst(true)
  }

  function getLevel(dataArray: QuestionTemplate[][], level: number) {
    return dataArray[level - 1]
  }

  function setFirstQuestion(dataArray: QuestionTemplate[]) {
    setFirstQuestionData({
      question: dataArray[questionNumber].question,
      fileURL: dataArray[questionNumber].fileURL
        ? dataArray[questionNumber].fileURL
        : '',
      questionOptions: dataArray[questionNumber].questionOptions,
      questionAnswer: dataArray[questionNumber].questionAnswer,
      questionID: dataArray[questionNumber].questionID,
      questionLearningObjectives:
        dataArray[questionNumber].questionLearningObjectives,
      questionResources: dataArray[questionNumber].questionResources
        ? dataArray[questionNumber].questionResources
        : ['', '', '', ''],
      questionLevel: dataArray[questionNumber].questionLevel,
      timestamp: dataArray[questionNumber].timestamp,
    })
  }

  function incrementQuestionCount() {
    // Increment the question count
    setQuestionNumber(questionNumber + 1)
    // set the previous question id / keep track of the previous question
    setPreviousQuestionsID((current) => [...current, getIncorrect()])
    setData((current) => [...current, studentResults()])
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
      incrementQuestionCount()
      // If the question number is equal to the available questions therefore all questions are answered
      // if the current level questions(questions to be displayed) are NOT available (which is likely at the beginning)
      //  -compare the question number to the number of available questions(which is likely to be 1 since there is 1 question)
      // if the current level questions(questions to be displayed) ARE AVAILABLE (which is likely at for beyond the main question)
      //  -compare the question number to the number of the current level questions(which is likely at the first question beginning)
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
        const candidateQuestions = allQuestions[levelNumber]

        // Quiz Ending conditions
        // case 1/Best case: Answers the first question correctly
        if (getIncorrect() === 'empty' && levelNumber === FIRST_LAYER) {
          setEndQuiz(true)
          return
        }

        // case 2/Worst case: Answers the ALL question Incorrectly
        if (
          questionNumber === currentLevelQuestions.length &&
          levelNumber === LAST_LAYER
        ) {
          setEndQuiz(true)
          return
        }

        // If there is previous question information
        if (previousQuestionsID.length != 0) {
          // Go through all the previous question ids
          const newnew = [...previousQuestionsID, getIncorrect()].filter(
            (prev: string) => {
              //edit the previous ids to make comparing easier e.g. 1.1 becomes 11
              const prevEdited = prev.replace(/[.]/g, '')

              // Filter through the candidate question ids
              const updated = candidateQuestions.filter(
                (currentQuestionID: QuestionTemplate) => {
                  //edit the previous ids to make comparing easier
                  // for these ids remove the last character  eg 1.1.1 becomes 11
                  const currEdited = currentQuestionID.questionID
                    .replace(/[.]/g, '')
                    .substring(0, levelNumber)
                  // if the ids match, it means candidate question is valid to be added to the new current level questions
                  return prevEdited === currEdited
                }
              )
              // Add the valid question to the current level questions
              setCurrentLevelQuestions((current) => [...current, ...updated])
              emptyCollection = [...emptyCollection, ...updated]
            }
          )
        } else {
          // If there is no previous question information, the candidate questions automatically
          // becomes the new current level questions
          setCurrentLevelQuestions(candidateQuestions)
        }

        // Quiz Ending conditions continued
        // case 2: A mix of correct and incorrect
        if (emptyCollection.length === 0 && levelNumber > FIRST_LAYER) {
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
      // If the question is NOT ANSWERED CORRECTLY add the question id
      setIncorrectCollection((current) => [...current, id])
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

  // console.log('currentLevelQuestions', currentLevelQuestions)

  return (
    <>
      <QuestionCard
        startQuiz={startQuiz}
        allQuestions={allQuestions}
        questionNumber={questionNumber}
        levelNumber={levelNumber}
        checkAnswer={checkAnswer}
        nextQuestions={nextQuestions}
        currentLevelQuestions={currentLevelQuestions}
        isDisplayFirst={isDisplayFirst}
        isStart={isStart}
        isDisplaySecondAndBeyond={isDisplaySecondAndBeyond}
        endQuiz={endQuiz}
        firstQuestionData={firstQuestionData}
      />
      <Results endQuiz={endQuiz} data={data} topicID={topicName} />
    </>
  )
}

export default Questions
