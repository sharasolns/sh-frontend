# ShModal
The `sh-modal` component is a simple modal component that can be used to create modals in your application. 
It is a simple modal that can be used to display content in a modal.

## Importing
```javascript
import {ShModal} from '@iankibetsh/shframework'

```
make sure to add the modal trigger anchor tag or button with the following attributes to trigger the modal
```html
  <a href="#exampleModal" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</a>
```
## Example Usage
```html
<sh-modal modal-id="exampleModal" modal-title="My Example Modal">
    <h5>Model content here</h5>
</sh-modal>
```

## Attributes

### modal-id

- Type: `string`
- Default: `none`
- Required: `true`
- Details
  
    This is the modal attribute id that will be attached or triggered by a button later on
``` 
 Example: modal-id='exampleModal'
```
### modal-title

- Type: `string`
- Default: `none`
- Required: `false`
- Details

    This is the title of the modal
```
    Example: modal-title='My Example Modal'
``` 
### modal-size
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details

    This is the size of the modal
```
    Example: modal-size='md'
```

### Static
- Type: `boolean`
- Default: `false`
- Required: `false`
- Details

    This is the static attribute of the modal
```
    Example: :static='true'
```
### centered
- Type: `boolean`
- Default: `false`
- Required: `false`
- Details

    This is the centered attribute of the modal
```
    Example: :centered='true'
```
