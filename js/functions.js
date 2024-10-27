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
