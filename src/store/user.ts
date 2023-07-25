import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    user: null,
    backend: 'http://localhost:3000',
    firebase: {
      apiKey: "AIzaSyAKzBQ7M5swyszSTff81637vkx2iZp0gE4",
      authDomain: "my-web-app-868a4.firebaseapp.com",
      projectId: "my-web-app-868a4",
      storageBucket: "my-web-app-868a4.appspot.com",
      messagingSenderId: "638728251568",
      appId: "1:638728251568:web:d4f7a1c13bc8cffb88f375"    
    }
  }),
  actions: {
    login(user: any) {
      this.user = user
    },
    logout() {
      this.user = null
    }
  }
})
