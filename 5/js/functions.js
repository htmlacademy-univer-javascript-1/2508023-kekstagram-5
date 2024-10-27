function checkLength(string, maxLength){
  if (maxLength >= string.length){
    return true;
  } else{
    return false;
  }
}
// Cтрока короче 20 символов
// eslint-disable-next-line no-console
console.log(checkLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
// eslint-disable-next-line no-console
console.log(checkLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
// eslint-disable-next-line no-console
console.log(checkLength('проверяемая строка', 10));


function checkString(string){
  const newString = string.replaceAll().toLowerCase();
  let emptyString = '';
  for (let i = newString.length - 1; i >= 0;i--){
    emptyString += newString[i];
  }
  return newString === emptyString;
}
// Строка является палиндромом
// eslint-disable-next-line no-console
console.log(checkString('топот')); // true
// Несмотря на разный регистр, тоже палиндром
// eslint-disable-next-line no-console
console.log(checkString('ДовОд')); // true
// Это не палиндром
// eslint-disable-next-line no-console
console.log(checkString('Кекс')); // false


function findNumbers(string){
  let numbers = '';
  for (let i = 0; i <= string.length; i++){
    // eslint-disable-next-line radix
    const number = parseInt(string[i], 10);
    if (!Number.isNaN(number)){
      // eslint-disable-next-line no-unused-vars
      numbers += number.toString();
    }
  }
  if (Number.isNaN(numbers)){
    return NaN;
  }
  return parseInt(numbers, 10);
}
// eslint-disable-next-line no-console
console.log(findNumbers('2023 год')); // 2023
// eslint-disable-next-line no-console
console.log(findNumbers('ECMAScript 2022')); // 2022
// eslint-disable-next-line no-console
console.log(findNumbers('1 кефир, 0.5 батона')); // 105
// eslint-disable-next-line no-console
console.log(findNumbers('агент 007')); // 7
// eslint-disable-next-line no-console
console.log(findNumbers('а я томат')); // NaN
