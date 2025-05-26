const API_URL = import.meta.env.VITE_API_URL || 'https://server-lms-elgm.onrender.com';
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
    const response = await fetch(`${API_URL}/estudiantes/${userId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Error updating user");
    return response.json();
};

