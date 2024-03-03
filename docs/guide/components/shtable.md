# Sh Table

sh-table is a component that generates a table. It's a wrapper around the bootstrap table. 
Using this component makes your work easier and faster.
To generate a table, you need to pass the headers, and the end-point of the table data. This will populate the table with the data from the end-point.
Sounds cool right?
Let's see how to use it.

## importing

```javascript
import {ShTable} from '@iankibetsh/shframework'
```

## Example Usage

```html
<sh-table
      :headers="['id','name','description']"
  end-point="tasks/list"
  />
```

## Attributes

### `headers`

- Type: `array`
- Default: `none`
- Required: `true`
- Details

    These are table headers for the table that will be generated 

Example :
```
 headers="['id','name','description']"
```

### `end-point`

- Type: `string`
- Default: `none`
- Required: `true`
- Details

    It's the endpoint of table data, usually it's the backend api url

Example :
``` 
end-point="tasks/list"
```

### links
- Type: `object`
- Required: `false`,
- Default: `none`
- Details 

    In case you want to add links to table data you can use this attribute. 
     It's an object with the following properties

Example :

```
:links="{
  id: {
    url: '/tasks/{id}/details',
     target: '_blank'
  }
}"
```
The above will add a link to the id column with the url `/tasks/{id}/details` and the open in a new tab

### cache-key
- Type: `string`
- Required: `false`,
- Default: `none`
- Details

    This is the cache key for the table data. It's used to cache the table data in the local storage. 
    This is useful when you want to cache the table data for a certain period of time. 
    The cache key is used to store the data in the local storage. 
    When the table is loaded, it checks if the data is in the local storage, if it's there, it uses it, if not, it fetches the data from the end-point and stores it in the local storage using the cache key. 
    The next time the table is loaded, it checks if the data is in the local storage, if it's there, it uses it, if not, it fetches the data from the end-point and stores it in the local storage using the cache key.

Example :

```
cache-key="tasks"
```
#### hideSearch
- Type: `boolean`
- Required: `false`,
- Default: `false`
- Details

    This is used to hide the search input in the table. 
    When set to true, the search input will not be displayed in the table. 
    When set to false, the search input will be displayed in the table. 
    The search input is used to search the table data. 
    It filters the table data based on the search input value.

Example

```
  hideSearch="true"
```

### actions
- Type: `object`
- Required: `false`,
- Default: `none`
- Details
  
  This will be the buttons attached to the end colum of the table containing header label, actions and action callbacks, 
  When a emits value is string, it emits an event, and you have to listen to that event. The easy way is to use a function callback
- Example With Emitter

```
:actions="{
label: 'Action',
        actions: [
  {
    label: 'EDIT',
    class: 'btn btn-info btn-sm',
    type: 'emitter',
    emits: 'editDocument'
  }
]
}"
```
- Example With Action Callback

```
:actions="{
label: 'Action',
        actions: [
  {
    label: 'EDIT',
    class: 'btn btn-info btn-sm',
    type: 'emitter',
    emits: editDocument
  }
]
}"
```
- Example With Offcanvas

```
:actions="{
      label: 'Action',
      actions: [
        {
          label: 'Permissions',
          canvasPosition: 'start',
          canvasTitle: 'View Department',
          canvasId: 'departmentsCanvas',
          canvasSize: 'lg',
          canvasComponent: ViewDepartment,
          class: 'btn btn-info btn-sm',
          icon: 'bi-plus',
        }
      ]
    }"
```
In the above, canvas component is the imported canvas component
