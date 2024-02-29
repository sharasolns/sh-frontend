# Routes 

This is a guide to the routes component. 
Its the normal vue router component with a few extra features. 

## Modal or off-canvas
We have added a modal or off-canvas feature to the routes. 
This is to help you open a modal or off-canvas from the url

## Example Usage
```html
{
        path: '/tasks',
        component: tab,
        meta: {
            popup: 'modal',
            title: 'Task Form'
        }
    }
```
This is a normal vue route with a meta property. The component is the component that will be displayed in the modal. The popup property is set to modal to indicate that the route should be opened in a modal. The title property is the title of the modal.
## Attributes

### popup
- Type: `string`
- Default: `none`
- Required: `false`
- options: `modal`, `canvas`
- Details

    This is the popup attribute that will be used to open the route in a modal
 
      Example: `popup: 'modal'`

### title
- Type: `string`
- Default: `none`
- Required: `false`
- Details

    This is the title of the modal

      Example: `title: 'Task Form'`

### size 
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details

    This is the size of the modal

      Example: `size: 'md'`

