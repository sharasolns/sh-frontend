# Routes 

This is a guide to the routes component. 
It's the normal vue router component with a few extra features. 

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
 
    
Example : 
```
popup: 'modal'
```

### title
- Type: `string`
- Default: `none`
- Required: `false`
- Details

    This is the title of the modal

Example : 
``
title: 'Task Form'
```

### size 
- Type: `string`
- Default: `md`
- Required: `false`
- Options: `sm`, `md`, `lg`, `xl`
- Details

    This is the size of the modal

      
Example :

```
size: 'md'
```

### popup query form
- Type: `string`
- Default: `none`
- Required: `false`
- Details
- Options: `modal`, `canvas`
- Details
         
 This is the popup attribute that will be used to open the route in a modal
 
Example :
```html
 <router-link 
                     to="/tasks?popup=modal&title=New Task&comp=ShQueryForm&fields=name,email,phone&action=tasks/store"
                     class="btn btn-info btn-sm ms-2">
                    Popup 
        </router-link>
```

#### pageCount
- Type: `number`
- Default: `10`
- Required: `false`
- Details

    This is the number of items that will be displayed per page in the table.

Example :
```
pageCount: 10
```

#### hideCount
- Type: `boolean`
- Default: `false`
- Required: `false`
- Details

    This is the attribute that will be used to hide the count of the table


Example : 

```
hideCount: true
```

#### hideLoadMore
- Type: `boolean`
- Default: `false`
- Required: `false`
- Details

    This is the attribute that will be used to hide the load more button

  
Example : 
```
hideLoadMore: true
```

#### reload
- Type: `number`
- Default: `0`
- Required: `false`
- Details

    This is the attribute that will be used to reload the table

   
Example : 
```
reload= "1"
```



#### Explanation
This is a normal router link with a query string.

The query string has the popup attribute set to modal to indicate that the route should be opened in a modal.

The title attribute is the title of the modal.

The comp attribute is the component that will be displayed in the modal. 

The fields attribute is the fields that will be displayed in the form.

The action attribute is the action that will be called when the form is submitted.
