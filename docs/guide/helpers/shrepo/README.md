# shRepo

This contains common helper functions 

## Importing

```javascript
import {shRepo} from '@iankibetsh/shframework'
```
## Methods

### `runPlainRequest`
Use to run doPost request but with a prompt for confirmation
```javascript
shRepo.runPlainRequest('admin/departments/department/delete-department/1').then((res) => {
    if (res.isConfirmed) {
      // success
    }
  })
```
### `runSilentRequest`
Use to run doPost request **WITHOUT**  prompt for confirmation
```javascript
shRepo.runSilentRequest('admin/departments/department/delete-department/1').then((res) => {
    if (res.isConfirmed) {
      // success
    }
  })
```
### `showToast`
shows a toast message
```javascript
shRepo.showToast('module added successfully', 'success')
```
Takes the `message` and `type` in the case above a success

### `swalError`
Triggers a sweet alert popup with error

### `swalSuccess`

Triggers a sweet alert popup with success 
