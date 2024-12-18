import { resetScale } from './scale.js';
import { resetEffects, setEffectsSlider } from './effects.js';

const CORRECT_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = overlay.querySelector('.img-upload__cancel');
const photoLoader = document.querySelector('.img-upload__input');
const comment = document.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');

const onDocumentKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

setEffectsSlider();

const onCloseButtonClick = () => {
  form.reset();
  resetScale();
  resetEffects();
  //pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  photoLoader.value = '';
  comment.textContent = '';
  comment.removeEventListener('keydown', onDocumentKeyDown);
  overlayCloseButton.removeEventListener('click', onCloseButtonClick);
};

const onKeyDownClose = (evt) => {
  if (evt.key === 'Escape') {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoLoader.value = '';
    comment.textContent = '';
    comment.removeEventListener('keydown', onDocumentKeyDown);
    body.removeEventListener('keydown', onKeyDownClose);
  }
};

photoLoader.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  comment.addEventListener('keydown', onDocumentKeyDown);
  overlayCloseButton.addEventListener('click', onCloseButtonClick);
  body.addEventListener('keydown', onKeyDownClose);
});

const checkHashtags = (value) => {
  const isValidCount = value.length <= 5;
  const isValidUnique = new Set(value.map((tag) => tag.toLowerCase())).size === value.length;
  const isValidPattern = value.every((tag) => CORRECT_SYMBOLS.test(tag));

  return isValidCount && isValidUnique && isValidPattern;
};

const pristine = new Pristine(form);
pristine.addValidator(hashtags, checkHashtags);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
