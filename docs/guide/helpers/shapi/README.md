# shApi
 
This component contains common helper functions for making api requests.
The component uses axios to make the requests. [axios](https://axios-http.com/docs/intro)

To use this package make sure you have in your .env file the following
```shell
VITE_APP_API_URL=http://localhost:8000/api/
```
make sure to change(http://localhost:8000/api/)  to your api backend url
This will be the base url of the api backend where the form will send request


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
- Details: 

    This is the backend endpoint for the GET request

Example :
```
shApis.doGet('users')

```
'users' above will be the endpoint for your backend
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

This Will help you if you want to make a POST request to the backend api. 

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
- Details:

  This is the backend endpoint to post the POST request

Example :
```
shApis.doPost('users/add')
```
'users/add' above will be the endpoint for your backend

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


### `doPut`
-  Makes a PUT request to the backend api
```javascript
shApis.doPut('users/update/1', { 
  name: 'John', 
  email: ''
}
).then(res => {
    users.value = res.data
  })
```

#### Params

##### `endpoint`

- Type: `string`
- Required: `true`
- Details:

  This is the backend endpoint to post the PUT request
- Example :
```
shApis.doPut('users/update/1')
```
'users/update/1' above will be the endpoint for your backend

##### `data`

- Type: `object`
- Required: `false`
- Example
```
data"{
  name: 'John',
  email: ''
}"
```

- Details

  This will be post data to the backend endpoint

### `doDelete`
- Makes a DELETE request to the backend api
```javascript
shApis.doDelete('users/delete/1').then(res => {
    console.log('User deleted')
  })
```

#### Params

##### `endpoint`

- Type: `string`
- Required: `true`
- Details:

  This is the backend endpoint to post the DELETE request
- Example :
```
shApis.doDelete('users/delete/1')
```
'users/delete/1' above will be the endpoint for your backend

### `doPatch`
- Makes a PATCH request to the backend api
```javascript
shApis.doPatch('users/update/1', { 
  name: 'John', 
  email: ''
}
).then(res => {
    users.value = res.data
  })
```

#### Params

##### `endpoint`

- Type: `string`
- Required: `true`
- Details:

  This is the backend endpoint to post the PATCH request
- Example :
```
shApis.doPatch('users/update/1')
```

'users/update/1' above will be the endpoint for your backend

##### `data`

- Type: `object`
- Required: `false`
- Example
```
data"{
  name: 'John',
  email: ''
}"
```

- Details

  This will be post data to the backend endpoint



