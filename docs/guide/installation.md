# Installation

Install this package in your existing or freshly installed vue 3 framework 
using vite

```shell
npm install @iankibetsh/shframework
```

In main.js or the entry file for vue js, import and use ``ShFrontend``

```javascript
import {ShFrontend} from '@iankibetsh/shframework'
```

Then use it this way.

```javascript
app.use(ShFrontend,{
    sessionTimeout: 400,
    loginUrl: '/sh-auth',
    registerEndpoint: 'auth/register',
    forgotEndpoint: 'auth/forgot',
    logoutApiEndpoint: 'auth/logout',
    registerTitle: 'Welcome, create a new account',
    registerSubTitle: 'Create a new account to access the system',
    redirectRegister: '/login',
    loginTitle: 'Login to your account',
    redirectLogin: '/dashboard',
    tablePaginationStyle: 'loadMore',
    tablePerPage: 20,
    toastTimer: 5000,
    // baseApiUrl: '/api/',
    // userEndpoint: 'auth/user'
})
```
I will try to explain everything here. 
1. sessionTimeout: This is the time in minutes that the user will be logged out if inactive.
2. LoginUrl: This is the url that the user will be redirected to when they are not logged in.
3. registerEndpoint: This is the api endpoint that will be called when the user registers.
4. forgotEndpoint: This is the api endpoint that will be called when the user forgets their password.
5. logoutApiEndpoint: This is the api endpoint that will be called when the user logs out.
4. registerTitle: This is the title that will be displayed on the register page.
5. registerSubTitle: This is the subtitle that will be displayed on the register page.
6. redirectRegister: This is the url that the user will be redirected to after registering.
7. loginTitle: This is the title that will be displayed on the login page
8. tablePaginationStyle: This is the style of pagination that will be used in the table. It can be either 'loadMore' or 'pagination'
9. tablePerPage: This is the number of items that will be displayed per page in the table.
10. toastTimer: This is the time in milliseconds that the toast will be displayed.
11. baseApiUrl: This is the base api url that will be used when making all api requests
11. userEndpoint: This is the api url that logged in user will be fetched from, it should return an object of authenticated user