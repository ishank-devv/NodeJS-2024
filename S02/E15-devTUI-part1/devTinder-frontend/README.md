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

# INSTALL VITE (https://vite.dev/guide/ )

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

# Install tailwind via npm(

Reference 1: https://www.youtube.com/watch?v=sHnG8tIYMB4
Reference 2: https://tailwindcss.com/docs/installation/using-vite )

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

( reference: https://chatgpt.com/share/67c829dc-37e4-8005-be5e-8ce051658c62 )

1. Manually Set localhost in Your Hosts File
   1. Open Terminal and edit the hosts file:
      sudo nano /etc/hosts
2. Ensure this line exists:
   127.0.0.1 localhost
3. Save and exit (Ctrl + X, then Y, then Enter).

# Design compoenent library: Daisy UI (compatible with tailwind )

    - npm i -D daisyui@latest
    - https://daisyui.com/docs/install/ ( follow steps )
    - try changing the theme of Daisy UI, and see if it works
