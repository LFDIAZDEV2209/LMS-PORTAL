import { getUser, updateUser } from "../../services/userServices";

class ProfileView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const user = await getUser("1");

    this.innerHTML = `
      <div class="profile-view flex flex-col  justify-center items-center w-full min-h-screen bg-[#f7fafd] pt-16">
        <div class="profile-container bg-white w-full max-w-2xl rounded-xl shadow-lg mt-8 mb-8">
          <div class="bg-gradient-to-r from-[#3498DB] to-[#217dbb] w-full h-40 rounded-t-xl"></div>
          <div class="relative flex flex-col items-center -mt-16 mb-4">
            <div class="bg-[#CCCCCC] w-[120px] h-[120px] rounded-full border-4 border-white overflow-hidden shadow-lg relative z-20">
              <img id="profileImg" src="${user.profilePicture || '/src/assets/user.jpg'}" alt="Profile" class="w-full h-full object-cover" />
              <label for="profilePictureInput"
                class="absolute bottom-0 right-0 bg-[#3498DB] text-white rounded-full p-2 cursor-pointer shadow-md border-4 border-white"
                title="Change photo"
                style="transform: translate(30%, 30%);">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" />
                </svg>
                <input id="profilePictureInput" type="file" accept="image/*" class="hidden" />
              </label>
            </div>
            <h2 class="text-2xl font-semibold text-center pt-2 pb-1 text-[#2C3E50] md:text-3xl">${user.name || 'John Doe'}</h2>
            <p class="text-center text-[#666666] text-base mb-2 md:text-lg">${user.program || 'Computer Science Student'}</p>
          </div>
          <form id="profileForm" class="px-8">
            <div class="bg-[#fff] rounded-xl mb-6">
              <h2 class="text-[#2C3E50] text-lg font-medium md:text-xl mb-2">Personal Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="name" class="text-[#666666] text-sm md:text-base">Full Name</label>
                  <input type="text" name="name" value="${user.name || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
                <div>
                  <label for="email" class="text-[#666666] text-sm md:text-base">Email</label>
                  <input type="text" name="email" value="${user.email || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
                <div>
                  <label for="phone" class="text-[#666666] text-sm md:text-base">Phone</label>
                  <input type="text" name="phone" value="${user.phone || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
                <div>
                  <label for="location" class="text-[#666666] text-sm md:text-base">Location</label>
                  <input type="text" name="location" value="${user.location || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
              </div>
            </div>
            <div class="bg-[#fff] rounded-xl mb-6">
              <h2 class="text-[#2C3E50] text-lg font-medium md:text-xl mb-2">Academic Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="studentId" class="text-[#666666] text-sm md:text-base">Student ID</label>
                  <input type="text" name="studentId" value="${user.studentId || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
                <div>
                  <label for="program" class="text-[#666666] text-sm md:text-base">Program</label>
                  <input type="text" name="program" value="${user.program || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
                <div>
                  <label for="startDate" class="text-[#666666] text-sm md:text-base">Start Date</label>
                  <input type="text" name="startDate" value="${user.startDate || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
                <div>
                  <label for="expectedGraduation" class="text-[#666666] text-sm md:text-base">Expected Graduation</label>
                  <input type="text" name="expectedGraduation" value="${user.expectedGraduation || ''}" class="w-full px-3 py-2 border border-gray-300 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm" />
                </div>
              </div>
            </div>
            <div class="bg-[#fff] rounded-xl mb-6">
              <h2 class="text-[#2C3E50] text-lg font-medium md:text-xl mb-2">Progress Overview</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div class="bg-[#F4F5F5] rounded p-4">
                  <h2 class="text-2xl font-bold text-[#3498DB]">12</h2>
                  <p class="text-[#666666] text-sm md:text-base">Courses Completed</p>
                </div>
                <div class="bg-[#F4F5F5] rounded p-4">
                  <h2 class="text-2xl font-bold text-[#3498DB]">3</h2>
                  <p class="text-[#666666] text-sm md:text-base">Certificates Earned</p>
                </div>
                <div class="bg-[#F4F5F5] rounded p-4">
                  <h2 class="text-2xl font-bold text-[#3498DB]">92%</h2>
                  <p class="text-[#666666] text-sm md:text-base">Average Grade</p>
                </div>
              </div>
            </div>
            <div class="bg-[#fff] rounded-xl mb-6">
              <h2 class="text-[#2C3E50] text-lg font-medium mb-2">Preferences</h2>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2">
                  <input type="checkbox" id="emailNotifications" checked class="accent-[#3498DB]" />
                  <span class="font-medium">Email Notifications</span>
                </label>
                <span class="text-[#666666] text-sm pl-6">Receive updates about your courses and assignments</span>
                <label class="flex items-center gap-2">
                  <input type="checkbox" id="publicProfile" checked class="accent-[#3498DB]" />
                  <span class="font-medium">Public Profile</span>
                </label>
                <span class="text-[#666666] text-sm pl-6">Make your profile visible to other students</span>
                <label class="flex items-center gap-2">
                  <input type="checkbox" id="showProgress" checked class="accent-[#3498DB]" />
                  <span class="font-medium">Show Progress</span>
                </label>
                <span class="text-[#666666] text-sm pl-6">Display your progress on your public profile</span>
              </div>
            </div>
            <div class="flex justify-end gap-3 pb-8">
              <button type="button" id="cancelBtn" class="px-4 py-2 bg-white rounded-lg border border-[#e2e2e2] transition duration-200 hover:bg-[#F8F9FA] hover:text-[#2E4052] hover:border-[#666666]">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#338ecc] transition duration-200">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Funcionalidad de imagen de perfil (base64)
    const fileInput = this.querySelector("#profilePictureInput");
    const profileImg = this.querySelector("#profileImg");
    let profilePictureBase64 = user.profilePicture || "";

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Solo se permiten imágenes.");
        fileInput.value = "";
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen debe ser menor a 2MB.");
        fileInput.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = function (ev) {
        profileImg.src = ev.target.result;
        profilePictureBase64 = ev.target.result;
      };
      reader.readAsDataURL(file);
    });


    this.querySelector("#profileForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const userData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        location: form.location.value,
        studentId: form.studentId.value,
        program: form.program.value,
        startDate: form.startDate.value,
        expectedGraduation: form.expectedGraduation.value,
        profilePicture: profilePictureBase64
      };
      try {
        await updateUser("1", userData);
        window.dispatchEvent(new CustomEvent("userNameChanged", { detail: { name: userData.name } }));
        alert("Datos guardados correctamente");
      } catch (err) {
        alert("Error al guardar: " + err.message);
      }
    });


    this.querySelector("#cancelBtn").addEventListener("click", () => {
      window.location.href = "/";
    });
  }
}

customElements.define('profile-view', ProfileView);