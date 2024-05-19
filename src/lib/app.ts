export function getHTMLElement(elmnt: Element | null): HTMLElement {
    return elmnt as HTMLElement
}

export function getInnerDimensions(node: HTMLElement) {
    var computedStyle = getComputedStyle(node)

    let width = node.clientWidth // width with padding
    let height = node.clientHeight // height with padding

    height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)
    return { height, width }
}