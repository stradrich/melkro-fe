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
        async createPayment(booking_id, amount, amount_total) {
            console.log('Inside paymentStore createPayment:');
            console.log('Inside paymentStore listingId:');
            console.log('Inside paymentStore ownerId:');
            console.log('Inside paymentStore musicianId:');
            console.log('Inside paymentStore bookingId:');
            console.log('Inside paymentStore paymentgId:');

            // Define default values for variables
            const payment_method = "Credit Card"
            const payment_method_types = "card"
            const status = "incomplete"
            

            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        booking_id,
                        amount,
                        amount_total,
                        payment_method,
                        payment_method_types,
                        status                      
                    })
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/payment/payment', options)
                const data = await response.json()

                console.log(data)
                console.log('Booking Created - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async getAllPayments() {
            try {
                const options = {
                    method: 'GET'
                }
    
               // const response = await fetch('actual cloud hosting platform', options)
               const response = await fetch('http://localhost:8080/payment/payment/', options)
                const data = await response.json()
    
                console.log(data)
                console.log('GET All Payment - Success - by 🍍🍍🍍')

                return data
            } catch (error) {
                console.error(error)
            }
            
        },

        
        

        
    }
})