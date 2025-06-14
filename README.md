Based on:  
React, Redux Toolkit (thunk), React Hook Form  
Node: 18+

## About

This branch does not contain specific functionality for users or admins. Instead, there are two separate branches:

- [**Portal** (User Portal)](https://github.com/sfcod/reactjs-boilerplate/tree/portal)
- [**Admin** (Admin Panel)](https://github.com/sfcod/reactjs-boilerplate/tree/admin)
## Dev environment

- Setup config

```bash
cp src/config/environments/env.dev.js src/config/env.js
```

- Install vendors

```bash
npm install
```

- Run dev

```bash
npm run start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run preview`

Preview the production build. Need to run `npm run build` first.

### `npm run format`

Format code with prettier.

### `npm run lint`

Lint code with eslint.
