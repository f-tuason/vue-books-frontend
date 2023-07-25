<template>
  <h3 class="header divi">Login</h3>
  <form @submit="login($event)">
    <div class="divi">
      <label for="email">Email</label><br />
      <input type="email" id="email" name="email" v-model="email" required autofocus>    
    </div>
    <div class="divi">
      <label for="password">Password</label><br />
      <input type="password" id="password" name="password" v-model="password" required>    
    </div>
    <div class="divi">
      <button>Login</button>
    </div>
    <div class="divi">
      <a href="#" @click="register()">New User?</a>
    </div>
    <div v-show="errShow" class="divi">
      <p>{{ errMessage }}</p>
    </div>
  </form>
</template>

<script setup>
import { ref, } from 'vue'
import { userStore } from '../store/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errShow = ref(false)
const errMessage = ref('')

const router = useRouter()
const usr = userStore()

const register = () => {
  router.push('/register')
}

const login = async (e) => {
  try {
    e.preventDefault()

    errShow.value = false
    errMessage.value = ''

    const user = {
      email: email.value,
      password: password.value,
    }

    const resp = await fetch(usr.backend + '/login',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (resp.status === 200) {
      const user = await resp.json()
      usr.login(user)
      router.push('/')
    } else {
      errShow.value = true;
      errMessage.value = 'Login failed';
    }
  } catch(error) {
    errShow.value = true;
    errMessage.value = error.message;
  }
}
</script>
