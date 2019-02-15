<template>
  <div class="Appointments">
	    <Modal v-show="isModalVisible" @close="closeModal" />
     	<div class="appoinment">
 			<div class="col-md-12 col-sm-6 mx-auto" style="float:left;">
			<h1>Appointment List</h1>
			<router-link to="/create" tag="button" class="btn btn-success mt-3 mb-3">Add Appointment</router-link>
	     		<table class="table table-hover">
	     			<tr>
					    <th>Name</th>
					    <th class="mobile">Appointment Date</th>
					    <th class="mobile">E-Mail</th>
					    <th class="mobile">Phone</th>
					    <th class="mobile">Address</th>
					    <th class="mobile">Edit/Delete	</th>
					  </tr>
	     			<tr class="table-light" v-for="customer of allCustomers" v-bind:key="customer.id" v-bind:title="customer.name">
	     				<td class="text-center">{{customer.name}}</td>
	     				<td class="text-center mobile">{{customer.start_date.toLocaleString()}}</td>
	     				<td class="text-center mobile">{{customer.email}}</td>
	     				<td class="text-center mobile">{{customer.phone}}</td>
	     				<td class="text-center mobile">{{customer.address}}</td>
	     				<td class="text-center">
	     					<!-- <button v-on:click="editCustomer(customer.name, customer.email, customer.phone, customer.address, customer.start_date , customer.end_date, customer.id , customer.lat , customer.lng)"  type="submit" class="btn btn-success" style="margin-left:10px;margin-right:10px;">Edit</button> -->
	     					<router-link :to="{path: '/update', name: 'Update', props: true , params: {id: customer.id}}"
	     					tag="button" class="btn btn-success mt-3 mb-3">Edit</router-link>
	     					<button v-on:click="getDates(customer.start_date.toLocaleString(), customer.end_date.toLocaleString(), customer.id,)" type="button" class="btn btn-success" style="margin-left:10px;margin-right:10px;">Date</button>
	     					<button v-on:click="deleteCustomer(customer.id)" type="submit" class="btn btn-success mobile" style="margin-left:10px;margin-right:10px;">Delete</button>
	     				</td>
	     			</tr>
	     		</table>
	     	</div>
     	</div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker'
import Map from '@/components/Map.vue'
import {bus} from '../main';
import Modal from '@/components/Modal.vue';
import {formatTimezone,apiUrl} from "../main";

export default {
		created(){
				this.getCustomers();
				bus.$on('getDuration', (data) => {			
					this.duration = data.duration;
					this.lat = data.coords.lat;
					this.lng = data.coords.lng;
				})
			},
	  	name: 'Appointments',
		components: {
				DatePicker,
				Map,
				Modal
			},
			data() {
			return {
				id: "",
				name: "",
				email: "",
				phone: "",
				address: "",
				lat: "",
				lng: "",
				created_by: this.$store.state.userID,
				start_date: new Date(),
				end_date: new Date(),
				allCustomers: [],
				isEdit: false,
				isModalVisible: false,
				}
		},
		methods: {
	      	closeModal() {
		        this.isModalVisible = false;
	      	},

			getDates(start_date,end_date,id) {
				const message = 'Appointment dates.'
				var viewDates = true;
				this.id = id;
				this.start_date = start_date;
				this.end_date = end_date;
				this.isModalVisible = true;

				bus.$emit('getDates', {
      					start_date: start_date, 
      					end_date: end_date,
      					message: message,
      					viewDates: viewDates
      				})
			},
			getCustomers: function(){
				this.$http({url: `${apiUrl}/api/customers?created_by=${this.$store.state.userID}`, method: 'GET'}).then(resp => {
					this.allCustomers = resp.data;
					this.allCustomers = this.allCustomers.map( (cust)=>{
						cust.start_date = formatTimezone(cust.start_date);
						cust.end_date = formatTimezone(cust.end_date);
						return cust;
					})
				})
			},
			deleteCustomer(id) {
				this.$http({url: `${apiUrl}/api/customers/${id}`, method: 'DELETE'})
				.then(resp => {
					alert('Your selected appointment was deleted successfully.')
					this.getCustomers();
				})
				.catch(err => console.log(err))
			},
			
		}
	}
</script>


<style>
	.form-control {
		margin-top: 15px;
	}
	.btn {
	}
	.mx-datepicker {
		width: 100% !important;
	}
	.Customers {
		margin-left: 30px;
		margin-right: 30px;
	}
	.text-center {
		color: #000;
		text-align: center;
		vertical-align: inherit !important;
	}
	.appoinment {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		margin-bottom: 30px;
	}
	 @media (max-width: 600px) {
	    .mobile {
	      display: none !important;
	    }
	  }
</style>
