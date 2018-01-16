# README
<div align="center">
  <strong>A simple app built to practice learning Knockout.js</strong>
</div>

## Before running this app

Make sure mongodb is installed on your machine.
### 1. Installing mongodb with Homebrew
```js
$ brew update
$ brew install mongodb
$ sudo mkdir -p /data/db
```

Next, run:
```js
$ ls -ld /data/db/
```
If your output looks like:
```js
$ drwxr-xr-x  X User  wheel  Date /data/db
```
Then you may need to grant read-write permisions by running:
```js
$ sudo chmod 777 /data/db/
```
If successful then the ls -ld /data/db/ should now output something like:
```js
$ drwxrwxrwx  X User  wheel  Date /data/db
```

## Running the app
To run this, cd into the root directory of the application and build it with:
```js
$ npm install
$ npm run build
```

To get webpack to watch the files for changes, run:
```js
$ npm run webpack
```

In a separate terminal window run the mongodb server with:
```js
$ mongod
```
Keep the terminal window with the mongodb running and open a new window to continue working from.
To see the list of databases available on your machine, run:
```js
$ show dbs
```

If there is a need to use a specific database, run:
```js
$ use [db_name]
```

If there is a need to destroy the database you're currently using, run:
```js
$ db.dropDatabase();
```

Fire up the app in the new terminal window with:
```js
$ node server
```
The app should now be live at http://localhost:8080/

## Tools
This was built with knockout.js, bootstrap css, jquery, underscore.js, and run on a simple express server and a mongodb database.
Note that the purpose of this is for me to understand the knockout.js. As a result I focused on functionality and not the appearance / css.