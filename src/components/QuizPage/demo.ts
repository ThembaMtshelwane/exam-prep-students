// Get elements from HTML
const questions = document.querySelector('#question-n')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const choiceContainer = Array.from(document.querySelectorAll('.choice-container'))
const progressText = document.querySelector('#progressText')
const submitAnswer = document.querySelector('.submit-answer')

// Questions information
let questionsCounter = 0
let acceptAnswers = true
let availableQuestions = []
let availableQuestionsADV =[]
let currQuestions =[{}]
let currentQestion = {}
let newQuestions =[]
let storeQs=[{}]
let allQuestions =[{}]

// Evaluate the answers
let isCorrect = false
let incorrectCollection=[{}]
let storeAllPrevIncorrects =[{}]
let endQuiz = false
let quizResult = [{}]
let score =0
let finalResult ={}

// Counter levels/layers
let levelCounter = 1
let MAX_QUESTIONS = 0
let FIRST_LAYER = 0
let LAST_LAYER = 0

// start the quiz
const startQuiz = (data:any) => {
  allQuestions = data
  questionsCounter = 0
  nextQuestion(1,[],allQuestions)
}


// Get the next questions based on the current level
const getLevelQuestions = (levelIndex:number,allQuestions:any) => {
   return allQuestions[levelIndex-1]
}

const getLevelQuestionsAdvanced = (previousQuestionCollection:any,currentLevel:number,allQuestions:any) => {
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
//   else{
//     availableQuestionsADV = storeQs.filter(function(newQuestion) {
//       return newQuestion !== {}
//   })
//   }

  // empty storage
  storeQs=[]
  newQuestions =[]

  // return questions for next level
  return availableQuestionsADV
}

// Display the next questions
function nextQuestion (levelIndex:number, prevInfo:any,allQuestions:any) {

  const index = prevInfo.indexOf('empty');
  if (index > -1) { // only splice array when item is found
    prevInfo.splice(index, 1); // 2nd parameter means remove one item only
  }

  if(prevInfo.length===0){ 
    questionsCounter++
    availableQuestions = getLevelQuestions(levelIndex,allQuestions)
    MAX_QUESTIONS = availableQuestions.length

    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    currentQestion = availableQuestions[questionsCounter - 1]
    questions.innerText = currentQestion.question
  }else{
    submitQuiz(endQuiz)

    questionsCounter++
    availableQuestions = getLevelQuestionsAdvanced(prevInfo,levelIndex,allQuestions)
    MAX_QUESTIONS = availableQuestions.length
    
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    currentQestion = availableQuestions[questionsCounter - 1]
    questions.innerText = currentQestion.question
  }
  // Display all the choices/options for the current question
  choices.forEach(choice => {
    const number = choice.dataset.number
    choice.innerText = currentQestion['choice' + number]
  })
  acceptAnswers = true
  availableQuestions =[]
}

//End quiz 
function submitQuiz(endQuiz:boolean){
  if(endQuiz){
    finalResult = {
        result :quizResult,
        finalScore: score
    }
     return
  }
}

// Click on the choices
choiceContainer.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptAnswers) { return }

    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.innerText
    checkAnswer(selectedAnswer)
  })
})

// Evaluate choices
function checkAnswer(selectedAnswer:any){
  incorrectCollection=[]
    if (selectedAnswer === currentQestion.answer) { // correct answer
      isCorrect = true
      currentQestion.status = true
      score = score + currQuestions.marks
      console.log('correct answer')
      incorrectCollection.push('empty')
      score = score +currQuestions.marks
    } 
    else{ // incorrect answer
      isCorrect = false
      currentQestion.status = false
      console.log('incorrect answer')
      incorrectCollection.push(currentQestion)
    }
    quizResult.push({
      question:currentQestion.question,
      isCorrect: currQuestions.status       
    })
}

// Submit final answer
submitAnswer.addEventListener('click', e => {
  let level = updateLevel(allQuestions)
  FIRST_LAYER =1
  storeAllPrevIncorrects.push( getInorrect())
  if(storeAllPrevIncorrects[0] ==='empty' && level-1 === FIRST_LAYER ){return}
  nextQuestion(level, storeAllPrevIncorrects,allQuestions) // Load new questions
})

// Get the previous question
function getInorrect () {
  return incorrectCollection[incorrectCollection.length-1]
}

// Move to next level
function updateLevel (allQuestions:any) {

  LAST_LAYER = allQuestions.length
  if (levelCounter> LAST_LAYER) { // if all questions OF THE QUIZ are answered,....
    // end quiz
    return

  } else if (questionsCounter === MAX_QUESTIONS) { // if all questions OF THE LEVEL are answered
    levelCounter++ // move to next level
    currentQestion = {}
    questionsCounter = 0
  }
  return levelCounter
}

export default startQuiz
