import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { QuestionAnswers } from "$lib/databaseInterfaces"

export const questionID: Writable<string> = writable()
export const questionParagraph: Writable<string> = writable()
export const question: Writable<string> = writable()
export const answers: Writable<QuestionAnswers> = writable({} as QuestionAnswers)
export const correctAnswer: Writable<string> = writable()
export const currentQuestionID: Writable<string> = writable()

export const questionCounter: Writable<number> = writable(0)
export const correctState: Writable<boolean> = writable(false)
export const incorrectState: Writable<boolean> = writable(false)
export const skipState: Writable<boolean> = writable(false)