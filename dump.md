<script setup>
import Logo from './Logo.vue'
import NavMenu from './Navbar.vue'
import Button from './Button.vue';

import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/user'

const getUserData = async () => {
    // const user = await authStore.getCurrentUser()

    userData.id = user.id
    userData.role = user.role
}
</script>

<template>
    <div>
        This is NAVBAR
        <div>
            <Logo/>
            <label> Melkro </label>
        </div>

        <div>
            <!-- Logged in: Admin -->
            <template>
                <NavbarMenu nav-title="All Data" @click="goToAdminDashboard"/>
                                
                <DropdownMenu :user="getUserData()"/>
            </template>

            <!-- Logged in: Provider -->
            <template>
                <NavMenu nav-title="Listings" @click="goToListings"/>
                <NavMenu nav-title="Bookings" @click="goToBookings"/>
                                
                <DropdownMenu :user="getUserData()"/>
            </template>
            
            <!-- Logged in: Musician -->
            <template>
                <NavMenu nav-title="Bookings" @click="goToBookings"/>
                                
                <DropdownMenu :user="getUserData()"/>
            </template>
            
        </div>
    </div>
</template>


