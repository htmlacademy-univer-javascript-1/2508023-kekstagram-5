// eslint-disable-next-line no-unused-vars
function checkLength(string, maxLength){
  return maxLength >= string.length;
}

// eslint-disable-next-line no-unused-vars
function checkString(string){
  const newString = string.replaceAll().toLowerCase();
  let emptyString = '';
  for (let i = newString.length - 1; i >= 0;i--){
    emptyString += newString[i];
  }
  return newString === emptyString;
}


// eslint-disable-next-line no-unused-vars
function findNumbers(string){
  let numbers = '';
  for (let i = 0; i <= string.length; i++){
    const number = parseInt(string[i], 10);
    if (!Number.isNaN(number)){
      numbers += number.toString();
    }
  }
  if (Number.isNaN(numbers)){
    return NaN;
  }
  return parseInt(numbers, 10);
}
