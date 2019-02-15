<template>
  <div class="home">
    <img src="https://iceberg-digital.co.uk/assets/images/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style>
	.home {
		margin-top: 30px;
		background-color: #000;
	}
	body {
		background-color: #000;
	}
</style>