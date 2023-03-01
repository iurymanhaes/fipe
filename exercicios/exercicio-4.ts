

function checkIfTheFirstLetterIsUppercase(word: string): boolean {
  const firstLetterRegex: RegExp = /^[A-Z].*$/;
  if (!firstLetterRegex.test(word)) {
    return false;
  }

  if (word.length > 0) {
    const firstLetter: string = word.charAt(0);
    return firstLetter === firstLetter.toUpperCase();
  }
  return false;
}


module.exports = checkIfTheFirstLetterIsUppercase;
