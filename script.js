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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    //takes 2 calback functions, first success callback, second error callback
    position => {
      console.log(position); //gives position object with latitude and longitude
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      //   const latitude = position.coords.latitude;
      //   const longitude = position.coords.longitude;
      //   console.log(latitude, longitude);

      //using destructuring
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.de/maps/@${latitude},${longitude},16z`);
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    () => {
      alert('Could not get position');
    }
  );
}
