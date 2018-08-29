## Simple Node REST API
This is a simple Node JSON REST API (No external module, No external framework) app app build to function as expected.
The purpose is just to create a prototype to right a simple rest API in node, 
more coming.

### Start
``` node index.js ```

### Test
Send a get request to ```/hello``` you will get a response related to this: ``` {
            "message": "Hi, how're you doing?"
        } ```

### Use
To use this API application, you can add more to the handlers configuration in the ```index.js``` file. 
#### Example 
```
// Define your handler function
handlers.time =  (data = null, callback) => {
        callback(200, {
            'message': new Date()
        })

// Register the route in the router object
router.time = handlers.time

```
#### Test your handler
```
curl "http://localhost:3000/time"
```

#### Sample response
```
{ "message": "Wed Aug 29 2018 09:52:40 GMT+0100 (West Africa Standard Time)" }

```
