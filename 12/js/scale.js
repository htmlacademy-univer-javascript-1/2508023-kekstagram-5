const SCALE_STEP = 25;

const image = document.querySelector('.img-upload__preview');
const scale = document.querySelector('.scale__control--value');
const buttonSmallerScale = document.querySelector('.scale__control--smaller');
const buttonBigerScale = document.querySelector('.scale__control--bigger');


const scaleImage = (newScaleValue) => {
  image.style.transform = `scale(${newScaleValue / 100})`;
  scale.value = `${newScaleValue}%`;
};

const onSmallerButtonClick = () => {
  const newScaleValue = parseInt(scale.value, 10) - SCALE_STEP;
  if (newScaleValue >= 25){
    scaleImage(newScaleValue);
  }
};

const onBiggerButtonClick = () => {
  const newScaleValue = parseInt(scale.value, 10) + SCALE_STEP;
  if (newScaleValue <= 100) {
    scaleImage(newScaleValue);
  }
};

const resetScale = () => scaleImage(100);

buttonSmallerScale.addEventListener('click', onSmallerButtonClick);
buttonBigerScale.addEventListener('click', onBiggerButtonClick);

export {resetScale};
