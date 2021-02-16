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
const inputWalking = document.querySelector('.form__input--walking');

//CREATING THE PARENT CLASS
class Workout {
  date = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration;
  }
}

// CREATING CLASS APP - A BLUE PRINT FOR THE APP
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); //ALWYAS WILL BIND TO THIS THE APP OBJECT
    inputType.addEventListener('change', this._toggleElevationField);
  }
  _getPosition() {
    // GEOLOCATION API -BROWSER API  LIKE INTERNATIONALISATION/OBSERVER API

    if (navigator.geolocation) {
      //if exists then do first callback
      //takes 2 calback functions, first success callback, second error callback
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Could not get position');
      });
    }
  }
  _loadMap(position) {
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

    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // get coordinates of point after clicking on the map
    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(mapE) {
    //on comes from leaflet
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    // this will only work when you already in the HTML put the active (unhidden) choice with the active selection option for the dropdown
    //then closest parent of each type will either be hidden or visible
    //so each time there will always be one that is hidden and one that is visible
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault(e);

    //   Clear Form Inputs on opening form
    inputDistance.value = inputCadence.value = inputElevation.value = inputDuration.value =
      '';

    // Display marker on Form Submit
    console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    const pointCords = [lat, lng];
    L.marker(pointCords, {
      opacity: 0.8,
    })
      .addTo(this.#map)
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
  }
}

// CREATE THE APP USING THE CLASS APP BLUEPRINT
const app = new App();

// added another parameter
// inputType.addEventListener('change', () => {
//   if (inputType.value === 'walking') {
//     inputElevation.closest('.form__row').classList.add('form__row--hidden');
//     inputCadence.closest('.form__row').classList.add('form__row--hidden');
//     inputWalking.closest('.form__row').classList.remove('form__row--hidden');
//   } else if (inputType.value === 'cycling') {
//     inputCadence.closest('.form__row').classList.add('form__row--hidden');
//     inputElevation.closest('.form__row').classList.remove('form__row--hidden');
//     inputWalking.closest('.form__row').classList.add('form__row--hidden');
//   } else {
//     inputElevation.closest('.form__row').classList.add('form__row--hidden');
//     inputCadence.closest('.form__row').classList.remove('form__row--hidden');
//     inputWalking.closest('.form__row').classList.add('form__row--hidden');
//   }
// });

// =====================PROJECT ARCHITECTURE================
/* 
- Need to store location, distance, time, pace, and steps/min
- Need to store location, distance, time, speed, and elevation gain
- Need to store all things that come from the GEOLOCATION API and from USER INPUT

FIRST QUESTION - WHERE AND HOW TO STORE THE DATA

  - We will create classes that can create objects that can hold this kind of data 
  - We will create a parent class (workout) that will have all common properties 
  - 2 child classes which will have their own exlusive properties but will inherit from the parent class workout


THESE ARE ALL THE EVENTS -
  1. Load page
  2. Recieve position from Geo API
  3. Click on Map
  4. Change Input in form
  5. Submit Form

  WE WILL MAKE ONE CLASS WITH ALL THE METHODS INSIDE THAT WILL BE USED 

  ON LOADING THE PAGE, METHODS WILL BE CARRIED OUT, AND NEW WORKOUT OBJECTS WILL BE MADE
  BASED ON INPUT FROM FORM AND 

*/
