# Sh Table

## importing

```javascript
import {ShTable} from '@iankibetsh/shframework'
```

## Example Usage

```html
<sh-table
      :headers="['id','name','description']"
  end-point="tasks/list"
  />
```

## Attributes

### `headers`

- Type: `array`
- Default: `none`
- Required: `true`
- Details

    These are table headers for the table that will be generated
- Example: `['id','name','description']`
### `end-point`

- Type: `string`
- Default: `none`
- Required: `true`
- Details

    It's the endpoint of table data, usually it's the backend api url
- Example: `tasks/list`
