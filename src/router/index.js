import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // NAVIGATIONS
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Home'
        },
        component: () => import('@/pages/Navigation/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: 'About'
        },
        component: () => import('@/pages/Navigation/About.vue')
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
    // SPACE PROVIDER DASHBOARD
    // MUSICIAN DASHBOARD
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'Melkros'
})

export default router