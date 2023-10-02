import { defineStore } from "pinia";

export const useListingStores = defineStore({
    id: 'listings',

    state: () => {
        return {
            listings: {
                listing_id: null,
                user_id: null,
                stripeProductId: null,
                price_per_hour: null,
                address_link: null,
                pictures: null,
                availability: null,
                name: null,
                description: null,
                capacity: null,
                listings: [],
                bookings: [],
            }
        }
    },

    getters: {
        getTimeSlotsForListing: (state) => (listingId) => {
            // Filter bookings for the given listingId and extract time slots
            const bookingsForListing = state.bookings.filter(booking => booking.listingId === listingId);
            return bookingsForListing.map(booking => booking.timeSlot);
        },

        // This code will go to the right component or page
        // const store = useStore();

        // // Retrieve user information from localStorage
        // const accessToken = localStorage.getItem('access_token');
        // const user = store.getCurrentUser(); // Assuming you have a getter to get current user details

        // // Use the user information to determine the listingId
        // const listingId = user ? user.listingId : null;

        // // Get time slots for the determined listingId
        // const timeSlotsForListing = listingId ? store.getTimeSlotsForListing(listingId) : [];

        // // Now timeSlotsForListing contains an array of time slots for the determined listingId
    },

    actions: {

        async getAllListings() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/listings/', options)
                const data = await response.json()

                console.log(data, 'by 🍍🍍🍍')
                console.log('GET All Listings - by 🍍🍍🍍')
                return data
            } catch (error) {
                console.error(error)
            }
        },


        async getListingsByID(listingID) {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch(`http://localhost:8080/listings/listing/${listingID}`, options)
                const data = await response.json()

                console.log(data, 'by 🍍🍍🍍')
                console.log('GET Listing by Listing ID - by 🍍🍍🍍')
                return data
            } catch (error) {
                console.error(error)
            }
        },

        async createListing(stripeProductId, price_per_hour, address_link, pictures, availability, name, description, capacity) {
            try {
                console.log('Create Listing:', JSON.stringify({
                    stripeProductId,
                    price_per_hour,
                    address_link,
                    pictures,
                    availability,
                    name,
                    description,
                    capacity,
                    ownerID
                }))
                // Retrieve access token from local storage
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Provider Token?
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        stripeProductId,
                        price_per_hour,
                        address_link,
                        pictures,
                        availability,
                        name,
                        description,
                        capacity,
                    })
                }

                const response = await fetch('http://localhost:8080/listings/', options)
                const data = await response.json()

                console.log(data)
                console.log('Listing Created - Success -  by 🍍🍍🍍')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async updateListing(listingID, stripeProductId, price_per_hour, address_link, pictures, availability, name, description, capacity) {

            try {

                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        stripeProductId,
                        price_per_hour,
                        address_link,
                        pictures,
                        availability,
                        name,
                        description,
                        capacity,
                    })
                }

                const response = await fetch(`http://localhost:8080/listings/listing/${listingID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Listing Updated - Success -  by 🍍🍍🍍')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async deleteListing(listingID) {

            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch(`http://localhost:8080/listings/listing/${listingID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Listing Deleted - Success -  by 🍍🍍🍍')

            } catch (error) {
                console.error(error)
            }


        }
    }
})
