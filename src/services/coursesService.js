const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
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
        docenteIds: courseData.docenteIds || [],
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
    const [courseResponse, modulesResponse] = await Promise.all([
      fetch(`${API_URL}/cursos/${courseId}`),
      fetch(`${API_URL}/modulos?cursoId=${courseId}`),
    ]);

    if (!courseResponse.ok || !modulesResponse.ok) {
      throw new Error('Error fetching course or modules');
    }

    const course = await courseResponse.json();
    const modules = await modulesResponse.json();

    return { ...course, modules };
  } catch (error) {
    console.error("Error fetching course with modules:", error);
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

const enrollStudent = async (studentId, courseId) => {
  try {
    const response = await fetch(`${API_URL}/matricula`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        studentId,
        cursoId: courseId,
        fechaRegistro: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error(`Error enrolling student: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error enrolling student:", error);
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
  getCourseTasks,
  enrollStudent,
};
