
# giddaa
Estate Management System

First, clone the repository to your local machine using the command:

git clone https://github.com/Benayo/giddaa.git

run:
npm install to install all dependencies

start the app:
npm run dev

then visit:
http://localhost:3000/login
 

# Login Information
To get started, Log in using the following credentials:

Email: meckydrix@gmail.com
Password: Password1234#

When you log in, you'll be redirected to the properties page.

# How It Works
Login Page
The first page you'll see is the login page. It’s located at the URL: /localstorage:yourport/login

# Login Form
When you submit the form, the app will send your details to the API to authenticate you.

If the login is successful, you’ll be redirected to the properties page. If something goes wrong, an error message will appear at the top of the form, and you'll be asked to try again.

# Auth Context
I used AuthContext to manage the login session using a JWT token. The token is stored in localStorage, so even if you refresh the page, you remain logged in.

# Login Form Component
The login form is a component named LoginForm. This component handles:
1. Input validation
2. API call

# Estate List Component:
The EstateList component is responsible for:
1. Fetching the list of estates from the API using the GET_ALL_ESTATES endpoint.
2. Displaying estate details such as the number of houses and estate address.
3. Allowing users to view more estates by toggling the "Show More" functionality.



