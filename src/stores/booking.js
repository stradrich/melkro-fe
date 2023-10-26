import { defineStore } from "pinia";

export const useBookingStores = defineStore({
    id: 'bookings',

    state: () => ({
        clickedListingId: null,
        ownerId: null,
        musicianId: null,
        check_in: null,
        check_out: null,
        booking_id: null
    }),

    getters: {

    },

    actions: {
        // setBookingInfo({ clickedListingId, ownerId, musicianId }) {
        setBookingInfo({ clickedListingId, ownerId, musicianId, check_in, check_out, booking_id }) {
            this.clickedListingId = clickedListingId;
            this.ownerId = ownerId;
            this.musicianId = musicianId;
            this.check_in = check_in;
            this.check_out = check_out;
            this.booking_id = booking_id;
        },
        
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
// async createBooking(booking_id, user_id, listing_id, status, reminder, check_in, check_out, required_equipments, other_remarks, purpose, first_instrument) 
        async createBooking(formData) {
            console.log('Inside bookingStore createBooking:', formData);
            console.log('Inside bookingStore listingId:', formData.listingId);
            console.log('Inside bookingStore musicianId:', formData.musicianId);

              // Define default values for variables
            const status = 'pending';
            const reminder = '24_hours';
            const required_equipments = 'NO';// Set your default value
            const other_remarks = '';  // Set your default value
            const purpose = 'practice';  // Set your default value
            const first_instrument = '';  // Set your default value

            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
        
                            // listing_id: formData.value.listingId,
                            // user_id: formData.value.ownerId,
                            // musician_id: formData.value.musicianId,
                            // status: formData.value.status,
                            // reminder: formData.value.reminder,
                            // check_in: formData.value.check_in,
                            // check_out: formData.value.check_out,
                            // required_equipments: formData.value.required_equipments,
                            // other_remarks: formData.value.other_remarks,
                            // purpose: formData.value.purpose,
                            // first_instrument: formData.value.first_instrument,

                            listing_id: formData.listingId,
                            // user_id: formData.ownerId,
                            user_id: formData.musicianId,
                            status,
                            reminder,
                            check_in: formData.check_in,
                            check_out: formData.check_out,
                            required_equipments,
                            other_remarks,
                            purpose,
                            first_instrument,
                      
                        
                    })
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/bookings/bookings', options)
                const data = await response.json()

                // Set check_in and check_out in the store
                this.check_in = formData.check_in;
                this.check_out = formData.check_out;

                 // Set the booking_id
                this.booking_id = data.booking_id;

                console.log('Booking Data:', data)
                console.log('Booking Created - Success - by 🍍🍍🍍')
                console.log('Generated Booking ID:', this.booking_id);
            } catch (error) {
                console.error(error)
            }
        },

        async updateBooking(formData) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        listing_id: formData.listingId,
                        // user_id: formData.ownerId,
                        user_id: formData.musicianId,
                        status,
                        reminder,
                        check_in: formData.check_in,
                        check_out: formData.check_out,
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