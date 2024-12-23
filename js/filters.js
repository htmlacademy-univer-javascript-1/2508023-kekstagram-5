const PICTURES_COUNT = 10;
const filterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const filter = document.querySelector('.img-filters');
let currentFilter = filterId.DEFAULT;


const sortByRandom = () => Math.random() - 0.5;

const sortByComments = (firstPicture, secondPicture) =>
  secondPicture.comments.length - firstPicture.comments.length;

const filterPictures = (pictures) => {
  let filteredPictures;

  switch (currentFilter) {
    case filterId.RANDOM:
      filteredPictures = [...pictures].sort(sortByRandom).slice(0, PICTURES_COUNT);
      break;
    case filterId.DISCUSSED:
      filteredPictures = [...pictures].sort(sortByComments);
      break;
    default:
      filteredPictures = [...pictures];
  }
  return filteredPictures.map((picture, index) => ({ ...picture, id: index }));
};

const changeFilter = (clickedButton) => {
  filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
};

const initFilter = (pictures, callback) => {
  filter.classList.remove('img-filters--inactive');
  filter.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;

    if (clickedButton.id === currentFilter) {
      return;
    }

    changeFilter(clickedButton, pictures);
    callback(filterPictures(pictures));
  });

  callback(filterPictures(pictures));
};

export { initFilter };
