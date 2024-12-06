import {NAMES, MESSAGES} from './data.js';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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

const isEscapeKey = (evt) => evt.key === 'Escape';

export {makePhotoArray, isEscapeKey};
