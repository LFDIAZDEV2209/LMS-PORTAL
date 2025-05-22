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
        <div class="profile-container bg-[#FFFFFF] w-[85%] max-h-185 rounded-xl justify-center items-center sm:w-[100%] md:w-[100%] md:max-w-250">
          <div class="bg-red-800 w-[100%] h-40">
          </div>
          <div class="absolute top-[14.3rem] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
            <div class="bg-black w-[120px] h-[120px] rounded-full border-4 border-[#FFFFFF]"></div>
            <h2 class="text-2xl font-semibold text-center pt-2 pb-2 text-[#2C3E50]  md:text-3xl">John Doe</h2>
            <p class="text-center text-[#666666] text-base mb-4 md:text-lg">Computer Science Student</p>
          </div>
          <div class="bg-[#FFFFFF] w-[100%] mt-40 md:mt-50">
            <div class="blox bg-[#F4F5F5] p-4 rounded-xl relative">
              <h2 class="text-[#2C3E50] text-lg font-medium  md:text-xl">Personal Information</h2>
              <hr class="border-[#E4EAEE] m-2">
              <form>
                <div class="sm:flex gap-3 flex-wrap">
                  <div class="sm:max-w-50 md:max-w-80 md:min-w-55">
                    <label for="name" class="text-[#666666] text-sm md:text-base">Full name</label><br>
                    <input type="text" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm sm:max-w-50 md:text-base md:w-80"></input><br>
                  </div>
                  <div class="sm:max-w-50 md:max-w-80 md:min-w-55">
                    <label for="Email" class="text-[#666666] text-sm md:text-base">Email</label><br>
                    <input type="text" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm sm:max-w-50 md:text-base"></input><br>
                  </div>
                  <div class="sm:max-w-50 md:max-w-80 md:min-w-55">
                    <label for="Phone" class="text-[#666666] text-sm md:text-base">Phone</label><br>
                    <input type="text" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm sm:max-w-50 md:text-base"></input><br>
                  </div>
                  <div class="sm:max-w-50 md:max-w-80 md:min-w-55">
                    <label for="Location" class="text-[#666666] text-sm md:text-base">Location</label><br>
                    <input type="text" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm sm:max-w-50 md:text-base"></input>
                  </div> 
                </div>
              </form>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2 class="text-[#2C3E50] text-lg font-medium md:text-xl">Academic Information</h2>
              <hr class="border-[#E4EAEE] m-2">
              <form>
                <div class="sm:flex gap-3 flex-wrap">
                  <div class="sm:max-w-50 md:max-w-70">
                    <label for="Student ID" class="text-[#666666] text-sm md:text-base">Student ID</label><br>
                    <input type="text" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] text-sm sm:max-w-50 md:text-base"></input><br>
                  </div>
                  <div class="sm:max-w-50 md:max-w-70">
                    <label for="Program" class="text-[#666666] text-sm md:text-base">Program</label><br>
                    <input type="text" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm w-[100%] etxt-sm sm:max-w-50 md:text-base"></input><br>
                  </div>
                  <div class="sm:max-w-50 md:max-w-70">
                    <label for="Start Date" class="text-[#666666] text-sm md:text-base">Start Date</label><br>
                    <input type="date" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm text-sm text-[#666666] sm:max-w-50 md:text-base"></input><br>
                  </div>
                  <div class="sm:max-w-50 md:max-w-70">
                    <label for="Expected Graduation" class="text-[#666666] text-sm md:text-base">Expected Graduation</label><br>
                    <input type="date" class="block text-sm px-3 py-2 border border-gray-400 mt-2 focus: outline-none focus:bg-gray-100 focus:border-gray-600 rounded-sm text-sm text-[#666666] sm:max-w-50 md:text-base"></input>
                  </div>
                </div>
              </form>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2 class="text-[#2C3E50] text-lg font-medium sm:flex md:flex md:text-xl">Progress Overview</h2>
              <hr class="border-[#E4EAEE] m-2">
              <div class="sm:flex gap-3 flex-wrap">
                <div class="bg-[#FFFFFF] mt-5 mb-3 shadow-md rounded-sm p-4 text-center sm:w-50 md:min-w-60 md:w-70 lg:w-78">
                  <h2 class="text-2xl font-bold text-[#3498DB]">00</h2>
                  <p class="text-[#666666] text-sm md:text-base">Courses Completed</p>
                </div>
                <div class="bg-[#FFFFFF] mt-5 mb-3 shadow-md rounded-sm p-4 text-center sm:w-50 md:min-w-60 md:w-70 lg:w-78">
                  <h2 class="text-2xl font-bold text-[#3498DB]">00</h2>
                  <p class="text-[#666666] text-sm md:text-base">Certificates Earned</p>
                </div>
                <div class="bg-[#FFFFFF] mt-5 mb-3 shadow-md rounded-sm p-4 text-center sm:w-50 md:min-w-60 md:w-70 lg:w-78">
                  <h2 class="text-2xl font-bold text-[#3498DB]">00%</h2>
                  <p class="text-[#666666] text-sm md:text-base">Average Grade</p>
                </div>
              </div>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2 class="text-[#2C3E50] text-lg font-medium">Preferences</h2>
              <hr class="border-[#E4EAEE] mb-3">
              <input type="checkbox"></input>
              <label for="Notifications" class="text-[#2C3E50] mt-4 mb-4 font-medium"> Email Notifications</label>
              <p class="text-[#666666] text-sm pl-5 mt-1 mb-2 md:text-base">Receive updates about your courses and assignments</p>
              <input type="checkbox"></input>
              <label for="Notifications"  class="text-[#2C3E50] mt-4 mb-4 font-medium"> Public Profile</label>
              <p class="text-[#666666] text-sm pl-5 mt-1 mb-2 md:text-base">Make your profile visible to other students</p>
              <input type="checkbox"></input>
              <label for="Notifications" class="text-[#2C3E50] mt-4 mb-4 font-medium"> Show Progress</label>
              <p class="text-[#666666] text-sm pl-5 mt-1 mb-2 md:text-base">Display your progress on your public profile</p>
            </div>
            <div>
              <button class="mt-4 px-4 py-2 bg-[#FFFFFF] rounded-lg border-1 border-[#e2e2e2] transition duration-200 hover:bg-[#F8F9FA] hover:text-[#2E4052] hover:border-[#666666] w-[100%] sm:w-30">Cancel</button>
              <button class="mt-4 px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#338ecc] transition duration-200 w-[100%] mb-8 sm:w-40">Save Changes</button>
            </div>
          </div>
        </div>
        
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView); 