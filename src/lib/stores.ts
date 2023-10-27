import { writable } from "svelte/store"
import type { Writable } from "svelte/store";
import { data } from '$lib/getCollections.ts'


interface Data {
    [key: string]: {
      info: {
        courseEndDate: string;
        name: string;
        numberOfPaidUsers: string;
        phoneNumber: string;
        totalNumberOfUsers: string;
        signUpDate: string;
        email: string;
        numberOfFreeUsers: string;
      };
      collections: {
        collections: {
          [key: string]: Collection;
        };
        order: string[];
      };
    };
  }
export interface Collection {
    info: Record<string,  { numberOfQuestions: string, collectionName: string, numberOfExams: string; }>;
    examsOrder: string[];
    exams: Record<string, { name: string, numberOfQuestions: string }>
}
export interface Exams { [key: string]: Record<string, { name: string, numberOfQuestions: string}> }

export const isExamsCutomizationTabVisible: Writable<boolean> = writable(false)
export const examsCollectionCustomizeTab: Writable<Collection> = writable({} as Collection)
export const activeExamsIDs: Writable<string[]> = writable([])



const adminID = 'admin-4b392e66de9fd519d0f567117d06b250'
export const collections = data?.[adminID]['collections']['collections']
export const collectionsOrder = data?.[adminID]['collections']['order']

export const isSelectAllButtonActive: Writable<boolean> = writable(false)
export const maxQuestionAmount: Writable<number> = writable(0)
