import { writable } from "svelte/store"
import type { Writable } from "svelte/store";
import { data } from '$lib/getData'



export interface Collection {
    info: Record<string,  { numberOfQuestions: string, collectionName: string, numberOfExams: string; }>;
    examsOrder: string[];
    exams: Record<string, { name: string, numberOfQuestions: string }>
}
export interface Exams { [key: string]: Record<string, { name: string, numberOfQuestions: string}> }

export const isExamsCutomizationTabVisible: Writable<boolean> = writable(false)
export const examsCollectionCustomizeTab: Writable<Collection> = writable({} as Collection)
export const activeExamsIDs: Writable<string[]> = writable([])



export const adminID = 'admin-4b392e66de9fd519d0f567117d06b250'
export const collections = data?.[adminID]['collections']['collections']
export const collectionsOrder = data?.[adminID]['collections']['order']

export const isSelectAllButtonActive: Writable<boolean> = writable(false)
export const maxQuestionAmount: Writable<number> = writable(0)
export const globalQuestionsAmount: Writable<number> = writable(0)
export const questionNoRepeat: Writable<boolean> = writable(true)
export const examTheme: Writable<string> = writable('عادي')
export const warningMessage: Writable<string> = writable('')
export const isExamCustomized: Writable<boolean> = writable(false)


export const paragraphsObject: Writable<object> = writable({})
export const questionsObjs: Writable<object> = writable({})
export const currentQuestionCounter: Writable<number> = writable(1)
export const timer: Writable<number> = writable(50)
export const questionFontSize: Writable<number> = writable(1)
export const questionAlignment: Writable<string> = writable('row')