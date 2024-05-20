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
export function mergeArraysUnique(...arrays: any[]) {
    function mergeTwoArraysUnique(arr1: any[], arr2: any[]){
        const newArr = arr1.concat(arr2)
        var a = newArr.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    let mergedArrays = arrays[0]
    for(let i = 0; i < arrays.length; i++) {
        const nextArr = arrays[i + 1]
        if(mergedArrays && nextArr) {
            mergedArrays = mergeTwoArraysUnique(mergedArrays, nextArr)
        } else {
            return mergedArrays
        }
    }
}