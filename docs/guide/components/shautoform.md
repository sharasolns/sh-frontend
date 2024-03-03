#  Sh Auto Form

sh-auto-form is a component that generates a form. It's a wrapper around the bootstrap form.
Using this component makes your work easier and faster.
To generate a form, you need to pass the fields, and the end-point of the form data. This will populate the form with the data from the end-point.
This is almost similar to sh-form but it's more automatic.
You can specify the type of fields and what you want to display in the form.

## importing

```javascript
import {ShAutoForm} from '@iankibetsh/shframework'
```

## Example Usage

```html
<sh-auto-form
      :fields="['id','name','description']"
  end-point="tasks/list"
  />
```

## Attributes

### `fields`
- Type: `array`
- Default: `none`
- Required: `true`
- Details

    These are form fields for the form that will be generated

Example :
```
 fields="['id','name','description']"
```

### `end-point`
- Type: `string`
- Default: `none`
- Required: `true`
- Details

    It's the endpoint of form data, usually it's the backend api url

Example :
``` 
end-point="tasks/list"
```

Custom Fields 

Inside the fields array, 
you can specify the type of fields you want to display in the form.
let say you want to display a select field, you can specify it like this

```
 {
        field:'task_id',
        type: 'suggest',
        suggests: true,
        url: 'tasks/list/any?all=1'
 }, 
```
In this case, the field will be a select field and it will be populated with the data from the url specified.
You can also specify the type of fields you want to display in the form. this Type can be 
- text 
- email
- password
- number
- date
- textarea
- suggest

You can also add classes to the fields, for example, you can add the class form-control to the fields like this

```
 {
        field:'task_id',
        type: 'suggest',
        suggests: true,
        url: 'tasks/list/any?all=1',
        class: 'form-control'
 }, 
```
