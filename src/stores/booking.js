import { defineStore } from "pinia";

export const useBookingStores = defineStore({
    id: 'bookings',

    state: () => {

    },

    getters: {

    },

    actions: {
        
        async getAllBookings() {
            try {
                const options = {
                    method: 'GET'
                }
    
               // const response = await fetch('actual cloud hosting platform', options)
               const response = await fetch('http://localhost:8080/bookings/bookings', options)
                const data = await response.json()
    
                console.log(data)
                console.log('GET All Booking - Success - by 🍍🍍🍍')

                return data
            } catch (error) {
                console.error(error)
            }
            
        },

//         async getBookingByID(bookingID) {
//             try {
//                 const options = {
//                     method: 'GET'
//                 }

//                // const response = await fetch('actual cloud hosting platform', options)
//                const response = await fetch('http://localhost:8080/bookings/bookings/${userID}', options)
//                 const data = await response.json()

//                 console.log(data)
//                 console.log('Get Booking By ID - Success - by 🍍🍍🍍')

//                 return data
//             } catch (error) {
//                 console.error(error)
//             }
//         },

//         async getBookingByListingID(listingID) {
//             try {
//                 const options = {
//                     method: 'GET'
//                 }

//                 // const response = await fetch('actual cloud hosting platform', options)
//                const response = await fetch('', options)
//                 const data = await response.json()

//                 console.log(data)
//                 console.log('Get Booking By Listing ID')
//  d
//                 return data
//             } catch (error) {
//                 console.error(error)
//             }
//         },

        async createBooking(booking_id, user_id, listing_id, status, reminder, check_in, check_out, required_equipments, other_remarks, purpose, first_instrument) {
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
                        user_id,
                        listing_id,
                        status,
                        reminder,
                        check_in,
                        check_out,
                        required_equipments,
                        other_remarks,
                        purpose,
                        first_instrument,
                    })
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/bookings/bookings', options)
                const data = await response.json()

                console.log(data)
                console.log('Booking Created - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async updateBooking(booking_id, user_id, listing_id, status, reminder, check_in, check_out, required_equipments, other_remarks, purpose, first_instrument) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        booking_id,
                        user_id,
                        listing_id,
                        status,
                        reminder,
                        check_in,
                        check_out,
                        required_equipments,
                        other_remarks,
                        purpose,
                        first_instrument,
                    })
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/bookings/bookings/${bookingID}', options)
                const data = await response.json()

                console.log(data)
                console.log('Booking Updated - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteBooking(booking_id) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

               // const response = await fetch('actual cloud hosting platform', options)
               const response = await fetch('http://localhost:8080/bookings/bookings/${bookingID}', options)
                const data = response.json()

                console.log(data)
                console.log('Booking Deleted - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        }
    }
})