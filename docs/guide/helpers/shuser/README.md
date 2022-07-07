# shUser
This is a state management class to manage our logged in user

It uses _[pinia](https://pinia.vuejs.org/)_ for state management
## Importing

```javascript
import { useUserStore } from '@iankibetsh/shframework'

const userStore = useUserStore()

```
You first import the store class then instantiate it to `userStore` constant

## Using it in component

```javascript
const { user } = storeToRefs(userStore)
```

Then you can use it in component template this way

```html
<h5>Welcome {{ user.name }}</h5>
```

## Methods

### `setAccessToken`
This is used to set access token for the logged in user. 
```javascript
userStore.setAccessToken(res.token)
```
### `setUser` | `fetchUser`

This gets logged in user from the backend and updates user state

```javascript
userStore.setUser()
```

### `logOut` | `signOut`

This removes current session and logs out user. It basically empties accesstoken from locat storage and makes user
state null

```javascript
userStore.logOut()
```
