import { resetScale } from './scale.js';
import { resetEffects, setEffectsSlider } from './effects.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { sendData } from './api.js';

const CORRECT_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = overlay.querySelector('.img-upload__cancel');
const photoLoader = document.querySelector('.img-upload__input');
const comment = document.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};


const onDocumentKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

setEffectsSlider();
const pristine = new Pristine(form);

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const onCloseButtonClick = () => {
  hideModal();
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
const onFileChange = () => {
  const file = photoLoader.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.style.objectFit = 'contain';
    photoPreview.style.maxWidth = '100%';
    photoPreview.style.maxHeight = '100%';
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }

  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  comment.addEventListener('keydown', onDocumentKeyDown);
  overlayCloseButton.addEventListener('click', onCloseButtonClick);
  body.addEventListener('keydown', onKeyDownClose);
};

photoLoader.addEventListener('change', onFileChange);


const checkHashtags = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return true;
  }

  const newValue = value.trim().split(/\s+/);
  const isValidCount = newValue.length <= 5;
  const isValidPattern = newValue.every((tag) => CORRECT_SYMBOLS.test(tag));
  const isValidUnique = new Set(newValue.map((tag) => tag.toLowerCase())).size === newValue.length;

  return isValidCount && isValidPattern && isValidUnique;
};
pristine.addValidator(hashtags, checkHashtags);

const disableSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SUBMITTING : SubmitButtonText.IDLE;
};


const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      disableSubmitButton(true);
      const formData = new FormData(form);
      formData.append('filename', photoLoader.files[0]); // Добавляем картинку в FormData
      await callback(formData);
      disableSubmitButton();
    }
  });
};


setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
