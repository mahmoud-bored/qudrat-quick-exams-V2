import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { QuestionAnswers } from "$lib/databaseInterfaces"

export const questionCounter: Writable<number> = writable(0)
export const timer: Writable<number> = writable(50)
export const questionFontSize: Writable<number> = writable(1)
export const questionAlignment: Writable<string> = writable('row')

export const questionID: Writable<string> = writable()
export const questionParagraph: Writable<string> = writable()
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

export const endQuizWarningTab: Writable<boolean> = writable(false)