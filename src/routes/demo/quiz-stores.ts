import type { QuestionsContainer, Question } from "$lib/databaseInterfaces"
import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export const generalCurrentQuestionsMap: Writable<Map<number, QuestionsContainer>> = writable()
export const totalTimer: Writable<number> = writable(0)
export const timer: Writable<number> = writable(50)

export const generalAllQuestionsMap: Writable<Map<number, Question>> = writable(new Map())
export const generalCorrectQuestionsMap: Writable<Map<number, Question>> = writable(new Map())
export const generalIncorrectQuestionsMap: Writable<Map<number, Question>> = writable(new Map())
export const generalSkippedQuestionsMap: Writable<Map<number, Question>> = writable(new Map())
export const generalMarkedQuestionsMap: Writable<Map<number, Question>> = writable(new Map())