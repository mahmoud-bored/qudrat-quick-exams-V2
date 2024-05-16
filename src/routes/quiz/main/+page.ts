import { isExamCustomized } from "$lib/stores"
import { redirect } from "@sveltejs/kit"

export function load() {
    isExamCustomized.subscribe((value) => {
        if(!value) throw redirect(308, '/quiz')
    })()
}