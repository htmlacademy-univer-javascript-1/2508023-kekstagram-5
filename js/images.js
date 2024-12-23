const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
let pictures;

const makePictures = (picturesToDraw) => {
  picturesContainer.querySelectorAll('.picture').forEach((oldPicture) => {
    oldPicture.remove();
  });

  const fragment = document.createDocumentFragment();

  picturesToDraw.forEach(({ id, url, description, likes, comments }) => {
    const picture = pictureTemplate.cloneNode(true);
    const img = picture.querySelector('.picture__img');

    img.id = id;
    img.src = url;
    img.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
  pictures = picturesToDraw;
};

export { makePictures, pictures };
