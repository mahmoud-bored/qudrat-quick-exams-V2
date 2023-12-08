import { isQuestionMarked } from './../routes/quiz/main/quiz-main-stores';
export interface Category {
    [categoryID: string]: {
        "name": string,
        "type": string,
    }
}
export interface ParagraphsContainer {
    [paragraphID: string]: {
        "paragraphTitle": string,
        "paragraphText": string,
    }
}
export interface Paragraph {
    "paragraphTitle": string,
    "paragraphText": string,
}
export interface QuestionsContainer {
    [questionID: string]: {
        "answerExplination": string,
        "correctAnswer": string,
        "lastUpdateDate": string,
        "linkedCollections": {
            [collectionID: string]: {
                [examID: string]: number,
            }
        }
        "questionAnswers": {
            0: string,
            1: string,
            2: string,
            3: string,
        }
        "questionCategoryID": string,
        "questionHead": string,
        "questionHint": string,
        "questionParagraphID": string,
        "state": string,
        "isQuestionMarked": boolean
    }
}
export interface Question {
    "answerExplination": string,
    "correctAnswer": string,
    "lastUpdateDate": string,
    "linkedCollections": {
        [collectionID: string]: {
            [examID: string]: number,
        }
    }
    "questionAnswers": {
        0: string,
        1: string,
        2: string,
        3: string,
    }
    "questionCategoryID": string,
    "questionHead": string,
    "questionHint": string,
    "questionParagraphID": string,
    "state": string,
    "isQuestionMarked": boolean
}
export interface QuestionAnswers {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
}
