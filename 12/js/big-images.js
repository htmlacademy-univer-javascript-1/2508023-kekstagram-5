import {pictures as photos} from './images.js';
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
  const commentLiElement = document.createElement('li');
  const commentImgElement = document.createElement('img');
  const commentPElement = document.createElement('p');
  commentLiElement.classList.add('social__comment');
  commentImgElement.classList.add('social__picture');
  commentImgElement.src = comment.avatar;
  commentImgElement.alt = comment.name;
  commentImgElement.width = 35;
  commentImgElement.height = 35;
  commentPElement.classList.add('social__text');
  commentPElement.textContent = comment.message;
  commentLiElement.append(commentImgElement);
  commentLiElement.append(commentPElement);
  return commentLiElement;
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
  const pictureElement = evt.target.closest('.picture');
  const idElement = pictureElement.querySelector('.picture__img').id;
  const photo = photos[idElement - 1];
  const bigPictureElement = document.querySelector('.big-picture__img img');
  if (pictureElement) {
    photoItem = photo;
    uploadedComments = COMMENTS_TO_LOAD_COUNT;
    openElement.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureElement.src = photo.url;
    bigPictureElement.alt = photo.description;
    document.querySelector('.social__caption').textContent = photo.description;
    document.querySelector('.likes-count').textContent = photo.likes;
    document.querySelector('.comments-count').textContent = photo.comments.length;
    commentList.innerHTML = '';
    if (photo.comments.length <= COMMENTS_TO_LOAD_COUNT) {
      photo.comments.forEach((comment) => {
        commentList.append(makeComment(comment));
      });
      loadMoreButton.classList.remove('hidden');

    } else {
      photo.comments.slice(0, COMMENTS_TO_LOAD_COUNT).forEach((comment) => {
        commentList.append(makeComment(comment));
      });
      loadMoreButton.classList.remove('hidden');
    }
    loadMoreButton.addEventListener('click', onLoadMore);
  }
};
pictures.addEventListener('click', onPictureClick);
