const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    max: 100,
    min: 0,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    max: 100,
    min: 0,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    max: 3,
    min: 0,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    max: 3,
    min: 1,
    step: 0.1,
    unit: '',
  }
];
const INITIAL_EFFECT = EFFECTS[0];

const slider = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview');
const effects = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsValue = document.querySelector('.effect-level__value');
let currentEffect = INITIAL_EFFECT;

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range:{
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  if (INITIAL_EFFECT === currentEffect) {
    sliderContainer.classList.add('hidden');
  }

  sliderContainer.classList.remove('hidden');
};

const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')){
    return;
  }

  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();

  image.style.filter = INITIAL_EFFECT === currentEffect ? INITIAL_EFFECT.style : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectsValue.value = sliderValue;
};

const setEffectsSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: INITIAL_EFFECT.min,
      max: INITIAL_EFFECT.max,
    },
    start: INITIAL_EFFECT.max,
    step: INITIAL_EFFECT.step,
    connect: 'lower',
  });

  sliderContainer.classList.add('hidden');
  effects.addEventListener('change', onEffectsChange);
  slider.noUiSlider.on('update', onSliderUpdate);
};

const resetEffects = () => {
  currentEffect = INITIAL_EFFECT;
  updateSlider();
};

export { resetEffects, setEffectsSlider };
