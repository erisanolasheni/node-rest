## Simple Node REST API
This is a simple Node RESTS API (No external module, No external framework) app app build to function as expected.
The purpose is just to create a prototype to right a simple rest API in node, 
more coming.

### Start
``` node index.js ```

### Test
Send a get request to ```/hello``` you will get a response related to this: ``` {
            'message': `Hi, how're you doing?`
        } ```

### Use
To use this API application, you can add more to the handlers configuration in the ```index.js``` file. 
#### Example
``` handlers.time =  (data = null, callback) => {
        callback(200, {
            'time': new Date()
        })
// Register the route in the router object
router.time = handlers.time

```
