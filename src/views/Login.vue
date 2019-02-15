<template>
 <div class="login">
 	<img alt="Vue logo" src="https://iceberg-digital.co.uk/assets/images/logo.png">
   <form class="login" @submit.prevent="loginUser">
     <h1>Login</h1>
     <div class="col-md-4 col-sm-6 col-xs-12">
 		<div class="form-group">
	     	 <input class="form-control login-form" required v-model="email" type="text" placeholder="E-Mail"/>
		     <input class="form-control login-form" required v-model="password" type="password" placeholder="Password"/>
		     <hr/>
		     <p v-if="this.$store.state.status == 'error'">E-mail or password is wrong please try again.</p>
	     </div>
     </div>
     <button class="btn btn-secondary" type="submit">Login</button>
   </form>
 </div>
</template>
<script>
	export default {
		created(){
			if(this.$store.getters.isLoggedIn){
				this.$router.push('/')
			}
		},
		data(){
			return {
				email : "",
            	password : ""
            }
		},
		methods: {
		 	loginUser: function () {
		   		let email = this.email 
		   		let password = this.password
		   		this.$store.dispatch('userLogin', { email, password })
		   		.then(() => this.$router.push('/appointments'))
		   		.catch(err => console.log(err));
		   	}
		}
	}
</script>

<style>
	h1 {
  	color: #fff;
}
h3 {
  	margin: 40px 0 0;
	color: #fff;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  	display: inline-block;
  	margin: 0 10px;
}
a {
  	color: #42b983;
}
.form-group {
  	width: 100%;
}
.login {
	width: 100%;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	flex-direction: column;
}
.login-form {
  	margin-top: 20px;
  	margin-bottom: 20px;
}
</style>