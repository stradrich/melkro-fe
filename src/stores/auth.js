import { defineStore } from 'pinia'
import * as jose from 'jose'

export const useAuthStores = defineStore({
    id: 'auth',
    
    state: () => {
        return {
            currentUser: {
                id: null,
                email: null,
                role: null,
                
            }
        }
    },

    getters: {
        isAuthenticated: (state) => !!state.currentUser
    },

    // Static Data - Semi Static/Dynamic Data - Dynamic Data
    actions: {
        // Somewhat like caching but stored in local storage, this ensures we retain user log in for x hours depending on the token expiration
        // It does not make an API request and is primarily used for extracting user information locally from the access token.
    // It is typically used for quick access to user details without the need for an API call. 
        async getCurrentUser() {
            try {
              const accessToken = localStorage.getItem('access_token');
              console.log(accessToken, 'by 🍍🍍🍍');
              
              if (!accessToken) throw 'Access token not found';
          
              const decodedToken = jose.decodeJwt(accessToken);
              console.log(decodedToken, 'by 🍍🍍🍍');
          
              if (!decodedToken || !decodedToken.id) throw 'Invalid token or missing user ID';
          
              const userDetails = {
                id: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role,
                username: decodedToken.username,
              };
          
              return userDetails; // Return user details without navigation
            } catch (error) {
              console.log(error);
              throw error;
            }
          },
          async registerUser(username, email, password, role) {
            try {
              const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role }),
              };
      
              const response = await fetch('http://localhost:8080/auth/register', options);
      
              if (response.ok) {
                const user = await response.json();
      
                this.currentUser = {
                  id: user.id,
                  username: user.username,
                  password: user.password,
                  email: user.email,
                  role: user.role,
                };
      
                console.log('Successfully registered as a User - by 🍍🍍🍍', user);
                router.push('/login');
              } else {
                const errorData = await response.json();
                console.error('Registration error:', errorData);
              }
            } catch (error) {
              console.error(error);
            }
          },


          async login(email, password) {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/auth/login', options)
                const data = await response.json()

                const accessToken = data.accessToken
                this.accessToken = accessToken
                console.log('Login - Access Token', accessToken)
                
                // Save access token to local storage
                localStorage.setItem('access_token', accessToken)
                console.log('Local storage access token', accessToken)
                
                // Fetch current user
                this.currentUser = await this.getCurrentUser()
                console.log('Login - Current User', this.currentUser, 'by 🍍🍍🍍')

                if(this.currentUser) {
                    this.userLoggedIn = true
                    return this.currentUser.id
                }
                
            } catch (error) {
                console.error(error)
            }
        },

        async forgotPassword(email) {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({email})
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/auth/forgotPwd', options)
                const data = await response.json()

                console.log(data)
                console.log('User forgot password - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        },

        async resetPassword(newPassword, resetToken) {
            try {
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({newPassword, resetToken})
                }

                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/auth/resetPwd', options)
                const data = await response.json()

                console.log(data)
                console.log('User reset password - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        }, 

        async changePassword(currentPassword, newPassword) {
            try {
                const accessToken = this.accessToken
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({currentPassword, newPassword})
                }


                // const response = await fetch('actual cloud hosting platform', options)
                const response = await fetch('http://localhost:8080/auth/changePwd', options)
                const data = await response.json()

                console.log(data)
                console.log('User password changed - by 🍍🍍🍍')
            } catch (error) {
                console.error(error)
            }
        }, 

        async logout() {
            // Remove access token from local storage
            localStorage.removeItem('access_token')

            // Reset the currentUser state
            this.currentUser = {
                id: null,
                name: null,
                email: null,
                role: null
            }

            console.log('Successfully logged out - by 🍍🍍🍍')
        },
        

    }


})