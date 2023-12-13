import mysql.connector

# Replace these values with your MySQL server details
host = "172.17.0.2"
user = "root"
password = "my-secret-pw"
database = "temp"


# Establish a connection to the MySQL server
try:
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    if connection.is_connected():
        print("Connected to MySQL server")

        # Create a cursor to execute SQL commands
        cursor = connection.cursor()

        # Create a table named "student"
        create_table_query = """
        CREATE TABLE IF NOT EXISTS student (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            roll_no INT NOT NULL,
            branch VARCHAR(255) NOT NULL
        );
        """
        cursor.execute(create_table_query)
        print("Table 'student' created successfully")

        # Insert values into the "student" table
        insert_data_query = """
        INSERT INTO student (name, roll_no, branch)
        VALUES (%s, %s, %s);
        """
        student_data = [
            ('John Doe', 101, 'Computer Science'),
            ('Jane Smith', 102, 'Electrical Engineering'),
            ('Bob Johnson', 103, 'Mechanical Engineering')
        ]
        cursor.executemany(insert_data_query, student_data)
        print("Values inserted into the 'student' table")

        # Commit the changes and close the cursor
        connection.commit()
        cursor.close()

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    # Close the connection when done
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("Connection closed")
