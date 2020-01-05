function lerp(x1, x2, t) {
    return (1 - t) * x1 + x2 * t;
}

function arrLengthToLetter(length){
    return String.fromCharCode(97 + length)
}
