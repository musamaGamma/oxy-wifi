# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## title

frontend-task

## Table of Content:

- [About The App](#about-the-app)
- [Folder Architecture](#folder-architecture)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)

## about The App

this is a simple frontend authentication app

## folder architecture

```bash
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   ├── index.html
│   ├── login.png
│   ├── welcome.png
│   ├── logo.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.js
│   ├── components
│   │   ├── Header.js
│   │   ├── ProtectedRoute.js
│   │   └── Spinner.js
│   ├── globalStateManger
│   │   └── store.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── pages
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Welcome.js
│   ├── reportWebVitals.js
│   └── setupTests.js
└── tailwind.config.js
```

## screenshots

![alt text](/public/login.png)
![alt text](/public/welcome.png)

## technologies:

### styling and icons

- tailwindcss
- heroicons

### global state management

- zustand

### handling form data

- react-hook-form

## setup

- download or clone the repository
- run `npm install`
- run `npm start`
