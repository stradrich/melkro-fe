import { defineStore } from "pinia";
import { useAuthStores } from '../stores/auth';




const authStore = useAuthStores();

export const useListingStores = defineStore({
    id: 'listings',

    state: () => {
        return {
            // currentListings: reactive({
            //     listing_id: null,
            //     user_id: null,
            //     stripeProductId: null,
            //     price_per_hour: null,
            //     address_link: null,
            //     pictures: null,
            //     availability: null,
            //     name: null,
            //     description: null,
            //     capacity: null,
            //     listings: [],
            //     bookings: [],
            // }),
            currentListings: {
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
            },
            ownerID: null, 
            clickedListingId: null,
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

        setClickedListingId(listingId) {
            console.log('Setting clickedListingId:', listingId);
            this.clickedListingId = listingId;
          },

          async getAllListings() {
          
            try {
                const accessToken = localStorage.getItem('access_token');
                console.log('Access Token:', accessToken);

                // context.currentListings[key] = data[0][key];
        
                if (!accessToken) throw new Error('Access token not found');
        
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
        
                console.log('Request Headers:', options.headers); // Log headers
        
                const response = await fetch('http://localhost:8080/listings/', options);
                console.log('Response Status:', response.status);
                
                const data = await response.json();
                console.log('Response Data:', data);

                // Assuming data is an array of listings
                // if (Array.isArray(data) && data.length > 0) {
                //     // Use $set to update the properties of currentListings
                //     Object.keys(data[0]).forEach(key => {
                //         this.$set(this.currentListings, key, data[0][key]);
                //     });
                // }
                // if (Array.isArray(data) && data.length > 0) {
                //     // No need for this.$set, reactivity should handle it
                //     Object.keys(data[0]).forEach(key => {
                //         this.currentListings[key] = data[0][key];
                //     });
                // }
                

                console.log(data, 'by 🍍🍍🍍');
                console.log('GET All Listings - by 🍍🍍🍍');
                return data;
            } catch (error) {
                console.error(error);
            }
        },

        async getListingsByUserId(userId) {
            
          

            try {
              const accessToken = localStorage.getItem('access_token');
              console.log('Access Token:', accessToken);
              const options = {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              };

            console.log(options.headers)

      
            //   http://localhost:8080/listings/users/4/listings
              const response = await fetch(`http://localhost:8080/listings/users/${userId}/listings`, options);
            //   const response = await fetch(`http://localhost:8080/listings/user/${userId}`, options);
              const data = await response.json();
      
              console.log('Request Headers:', response.headers);
              console.log('Response Status:', response.status);
              console.log(data, 'by 🍍🍍🍍');
              console.log(`GET Listings by User ID ${userId} - by 🍍🍍🍍`);
      
              return data;
            } catch (error) {
              console.error(error);
            }
          },
        
        

        // async getAllListings() {
        //     try {
        //         const accessToken = localStorage.getItem('access_token');
        //         console.log('Access Token:', accessToken);

        //         if (!accessToken) throw new Error('Access token not found');
      
        //         const options = {
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': `Bearer ${accessToken}`,
        //                 'Content-Type': 'application/json',
        //             },
        //         }

        //         const response = await fetch('http://localhost:8080/listings/', options)
        //         const data = await response.json()

        //         console.log(data, 'by 🍍🍍🍍')
        //         console.log('GET All Listings - by 🍍🍍🍍')
        //         return data
        //     } catch (error) {
        //         console.error(error)
        //     }
        // },


        async getListingsByID(listingID) {
            try {
                const options = {
                    method: 'GET'
                }
        
                const response = await fetch(`http://localhost:8080/listings/listing/${listingID}`, options)
                const data = await response.json()
        
                this.currentListings = data; // Assign the entire data object
                console.log('GET Listing by Listing ID - by 🍍🍍🍍', data);
        
                return data;
            } catch (error) {
                console.error(error)
            }
        },
        

        

        // user_id, stripeProductId, price_per_hour, address_link, pictures, availability, name, description, capacity
        async createListing(listingData) {
            // console.log('Received Data:', req.body);

            try {
                
                // Retrieve access token from local storage
                const accessToken = localStorage.getItem('access_token')
               
                // Use getCurrentUser to get the user object
                //  const user = this.getCurrentUser();
                // const user = authStore.getCurrentUser();
                // console.log(user);

                // Extract user ID from the user object
                //  const userID = user.id;
                //  console.log(userID);
                
        
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    // body: JSON.stringify({
                    //     user_id,
                    //     stripeProductId,
                    //     price_per_hour,
                    //     address_link,
                    //     pictures,
                    //     availability,
                    //     name,
                    //     description,
                    //     capacity

                    // }),        
                    body: JSON.stringify({
                      listingData
                    }),
                    // body: JSON.stringify(listingData)

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
        // async createListing(stripeProductId, price_per_hour, address_link, pictures, availability, name, description, capacity) {
        //     try {
        //         console.log('Create Listing:', JSON.stringify({
        //             stripeProductId,
        //             price_per_hour,
        //             address_link,
        //             pictures,
        //             availability,
        //             name,
        //             description,
        //             capacity,
        //             ownerID
        //         }))
        //         // Retrieve access token from local storage
        //         const accessToken = localStorage.getItem('access_token')

        //         const options = {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 // Provider Token?
        //                 Authorization: accessToken
        //             },
        //             body: JSON.stringify({
        //                 stripeProductId,
        //                 price_per_hour,
        //                 address_link,
        //                 pictures,
        //                 availability,
        //                 name,
        //                 description,
        //                 capacity,
        //             })
        //         }

        //         const response = await fetch('http://localhost:8080/listings/', options)
        //         const data = await response.json()

        //         console.log(data)
        //         console.log('Listing Created - Success -  by 🍍🍍🍍')

        //         return data
        //     } catch (error) {
        //         console.error(error)
        //     }
        // },

        async updateListing(formData) {
            // console.log('Received Data:', req.body);

            console.log('Updating listing with ID:', this.clickedListingId);

            // Log entire user object
            console.log('CurrentUser:', authStore.currentUser);
            // Log user ID
            const userId = authStore.currentUser?.userDetails?.id;
            console.log('User ID:', userId);


            console.log('Updating listing with the following data:');
            // console.log('Listing ID:', this.clickedListingId);
            console.log('Name:', formData.name);
            console.log('Price per Hour:', formData.price_per_hour);
            console.log('Address Link:', formData.address_link);
            console.log('Pictures:', formData.pictures);
            console.log('Availability:', formData.availability);
            console.log('Description:', formData.description);
            console.log('Capacity:', formData.capacity);
            try {
                const accessToken = localStorage.getItem('access_token');
        
                // Check if clickedListingId is available
                if (!this.clickedListingId) {
                    console.error('Listing ID not available.');
                    return;
                }
        
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        listingID: this.clickedListingId,
                        price_per_hour: formData.price_per_hour,
                        address_link: formData.address_link,
                        pictures: formData.pictures,
                        availability: formData.availability,
                        name: formData.name,
                        description: formData.description,
                        capacity: formData.capacity,
                    })
                };
        
                const response = await fetch(`http://localhost:8080/listings/listing/${this.clickedListingId}`, options);
                const data = await response.json();
        
                console.log(data);
                console.log('Listing Updated - Success -  by 🍍🍍🍍');
                
                return data;
            } catch (error) {
                console.error(error);
            }
        },
        

        async deleteListing(clickedListingId) {
            
            console.log('Delete Listing method called with ID:', clickedListingId);


            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                console.log(accessToken);

                // const listingId = this.clickedListingId;

                // const response = await fetch(`http://localhost:8080/listings/listing/${listingId}`, options)
                const response = await fetch(`http://localhost:8080/listings/listing/${clickedListingId}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Listing Deleted - Success -  by 🍍🍍🍍')

              

            } catch (error) {
                console.error(error)
            }


        }
    }
})
