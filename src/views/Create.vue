<template>
  <div class="Customers">
  	<div class="router">
  		<router-link to="/appointments" tag="button" class="btn btn-success">Back</router-link>
  	</div>
     	<div class="col-md-6 col-sm-6 mx-auto" style="float:left;">
     		<h1 style="margin-bottom:30px;">Add Appointment</h1>
     		<form @submit.prevent="addCustomer">
     			<input type="text" v-model="name" class="form-control" placeholder="Customer Name">
     			<input type="text" v-model="email" class="form-control" placeholder="Customer Email">
     			<input type="text" v-model="phone" class="form-control" placeholder="Customer Phone">
     			<input type="text" v-model="address" class="form-control" placeholder="Customer Address">
     			<label style="margin-top: 20px;" for="">Appointment Start Date</label>
     			<date-picker class="form-control" format="YYYY-MM-DD HH:mm:ss" type="datetime" lang="en" v-model="start_date" name="start_date"></date-picker>
     			<button style="margin-top:25px;" v-if="this.isEdit == false" type="submit" class="btn btn-success" v-on:click="onSave">Save</button>
     			<button style="margin-top:15px;" v-else v-on:click="updateCustomer(id)" type="button" class="btn btn-success">Update</button>
     		</form>
     	</div>
     	<div class="col-md-6 mx-auto" style="float: left;">
     		<h1>Appointment Location</h1>
 			<Map v-bind:changeCoords="changeCoords"/>
     	</div>
	    <Modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker'
import Map from '@/components/Map.vue'
import {bus} from '../main';
import Modal from '@/components/Modal.vue';
export default {
	created(){
		bus.$on('getDuration', (data) => {			
			this.duration = data.duration;
			this.lat = data.coords.lat;
			this.lng = data.coords.lng;
		})
	},
  name: 'Create',
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
			changeCoords(latLng){
				this.lat = latLng.lat();
				this.lng = latLng.lng();
			},
	      	closeModal() {
		        this.isModalVisible = false;
	      	},
	      	formatTimezone(tempDateString){
	      		let tempDate = new Date(tempDateString);
	      		tempDate.setUTCHours( tempDate.getUTCHours() + (tempDate.getTimezoneOffset()/-60));
	      		return tempDate;
	      	},
			durationToSeconds(){
				const [hour,min,sec] = this.duration.split(':')
				return (parseInt(hour)*3600) + (parseInt(min)*60) + parseInt(sec)
			},
			onSave: function() {
				const tempStartDate = new Date(this.start_date);
				const durationInSeconds = this.durationToSeconds();
				const roadDate = new Date(tempStartDate.getTime() - (durationInSeconds * 1000));
				const reviewDuration = new Date(tempStartDate.getTime() + (durationInSeconds * 1000) + (30 * 60000));

				this.start_date = roadDate
				this.end_date = reviewDuration;
				const message = 'Your appointment was successfully created.'
				bus.$emit('getDatesResult', {
      					roadDate: roadDate, 
      					reviewDuration: reviewDuration,
      					message: message
      				})
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
			addCustomer: function() {
				let data = {
					name: this.name,
					email: this.email,
					phone: this.phone,
					address: this.address,
					lat: this.lat,
					lng: this.lng,
					created_by: this.$store.state.userID,
					start_date: this.start_date,
					end_date: this.end_date,
				}
				this.isModalVisible = true;
				this.$store.dispatch('addCustomer' , data).then()
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
