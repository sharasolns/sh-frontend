# Sh Fetch
Sh Fetch is a helper class that fetches data from a remote server. It is used to fetch data from a remote server and return it as an array. 

### Importing
```javascript
import { useShFetch } from '@iankibetsh/shframework'
```
### Usage
```javascript
const { data, loading, error } = useShFetch('endpoint')
```
### Parameters
- `endpoint` - The endpoint to fetch data from
- `data` - The data fetched from the server
- `loading` - A boolean that indicates if the data is still loading
- `error` - An error object if the fetch fails
- `useShFetch` - The hook that fetches data from the server
