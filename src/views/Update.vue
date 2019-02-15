<template>
    <div class="Customers">
        <div class="router">
            <router-link to="/appointments" tag="button" class="btn btn-success">Back</router-link>
        </div>
        <div v-if="!!customer" class="col-md-6 col-sm-6 mx-auto" style="float:left;">
            <h1 style="margin-bottom:30px;">Add Appointment</h1>
            <form @submit.prevent="addCustomer">
                <input type="text" v-model="customer.name" class="form-control" placeholder="Customer Name">
                <input type="text" v-model="customer.email" class="form-control" placeholder="Customer Email">
                <input type="text" v-model="customer.phone" class="form-control" placeholder="Customer Phone">
                <input type="text" v-model="customer.address" class="form-control" placeholder="Customer Address">
                <label style="margin-top: 20px;" for="start_date-picker">Appointment Start Date</label>
                <date-picker id="start_date-picker" class="form-control" format="YYYY-MM-DD HH:mm:ss" type="datetime"
                             lang="en" v-model="customer.start_date" name="customer.start_date"></date-picker>
                <button style="margin-top:15px;" v-on:click="updateCustomer(id)" type="button" class="btn btn-success">
                    Update
                </button>
            </form>
        </div>
        <div class="col-md-6 mx-auto" style="float: left;">
            <h1>Appointment Location</h1>
            <Map v-if="!!lat && !!lng" v-bind:lat="lat" v-bind:lng="lng" name="harita" v-bind:changeCoords="changeCoords"/>
            <div v-if="!lat || !lng">Map is loading...</div>
        </div>
        <Modal v-show="isModalVisible" @close="closeModal"/>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker'
    import Map from '@/components/Map.vue'
    import {bus,apiUrl} from '../main';
    import Modal from '@/components/Modal.vue';

    export default {
        name: 'Update',
        components: {
            DatePicker,
            Map,
            Modal
        },
        created() {
            this.$store.dispatch('getCustomer', this.$route.params.id);
            bus.$on('getDuration', (data) => {
                this.duration = data.duration;
                this.lat = data.coords.lat;
                this.lng = data.coords.lng;
            })
        },
        data() {
            return {
                id: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                lat : "",
                lng : "",
                created_by: this.$store.state.userID,
                start_date: new Date(),
                end_date: new Date(),
                allCustomers: [],
                isEdit: false,
                isModalVisible: false,
            }
        },
        computed: {
            customer() {
                return this.$store.state.customer;
            }
        },
        watch: {
            customer() {
                this.lat = this.customer.lat;
                this.lng = this.customer.lng;
            }
        },
        methods: {
            changeCoords(latLng){
                this.customer.lat = latLng.lat();
                this.customer.lng = latLng.lng();
            },
            durationToSeconds() {
                const [hour, min, sec] = this.duration.split(':')
                return (parseInt(hour) * 3600) + (parseInt(min) * 60) + parseInt(sec)
            },
            closeModal() {
                this.isModalVisible = false;
            },
            updateCustomer(id) {
                const tempStartDate = new Date(this.start_date);
                const durationInSeconds = this.durationToSeconds();
                const roadDate = new Date(tempStartDate.getTime() - (durationInSeconds * 1000));
                const reviewDuration = new Date(tempStartDate.getTime() + (durationInSeconds * 1000) + (30 * 60000));
                this.$route.params.start_date = roadDate
                this.$route.params.end_date = reviewDuration;
                this.$http({
                    url: `${apiUrl}/api/customers/` + this.customer.id, data: {
                        name: this.customer.name,
                        email: this.customer.email,
                        phone: this.customer.phone,
                        address: this.customer.address,
                        lat: this.customer.lat,
                        lng: this.customer.lng,
                        start_date: this.customer.start_date,
                        end_date: this.customer.end_date,
                    }, method: 'PUT'
                })
                    .then(resp => {
                        alert('Your changes have been successfully updated.');
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Error when updating customer.');
                    })
            }

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
