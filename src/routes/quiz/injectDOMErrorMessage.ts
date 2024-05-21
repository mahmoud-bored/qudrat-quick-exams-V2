import Warning from "./Warning.svelte"
export function injectDOMErrorMessage(message: string, permanent: boolean = false) {
    const warning = new Warning({ target: document.body, props: { message: message, permanent}, intro: true })
}