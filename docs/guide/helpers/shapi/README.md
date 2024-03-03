# shApi

This is used to make api requests to the backend using _[axios](https://axios-http.com/docs/intro)_


## Importing
```javascript
import { shApis } from '@iankibetsh/shframework'
```
## Methods

### `doGet`
Makes a GET request to the backend api
```javascript
shApis.doGet('users', { role: 'admin' }).then(res => {
    users.value = res.data
  })
```

#### Params

##### `endpoint`

- Type: `string`
- Required: `true`
- Example: `users`
- Details: 

    This is the backend endpoint for the GET request
##### `data`

- Type: `object`
- Required: `false`
- Example
```javascript
{ role: 'admin' }
```

- Details

    This will be the request parameters on the GET request

### `doPost`

Makes a POST request to the backend api
```javascript
shApis.doPost('users/add', { 
  name: 'John', 
  email: 'john@example.com',
  age: 12
}
).then(res => {
    users.value = res.data
  })
```

#### Params

##### `endpoint`

- Type: `string`
- Required: `true`
- Example: `users/add`
- Details:

  This is the backend endpoint to post the POST request
##### `data`

- Type: `object`
- Required: `false`
- Example
```
data"{
  name: 'John',
  email: 'john@example.com',
  age: 12
}"
```

- Details

  This will be post data to the backend endpoint
