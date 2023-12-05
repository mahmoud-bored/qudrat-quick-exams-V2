import { writeBatch } from "firebase/firestore";
import { writable } from "svelte/store"
import type { Writable } from "svelte/store";


export interface CollectionContainer {
    [key: string]: {
        'info': {
            'numberOfQuestions': string
            'collectionName': string
            'numberOfExams': string;
        };
        examsOrder: string[]
        'exams': {
            [key: string]: {
                'name': string
                'numberOfQuestions': string
            }
        }
    }
}
export interface Collection {
    'info': Record<string,  { numberOfQuestions: string, collectionName: string, numberOfExams: string; }>;
    examsOrder: string[];
    exams: Record<string, { name: string, numberOfQuestions: string }>
}
export interface CollectionInfo {
    'info': {
        'numberOfQuestions': string
        'collectionName': string
        'numberOfExams': string;
    };
    'examsOrder': string[];
    'exams': {
        [key: string]: {
            'name': string
            'numberOfQuestions': string
        }
    }
}
export interface Exams { [key: string]: Record<string, { name: string, numberOfQuestions: string}> }

export const isExamsCutomizationTabVisible: Writable<boolean> = writable(false)
export const examsCollectionCustomizeTab: Writable<CollectionInfo> = writable({} as CollectionInfo)
export const activeExamsIDs: Writable<string[]> = writable([])
export const globalCollections: Writable<CollectionContainer> = writable({} as CollectionContainer)
export const globalCollectionsOrder: Writable<string[]> = writable([])


export const adminID = 'admin-4b392e66de9fd519d0f567117d06b250'


export const isSelectAllButtonActive: Writable<boolean> = writable(false)
export const maxQuestionAmount: Writable<number> = writable(0)
export const globalQuestionsAmount: Writable<number> = writable(0)
export const questionNoRepeat: Writable<boolean> = writable(true)
export const examTheme: Writable<string> = writable('عادي')
export const isExamCustomized: Writable<boolean> = writable(false)


export const currentQuestionCounter: Writable<number> = writable(1)
export const timer: Writable<number> = writable(50)
export const questionFontSize: Writable<number> = writable(1)
export const questionAlignment: Writable<string> = writable('row')

export const paragraphsObject: Writable<string | null> = writable()
export const questionsObject: Writable<string | null> = writable()
export const categoriesObject: Writable<string | null> = writable()

export const questionsVersion: Writable<string> = writable("")
export const paragraphsVersion: Writable<string> = writable("")
export const categoriesVersion: Writable<string> = writable("")