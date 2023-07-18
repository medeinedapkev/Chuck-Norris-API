export function firstLetterUpperCase(string) {
    let firstLetter = string.at(0).toUpperCase();
    let restOfString = string.slice(1);
    let output = firstLetter + restOfString;

    return output;
}