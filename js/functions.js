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


// eslint-disable-next-line no-unused-vars
function checkLength(string, maxLength){
  if (maxLength >= string.length){
    return true;
  } else{
    return false;
  }
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
