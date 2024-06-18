# @webreflection/lie

An optionally sync promise that directly passes along its value, particularly useful for any *API* that handles both synchronous and asynchronous use cases through explicit `.then(...)` invocation.

```js
import lie from '@webreflection/lie';

lie(123)
  // invoked synchronously
  .then(value => {
    console.log('sync #1', value);
    return value * 2;
  })
  // invoked synchronously
  // because the result is an async function
  // the returned value will be a Promise this time
  .then(async value => {
    console.log('sync #2', value);
    return value * 2;
  })
  // this time is a Promise
  .then(value => {
    console.log('async #1', value);
  })
;

console.log('sync #1 and #2 already logged');
// async #1 going to be logged after
```
