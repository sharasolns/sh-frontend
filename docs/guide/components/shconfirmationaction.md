# Confirmation Action

The `sh-confirm-action` component is a button that triggers a 
confirmation dialog before executing an action.
it is used to confirm an action before it is executed.

## Importing
```javascript
import { ShConfirmationAction } from '@iankibetsh/shframework'
```

## Example Usage 
```html
<sh-confirm-action url="tasks/delete/1" title="Delete Task" message="Are you sure you want to delete this task?">
    <button class="btn btn-danger">Delete</button>
</sh-confirm-action>
```

## Attributes

### url
- Type: `string`
- Default: `none`
- Details

    This is the url that will be called when the action is confirmed

Example :
```
url="tasks/delete/1"
```

### title
- Type: `string`
- Default: `none`
- Details

    This is the title that will appear on the confirmation dialog

Example : 
```
title="Delete Task"
```
### message
- Type: `string`
- Default: `none`
- Details

    This is the message that will appear on the confirmation dialog

      
Example :
```
message="Are you sure you want to delete this task?"
```

### success-message
- Type: `string`
- Default: `Action Successful`
- Details

    This is the message that will appear on the confirmation dialog

Example : 
```
success-message="Task deleted successfully"
```

### loading-message
- Type: `string`
- Default: `Processing...`
- Details

    This is the message that will appear on submit button when the action is being processed

Example : 
```
loading-message="Deleting Task..."
```

