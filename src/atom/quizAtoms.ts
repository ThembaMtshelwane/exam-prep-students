import { Timestamp } from '@google-cloud/firestore'

export interface Topic {
  courseCode: string
  lectureID: string
  createdAt: Timestamp
  dueDate: Timestamp
  listOfLearningObjectives: string[]
  numberOfLearningObjectives: string
  topicID: string
}

export interface QuestionTemplate {
  question: string
  fileURL?: string
  questionAnswer: string
  questionID: string
  questionLearningObjectives: string
  questionLevel: number
  questionOptions: string[]
  questionResources?: string[]
  timestamp: Date
}

export interface StudentDataTemplate {
  question: string
  result: string
  resources: string[]
  answer: string
  loText: string
}
