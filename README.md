# Workout Tracker

Users can log workouts using the browsers geolocation API and using Leaflet Maps Library to mark locations.

PLANNING PHASE:

- Create USER STORIES - describing the functionality from a users perspective
- From USER STORIES decide what FEATURES are needed
- Create a FLOWCHART showing 'WHAT WE WANT TO BUILD'
- Create FLOWCHART showing 'HOW WE WILL BUILD IT'

USER STORIES:

- I want to log runs by location, distance, time, pace and steps/minute
- I want to log my cycle sessions by location, distance, time, elevation gain
- I want to see a general overview of all my workouts and strack progress
- I want to see all workouts on a map on the screen
- I want to see my workouts even if i close the app and open it again later (browser storage)

FEATURES

- Need a map where user clicks to add new workout
- Need geolocation to display map at current location
- Form to input user run data - distance, time, pace, steps/minute
- Form to input user cycle data - distance, time, elevation gain
- UI to display all workouts in a list
- Display all workouts on the map
- Store workout in browser using local storage API
- On page load, read saved data from local storage and display results
