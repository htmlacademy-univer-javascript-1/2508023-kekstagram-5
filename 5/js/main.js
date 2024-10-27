// eslint-disable-next-line no-unused-vars
import './util.js';
import './data.js';
/*
const NAMES = ['keks', 'Саша', 'Ваня', 'Настя', 'Яна', 'Гриша', 'Никита', 'Андрей'];
// eslint-disable-next-line no-unused-vars
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент'];
export {NAMES, MESSAGES};

import {NAMES, MESSAGES} from './data.js';
//Генерирует случайное число из диапазона [a,b]
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Создает комментарии к фотографиям
const makeComments = () => {
  const commentsCount = getRandomInteger(0,30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++){
    const name = NAMES[getRandomInteger(0, NAMES.length - 1)];
    const message = MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
    const id = i + 1;
    comments.push({
      id: id,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: name,
    });
  }
  return comments;
};
//Создает массив объектов
// eslint-disable-next-line no-unused-vars
const makePhotoArray = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++){
    photos.push({
      id:i,
      url:`photos/${i}.jpg`,
      description:`Описание ${i} фотографии.`,
      likes: getRandomInteger(15, 200),
      comments:makeComments()
    });
  }
  return photos;
};
export{makePhotoArray};
*/
