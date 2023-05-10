import { Timestamp } from '@google-cloud/firestore';
import {atom} from 'recoil'

export interface Topic{
    courseCode:string,
    lectureID:string,
    createdAt:Timestamp,
    listOfLearningObjectives:string[],
    numberOfLearningObjectives:string,
    topicID:string,
}

export interface QuestionTemplate{
    question:string,
    questionAnswer:string,
    questionID:string,
    questionLevel:string,
    questionOptions:string[],
    questionResources?:string,
}