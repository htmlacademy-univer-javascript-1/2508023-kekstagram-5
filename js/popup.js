import { makePhotoArray } from './util';

const pictureTemplate = document.querySelector('#pictures').textContent.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const pictures = makePhotoArray();
const fragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  fragment.append(picture);
});
picturesContainer.append(fragment);
