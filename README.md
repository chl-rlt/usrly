# Usrly

User management application build with Fastify and React Admin.

## Table of Contents 📜
- <a href="#getting-started-">Getting Started</a>
-  <a href="#api-features">API Features</a>
- <a href="#how-to-test-the-api-via-swagger">How to test API via Swagger</a>
- <a href="#back-office-">Back Office</a>
- <a href="#data-seeding-">Data Seeding</a>
- <a href="#mocked-email-service-">Mock Email Service</a>

## Getting Started 🎯

1. Clone the repo.

   ```sh
    git clone https://github.com/<your-username>/usrly.git
   ```
2. Create a new .env files from .env.example files
 
```sh
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
HOST=
JWT_SECRET=
CLIENT_URL=
MAIL_HOST=
MAIL_PORT=
MAIL_FROM=
MAIL_SECURE=
VITE_API_URL=
```
3. Run project

 ```sh
   docker compose up
  ```

# API Features 
 
The API provides the following features:

## Authentication Routes

- POST `/v1/auth/token`: Generate a JWT token for authentication.

- POST `/v1/auth/reset-password`: Reset a user's password.

- POST `/v1/auth/send-reset-password-mail`: Send an email to reset the password.

## User CRUD

- GET `/v1/users`: Retrieve the list of users.

- POST `/v1/users`: Create a new user.

- GET `/v1/users/{id}`: Retrieve the details of a user.

- PUT `/v1/users/{id}`: Update an existing user.

- DELETE `/v1/users/{id}`: Delete a user.

## How to test the API via Swagger

1. **Access the Swagger documentation** :
   - Navigate to `http://localhost:3000`.
2. **JWT authentication**:
   - To access protected routes, you must first obtain a JWT token.
   - Use the `/v1/auth/token` endpoint and enter the following credentials:
     - Email: `dev@example.com`
     - Password: `dev123`
   - Copy the returned token and click the `Authorize` button at the top of Swagger.
3. **Test Protected Routes**:
   - Now you can test protected routes such as `/users` (GET, POST, PUT, DELETE).

# Back office 👥
Build with React Admin 
- Accessible at `http://localhost:5173`
- To test application you can use test credentials : 
  - Email: `dev@example.com`
  - Password: `dev123`

## Features 

### User management
- User List : Overview of all users, displaying information such as surname, first name, email address and date of birth. Each column can be filtered by email and sorted.
- User Edit : Page used to modify the details of an existing user
- User creation : Page for adding new users. When a user is created, an email is automatically sent to them so that they can change their password.
- Password management: Option to update a user's password using one of two methods:
   - Manually: The administrator can set a new password for the user directly.
   - Reset by email: Sends a password reset email, allowing the user to choose a new password in complete security.
- Delete user: Option to delete one or more users
- Profile Page : Each user has access to a profile page where they can manage their personal information. From this page, users can update data such as their name, email address and, if applicable, their password.

### Authentification 
- Login page: Interface enabling users to log in to the application using their personal identifiers.
- Logout

# Data Seeding 🌱

To facilitate testing and development, the project includes a data seeding mechanism using Faker and Prisma Fabbrica. This allows you to generate realistic fake data for the users in the database.

## How Data Seeding Works

- `Faker`: Used to generate realistic user data such as names, emails, and birthdates.

- `Prisma Fabbrica`: A factory library used to create multiple user records easily and efficiently.

- `During the initial setup`, the seeding script will run to populate the database with 31 test users, ensuring that the API and back office have data to work with.

# Mocked Email Service 📧
The project includes a mocked email service using Nodemailer and Mailpit. This service is used to send emails during user creation and password reset processes.

### Email Sent During User Creation

When a new user is created, an email is sent to the user with a link to configure their password. This ensures that users set up their own secure passwords.

### Password Reset Email

If a user forgets their password, the admin can trigger a password reset email. This email contains a link that allows the user to reset their password securely.

## Testing Emails with Mailpit

You can access the Mailpit interface at `http://localhost:8025` to see the emails that have been sent.
