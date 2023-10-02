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

        async createTimeslot(user_id, timeslot_datetime, booking_id) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        user_id,
                        timeslot_datetime,
                        booking_id
                    })
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch(`http://localhost:8080/timeslot/timeslot`, options)
                const data = response.json()

                console.log(data)
                console.log('Timeslot Created - Success - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async updateTimeslot(user_id, timeslot_datetime, booking_id) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        user_id,
                        timeslot_datetime,
                        booking_id
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