const extractStr = (str) => {
    let array = []
    array.push(str.substring(str.indexOf(':') + 1, str.indexOf('.')))
    str = str.substring(str.indexOf('.') + 1)
    if (str.indexOf('.')) {
        return extractStr(str)
    } else {
        return array
    }

}

console.log(extractStr('My name is:Jerry. My age is:12.'))