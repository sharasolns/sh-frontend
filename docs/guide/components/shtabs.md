# Sh Tabs

This is a simple component that creates a nav tab with links to different tabs.
It is useful for creating a tabbed interface.

## Importing
```javascript
import { ShTabs } from '@iankibetsh/shframework'
```

## Example Usage 
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

## Attributes

### tabs
- Type: `array`
- Default: `none`
- Details

    These are the actual tabs
- Example: `['pending','completed','archived']`

### base-url

- Type: `string`
- Default: `none`
- Details


This is the base url, tab urls will be appended to this

     Example: base-url="/admin/tasks"

Do not forget to always start with `/`

### tabs-count
- Type: `object`
- Default: `none`
- Details

    This is the count that will appear on top of the tab. It is an object with the tab name as the key and the count as the value

      Example: :tab-counts="{
        tasks: 2,
        tab: 3
      }"

### active-tab
- Type: `string`
- Default: `none`
- Details

    This is the active tab. It is the tab that will be active by default

      Example: active-tab="completed"
- 
