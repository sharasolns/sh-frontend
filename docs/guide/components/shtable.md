# Sh Table

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
- Example: `['id','name','description']`
### `end-point`

- Type: `string`
- Default: `none`
- Required: `true`
- Details

    It's the endpoint of table data, usually it's the backend api url
- Example: `tasks/list`

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
