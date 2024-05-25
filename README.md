# gZoomMove.js

A js module for zooming and dragging DOM elements. Touch screen has support.

[Try it on demo](https://gibass.github.io/gZoomMove.js/)

## Install

You can install the module via npm.

```bash
  npm install @gibass/gzoom-move --save
```

## Usage

```javascript
import GZoomMove from @gibass/gzoom-move;

// Basic usage with default options
new GZoomMove(document.querySelector('#zoom')
```


### Options

```javascript
import GZoomMove from @gibass/gzoom-move;

new GZoomMove(document.querySelector('#zoom', {
    move: true, // enable drag action
    zoom: true, // enable zoom action
    scale: {min: 0.1, max: 4}, // scale min and max value for zooming
    controls: { // action control
        zoomIn : document.querySelector('.control-zoom-in'),
        zoomOut : document.querySelector('.control-zoom-out'),
        reset : document.querySelector('.control-reset')
    },
})
```
---

#### `move` option
To enable drag action on the DOM Element, this value need to be `true`
* Default value => `true`

---

#### `zoom` option
To enable zoom action on the DOM Element, this value need to be `true`
* Default value => `true`

---

#### `scale` option
Define the max and min values for scale properties of css transform style.  
* Default value => `{ min: 0.1, max: 4 }`
* If `min` value isn't defined like: `scale: {max: 6}`, it take the default value like `{ min: 0.1, max: 6 }`
* if `max` value is missing like `scale: {min: 0.5}`, it take max integer number `Number.MAX_SAFE_INTEGER`, like an infinite zoom

---

#### `controls` option
To specify the element control action to `Zoom` / `UnZoom` / `Reset` 
* Default value => `controls: { zoomIn: false, zoomOut: false, reset: false }`
* `zoomIn` : Zoom DOM element with scale `0.5` step
* `zoomOut` : UnZoom DOM element with scale `-0.5` step
* `reset` : reset the DOM element to the initial appearance

---

Licensed under the MIT License.