const API_URL = import.meta.env.VITE_API_URL || "https://server-lms-elgm.onrender.com";
const myHeaders = {
  "Content-Type": "application/json",
};

const getCourses = async () => {
  try {
    const response = await fetch(`${API_URL}/cursos`);
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const getCourseById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cursos/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching course: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

const getCourseByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/cursos`);
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.statusText}`);
    }
    const data = await response.json();
    const filteredCourses = data.filter(
      (course) => course.category === category
    );
    return filteredCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const postCourse = async (course) => {
  try {
    const response = await fetch(`${API_URL}/cursos`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        ...course,
        moduloIds: [],
        estudianteIds: [],
        docenteIds: [],
        taskIds: []
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating course: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

const putCourse = async (course, id) => {
  try {
    // Extraer los módulos del curso
    const { modules, ...courseData } = course;

    // Actualizar el curso
    const courseResponse = await fetch(`${API_URL}/cursos/${id}`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        ...courseData,
        moduloIds: courseData.moduloIds || [],
        estudianteIds: courseData.estudianteIds || [],
        instructorId: courseData.instructorId || [],
        taskIds: courseData.taskIds || []
      }),
    });

    if (!courseResponse.ok) {
      throw new Error(`Error updating course: ${courseResponse.statusText}`);
    }

    const updatedCourse = await courseResponse.json();

    // Si hay módulos, actualizarlos o crearlos
    if (modules && Array.isArray(modules)) {
      const modulePromises = modules.map(async (module) => {
        const moduleData = {
          ...module,
          cursoId: id
        };

        if (module.id) {
          // Actualizar módulo existente
          const moduleResponse = await fetch(`${API_URL}/modulos/${module.id}`, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(moduleData),
          });

          if (!moduleResponse.ok) {
            throw new Error(`Error updating module: ${moduleResponse.statusText}`);
          }

          const updatedModule = await moduleResponse.json();
          return updatedModule.id;
        } else {
          // Crear nuevo módulo
          const moduleResponse = await fetch(`${API_URL}/modulos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(moduleData),
          });

          if (!moduleResponse.ok) {
            throw new Error(`Error creating module: ${moduleResponse.statusText}`);
          }

          const createdModule = await moduleResponse.json();
          return createdModule.id;
        }
      });

      // Esperar a que todos los módulos se actualicen/creen y obtener sus IDs
      const moduleIds = await Promise.all(modulePromises);

      // Actualizar el curso con los nuevos IDs de los módulos
      const updateResponse = await fetch(`${API_URL}/cursos/${id}`, {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify({
          moduloIds: moduleIds
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Error updating course with module IDs: ${updateResponse.statusText}`);
      }
    }

    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

const deleteCourse = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cursos/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (!response.ok) {
      throw new Error(`Error deleting course: ${response.statusText}`);
    }

    return id;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

const getCourseWithModules = async (courseId) => {
  try {
    // 1. Obtener el curso
    const courseResponse = await fetch(`${API_URL}/cursos/${courseId}`);
    if (!courseResponse.ok) throw new Error('Error fetching course');
    const course = await courseResponse.json();

    // 2. Obtener todos los módulos y filtrar los asociados
    const allModulesResponse = await fetch(`${API_URL}/modulos`);
    if (!allModulesResponse.ok) throw new Error('Error fetching modules');
    const allModules = await allModulesResponse.json();

    // Filtrar solo los módulos cuyos id estén en moduloIds
    const moduleIds = (course.moduloIds || []).map(String);
    const modules = allModules.filter(m => moduleIds.includes(String(m.id)));

    // 3. Retornar el curso con los módulos asociados
    return { ...course, modules };
  } catch (error) {
    console.error('Error fetching course with modules:', error);
    throw error;
  }
};

const getCourseTasks = async (courseId) => {
  try {
    const response = await fetch(`${API_URL}/task?cursoId=${courseId}`);
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching course tasks:", error);
    throw error;
  }
};

export {
  getCourses,
  getCourseById,
  getCourseByCategory,
  postCourse,
  putCourse,
  deleteCourse,
  getCourseWithModules,
  getCourseTasks
};
