import { pictures as photos } from './images.js';
import { isEscapeKey } from './util.js';

const COMMENTS_TO_LOAD_COUNT = 5;

const commentList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const pictureContainer = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
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

closeButton.addEventListener('click', closePicture);

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

const onLoadMoreButtonClick = (evt) => {
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
  pictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const loadComments = (photo) => {
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
};

const onPictureClick = (evt) => {
  const picture = evt.target.closest('.picture');

  if (picture !== null){
    const pictureId = parseInt(picture.querySelector('.picture__img').id, 10);
    const photo = photos[pictureId];
    const bigPicture = document.querySelector('.big-picture__img img');

    if (picture) {
      photoItem = photo;
      uploadedComments = COMMENTS_TO_LOAD_COUNT;
      pictureContainer.classList.remove('hidden');
      body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
      bigPicture.src = photo.url;
      bigPicture.alt = photo.description;
      document.querySelector('.social__caption').textContent = photo.description;
      document.querySelector('.likes-count').textContent = photo.likes;

      if (photo.comments.length <= uploadedComments){
        uploadedComments = photo.comments.length;
      }

      loadComments(photo);

      loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
    }
  }
};
pictures.addEventListener('click', onPictureClick);
