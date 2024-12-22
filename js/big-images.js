import {pictures as photos} from './api.js';
import {isEscapeKey} from './util.js';

const COMMENTS_TO_LOAD_COUNT = 5;

const commentList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const openElement = document.querySelector('.big-picture');
const closeElement = document.querySelector('.big-picture__cancel');
const pictures = document.querySelector('.pictures');
const loadMoreButton = document.querySelector('.social__comments-loader');
const commentCount = document.querySelector('.social__comment-count');
let uploadedComments = COMMENTS_TO_LOAD_COUNT;
let photoItem;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

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

const onLoadMore = (evt) => {
  evt.preventDefault();
  const maxCommentsToLoad = Math.min(photoItem.comments.length, uploadedComments + COMMENTS_TO_LOAD_COUNT);
  photoItem.comments.slice(uploadedComments, maxCommentsToLoad).forEach((comment) => {
    commentList.append(makeComment(comment));
  });
  uploadedComments = maxCommentsToLoad;
  commentCount.textContent = `${uploadedComments} из ${photoItem.comments.length} комментариев`;
  if (uploadedComments >= photoItem.comments.length) {
    loadMoreButton.classList.add('hidden');
  }
};

function closePicture() {
  openElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPictureClick = (evt) => {
  const picture = evt.target.closest('.picture');
  if (picture !== null){
    const pictureId = parseInt(picture.querySelector('.picture__img').id, 10);
    const photo = photos[pictureId];
    const bigPictureElement = document.querySelector('.big-picture__img img');
    if (picture) {
      photoItem = photo;
      uploadedComments = COMMENTS_TO_LOAD_COUNT;
      openElement.classList.remove('hidden');
      body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
      bigPictureElement.src = photo.url;
      bigPictureElement.alt = photo.description;
      document.querySelector('.social__caption').textContent = photo.description;
      document.querySelector('.likes-count').textContent = photo.likes;

      if (photo.comments.length <= uploadedComments){
        uploadedComments = photo.comments.length;
      }

      commentCount.textContent = `${uploadedComments} из ${photo.comments.length} комментариев`;
      commentList.innerHTML = '';

      if (photo.comments.length <= COMMENTS_TO_LOAD_COUNT) {
        photo.comments.forEach((comment) => {
          commentList.append(makeComment(comment));
        });

        loadMoreButton.classList.add('hidden');

      } else {
        photo.comments.slice(0, COMMENTS_TO_LOAD_COUNT).forEach((comment) => {
          commentList.append(makeComment(comment));
        });
        loadMoreButton.classList.remove('hidden');
      }
      loadMoreButton.addEventListener('click', onLoadMore);
    }
  }
};
pictures.addEventListener('click', onPictureClick);
