import Warning from "./Warning.svelte"
export function injectDOMErrorMessage(message: string){
    const warning = new Warning({ target: document.body, props: { message: message}, intro: true })
}