class ProfileView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML =/*html*/ `
      <div class="profile-view flex flex-col justify-center items-center">
        <div class="profile-container bg-[#FFFFFF] w-[85%] h-185 rounded-xl justify-center items-center">
          <div class="bg-red-800 w-82 h-40 ">
          </div>
          <div class="absolute top-[14.3rem] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
            <div class="bg-black w-[120px] h-[120px] rounded-full border-4 border-[#FFFFFF]"></div>
            <h1 class="text-2xl font-semibold text-center pt-2 pb-2 text-[#2C3E50]">John Doe</h1>
            <p class="text-center text-[#666666] text-base mb-4">Computer Science Student</p>
          </div>
          <div class="bg-[#FFFFFF] w-83 mt-40">
            <div class="blox bg-[#F4F5F5] p-4 rounded-xl relative">
              <h2 class="text-[#2C3E50] text-lg font-medium">Personal Information</h2>
              <hr class="border-[#E4EAEE] m-2">
              <form>
                <label for="name" class="text-[#666666] text-sm">Full name</label><br>
                <input type="text" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm"></input><br>
                <label for="Email" class="text-[#666666] text-sm">Email</label><br>
                <input type="text" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm"></input><br>
                <label for="Phone" class="text-[#666666] text-sm">Phone</label><br>
                <input type="text" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm"></input><br>
                <label for="Location" class="text-[#666666] text-sm">Location</label><br>
                <input type="text" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm"></input>
              </form>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2 class="text-[#2C3E50] text-lg font-medium">Academic Information</h2>
              <hr class="border-[#E4EAEE] m-2">
              <form>
                <label for="Student ID" class="text-[#666666] text-sm">Student ID</label><br>
                <input type="text" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm"></input><br>
                <label for="Program" class="text-[#666666] text-sm">Program</label><br>
                <input type="text" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] etxt-sm"></input><br>
                <label for="Start Date" class="text-[#666666] text-sm">Start Date</label><br>
                <input type="date" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm text-sm text-[#666666]"></input><br>
                <label for="Expected Graduation" class="text-[#666666] text-sm">Expected Graduation</label><br>
                <input type="date" class="block text-sm px-2 py-1 border border-gray-400 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm text-sm text-[#666666]"></input>
              </form>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2 class="text-[#2C3E50] text-lg font-medium">Progress Overview</h2>
              <hr class="border-[#E4EAEE] m-2">
              <div class="bg-[#FFFFFF] mt-3 mb-3 shadow-md rounded-sm p-4 text-center">
                <h2 class="text-2xl font-bold text-[#3498DB]">00</h2>
                <p class="text-[#666666] text-sm">Courses Completed</p>
              </div>
              <div class="bg-[#FFFFFF] mt-3 mb-3 shadow-md rounded-sm p-4 text-center">
                <h2 class="text-2xl font-bold text-[#3498DB]">00</h2>
                <p class="text-[#666666] text-sm">Certificates Earned</p>
              </div>
              <div class="bg-[#FFFFFF] mt-3 mb-3 shadow-md rounded-sm p-4 text-center">
                <h2 class="text-2xl font-bold text-[#3498DB]">00%</h2>
                <p class="text-[#666666] text-sm">Average Grade</p>
              </div>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2 class="text-[#2C3E50] text-lg font-medium">Preferences</h2>
              <hr class="border-[#E4EAEE]">
              <input type="checkbox"></input>
              <label for="Notifications" class="text-[#2C3E50]"> Email Notifications</label>
              <p class="text-[#666666] text-sm">Receive updates about your courses and assignments</p>
              <input type="checkbox"></input>
              <label for="Notifications"  class="text-[#2C3E50]"> Public Profile</label>
              <p class="text-[#666666] text-sm">Make your profile visible to other students</p>
              <input type="checkbox"></input>
              <label for="Notifications" class="text-[#2C3E50]"> Show Progress</label>
              <p class="text-[#666666] text-sm">Display your progress on your public profile</p>
            </div>
            <button class="mt-4 px-4 py-2 bg-[#FFFFFF] rounded-lg border-1 border-[#e2e2e2] transition duration-200 hover:bg-[#F8F9FA] hover:text-[#2E4052] hover:border-[#666666]  w-[100%]">Cancel</button>
            <button class="mt-4 px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#338ecc] transition duration-200 w-[100%] mb-8">Save Changes</button>
          </div>
        </div>
        
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView); 