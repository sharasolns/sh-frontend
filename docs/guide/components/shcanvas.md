# Sh Canvas

A sidebar component that can be toggled by clicking a button or by an action. It can be used to display additional content on the side of the screen.

## Importing

```javascript
import { ShCanvas } from '@iankibetsh/shframework'
```

## Example Usage
```html
<sh-canvas canvas-id="myCanvas" canvas-title="Canvas Title" position="start" scrollable="true" size="lg">
    <h3>Canvas content will appear in slot here</h3>
</sh-canvas>
```

## Attributes

### `canvas-id`

- Type: `string`
- Default: `none`
- Required: `true`
- Details

   
   This will be the id of the canvas
- Example: `myCanvas`

### `position`

- Type: `string`
- Default: `start`
- Required: `false`
- Options: `start`, `end`, `bottom`, `top`
- Options: `end, start, bottom, top`
- Details

This will be the position of the canvas, bootstrap 5 canvas positions are used
- Example: `start`

### `canvas-title`
- Type: `string`
- Default: `none`
- Required: `false`
- Details

 Title of the canvas that will be displayed on the header of the canvas 
- Example: `Canvas Title`

### `canvas-size`
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details 
   

 This will be the size of the canvas, bootstrap 5 canvas sizes are used
- Example: `md`

### `scrollable`
- Type: `boolean`
- Default: `false`
- Required: `false`
- Details

 This will be the scrollable state of the canvas, element is disabled when an offcanvas and its backdrop are visible. 

