const changeToMinutes = (time) =>{
  const newTime = time.split(':').map(Number);
  return newTime[0] * 60 + newTime[1];

};

// eslint-disable-next-line no-unused-vars
const checkMeetingTime = (dayTimeStart, dayTimeEnd, startTime, duration) =>{
  // eslint-disable-next-line no-unused-vars
  const dayStartInMinutes = changeToMinutes(dayTimeStart);
  const dayEndInMinutes = changeToMinutes(dayTimeEnd);
  const startTimeInMinutes = changeToMinutes(startTime);
  const endTimeInMinutes = startTimeInMinutes + duration;
  return dayStartInMinutes <= startTimeInMinutes && dayEndInMinutes >= endTimeInMinutes;
};

// eslint-disable-next-line no-console
console.log(checkMeetingTime('08:00', '17:30', '14:00', 90)); // true
// eslint-disable-next-line no-console
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));// true
// eslint-disable-next-line no-console
console.log(checkMeetingTime('08:00', '14:30', '14:00', 90)); // false
// eslint-disable-next-line no-console
console.log(checkMeetingTime('14:00', '17:30', '08:0', 90));// false
// eslint-disable-next-line no-console
console.log(checkMeetingTime('8:00', '17:30', '08:00', 900)); // false
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
