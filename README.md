# Back2Rc4
Backend for RC4
This contains both database and api for RC4Cal. Uses mysql with node.js. Sequelize is used as ORM to parse queries. For testing,
Mocha would (potentially) be used.

# To my partner
Please gimme a call or msg before you do anything because test DB is not set up yet. Please dont screw up the online db T_T

# TO TEST: (IN PROGRESS)
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

