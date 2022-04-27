# H&M Database Application Setup 

## Prerequisites

Node.js and MAMP/WAMP must be installed. 

## Installation

- The folder should already come with all the prerequisite libraries, but in the event that there is an error/incompatible version with your machine, run **npm install**. 
- Start your MySQL server. 
- Run the create_database.sql script on your machine. When you do so, make sure to modify the lines on 189, 308, and 328 pointing to the .csv dataset files to where they are in your machine. Then run the views.sql, procedures.sql, and transactions.sql scripts in any order. 
- If you are running on a Windows machine and not a Mac, you may have to remove the socketPath line in server/index.js, on line 13. Also replace the user and password in this file with the user and password for your sql server. 
- Run **npm run server** in one terminal window, then **npm run start** in another terminal window to access the application at localhost:3000. 
