import {pictures as photos} from './images.js';
import {isEscapeKey} from './util.js';

const commentList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const openElement = document.querySelector('.big-picture');
const closeElement = document.querySelector('.big-picture__cancel');
const pictures = document.querySelector('.pictures');
const fragmentComments = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture() {
  openElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeElement.addEventListener('click', closePicture);


const makeComment = (comment) => {
  const commentLi = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentP = document.createElement('p');
  commentLi.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentImg.width = 35;
  commentImg.height = 35;
  commentP.classList.add('social__text');
  commentP.textContent = comment.message;
  commentLi.append(commentImg);
  commentLi.append(commentP);
  return commentLi;
};

const onPictureClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  const id = pictureElement.querySelector('.picture__img').id;
  const photo = photos[id - 1];
  const bigPicture = document.querySelector('.big-picture__img img');
  if (pictureElement) {
    openElement.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    bigPicture.src = photo.url;
    bigPicture.alt = photo.description;
    document.querySelector('.social__caption').textContent = photo.description;
    document.querySelector('.likes-count').textContent = photo.likes;
    document.querySelector('.comments-count').textContent = photo.comments.length;
    commentList.innerHTML = '';
    photo.comments.forEach((comment) => {
      const commentElement = makeComment(comment);
      fragmentComments.append(commentElement);
    });
    commentList.append(fragmentComments);
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};
pictures.addEventListener('click', onPictureClick);
