<template>
  <div class="hello">
    <h1>Iceberg Digital</h1>
    <h2>Full Stack Developer Coding Challenge</h2>
    <p>Developed by Arda Doğan</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'HelloWorld',
    computed : {
      ...mapState(['title','forLoop'])
    }
  }
</script>

<style>
h1 {
  color: #fff;
  margin-top: 50px;
}
h2 {
  color: #fff;
  margin-top: 50px;
}
</style>
