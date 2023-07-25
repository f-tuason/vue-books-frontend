<template>
  <router-view/>
</template>

<script>
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Main from './views/Main.vue'

export default {
  components: {
    Login,
    Register,
    Main,
  },
}
</script>
