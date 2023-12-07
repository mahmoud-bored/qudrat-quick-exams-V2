import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { QuestionAnswers } from "$lib/databaseInterfaces"

export const questionParagraph: Writable<string> = writable()
export const question: Writable<string> = writable()
export const answers: Writable<QuestionAnswers> = writable({} as QuestionAnswers)
export const correctAnswer: Writable<string> = writable()
export const currentQuestionID: Writable<string> = writable()