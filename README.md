Based on:  
React, Redux Toolkit (thunk), React Hook Form  
Node: 18+

## Main Functionality

### Authentication

#### Login

- Form with email and password fields
- Contains links to:
    - "Forgot password" flow
    - "Sign up" flow
- Successful login redirects to Dashboard page

#### Sign Up

- Initial form with email field
- After submission, user receives an email with registration continuation link
- Email verification based registration flow

#### Password Management

- **Forgot Password**
    - Form with email/username field
    - After submission, user receives an email with password reset link
- **Change Password**
    - Available for authenticated users in profile settings
    - Requires two fields for password change (likely new password and confirmation)

### Core Pages

#### Dashboard

- Main landing page after authentication
- Displays "Dashboard" text in center

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
