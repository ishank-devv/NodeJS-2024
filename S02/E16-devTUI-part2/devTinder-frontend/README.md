<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

# React + Vite

S02E15

- /S02/E15-devTUI-part1
- npm create vite@latest devTinder-frontend -- --template react
- Try Explicitly Setting the Host for Vite- In vite.config.js:
- export default {
  server: {
  host: '127.0.0.1',
  },
  };
- cd devTinder-frontend
  npm install
  npm run dev
- main.jsx is primary entry point of your frontend application
- And inside main.jsx(main entry point), we're just rendering our app
- Inside app.jsx, we'll build everything.
- Remove everything extra in
  - App.jsx
- Delete
  - src/App.css
  - src/assets folder
- Design CSSframework/Library we'll be using
  - Old Tailwindcss
    - follow steps here https://v3.tailwindcss.com/docs/installation
    - npm install -D tailwindcss@3
    - npx tailwindcss init
    - follow steps to debug https://chatgpt.com/share/679a1ced-63c4-8005-91cd-93185c91fb71
    - npm install tailwindcss postcss autoprefixer daisyui
    - create postcss.config.js & put configurations here
    - export default {
      plugins: {
      tailwindcss: {},
      autoprefixer: {},
      },
      };
  - OR CSSFramework: New TailwindCSS
    - Follow steps to install https://tailwindcss.com/docs/installation/using-vite
    - npm install tailwindcss postcss autoprefixer daisyui
    - npx tailwindcss init -p
    - use className instead of class <div className="text-red-500">Hello World</div>
  - Design compoenent library: Daisy UI (compatible with tailwind )
    - npm i -D daisyui@latest
    - https://daisyui.com/docs/install/ ( follow steps )
    - try changing the theme of Daisy UI, and see if it works

###################################################

Starting again

S02E15

# INSTALL VITE

Reference 1: https://www.youtube.com/watch?v=sHnG8tIYMB4
Reference 2: https://vite.dev/guide/

- npm create vite@latest devTinder-frontend -- --template react

  - cd devTinder-frontend
  - npm install
  - npm run dev

  - EXTRA NOTES
  - main.jsx is primary entry point of your frontend application
  - And inside main.jsx(main entry point), we're just rendering our app
  - Inside app.jsx, we'll build everything.
  - Remove everything extra in
    - App.jsx
  - Delete
    - src/App.css
    - src/assets folder

# Install tailwind via npm

Reference 1: https://www.youtube.com/watch?v=sHnG8tIYMB4
Reference 2: https://tailwindcss.com/docs/installation/using-vite

- npm install tailwindcss @tailwindcss/vite
- configure vite.config.ts
  - import tailwindcss from '@tailwindcss/vite'
  - plugins: [
    tailwindcss(),
    ],
- import tailwind to your main css file ie. src/index.css
  - @import "tailwindcss";
- Run your build process with npm run dev or whatever command configured in your package.json file.
- <h1 className="text-red-500"> Vite + React<h1>

# how to handle vite localhost error when running npm run dev

Reference: https://chatgpt.com/share/67c829dc-37e4-8005-be5e-8ce051658c62

1. Manually Set localhost in Your Hosts File
   1. Open Terminal and edit the hosts file:
      sudo nano /etc/hosts
2. Ensure this line exists:
   127.0.0.1 localhost
3. Save and exit (Ctrl + X, then Y, then Enter).

# Install design compoenent library: Daisy UI (compatible with tailwind )

Reference: https://daisyui.com/docs/install/

- https://daisyui.com/docs/install/ ( follow steps )
- npm i -D daisyui@latest
- import to your main css file ie. index.css
  - @plugin "daisyui";
- try adding navbar component to App.jsx and change background color to bg-base-300

# Notes

- use rafce to create seperate NavBar.jsx component ( ReactArrowFunctionExportComponent)
- add NavBar.jsx to App.jsx
- here we're using "es modules" for import and export( in nodejs we were using require() ie. "common JS modules" )
- using react router package to add routing
  - npm i react-router-dom
  - creating routing using Router Components at root level ie. App.jsx https://reactrouter.com/6.28.0/router-components/browser-router
    - Add <BrowserRouter></BrowserRouter> to App.jsx
    - <BrowserRouter basename="/"></BrowserRouter> , basename="/api" means /api will be added automatically before every route url
    - Inside BrowserRouter Add <Routes></Routes>, basically Routes is like a wrapper for different routes
    - Inside Routes, create <Route path="/" element={<BodyComponent/>}> , element will decide what will render on this path
    - NOTE1: createBrowserRouter also takes path and element but in the form of array of objects
    - NOTE2: Here we're using in form of nested route inside like this <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<div>Base page</div>} />
      <Route path="/login" element={<div>Login page</div>} />
      </Routes>
      <BrowserRouter>

# Component Design

- Body
  - NavBar
  - Route=/ => Feed
  - Route=/login => Login
  - Route=/connection => Connections
  - Route=/profile => Profile

# Notes Continue

- NavBar should be inside <Body/> component
- <Route path="/" element={<Body />} />, <Route path="/" element={<Body />} ></Route>
- 1st and 2nd , both are same. But in the 2nd one we can create nested route
- Created nested route, Login.jsx and Profile.jsx inside <Body/> component
- Render these children <Login/> and <Profile/> inside <Body/> in an <Outlet/>
- Outlet inside <body/> rendering like this means any children routes of <Body/> will render over here inside body return (<div>
<Outlet>
</div>)

- create a Footer.jsx
