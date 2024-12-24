# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

-This project utilizes React to dynamically display the current time, weather conditions, and even suggestions of what to wear when going outside.
-Through the use of https://home.openweathermap.org's api key, it helps display the current weather conditions flipping through conditions such as rain, snow, clouds, and clear skies. The current weather condition is constantly being updated based on the time and location utilizes through React and jsx code.
-The use of dynamic code filters through clothing suggestions and displays clothing suggestions based current conditions.
-Once additional functionality is added, users will be able to add even more clothing suggestions with the options of filtering said suggestions with weather conditions between hot, cold, and warm.
-With added functionality we connect this react project to the backend express project to send info to a database. With this added function, users are able to create and account, login, and add items of their choosing which they can see on their profile page.
-With the connection to the backend database, the improved functionality of the website is able to detect if an email has already been used, if a password is incorret, and even detect whether a user is the owner of an item added on webpage.
-Users are able to like/unlike and delete items based on whether they are the owner of a clothing item as well.

Link to express backend database: https://github.com/Wyllyumm/se_project_express
<img width="1280" alt="Screen Shot 2024-10-03 at 5 28 03 PM" src="https://github.com/user-attachments/assets/8c583078-6936-449b-9058-950dfd070403">
<img width="1280" alt="Screen Shot 2024-10-03 at 5 23 28 PM" src="https://github.com/user-attachments/assets/2d1a41ee-97f0-41d7-b76d-6c4caec1090f">
https://drive.google.com/file/d/17kAcumGSPx7Luipp9AvfMtmjykKfLNob/view?usp=sharing


