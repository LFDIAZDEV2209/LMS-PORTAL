const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const myHeaders = {
  "Content-Type": "application/json",
};

// Obtener todos los progresos (cursos)
const getProgress = async () => {
  try {
    const response = await fetch(`${API_URL}/progress`);
    if (!response.ok) throw new Error(`Error fetching progress: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw error;
  }
};

export {
    getProgress,
  };