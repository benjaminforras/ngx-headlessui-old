The Menu component and related child components are used to quickly build custom dropdown components that are fully accessible out of the box, including correct ARIA attribute management and robust keyboard navigation support.
Menus are built using the `Menu`, `MenuButton`, `MenuItems`, and `MenuItem` components.

[View live demo](/docs/menu/examples)

## Markup:
```html
<div Menu>
    <button type="button" MenuButton>Toggle</button>
    <ul *MenuItems>
        <li MenuItem>Item #1</li>
    </ul>
</div>
```

## Menu

### Props

| Prop | Type                | Default                           | Description                                           |
| ---- | ------------------- | --------------------------------- | ----------------------------------------------------- |
| `static`  | Boolean             | `false` | Whether the element should ignore the internally managed open/closed state.       |

## MenuButton

The `MenuButton` will automatically open/close the MenuItems when clicked, and when the menu is open, the list of items receives focus and is automatically navigable via the keyboard.


## MenuItem

### Props

| Prop       | Type                | Default                           | Description                                                                           |
| ---------- | ------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| `disabled` | Boolean             | `false`                           | Whether or not the item should be disabled for keyboard navigation and ARIA purposes. |

### Template props

| Prop       | Type    | Description                                                                        |
| ---------- | ------- | ---------------------------------------------------------------------------------- |
| `active`   | Boolean | Whether or not the item is the active/focused item in the list.                    |
| `disabled` | Boolean | Whether or not the item is the disabled for keyboard navigation and ARIA purposes. |

### Using ng-template inside `MenuItem`
```html
<li MenuItem>
  <ng-template let-active="active" let-disabled="disabled">
    <a href="#" [class.bg-gray-100]="active" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700">
      Delete
    </a>
  </ng-template>
</li>
```

## Examples
- [Basic example](/docs/menu/examples)
