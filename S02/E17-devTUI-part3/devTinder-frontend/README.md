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

# S02E16

## Notes Continue

- Create a Login Page using daisyUi basic "card with no image"
  - binding state variable with UI component ( input )
- will be using axios to make api/network call
  - npm i axios
- CORS error happens when your client is at different url and backend is at diff url because of security reasons
  - frontend: http://localhost:5173
  - backend: http://localhost:3000
  - 127.0.0.1 === localhost
  - localhost is same for both but
  - but frontend is using different port ie. 5173
  - and backend is using different port ie. 3000
- Handling this CORS error at API level in backend, cors is middleware here
  - install this package in backend app
  - npm install cors
  - add this middleware to app.js with configurations(below)

## Why cookies are not saving up in browser( devconcole=> application => cookies unlike in postman cookies were saving the login JWT)

- because if you're in unsecure network( not on same domain), not using https, browser does not allow cookies to be set inside your browser
- but in production exact same code will work
- to solve this issue in local environment, add configurations
  - 1. we'll have to whitelist our domain name using corsOptions ie.
    - origin
    - credentials
  - 2. pass one more config while calling api using axios, ie. { withCredentials: true }
  - now check devConsole => application => cookies

## Setting up Redux store and 1st redux state slice( userSlice )

Reference 1- https://redux-toolkit.js.org/tutorials/quick-start

- Install 2 libraries
- npm install @reduxjs/toolkit react-redux
- 1. Create(configureStore) a Redux Store ( 1 reducer )
- 2. Provide the Redux Store to React ( given by react-redux )
- 3. Create(createSlice) a Redux State Slice ( reducers )
  - name: 'user',
  - initialState: null,
  - reducers: { addUser: (state, action) => { return action.payload }, removeUser: (state, action) => { return null } }
  - whatever addUser is returning will update the state
- 4. Add Slice Reducers to the Store
  - we need to import the reducer function from the userSlice and add it to our store. By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.
- Summary: configureStore => Provider => createSlice => Add sliceReducer to Store

## How to add/save User Data coming from api to Redux Store via userSlice

- 1. we need a hook, useDispatch() ( given by react-redux )
- 2. we need to dispatch an action using this hook to add data to redux store
     - const dispatch = useDispatch();
     - inside handleLogin
     - dispatch(action), action we have defined in userSlice
       - ie. dispatch(addUser(res.data))
- 3. use this hook where login api is being called and user data is coming

## How to read data ( that we've saved in last step ) from the store & show on NavBar

- 1. We need a hook, useSelector() ( given by react-redux )
- 2. Acess data using userSlice
  - const user = useSelector((store) => store.user);
  - then use data inside user in NavBar.js to show user photo or fistsName of user

## Once the user is logged in, after dispatch use this under handleOnlick

- use a hook called useNavigate()
  - const navigate = useNavigate();
  - return navigate("/");

## Refactoring

- added constants.js in utils
- Moved user created components inside components folder

# S02E17

## How to build that feature when you refreshes the page, you're still logged in even though redux store also refreshes and auto-redirect to login page when user has logout

PROBLEM: synchronous Redux code alone cannot persist login across page refreshes because Redux state is stored in memory and resets when the page reloads.

SOLUTION1:
Reference: https://chatgpt.com/share/67cc5828-c288-8005-b76c-016140d18051

1. Backend: TOKEN (set JWT in HTTP-Only Cookie)
2. Frontend: Persist Login Using Redux Toolkit( createAsyncThunk )
3. Configure Redux Store
4. Provide Redux Store to React
5. Implement Login & Auto-Auth in React

SOLUTION2: (used in code)
NOTE1: comment/remove strict mode in main.jsx to properly test how many times api is being called (because in strict mode it will make two api call just to verify that rendering is working fine or not)

NOTE2: handle error status in backend middlewares/auth.js properly ie.
return res.status(401).send("Please Login");

1. Akshay has created kind of its own persistent mechanism using TOKEN already present in cookies and using /profile/view. Token set in cookies is present in the browser which akshay is using.
2. We still have the token in our browser's cookies( devconsole => application)
3. See root of application is app.jsx and everything is rendering inside Body.jsx
4. As soon as Body.jsx loads
   1. I'll check whether the token is present or not.
   2. If the token is present, get data of the user /profile/view using "fetchUser" function
   3. Update the redux store using user data ie. const dispatch = useDispatch(); dispatch(addUser(res.data));
   4. Put fetchUser inside useEffect and pass empty array ie.[] as argument. This tells React that the effect does not depend on any values from the component's props or state, so "it only needs to be run once on initial render" ie. after the component is mount/loads for the first time.
   5. Now, everytime we refresh the page, Body.jsx component will mount/render for the first time, once that happens useEffect will run [ fetchUser => /profile/view => dispatch(addUser(res.data)) ], means redux state will be updated evertime someone refreshes the page. Which makes logged in persistent
5. Handling Error: ( There can be 2 types of error 1. UnAuthorised: status code 401 2. Any code related error: console.error(error) )
   1. User will only logout,
      1. if the token is not there in the browser cookies
      2. someone manually removed the token
      3. token expired
   2. If logout Happens (any of above 3 condition), and you receive error.status equals to 401 (unauthorised) - YOU SHOULD NOT BE ABLE TO ACCESS OTHER ROUTES WITHOUT LOGIN
      1. if(error.status === 401) then while catching error redirect user to /login page using useNavigate() hook ie. const navigate = useNavigate(); navigate("/login")
      2. This ensure without login you can't access any page / or /profile because we have written this logic in body.jsx so as soon as app starts it will check if the token is valid or not

### One issue/bug is coming, Ideally once a user is logged in he doesn't have to make api call again and again while go to profile or home using button on UI /profile How to solve this ?

1. Once we have data in redux store we do not want to make api call again and again
2. Use <Link to="/profile"></Link> inside Navigate.jsx
3. Use <Link to="/"></Link> inside Navigate.jsx
   // ADDITIONAL CHECK
4. Inside Body.jsx get userData from store using const userData = useSelector((store)=>store.user)
5. If the userData is already present in the redux store means user is logged in, then don't make api (inside fetchUser) call ie. if(userData) return; ( ie. only make api call when there is not data in the store )
