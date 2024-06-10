import React, { useState } from 'react'; // Import useState hook
import '../CSS/Search.css'; // Import the CSS file

export default function Search() {
  const [showForm, setShowForm] = useState(false); // State for form visibility
  const [userData, setUserData] = useState([]); // State to store user data

  const handleAddUser = () => {
    setShowForm(true); // Show the form on button click
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the form on close action
  };

  const handleSaveUser = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Access form data using event.target.elements
    const name = event.target.elements.name.value;
    const address = event.target.elements.address.value;
    const email = event.target.elements.email.value;
    const mobileNumber = event.target.elements.mobileNumber.value;
    const dob = event.target.elements.dob.value;

    // Create a new user object
    const newUser = { name, address, email, mobileNumber, dob };

    // Update user data state with the new user
    setUserData([...userData, newUser]);

    handleCloseForm(); // Hide the form after saving
  };

  return (
    <div className="search">
      <h1>Search Page</h1>
      <div className="content">
        <button className="add-user" onClick={handleAddUser}>
          + Add User
        </button>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Details</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over userData to render table rows */}
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* You can add a "Details" button or link here */}
                <td>Details</td>
                {/* You can add a "Modify" button or link here */}
                <td>Modify</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form (conditionally rendered based on showForm state) */}
      {showForm && (
        <div className="popup">
          <div className="form-container">
            <h2 className="form-heading">Add User</h2>
            <form onSubmit={handleSaveUser}>
              <label className="form-input-label" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input"
              />
              <label className="form-input-label" htmlFor="address">
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                required
                className="form-input"
              />
              <label className="form-input-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-input"
              />
              <label className="form-input-label" htmlFor="mobileNumber">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                required
                className="form-input"
              />
              <label className="form-input-label" htmlFor="dob">
                Date of Birth:
              </label>
              <input type="date" id="dob" name="dob" required className="form-input" />
              <div className="form-buttons">
                <button type="submit" className="form-button">
                  Save
                </button>
                <button type="button" onClick={handleCloseForm} className="form-button">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
