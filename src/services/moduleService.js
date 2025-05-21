const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const myHeaders = {
  "Content-Type": "application/json",
};

const getModules = async () => {
  try {
    const response = await fetch(`${API_URL}/modulos`);
    if (!response.ok) {
      throw new Error(`Error fetching modules: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
};

const getModuleById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/modulos/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching module: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching module:", error);
    throw error;
  }
};

const getModulesByCourse = async (courseId) => {
  try {
    const response = await fetch(`${API_URL}/modulos?cursoId=${courseId}`);
    if (!response.ok) {
      throw new Error(`Error fetching modules: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
};

const createModule = async (module) => {
  try {
    const response = await fetch(`${API_URL}/modulos`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(module),
    });
    if (!response.ok) {
      throw new Error(`Error creating module: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
};

const updateModule = async (module, id) => {
  try {
    const response = await fetch(`${API_URL}/modulos/${id}`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(module),
    });
    if (!response.ok) {
      throw new Error(`Error updating module: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
};

const deleteModule = async (id) => {
  try {
    const response = await fetch(`${API_URL}/modulos/${id}`, {
      method: 'DELETE',
      headers: myHeaders,
    });
    if (!response.ok) {
      throw new Error(`Error deleting module: ${response.statusText}`);
    }
    return id;
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
};

export {
  getModules,
  getModuleById,
  getModulesByCourse,
  createModule,
  updateModule,
  deleteModule,
}; 