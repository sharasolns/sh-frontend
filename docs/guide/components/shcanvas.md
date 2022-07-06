# Sh Canvas

A bootstrap 5 Canvas

## Importing

```javascript
import { ShCanvas } from '@iankibetsh/shframework'
```

## Example Usage
```html
<sh-canvas canvas-id="myCanvas" canvas-title="Canvas Title" position="start">
    <h3>Canvas content will appear in slot here</h3>
</sh-canvas>
```

## Attributes

### `canvas-id`

- Type: `string`
- Default: `none`
- Required: `true`
- Details
    
    Attribute id of the canvas
- Example: `myCanvas`

### `position`

- Type: `string`
- Default: `start`
- Required: `false`
- Options: `start`, `end`, `bottom`, `top`
- Details

    This will be the position of the canvas, bootstrap 5 canvas positions are used
- Example: `end`
