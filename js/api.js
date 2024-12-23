import { showAlert, debounce } from './util.js';
import { initFilter } from './filters.js';
import { makePictures } from './images.js';

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось получить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные. Попробуйте ещё раз',
};

const load = (route, errorText, method = Methods.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }

      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Routes.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) => load(Routes.SEND_DATA, ErrorText.SEND_DATA, Methods.POST, body);

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(makePictures);
  initFilter(data, debouncedRenderGallery);
} catch (err) {
  showAlert(err.message);
}

export { sendData };
