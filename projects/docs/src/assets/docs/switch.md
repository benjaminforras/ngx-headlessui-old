The `Switch` component and related child components are used to quickly build custom switch/toggle components that are fully accessible out of the box, including correct ARIA attribute management and robust keyboard support.

[View live demo](/docs/switch/examples)

Switches are built using the `Switch` component. Optionally you can also use the `SwitchGroup` and `SwitchLabel` components.

## Markup:
```html
<div SwitchGroup class="flex items-center space-x-4">
  <button Switch (change)="onChange($event)" class="w-11 focus:outline-none focus:shadow-outline relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer" [ngClass]="{'bg-indigo-600': switchValue, 'bg-gray-200': !switchValue}">
    <span class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full" [ngClass]="{ 'translate-x-5': switchValue, 'translate-x-0': !switchValue }"></span>
  </button>
</div>
```

### Using a custom label

By default the `Switch` will use the contents as the label for screenreaders. If you need more control, you can render a `SwitchLabel` outside of the `Switch`, as long as both the switch and label are within a parent `SwitchGroup`.

Clicking the label will toggle the switch state, like you'd expect from a native checkbox.

```html
<div SwitchGroup class="flex items-center space-x-4">
  <span class="flex flex-col">
    <label SwitchLabel class="text-sm font-medium leading-5 text-gray-900">Enable notifications</label>
  </span>
  <button Switch (change)="onChange($event)" class="w-11 focus:outline-none focus:shadow-outline relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer" [ngClass]="{'bg-indigo-600': switchValue, 'bg-gray-200': !switchValue}">
    <span class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full" [ngClass]="{ 'translate-x-5': switchValue, 'translate-x-0': !switchValue }"></span>
  </button>
</div>
```

## Examples
- [Basic example](/docs/menu/examples)
