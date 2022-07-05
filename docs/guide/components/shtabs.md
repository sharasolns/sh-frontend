# Sh Tabs

A bootstrap 5 nav tab

Tabs are normal router links going to children of the base url, in 
our case `/admin/tasks`

Do not forget to always start with `/`

## Basic Example

### Importing
```javascript
import { ShTabs } from '@iankibetsh/shframework'
```

### Using 
```html
<sh-tabs
        :tabs="['pending','completed','archived']"
        base-url="/admin/tasks"
/>
```

Above will create nav tab with 3 nav tab items

- Pending
- Completed
- Archived

### Attributes/Options

#### tabs
- Type: `array`
- Default: `none`
- Details

    These are the actual tabs
- Example: `['pending','completed','archived']`

#### base-url

- Type: `string`
- Default: `none`
- Details

    This is the base url, tab urls will be appended to this
- Example: `/admin/tasks`


