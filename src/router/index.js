import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // NAVIGATIONS
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Home'
        },
        component: () => import('../pages/Navigation/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: 'About'
        },
        component: () => import('../../src/pages/Navigation/About.vue')
    },
    {
        path: '/company',
        name: 'Company',
        meta: {
            title: 'Company'
        },
        component: () => import('../pages/Navigation/Company.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: 'About'
        },
        component: () => import('../pages/Navigation/About.vue')
    },
    {
        path: '/underconstruction',
        name: 'Underconstruction',
        meta: {
            title: 'Underconstruction'
        },
        component: () => import('../pages/Navigation/Underconstruction.vue')
    },
    {
        path: '/dummyListing',
        name: 'Dummy Listing',
        meta: {
            title: 'Dummy Listing'
        },
        component: () => import('../pages/Navigation/DummyListing.vue')
    },
    {
        path: '/learnMore',
        name: 'Learn More',
        meta: {
            title: 'Learn More'
        },
        component: () => import('../pages/Navigation/LearnMore.vue')
    },
    {
        path: '/contactForm',
        name: 'Contact Form',
        meta: {
            title: 'Contact Form'
        },
        component: () => import('../pages/Navigation/ContactForm.vue')
    },
     // AUTHENTICATIONS (signup > login > forgot password > reset password > change password > )
    {
        path: '/signup',
        name: 'Sign Up',
        meta: {
            title: 'Sign Up'
        },
       component: () => import('../pages/Authentication/SignUpForm.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login'
        },
        component: () => import('../pages/Authentication/LoginForm.vue')
    },
 
    // {
    //     path: '/forgotPassword',
    //     name: 'Forgot Password',
    //     meta: {
    //         title: 'Forgot Password'
    //     },
    //     component: () => import('@/pages/ForgotPassword.vue')
    // },
    // {
    //     path: '/resetPassword',
    //     name: 'Reset Password',
    //     meta: {
    //         title: 'Reset Password'
    //     },
    //     component: () => import('@/pages/ResetPassword.vue')
    // },
    // {
    //     path: '/changePassword',
    //     name: 'Change Password',
    //     meta: {
    //         title: 'Change Password'
    //     },
    //     component: () => import('@/pages/ChangePassword.vue')
    // },
    // DASHBOARD (Admin)
    {
        path: '/adminDashboard',
        name: 'Admin Dashboard',
        meta: {
            title: 'Admin Dashboard'
        },
        component: () => import('../pages/Admin/AdminDashboard.vue')
    },
    // DASHBOARD (Provider)
    {
         path: '/providerDashboard',
        name: 'Provider Dashboard',
        meta: {
            title: 'Provider Dashboard'
        },
        component: () => import('../pages/Provider/ProviderDashboard.vue')
    },
    // DASHBOARD (Musician)
    {
        path: '/musicianDashboard',
        name: 'Musician Dashboard',
        meta: {
                title: 'Musician Dashboard'
        },
        component: () => import('../pages/Musician/MusicianDashboard.vue')
        },
    // // USERS
    // {
    //     path: '/profile/:id',
    //     name: 'User Profile',
    //     meta: {
    //         title: 'Profile'
    //     },
    //     component: () => import('@/pages/ProfilePage.vue')
    // },
    // {
    //     path: '/editProfile/:id',
    //     name: 'Edit Profile',
    //     meta: {
    //         title: 'Edit Profile'
    //     },
    //     component: () => import('@/pages/EditProfilePage.vue')
    // },

    // LISTINGS > BOOKING > PAYMENT

    // LISTING
    // Create Listing
    {
        path: '/createListingForm',
        name: 'Create Listing Form',
        meta: {
            title: 'Create Listing Form'
        },
        component: () => import('../../src/pages/Provider/CreateListingForm.vue')
    }, 
    // View Listing (All or by userID)
        {
        path: '/listingCard',
        name: 'Listing Card',
        meta: {
            title: 'Listing Card'
        },
        component: () => import('../../src/pages/Shared/viewAllListingsOrByUserID.vue')
    }, 
    {
        path: '/updateListingForm',
        name: 'Update Listing Form',
        meta: {
            title: 'Update Listing Form'
        },
        props: true,
        component: () => import('../../src/pages/Provider/UpdateListingForm.vue')
    }, 
    {
        path: '/createBookingForm',
        name: 'Create Booking Form',
        meta: {
            title: 'Create Booking Form'
        },
        // props: (route) => ({
        //     clickedListingId: route.params.clickedListingId,
        //     ownerId: route.params.ownerId,
        //     musicianId: route.params.musicianId,
        //   }),
        // props: (route) => ({ action: route.query.action }),
        component: () => import('../../src/pages/Musician/CreateBooking.vue')
    }, 
    {
        path: '/updateBookingForm',
        name: 'Update Booking Form',
        meta: {
            title: 'Update Booking Form'
        },
        component: () => import('../../src/pages/Musician/UpdateBooking.vue')
    }, 
    {
        path: '/stripePaymentLink',
        name: 'Stripe Payment Link',
        meta: {
            title: 'Stripe Payment Link'
        },
        component: () => import('../../src/pages/Shared/stripePaymentLink.vue')
    }, 
    

]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'Melkros'
})

export default router