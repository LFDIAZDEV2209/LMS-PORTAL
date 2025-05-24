const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const myHeaders = {
  "Content-Type": "application/json",
};

const getTeachers = async () => {
  try {
    const response = await fetch(`${API_URL}/docentes`);
    if (!response.ok) {
      throw new Error(`Error fetching teachers: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

const getTeacherWithCourses = async (teacherId) => {
  try {
    // Obtener el profesor
    const teacherResponse = await fetch(`${API_URL}/docentes/${teacherId}`);
    if (!teacherResponse.ok) {
      throw new Error('Error fetching teacher');
    }
    const teacher = await teacherResponse.json();

    // Obtener el curso asignado al profesor
    const courseResponse = await fetch(`${API_URL}/cursos/${teacher.cursoId}`);
    if (!courseResponse.ok) {
      throw new Error('Error fetching course');
    }
    const course = await courseResponse.json();

    // Obtener los módulos del curso
    const modulesResponse = await fetch(`${API_URL}/modulos?cursoId=${course.id}`);
    if (!modulesResponse.ok) {
      throw new Error('Error fetching modules');
    }
    const modules = await modulesResponse.json();

    // Obtener las tareas del curso
    const tasksResponse = await fetch(`${API_URL}/task?cursoId=${course.id}`);
    if (!tasksResponse.ok) {
      throw new Error('Error fetching tasks');
    }
    const tasks = await tasksResponse.json();

    // Calcular métricas de desempeño
    const totalStudents = course.estudianteIds?.length || 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      ...teacher,
      course: {
        ...course,
        modules,
        tasks,
        metrics: {
          totalStudents,
          completionRate,
          satisfactionRate: 95, // Ejemplo de métrica
          approvalRate: 92 // Ejemplo de métrica
        }
      }
    };
  } catch (error) {
    console.error("Error fetching teacher with courses:", error);
    throw error;
  }
};

const createTeacher = async (teacher) => {
  try {
    // Primero creamos el profesor
    const teacherResponse = await fetch(`${API_URL}/docentes`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(teacher),
    });
    
    if (!teacherResponse.ok) {
      throw new Error(`Error creating teacher: ${teacherResponse.statusText}`);
    }
    
    const newTeacher = await teacherResponse.json();
    
    // Solo actualizamos el curso si se proporcionó un cursoId válido
    if (teacher.cursoId) {
      const courseResponse = await fetch(`${API_URL}/cursos/${teacher.cursoId}`);
      if (!courseResponse.ok) {
        throw new Error(`Error fetching course: ${courseResponse.statusText}`);
      }
      
      const course = await courseResponse.json();
      const updatedDocenteIds = [...(course.docenteIds || []), newTeacher.id];
      
      const updateResponse = await fetch(`${API_URL}/cursos/${teacher.cursoId}`, {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify({ docenteIds: updatedDocenteIds }),
      });
      
      if (!updateResponse.ok) {
        throw new Error(`Error updating course: ${updateResponse.statusText}`);
      }
    }
    
    return newTeacher;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

const assignTeacherToCourse = async (teacherId, courseId) => {
  try {
    // Primero obtenemos el curso actual
    const courseResponse = await fetch(`${API_URL}/cursos/${courseId}`);
    if (!courseResponse.ok) {
      throw new Error(`Error fetching course: ${courseResponse.statusText}`);
    }
    const course = await courseResponse.json();
    
    // Actualizamos la lista de docentes
    const updatedTeachers = [...(course.docenteIds || []), teacherId];
    
    const updateResponse = await fetch(`${API_URL}/cursos/${courseId}`, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({ docenteIds: updatedTeachers }),
    });
    if (!updateResponse.ok) {
      throw new Error(`Error updating course: ${updateResponse.statusText}`);
    }
    return await updateResponse.json();
  } catch (error) {
    console.error("Error assigning teacher to course:", error);
    throw error;
  }
};

export {
  getTeachers,
  getTeacherWithCourses,
  createTeacher,
  assignTeacherToCourse
};

