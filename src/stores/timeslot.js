import { defineStore } from "pinia";

export const useTimeslotStores = defineStore({
    id: 'timeslots',

    state: () => {
        return {
            timeslot: null
        }
    },

    getters: {

    },

    actions: {
        
        async getAllTimeslots() {
            try {
                const options = {
                    method: 'GET'
                }
    
                 // const response = await fetch('actual cloud hosting platform', options)
               const response = await fetch('http://localhost:8080/timeslot/timeslot', options)
                const data = response.json()
    
                console.log(data)
                console.log('GET All Timeslots Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async getTimeslotByID(timeslotID) {
            try {
                const options = {
                    method: 'GET'
                }
    
                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch(`http://localhost:8080/timeslot/timeslot/${timeslotID}`, options)
                const data = response.json()

                console.log(data)
                console.log('GET Timeslot By ID - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        // async createTimeslot(formData) {
        //      console.log('Inside timeslotStore createTimeslot:', formData);
        //       console.log('Inside timeslotStore createTimeslot:', formData.musicianId);
        //       console.log('Inside timeslotStore createTimeslot:', formData.check_in);
        //        console.log('Inside timeslotStore createTimeslot:', formData.check_out);

        //     try {
        //         const accessToken = localStorage.getItem('access_token')

        //         // Check for overlapping timeslots
        //         // const overlappingTimeslot = await Timeslot.findOne({
        //         // where: {
        //         //     user_id: formData.musicianId,
        //         //     timeslot_datetime_start: {
        //         //     [Op.lt]: formData.check_out,
        //         //     },
        //         //     timeslot_datetime_end: {
        //         //     [Op.gt]: formData.check_in,
        //         //     },
        //         // },
        //         // });

        //         // if (overlappingTimeslot) {
        //         // alert('Overlapping timeslot detected. Please choose a different time.');
        //         // return;
        //         // }

        //         const options = {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken
        //             },
        //             body: JSON.stringify({
        //                 user_id: formData.musicianId,
        //                 timeslot_datetime_start: formData.check_in,
        //                 timeslot_datetime_end: formData.check_out ,
        //             })
        //         }

        //         // const response = await fetch('actual cloud hosting platform', options)
        //         const response = await fetch(`http://localhost:8080/timeslot/timeslot`, options)
        //         const data = await response.json()

        //         console.log(data)
        //         console.log('Timeslot Created - Success - by 🍍🍍🍍')
        //     } catch (error) {
        //         console.error(error)
        //     }
        // },
        async createTimeslot() {
            // console.log('Inside timeslotStore createTimeslot:', formData);
            //  console.log('Inside timeslotStore createTimeslot:', formData.musicianId);
            //  console.log('Inside timeslotStore createTimeslot:', formData.check_in);
            //   console.log('Inside timeslotStore createTimeslot:', formData.check_out);

           try {
               const accessToken = localStorage.getItem('access_token')

               // Check for overlapping timeslots
               // const overlappingTimeslot = await Timeslot.findOne({
               // where: {
               //     user_id: formData.musicianId,
               //     timeslot_datetime_start: {
               //     [Op.lt]: formData.check_out,
               //     },
               //     timeslot_datetime_end: {
               //     [Op.gt]: formData.check_in,
               //     },
               // },
               // });

               // if (overlappingTimeslot) {
               // alert('Overlapping timeslot detected. Please choose a different time.');
               // return;
               // }

               const options = {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                       Authorization: accessToken
                   },
                   body: JSON.stringify({
                       user_id,
                       booking_id,
                       timeslot_datetime_start,
                       timeslot_datetime_end,
                   })
               }

               // const response = await fetch('actual cloud hosting platform', options)
               const response = await fetch(`http://localhost:8080/timeslot/timeslot`, options)
               const data = await response.json()

               console.log(data)
               console.log('Timeslot Created - Success - by 🍍🍍🍍')
           } catch (error) {
               console.error(error)
           }
       },

        async updateTimeslot(formData) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        user_id: formData.musicianId,
                        timeslot_datetime_start: formData.check_in,
                        timeslot_datetime_end: formData.check_out ,
                    })
                }

                 // const response = await fetch('actual cloud hosting platform', options)
                 const response = await fetch(`http://localhost:8080/timeslot/timeslot/${timeslotID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Timeslot Updated - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteTimeslot() {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch(`http://localhost:8080/timeslot/timeslot/${timeslotID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Timeslot Deleted - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        }
    }
})