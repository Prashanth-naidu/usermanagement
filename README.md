- Initialize a new React project using `create-react-app` for simplicity.
- Install necessary packages like `axios` or `fetch` (for API calls) and `react-router-dom` (if navigation between pages is needed).
- Use the state property in class components to manage data and UI updates:

- Use the `componentDidMount()` lifecycle method to fetch the list of users from the `JSONPlaceholder` API and update the state.
- Display the users in a table or list format with "Edit" and "Delete" buttons.

- Create a button labeled "Add User" that opens a form (either inline or as a modal).
- Include fields for ID, First Name, Last Name, Email, and Department.
- On form submission, send a `POST` request to the `/users` endpoint using `axios` or `fetch`.
- Simulate adding the user to the state list (since JSONPlaceholder doesn't persist data).

- When the "Edit" button is clicked for a user, populate the form fields with the user’s current data.
- Use a `PUT` request to send the updated data to the `/users` endpoint.
- Update the state with the new user details after a successful response.

- When the "Delete" button is clicked, send a `DELETE` request to the `/users/{id}` endpoint.
- Remove the user from the state to simulate the deletion.

- Use `try-catch` blocks around all API calls to handle errors.
- Update the `error` state to show a friendly message to the user in case of failures.

- Validate form inputs (e.g., email format, required fields) before submitting the data.

