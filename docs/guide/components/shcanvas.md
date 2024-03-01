# Sh Canvas


A sidebar component that can be toggled by clicking a button or by an action. It can be used to display additional content on the side of the screen.

## Importing

```javascript
import { ShCanvas } from '@iankibetsh/shframework'
```
make sure to add the canvas trigger anchor tag or button with the following attributes to trigger the canvas
```html
  <button  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Toggle canvas</button>
```

## Example Usage
```html
<sh-canvas canvas-id="myCanvas" canvas-title="Canvas Title" position="start" scrollable="true" size="lg">
    <h3>Canvas content will appear in slot here</h3>
</sh-canvas>
```
However, you can also use the sh-canvas-btn component to trigger the canvas

```html
<sh-canvas-btn canvas-id="myCanvas" class="btn btn-info">Toggle canvas</sh-canvas-btn>
```
make sure to import the sh-canvas-btn component
```javascript
import {ShCanvasBtn} from '@iankibetsh/shframework'
```


## Attributes

### `canvas-id`

- Type: `string`
- Default: `none`
- Required: `true`
- Details

   
   This will be the id of the canvas 
    
    Example: canvas-id="myCanvas"

### `position`

- Type: `string`
- Default: `start`
- Required: `false`
- Options: `start`, `end`, `bottom`, `top`
- Options: `end, start, bottom, top`
- Details

This will be the position of the canvas, bootstrap 5 canvas positions are used 

    Example: position="start"

### `canvas-title`
- Type: `string`
- Default: `none`
- Required: `false`
- Details

 Title of the canvas that will be displayed on the header of the canvas 
 
    Example: canvas-title="Canvas Title"

### `canvas-size`
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details 
   

 This will be the size of the canvas, bootstrap 5 canvas sizes are used 

    Example: size="lg"

### `scrollable`
- Type: `boolean`
- Default: `false`
- Required: `false`
- Details

 This will be the scrollable state of the canvas, element is disabled when an offcanvas and its backdrop are visible. 
    
        Example: scrollable="true"

