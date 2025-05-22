class ProfileView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML =/*html*/ `
      <div class="profile-view bg-[#F4F5F5] flex flex-col justify-center items-center">
        <div class="profile-container bg-[#FFFFFF] w-[85%] h-185 rounded-xl">
          <div class="bg-red-800 w-82 h-40">
          </div>
          <div class="bg-[#FFFFFF] w-82">
            <h1 class="text-2xl font-bold text-center pt-8 pb-2">John Doe</h1>
            <p class="text-center text-gray-500 text-lg mb-4">Computer Science Student</p>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2>Personal Information</h2>
              <hr class="border-[#E4EAEE] m-2">
              <form>
                <label for="nombre">Full name</label><br>
                <input type="text"></input><br>
                <label for="Email">Email</label><br>
                <input type="text"></input><br>
                <label for="Phone">Phone</label><br>
                <input type="text"></input><br>
                <label for="Location">Location</label><br>
                <input type="text"></input>
              </form>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2>Academic Information</h2>
              <hr class="border-[#E4EAEE] m-2">
              <form>
                <label for="Student ID">Student ID</label><br>
                <input type="text"></input><br>
                <label for="Program">Program</label><br>
                <input type="text"></input><br>
                <label for="Start Date">Start Date</label><br>
                <input type="text"></input><br>
                <label for="Expected Graduation">Expected Graduation</label><br>
                <input type="text"></input>
              </form>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2>Progress Overview</h2>
              <hr class="border-[#E4EAEE] m-2">
              <div class="bg-[#FFFFFF] mt-3 mb-3">
                <h2>00</h2>
                <p>Courses Completed</p>
              </div>
              <div class="bg-[#FFFFFF] mt-3 mb-3">
                <h2>00</h2>
                <p>Certificates Earned</p>
              </div>
              <div class="bg-[#FFFFFF] mt-3 mb-3">
                <h2>00%</h2>
                <p>Average Grade</p>
              </div>
            </div>
            <br>
            <div class="bg-[#F4F5F5] p-4 rounded-xl">
              <h2>Preferences</h2>
              <hr class="border-[#E4EAEE]">
              <p>Email Notifications</p>
              <p>Email Notifications</p>
              <p>Email Notifications</p>
            </div>
            <button class="mt-4 px-4 py-2 bg-[#FFFFFF] rounded-lg border-1 border-[#e2e2e2] transition duration-200 hover:bg-[#F8F9FA] hover:text-[#2E4052] hover:border-[#666666]  w-[100%]">Cancel</button>
            <button class="mt-4 px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#338ecc] transition duration-200 w-[100%]">Save Changes</button>
          </div>
        </div>
        
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView); 