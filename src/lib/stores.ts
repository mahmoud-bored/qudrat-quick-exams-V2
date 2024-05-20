import { writeBatch } from "firebase/firestore";
import { writable } from "svelte/store"
import type { Writable } from "svelte/store";
import type { CategoriesContainer, ParagraphsContainer, QuestionsContainer } from "./databaseInterfaces";


export interface CollectionsContainer {
    [key: string]: Collection
}
export interface Collection {
    info: { 
        numberOfQuestions: number, 
        numberOfExams: number, 
        collectionName: string, 
    };
    examsOrder: number[];
    exams: Record<number, { 
        name: string, 
        numberOfQuestions: number 
    }>
}
export interface CollectionInfo {
    'info': {
        'numberOfQuestions': number
        'numberOfExams': number;
        'collectionName': string
    };
    'examsOrder': number[];
    'exams': {
        [key: number]: {
            'name': string
            'numberOfQuestions': number
        }
    }
}
export type Exams = Record<number, { name: string, numberOfQuestions: number}>

export const featureFlags: Writable<{ [key: string]: boolean }> = writable({})

export const isExamsCutomizationTabVisible: Writable<boolean> = writable(false)
export const examsCollectionCustomizeTab: Writable<{ [collectionID: number]: CollectionInfo }> = writable({})
export const activeExamsIDs: Writable<{ [collectionID: number]: number[] }> = writable({})
export const globalCollections: Writable<CollectionsContainer> = writable({} as CollectionsContainer)
export const globalCollectionsOrder: Writable<number[]> = writable([])


export const adminID = 'admin-4b392e66de9fd519d0f567117d06b250'


export const maxQuestionAmount: Writable<number> = writable(0)
export const globalQuestionsAmount: Writable<number> = writable(0)
export const questionNoRepeat: Writable<boolean> = writable(true)
export const examTheme: Writable<string> = writable('عادي')
export const isExamCustomized: Writable<boolean> = writable(false)

export const paragraphsObject: Writable<ParagraphsContainer> = writable()
export const questionsObject: Writable<QuestionsContainer> = writable()
export const categoriesObject: Writable<CategoriesContainer> = writable()

export const questionsVersion: Writable<string> = writable("")
export const paragraphsVersion: Writable<string> = writable("")
export const categoriesVersion: Writable<string> = writable("")