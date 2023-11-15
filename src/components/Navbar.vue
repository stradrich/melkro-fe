<script setup>
import Logo from '../components/Logo.vue'
// import NavMenu from './Navbar.vue'
// import Button from './Button.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const { currentUser } = useAuthStores();
import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/user'

const useAuthStore = useAuthStores();

// const getUserData = async () => {
//     const user = await authStore.getCurrentUser()

//     userData.id = user.id
//     userData.role = user.role
// }

// Check if there is an access token on mount
const { accessToken, logout } = useAuthStores();

const handleClick = () => {
  if (accessToken) {
    handleLogout();
   
  } else {
    router.push('/login');
  }
};

const handleLogout = () => {
router.push('/login');
  logout();
};



// const handleLogout = async () => {
//     useAuthStore.accessToken
//   await logout();
//   router.push('/login'); // Redirect to login page after logout
// };

</script>

    <!-- TEMPLATE 0: before login -->
    <!-- :user="getUserData()" -->
    <template>
            <v-toolbar fluid style="overflow-x: auto;" class=" bg-black justify-between"  id="v-toolbar__content"> 
            <div style="margin-left: 4px;" class="mx-8">
                <Logo/>
            </div>
            
        
            <v-toolbar-title>
             <v-btn style="font-size: 20px;" class="font-weight-light ml-2 mr-10" :to="'/'">
                  Melkro's
             </v-btn>
            </v-toolbar-title>

                <v-btn class="mx-5 ml-15" to="/company">
                    <p >Company</p>
                </v-btn>

                <v-btn class="mx-10" to="/about">
                    <p >About</p>
                </v-btn>

                

                <v-btn
                    class="bg-white text-black mr-16"
                    variant="outlined"
                    @click="handleClick"
                >
                {{ accessToken ? 'Sign Out' : 'Sign In' }}
                </v-btn>

                <!-- <v-btn class='bg-white text-black mr-5' variant="outlined" to="/login">Sign In</v-btn> -->
                <!-- <v-btn class='bg-white text-black mr-5' variant="outlined" @click="currentUser.id ? handleLogout : () => router.push('/login')">
                {{ currentUser.id ? 'Sign Out' : 'Sign In' }}
                </v-btn> -->


            </v-toolbar>
    </template> 


    <!-- TEMPLATE 1: Logged in: Admin -->
     <!-- :user="getUserData()" -->
    <!-- <template v-if="useAuthStore.currentUser.role === 'owner'"> -->
         <!-- <v-toolbar class=" bg-black justify-between">  -->
        <!-- <div class="mx-5"> -->
            <!-- <Logo/> -->
        <!-- </div> -->
        
         <!-- <v-toolbar-title> -->
             <!-- <span class="font-weight-light ml-5 mr-5">Melkro's</span> -->
         <!-- </v-toolbar-title> -->

         <!-- <div> -->
            <!-- Dashboard -->
         <!-- </div> -->

         <!-- <v-btn class='bg-white text-black mr-5' variant="outlined" to="/login">Sign Out</v-btn> -->
         
          <!-- <DropdownMenu/> -->
     <!-- </v-toolbar> -->
    <!-- </template> -->

    <!-- TEMPLATE 2: Logged in: Provider -->
     <!-- :user="getUserData()" -->
    <!-- <template v-else-if="useAuthStore.currentUser.role === 'provider'"> -->
        <!-- <v-toolbar class=" bg-black justify-between">  -->
            <!-- <div class="mx-5"> -->
                <!-- <Logo/> -->
            <!-- </div> -->
            
        
             <!-- <v-toolbar-title> -->
                 <!-- <span class="font-weight-light ml-5 mr-5">Melkro's</span> -->
             <!-- </v-toolbar-title> -->

               <!-- <div> -->
                 <!-- Listing -->
                 <!-- Booking -->
              <!-- </div> -->
             
    
             <!-- <v-btn class='bg-white text-black mr-5' variant="outlined" to="/login">Sign Out</v-btn> -->
             
              <!-- <DropdownMenu/> -->
         <!-- </v-toolbar> -->
        <!-- </template> -->
    
    <!-- TEMPLATE 3: Logged in: Musician -->
     <!-- :user="getUserData()" -->
    <!-- <template v-else> -->
        <!-- <v-toolbar class=" bg-black justify-between">  -->
            <!-- <div class="mx-5"> -->
                <!-- <Logo/> -->
            <!-- </div> -->
            
        
             <!-- <v-toolbar-title> -->
                 <!-- <span class="font-weight-light ml-5 mr-5">Melkro's</span> -->
             <!-- </v-toolbar-title> -->

             <!-- <div> -->
                 <!-- Listing -->
                 <!-- Booking -->
              <!-- </div> -->
    
             <!-- <v-btn class='bg-white text-black mr-5' variant="outlined" to="/login">Sign Out</v-btn> -->
             
              <!-- <DropdownMenu/> -->
         <!-- </v-toolbar> -->
     <!-- </template> -->


    <!-- <template> -->
        <!-- nav-title="Bookings" -->
        <!-- @click="goToBookings" -->
        <!-- <NavMenu/> -->
                        
       <!-- :user="getUserData()" -->
       <!-- <DropdownMenu/> -->
    <!-- </template> -->
    
<style scoped>
 .v-toolbar__content {
  height: auto;
  }

    v-app {
    overflow-x: hidden;
  }

  /* Mobile responsiveness */
  @media only screen and (max-width: 600px) {
    .v-btn {
      font-size: 12px;
      padding: 4px 8px;
    }

  
  }
</style>