# How to run it on your machine?

## server
make sure you have PostgreSQL installed in your machine.
- open terminal in server directory
- do,
```bash
$ npm install
```
- go to test.env and provide the required information
- do,
```bash
$ npm run dev # to run it in dev environment
```
- your server might be running on port 3000. If not, just update the client script to request on 'http://localhost:3000/api/user-signup/'

## client

- open another terminal in client directory
- do,
```bash
$ npm install -g serve
$ serve -s ./
```
- If you have vscode live server extension, you can use it as well.
- Once both the servers are up. You can test the application

Thank you.