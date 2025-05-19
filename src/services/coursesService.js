const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const myHeaders = {
    'Content-Type': 'application/json',
}

const getCourses = async () => {
    try {
        const response = await fetch(`${API_URL}/cursos`);
        if (!response.ok) {
            throw new Error(`Error fetching courses: ${response.statusText}`);        
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

const getCourseById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/cursos/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching course: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}

const getCourseByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/cursos`)
        if (!response.ok) {
            throw new Error(`Error fetching courses: ${response.statusText}`);
        }
        const data = await response.json();
        const filteredCourses = data.filter(course => course.categoria === category);
        return filteredCourses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }

}

const postCourse = async (course) => {
    try {
        const response = await fetch(`${API_URL}/cursos`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error(`Error creating course: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }

}

const putCourse = async (course, id) => {
    try {
        const response = await fetch(`${API_URL}/cursos/${id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error(`Error updating course: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

const deleteCourse = async (id) => {
    try {
        const response = await fetch(`${API_URL}/cursos/${id}`, {
            method: 'DELETE',
            headers: myHeaders
        });
        if (!response.ok) {
            throw new Error(`Error deleting course: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

const putUser = async (user, id) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export { 
    getCourses, 
    getCourseById, 
    getCourseByCategory, 
    postCourse, 
    putCourse, 
    deleteCourse,
    putUser 
};