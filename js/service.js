const API_BASE_URL = 'http://localhost:3000/api/users';

/**
 * Fetch all users.
 */
async function getUsers() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

/**
 * Fetch a user by ID.
 */
async function getUserById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch user with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user by ID:', error);
  }
}

/**
 * Add a new user.
 */
async function addUser(userData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to add user');
    return await response.json();
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

/**
 * Update a user by ID.
 */
async function updateUser(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(`Failed to update user with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

/**
 * Delete a user by ID.
 */
async function deleteUser(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Failed to delete user with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
