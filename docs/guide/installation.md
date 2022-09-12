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

Then use it this way, in the options ```sessionTimeout``` is the number of minutes that you wish the session
| to be allowed to remain idle before it expires.

```javascript
app.use(ShFrontend,{
  sessionTimeout: 120
})
```


