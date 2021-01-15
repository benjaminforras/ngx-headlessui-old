The `Transition` component lets you add enter/leave transitions to conditionally rendered elements, using CSS classes to control the actual transition styles in the different stages of the transition.

[View live demo](/docs/transition/examples)

## Markup:
```html
<transition
    enter="transition-opacity duration-75"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0">
    <span>I will fade in and out</span>
</transition>
```

By default, a `Transition` will enter and leave instantly, which is probably not what you're looking for if you're using this library.

To animate your enter/leave transitions, add classes that provide the styling for each phase of the transitions using these props:

- **enter**: Applied the entire time an element is entering. Usually you define your duration and what properties you want to transition here, for example `transition-opacity duration-75`.
- **enterFrom**: The starting point to enter from, for example `opacity-0` if something should fade in.
- **enterTo**: The ending point to enter to, for example `opacity-100` after fading in.
- **leave**: Applied the entire time an element is leaving. Usually you define your duration and what properties you want to transition here, for example `transition-opacity duration-75`.
- **leaveFrom**: The starting point to leave from, for example `opacity-100` if something should fade out.
- **leaveTo**: The ending point to leave to, for example `opacity-0` after fading out.

## Props

| Prop          | Type                                  | Description                                                                           |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| `show`        | Boolean                               | Whether the children should be shown or hidden.                                       |
| `enter`       | String _(Default: '')_                | Classes to add to the transitioning element during the entire enter phase.            |
| `enterFrom`   | String _(Default: '')_                | Classes to add to the transitioning element before the enter phase starts.            |
| `enterTo`     | String _(Default: '')_                | Classes to add to the transitioning element immediately after the enter phase starts. |
| `leave`       | String _(Default: '')_                | Classes to add to the transitioning element during the entire leave phase.            |
| `leaveFrom`   | String _(Default: '')_                | Classes to add to the transitioning element before the leave phase starts.            |
| `leaveTo`     | String _(Default: '')_                | Classes to add to the transitioning element immediately after the leave phase starts. |
| `beforeEnter` | Function                              | Callback which is called before we start the enter transition.                        |
| `afterEnter`  | Function                              | Callback which is called after we finished the enter transition.                      |
| `beforeLeave` | Function                              | Callback which is called before we start the leave transition.                        |
| `afterLeave`  | Function                              | Callback which is called after we finished the leave transition.                      |

## Examples
- [Basic example](/docs/transition/examples)
