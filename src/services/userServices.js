const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const myHeaders = new Headers({
    'Content-Type': 'application/json',
});

const REQUIRED_FIELDS = [
    "name",
    "email",
    "phone",
    "location",
    "studentId",
    "program",
    "startDate",
    "expectedGraduation"
];


function validateUserData(data) {
    const filtered = {};
    REQUIRED_FIELDS.forEach(field => {
        if (data[field]) filtered[field] = data[field];
    });
    const missing = REQUIRED_FIELDS.filter(field => !filtered[field]);
    if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(", ")}`);
    }
    return filtered;
}

export const getUser = async (userId) => {
    const response = await fetch(`${API_URL}/estudiantes/${userId}`);
    if (!response.ok) throw new Error("User not found");
    return response.json();
};

export const updateUser = async (userId, userData) => {
    const validData = validateUserData(userData);
    const response = await fetch(`${API_URL}/estudiantes/${userId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(validData),
    });
    if (!response.ok) throw new Error("Error updating user");
    return response.json();
};

export const createUser = async (userData) => {
    const validData = validateUserData(userData);
    const response = await fetch(`${API_URL}/estudiantes`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(validData),
    });
    if (!response.ok) throw new Error("Error creating user");
    return response.json();
};

export const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/estudiantes/${userId}`, {
        method: 'DELETE',
        headers: myHeaders,
    });
    if (!response.ok) throw new Error("Error deleting user");
    return true;
};
