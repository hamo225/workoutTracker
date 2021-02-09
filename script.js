'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Selected Elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// GEOLOCATION API -BROWSER API  LIKE INTERNATIONALISATION/OBSERVER API

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    //takes 2 calback functions, first success callback, second error callback
    position => {
      //   console.log(position); //gives position object with latitude and longitude
      //   console.log(position.coords.latitude);
      //   console.log(position.coords.longitude);
      //   const latitude = position.coords.latitude;
      //   const longitude = position.coords.longitude;
      //   console.log(latitude, longitude);

      //using destructuring
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //   console.log(`https://www.google.de/maps/@${latitude},${longitude},16z`);
      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // get coordinates of point after clicking on the map
      map.on('click', mapE => {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    () => {
      alert('Could not get position');
    }
  );
}

form.addEventListener('submit', e => {
  e.preventDefault(e);
  //   Clear Form Inputs on opening form
  inputDistance.value = inputCadence.value = inputElevation.value = inputDuration.value =
    '';

  // Display marker on Form Submit
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  const pointCords = [lat, lng];
  L.marker(pointCords, {
    opacity: 0.8,
  })
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        maxHeight: 500,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

// When choosing an input selection
inputType.addEventListener('change', () => {
  //then closest parent of each type will either be hidden or visible
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
