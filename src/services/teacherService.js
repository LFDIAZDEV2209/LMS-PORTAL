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
    const [teacherResponse, coursesResponse] = await Promise.all([
      fetch(`${API_URL}/docentes/${teacherId}`),
      fetch(`${API_URL}/cursos?docentesIds_like=${teacherId}`)
    ]);

    if (!teacherResponse.ok || !coursesResponse.ok) {
      throw new Error('Error fetching teacher or courses');
    }
    
    const teacher = await teacherResponse.json();
    const courses = await coursesResponse.json();
    
    return { ...teacher, courses };
  } catch (error) {
    console.error("Error fetching teacher with courses:", error);
    throw error;
  }
};

const createTeacher = async (teacher) => {
  try {
    const response = await fetch(`${API_URL}/docentes`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(teacher),
    });
    if (!response.ok) {
      throw new Error(`Error creating teacher: ${response.statusText}`);
    }
    return await response.json();
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
    const updatedTeachers = [...(course.docentesIds || []), teacherId];
    
    const updateResponse = await fetch(`${API_URL}/cursos/${courseId}`, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({ docentesIds: updatedTeachers }),
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

