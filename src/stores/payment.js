import { defineStore } from "pinia";

export const usePaymentStores = defineStore({
    id: 'payments',

    state: () => {
        return {
            payment: null
        }
    },

    getters: {

    },

    actions: {
        // CRUD (payment via Stripe)
        // If payment is successful, status change to complete and update booking status confirmed
    }
})