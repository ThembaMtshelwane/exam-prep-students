import { Timestamp } from '@google-cloud/firestore'
import { atom } from 'recoil'

export interface Topic {
  courseCode: string
  lectureID: string
  createdAt: Timestamp
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
  timestamp: any
}

export interface StudentDataTemplate {
  question: string
  result: string
  resources: string[]
  answer: string
  loText: string
}
