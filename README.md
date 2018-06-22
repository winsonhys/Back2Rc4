# Back2Rc4

Backend for RC4
This contains both database and api for RC4Cal. Uses mysql with node.js. Sequelize is used as ORM to parse queries.
Mocha.js is used for testing routes and database queries.

---

# Initialization

Download mysql-server and
Run `sudo mysql_secure_installation` and follow the steps.
If you cannot connect to localhost via mysql-workbench or any other client, do:

```
sudo mysql
```

When mysql terminal comes up, do:

```
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
```

Now, connect to localhost with username `admin` and password as `password`

<p>After that, go to terminal and do:
```
yarn test:init
```
Ignore the error this time as this command drops the database (which is nonexistent and hence, error) before creating another one.
<p>

---

# Testing

## Starting the test environment

<p>To start the testing, open 3 terminal tabs/windows. In terminal 1, do:

```
yarn tsc:watch
```

This would allow TypeScript files to compile into JavaScript.<p>

<p>Then, in terminal 2, do:
```
yarn test:start
```
to start the server on localhost.
<p>

## Watching test environment

<p>To watch for testing, do `yarn test:watch`<p>

## Migrations

<p>To migrate test database, do `yarn test:migrate`<p>
  
### How to migrate
  
To migrate a database, **2 changes** are required.<br><br>
First:<br>
A migration file needs to be created in the migrations folder (command coming soon).<br><br>
Second:<br>
Models have to be updated.
# **MOST IMPORTANTLY**
Test the migration. As a start, migrate the database, check if tests pass. Rollback the database, check if tests pass. If *both* conditions are satisfied, migrate the database again. Migration is then successful.
