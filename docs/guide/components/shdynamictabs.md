# Sh Dynamic Tabs
 An easy way to incorporate bootstrap 5 tabs in your vue  project.
 It takes an array of tabs and renders them

## importing

```javascript
import {ShDynamicTabs} from '@iankibetsh/shframework'
import TabOne from '@/tabs/TabOne.vue'
import TabTwo from '@/tabs/TabTwo.vue'
```

## Example Usage

```html
<sh-dynamic-tabs
        currentTab='Tab Two'
        :tabs="[
                 {
                    label: 'Tab One',
                    component: TabOne
                },
                {
                    label: 'Tab Two',
                    component: TabTwo
                }
              ]"
/>
```
## Attributes

### `tabs`
- Type: `array`
- Default: `none`
- Required: `true`
- Details
    This will be the array of tabs to be rendered
- Example:

```html 
 :tabs="[{label: 'Tab One', component: TabOne},{label: 'Tab Two', component: TabTwo}]"
 ```
- Explanation of the attributes 
    - `label`: This will be the label of the tab
    -     Example: `Tab One`
    - `component`: This will be the component to be rendered when the tab is clicked make sure to import the component
    -     Example: `TabOne

### `currentTab`
- Type: `string`
- Default: `none`
- Required: `false`
- Explanation of the attributes 
    - `currentTab`: This will be the label of the tab that will be active when the component is rendered
    -     Example: `Tab Two`
```
