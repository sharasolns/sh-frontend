# Sh Form
This is a form component that will help you generate forms easily. 
It will help you generate forms with fields, select, textarea, radio, checkbox etc. 
It will also help you fill select elements with data from the backend

Make sure you have .env file with the following variables
```
VITE_APP_API_URL=http://localhost:8000/api/
```
This will be the base url of the api backend where the form will send request 


### Importing

#### Import the component
```javascript
import { ShForm } from '@iankibetsh/shframework'
```

## Example Usage

```html
    <sh-form
            :fields="['name','email','password']"
            action="users/add"
            :successCallback="userRegistered"
            :method="put"
    />
```
## Attributes

### fields
- Type: `array`
- Default: `none`
- Required: `true`
- Details:
  
    These are the form files, like inputs, select etc
 
      Example: ```['name','email','password']```

### action
- Type: ``string``
- default: ``none``
- Required: ``true``
- Details: 

    This is the action url to the api backend where the request will be handled
    
    The action will be appended to the base url of the api backend defined in the .env file

      Example: ``users/add``
- If VITE_APP_API_URL is defined in the .env file, the request will be sent to http://localhost:8000/api/users/add

### method
- Type: ``string``
- Default: ``post``
- Required: ``false``
- Options: ``post``, ``put``, ``patch``, ``delete``
- Details:
  
    This is the method of the request

      Example: :method="put"

### success-callback
- Type: ``function/method``
- Default: ``none``
- Required: ``false``
- Details:
  A method that will be invoked/called by the form when data is submitted successfully

      Example: :success-callback="userRegistered"
Note: The method should be defined in the parent component
```javascript
<script setup>
    const userRegistered = () => {
        console.log('User registered')
    }
</script>
```

### labels
- Type: ``object``
- Default: ``none``
- Required: ``false``
- Details: 

    This will help you add labels to the form fields. Key of the object is the name of the input field and value is the label of the input field displayed on the form 
```
Example:
     :labels="{
        password: 'Enter your password'
       }"
```

### fill-selects
- Type: ``object``
- Default: ``none``
- Details: 
  
Example: 1
    Fill select element with select options, id will be used as option value and name will be option label displayed
```
Example:
    :fill-selects="{
        gender: {
          data: [
              {
                id: 'Male',
                name: 'Male'
              },
              {
                id: 'Female',
                name: 'Female'
              }
          ]
        }
      }"
``` 
    Example: 2
Fill select element with data from the backend. The data will be fetched from the backend and used as the options of the select element. 
```
:fill-selects="{
    user_id: {
              url: 'admin/users/list?all=1',
              column: 'name',
              value: 'id'
             }
}"
```
### Explanation of the attributes
- `user_id`: This is the name of the select element
- `url`: This is the url of the backend where the data will be fetched from 
- `column`: This is the column of the data that will be used as the option label displayed on the select element. If not defined, the name of the data will be used as the option label displayed on the select element
- `value`: This is the column of the data that will be used as the option value of the select element. If not defined, the id of the data will be used as the option value of the select element
- Fill selects can also have suggestion (searchable), this will help search 

Fill selects can also have suggestion with multi select, this will help search
```
:fill-selects="{
    user_id: {
      suggests: true,
      allowMultiple: true
      url: 'admin/users/list?all=1'
  }"
```

### customComponent
This will help you add custom component as a form element instead
of using prebuilt

e.g

Import First
```javascript
import CkEditor from '@/lib/components/form-components/CkEditor.vue'
```

Use it this way in your sh-form, key is the name of 

```html
<sh-form
        :fields="['mail','name']"
        :custom-component="{
    mail: CkEditor
      }"
        :current-data="{
        email: 'jack@gmail.com'
      }"
        action="auth/register"
/>
```
Above form will generate a form with 3 fields

- name field
- email field
- password field

Form component will automatically set password field to be input type password


### current-data
- Type: ``object``
- Default: ``null``
- Required: ``false``
- Details:

  Existing form data, used mostly when editing an item. Form fields will be
  autofilled with data from this object. Key of the array is the input field
##### Example:
  ```
  :current-data="{
      email:'johnss@gmail.com'
   }"
```


