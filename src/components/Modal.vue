<template>
  <div class="modal-backdrop">
    <div class="modal2">
      <header class="modal-header">
        <slot name="header">
          {{message}}
          <button type="button"  class="btn-close" @click="close">
            x
          </button>
        </slot>
      </header>
      <section class="modal-body" v-if="this.viewDates == false">
        <slot name="body" style="color: #000;">
          <p style="color: #000;">The date you should travel: <b>{{roadDateString}}</b></p>
          <p style="color: #000;">Back to the office : <b>{{reviewDateString}}</b></p>
        </slot>
       </section>
       <section class="modal-body" v-if="this.viewDates == true">
        <slot name="body" style="color: #000;">
          <p style="color: #000;">The date you should travel: <b>{{start_date}}</b></p>
          <p style="color: #000;">Back to the office : <b>{{end_date}}</b></p>
        </slot>
       </section>
       <footer class="modal-footer">

          <slot name="footer">
            <button type="button" class="btn-green" @click="close">
              Close
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import {bus} from '../main';
  export default {
    data() {
      return {
        viewDates : false,
        start_date : "",
        end_date : "",
        message : "",
        roadDateString: "",
        reviewDateString: "",
       
      }
    },
    created(){
      bus.$on('getDatesResult', (data) => {      
        this.roadDate = data.roadDate;
        this.reviewDuration = data.reviewDuration;
        this.message = data.message;
        this.roadDateString = this.roadDate.toLocaleString();
        this.reviewDateString = this.reviewDuration.toLocaleString();
      })
      bus.$on('getDates', (data) => {      
        this.message = data.message;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.viewDates = data.viewDates;
      })
    },
    name: 'Modal',

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal2 {
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 500px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>