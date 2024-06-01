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

// source: https://stackoverflow.com/questions/45336281/javascript-find-by-value-deep-in-a-nested-object-array
export function findNestedValue(obj: any, key: any, value: any, baseKey: any = null) {
    // Base case
    if (obj[key] === value) {
        if(baseKey !== null){
            return [obj, baseKey];
        }else {
            return obj
        }
    } else {
        var keys = Object.keys(obj); // add this line to iterate over the keys
    
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]; // use this key for iteration, instead of index "i"
            
            // add "obj[k] &&" to ignore null values
            if (obj[k] && typeof obj[k] == 'object') {
                var found: any = findNestedValue(obj[k], key, value, k);
                if (found) {
                    // If the object was found in the recursive call, bubble it up.
                    if(baseKey !== null){
                        return [found, baseKey];
                    }else {
                        return found
                    }
                }
            }
        }
    }
}