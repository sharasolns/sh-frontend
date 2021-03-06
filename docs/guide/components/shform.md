# Sh Form

## sh-form

This helps generate and manage front end forms

Inputs will be autogenerated. 

Validation from laravel backend will also be handled

### Basic Example

#### Import the component
```javascript
import { ShForm } from '@iankibetsh/shframework'
```

#### Using it

```html
<sh-form
:fields="['name','email','password']"
action="users/add"
:successCallback="userRegistered"
/>
```

Above form will generate a form with 3 fields

- name field
- email field
- password field

Form component will automatically set password field to be input type password

### Attributes

#### fields
- Type: `array`
- Default: `none`
- Details:
  
    These are the form files, like inputs, select etc
- Example: ```['name','email']```

#### action
- Type: ``string``
- default: ``none``
- Details: 

    This is the action url to the api backend where the post request will be handled
- Example: ``users/add``

#### current_data
- Type: ``object``
- Default: ``null``
- Details:
  
    Existing form data, used mostly when editing an item. Form fields will be 
    autofilled with data from this object. Key of the array is the input field
- Example: 
```
:current_data="{
name: 'John Doe',
email: 'john@example.com'
}"
```
#### successCallback
- Type: ``function/method``
- Default: ``none``
- Details: 

    A method that will be invoked/called by the form when data is submitted successfully
- Example: ``:success_callback="userRegistered"``

#### fill_selects
- Type: ``object``
- Default: ``none``
- Details:
    Fill select element with select options, id will be used as option value and name will be option label displayed
- Example: 
```
:fill_selects="{register_as:{
          data:[
            {id:'agent',name:'Agent'},
            {id:'customer',name:'Customer'},
          ]
        }}
```
