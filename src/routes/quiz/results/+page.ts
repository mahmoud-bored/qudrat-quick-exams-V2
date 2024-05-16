import { redirect } from "@sveltejs/kit";
import { generalCurrentQuestionsMap } from "../quiz-stores";

export function load() {
    generalCurrentQuestionsMap.subscribe((value) => {
        if(!value?.size) throw redirect(308, '/quiz')
    })()
}