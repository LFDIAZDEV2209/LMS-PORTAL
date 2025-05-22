const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const myHeaders = new Headers({
    'Content-Type': 'application/json',
});

export const getUser = async (userId) => {
  const response = await fetch(`${API_URL}/estudiantes/${userId}`);
  return response.json();
};

export const updateUser = async (userId, userData) => {
    const response = await fetch(`${API_URL}/estudiantes/${userId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(userData),
    });
    return response.json();
};

