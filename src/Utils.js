export function rand(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function map(min, max, newMin, newMax, value) {
    return newMin + (value - min) * (newMax - newMin) / (max - min);
}