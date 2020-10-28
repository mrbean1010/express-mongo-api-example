# express-mongo-api-example
Super Simple to use first do 
1. npm install
2. Un-comment line 134 
3. Comment it back and restart script (nodemon app.js)

Examples
If you go to localhost:3005/api/success or localhost:3005/api/success it will show you all entries, to post an entry do 

localhost:3005/api/success
{
    "success": "hello"
}

or

localhost:3005/api/fail
{
    "failure": "hello"
}

I wrote this in like 5 minutes there is probably a more simple way to do it but here is an example.
