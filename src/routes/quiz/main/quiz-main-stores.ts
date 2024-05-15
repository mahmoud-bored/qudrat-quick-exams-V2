import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { QuestionAnswers } from "$lib/databaseInterfaces"

export const questionCounter: Writable<number> = writable(0)
export const questionFontSize: Writable<number> = writable(1)
export const questionAlignment: Writable<string> = writable('row')

export const questionID: Writable<number> = writable()
export const questionParagraph: Writable<string | undefined> = writable(undefined)
export const question: Writable<string> = writable()
export const answers: Writable<QuestionAnswers> = writable({} as QuestionAnswers)
export const correctAnswer: Writable<string> = writable()
export const questionStreak: Writable<number> = writable(0)
export const questionOutTransitionDuration: Writable<number> = writable()
export const questionInTransitionDuration: Writable<number> = writable()

export const streakCounter: Writable<number> = writable(0)
export const correctState: Writable<boolean> = writable(false)
export const incorrectState: Writable<boolean> = writable(false)
export const skipState: Writable<boolean> = writable(false)
export const isQuestionMarked: Writable<boolean> = writable(false)
export const isNextQuestionReady: Writable<boolean> = writable(true)

export const endQuizWarningTab: Writable<boolean> = writable(false)
export const isShowResultsVisible: Writable<boolean> = writable(false)