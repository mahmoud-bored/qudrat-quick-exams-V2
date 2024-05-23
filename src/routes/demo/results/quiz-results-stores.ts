import { writable, type Writable } from "svelte/store";

export const activeQuestionsSection: Writable<string> = writable('all')
export const closeAllQuestionCards: Writable<boolean> = writable(false)