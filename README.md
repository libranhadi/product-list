# How To Start
Brief description or introduction of the project.

## Setup Environment
COPY env.example to .env and set up your .env file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=your_db
PORT=3000

```

## Installation
1. Install Dependencies
```
npm install
```

## Setup

Follow these steps to set up the database for this project:

### 1. **Create the Database**

Ensure that you have a MySQL database server running and create a database named from .env . You can do this using the MySQL command line or any MySQL management tool. 

**Using MySQL Command Line:**

1. Open your terminal or command prompt.
2. Log in to MySQL:
   ```bash
    mysql -u root -p
    ```
Enter your MySQL root password when prompted.

3. Create the database using the name specified in your .env file
    ```bash
    CREATE DATABASE your_db;
    ```
4. Ensure you are logged into MySQL and have selected the database:
    ```bash
    USE your_db;
    ```
5. Import the SQL script file:
    ```bash
    mysql -u root -p your_db < path/to/product_list.sql
    ```

**Using GUI Tools**
1. Open your GUI tool and connect to your MySQL server using the credentials:
2. select the database 
3. Import the SQL script using the import or execution feature of your tool

## RUN 
```
npm run dev
```


