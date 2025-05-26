const API_URL = import.meta.env.VITE_API_URL || "https://server-lms-elgm.onrender.com";
const myHeaders = {
  "Content-Type": "application/json",
};

const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/task`);
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/task/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching task: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

export {
  getTasks,
  getTaskById,
}; 