import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {formatTimezone,apiUrl} from "./main";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		userID : localStorage.getItem('user_id') || '',
  		customer : null,
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, loginResponse){
		    state.status = 'success'
		    state.token = loginResponse.token
			state.userID = loginResponse.userID
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	  	get_customer(state, data){
	    	state.customer = data;
	  	},
	},
	actions: {
	  	userLogin({commit}, userData){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: `${apiUrl}/api/userLogin`, data: userData, method: 'POST' })
	            .then(resp => {
		        	const responseData = resp.data;
		            const loginResponse = {
		            	token : responseData.data.token,
		            	userID : responseData.data.userID
		            }
		            localStorage.setItem('token', loginResponse.token)
		            localStorage.setItem('user_id', loginResponse.userID)
		            axios.defaults.headers.common['Authorization'] = loginResponse.token
		            commit('auth_success', loginResponse)
		            resolve(responseData)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	    userRegister({commit}, userData){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: `${apiUrl}/api/userRegister`, data: userData, method: 'POST' })
	            .then(resp => {
	            	const responseData = resp.data;
	            	const registerResponse = {
	            		token : responseData.data.token,
	            		userID : responseData.data.userID
	            	}
	                localStorage.setItem('token', registerResponse.token)
	                localStorage.setItem('user_id', registerResponse.userID)
	                axios.defaults.headers.common['Authorization'] = registerResponse.token
	                commit('auth_success', registerResponse)
	                resolve(responseData)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	},
	  	addCustomer({commit}, customerData) {
	  		return new Promise((resolve, reject) => {
	  			commit('auth_request')
	  			axios({url: `${apiUrl}/api/customers`, data: customerData , method: 'POST'})
	  			.then(resp => {
	  				const responseData = resp.data;
	  			})
	  			.catch(err => {
	  				reject(err);
	  			})
	  		})
	  	},

	  	getCustomer({commit}, customerId) {
	  		return new Promise((resolve, reject) => {
	  			commit('auth_request')
	  			axios({url: `${apiUrl}/api/customers/${customerId}`, method: 'GET'})
	  			.then(resp => {
	  				let responseData = resp.data;
					responseData.start_date = formatTimezone(responseData.start_date);
					responseData.end_date = formatTimezone(responseData.end_date);
	  				commit('get_customer', responseData);
	  			})
	  			.catch(err => {
	  				reject(err);
	  			})
	  		})
	  	},
	},
	getters : {
	  isLoggedIn: state => !!state.token,
	  authStatus: state => state.status,
	}
})
