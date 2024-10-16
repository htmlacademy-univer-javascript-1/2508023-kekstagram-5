const names = ['keks', 'Саша', 'Ваня', 'Настя', 'Яна', 'Гриша', 'Никита', 'Андрей'];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент'];
//Генерирует случайное число из диапазона [a,b]
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
//Создает комментарии к фотографиям
function makeComments(){
  const commentsCount = getRandomInteger(0,30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++){
    const name = names[getRandomInteger(0, names.length - 1)];
    const message = messages[getRandomInteger(0, messages.length - 1)];
    const id = i + 1;
    comments.push({
      id: id,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: name,
    });
  }
  return comments;
}
//Создает массив объектов
// eslint-disable-next-line no-unused-vars
const makePhotoArray = function() {
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
