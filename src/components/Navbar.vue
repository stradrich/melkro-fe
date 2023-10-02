<script setup>
import Logo from './Logo.vue'
import NavMenu from './Navbar.vue'
import Button from './Button.vue';

import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/user'

// const getUserData = async () => {
//     const user = await authStore.getCurrentUser()

//     userData.id = user.id
//     userData.role = user.role
// }

</script>

    <!-- TEMPLATE 0: before login -->
    <!-- :user="getUserData()" -->
    <template>
            <v-toolbar class=" bg-black justify-between"> 
            <div class="mx-5">
                <Logo/>
            </div>
            
        
                <v-toolbar-title>
                    <span class="font-weight-light ml-5 mr-5">Melkro's</span>
                </v-toolbar-title>

                <p class="mx-5">Company</p>
                <p class="mx-10">About</p>

                <v-btn class='bg-white text-black mr-5' variant="outlined" to="/login">Sign In</v-btn>
                
            </v-toolbar>
    </template> 


    <!-- TEMPLATE 1: Logged in: Admin -->
     <!-- :user="getUserData()" -->
    <!-- <template> -->
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
    <!-- <template> -->
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
    <!-- <template> -->
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
    
