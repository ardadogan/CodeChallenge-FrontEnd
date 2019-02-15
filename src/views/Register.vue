<template>
    <div class="register">
        <img alt="Vue logo" src="https://iceberg-digital.co.uk/assets/images/logo.png">
        <h1>Register</h1>
        <form @submit.prevent="userRegister" class="register">
            <div class="col-md-4">
                 <div class="form-group">
                    <input class="form-control login-form" id="name" type="text" v-model="name" required autofocus placeholder="Enter your name">
                    <input class="form-control login-form" id="email" type="email" v-model="email" required placeholder="E-mail">
                    <input class="form-control login-form" id="password" type="password" v-model="password" required placeholder="Password">
                    <input class="form-control login-form" id="password-confirm" type="password" v-model="c_password" required placeholder="Password Confirm">
               </div>
                    <button class="btn btn-secondary" type="submit">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name : "",
                email : "",
                password : "",
                c_password : "",
            }
        },
        methods: {
            userRegister: function () {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    c_password: this.c_password,
                }
                this.$store.dispatch('userRegister', data)
               .then(() => this.$router.push('/'))
               .catch(err => console.log(err))
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
    .register {
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