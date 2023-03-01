function maskify(string: string): string {
  if (string.length <= 4) {
    return string;
  } else {
    const lastDigits = string.slice(-4);
    const maskedString = lastDigits.padStart(string.length, "#");
    return maskedString;
  }
}

module.exports = maskify;