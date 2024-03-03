# Sh modal Form

Sometimes you may want to use sh-modal-form. This is a component that combines the sh-modal and sh-form components.
Instead of creating button and modal separately, you can use this component to create a button that will trigger a modal with a form inside it.

## Importing
```javascript
import { ShModalForm } from '@iankibetsh/shframework'
```

## Example Usage
```html
  <sh-modal-form
      modal-id="addTask"
      modal-title="Add Task"
      :fields="['name','description','phone']"
      :action="'tasks/store'"
      :successCallback="taskAdded"
  >Add Task</sh-modal-form>
```
## Attributes

### `modal-id`
- Type: `string`
- Default: `none`
- Required: `true`
- Details
  This is the modal attribute id that will be attached or triggered by a button later on
``` 
 Example: modal-id='exampleModal'
```

### `modal-title`
- Type: `string`
- Default: `none`
- Required: `false`
- Details
  This is the title of the modal
```
    Example: modal-title='My Example Modal'
```
### `modal-size`
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details
  This is the size of the modal
```
    Example: modal-size='md'
```

### `fields`
- Type: `array`
- Default: `none`
- Required: `true`
- Details
  These are the form files, like inputs, select etc
```
    Example: :fields="['name','email','password']"
```

### `action`
- Type: `string`
- default: `none`
- Required: `true`
- Details: 
  This is the action url to the api backend where the request will be handled
  The action will be appended to the base url of the api backend defined in the .env file
```
    Example: `tasks/store`
```

### `method`
- Type: `string`
- Default: `post`
- Required: `false`
- Options: `post`, `put`, `patch`, `delete`
- Details:
  This is the method of the request. By default, the method is post

Example :

```
 :method="put"
```

### `success-callback`
- Type: `function/method`
- Default: `none`
- Required: `false`
- Details:
  This is the method that will be called after the request is successful

Example :

```
   :successCallback="taskAdded"
```


### `success-message`
- Type: `string`
- Default: `Action Successful`
- Required: `false`
- Details
  This is the message that will appear on the confirmation dialog

Example :

```
   success-message="Task added successfully"
```


