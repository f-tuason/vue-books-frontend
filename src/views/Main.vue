<template>
  <div class="header divi">
    <p>Welcome back! ({{ usr?.email || 'Default' }}) <a href="#" @click="logout()" >Logout</a></p>
  </div>
  <div class="header divi">
    <h2>Add Book</h2>
  </div>
  <form @submit="add($event)">
    <div class="divi">
      <label for="title">Book Title</label><br />
      <input type="text" id="title" name="title" v-model="title" required autofocus>    
    </div>
    <div class="divi">
      <label for="author">Book Author</label><br />
      <input type="text" id="author" name="author" v-model="author" required>    
    </div>
    <div class="divi">
      <button>Submit</button>
    </div>
    <div v-show="errShow" class="divi">
      <p>{{ errMessage }}</p>
    </div>
  </form>
  <h3 class="header divi">List of Books</h3>
  <div class="divi" v-if="onload">
    <table width='100%'>
      <tr v-for='book in books' :key='book.id'>
        <td width='60%'>{{ book.title }}</td>
        <td width='30%'>{{ book.author }}</td>
        <td width='10%'><button @click="remove(book.id)">Delete</button></td>
      </tr>
    </table>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../store/user'
import { useRouter } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore'


const title = ref('')
const author = ref('')
const errShow = ref(false)
const errMessage = ref('')
const books = ref([])
const snapshotRef = ref({})
const onload = ref(false)

const router = useRouter()
const usr = userStore()
const app = initializeApp(usr.firebase)
const db = getFirestore(app)
const colRef = collection(db, 'books')
const q = query(colRef, orderBy('createdAt', 'desc'))

onMounted(async () => {
  snapshotRef.value = onSnapshot(q, (snapshot) => {
    onload.value = false
    books.value = []
    snapshot.docs.forEach((item) => {
      books.value.push({ ...item.data(), id: item.id })
    })
    onload.value = true  
  })
})

const add = async (e) => {
  try {
    e.preventDefault()

    errShow.value = true
    errMessage.value = ''

    const book = {
      title: title.value,
      author: author.value
    }

    const resp = await fetch(usr.backend + '/add',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    if (resp.status !== 200) {
      errShow.value = true;
      errMessage.value = 'Adding book failed';
    }
  } catch(error) {
    errShow.value = true
    errMessage.value = ''
  }
}

const remove = async (id) => {
  try {
    const bookid = { id }

    const resp = await fetch(usr.backend + '/delete',
    {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookid)
    })
    if (resp.status !== 200) {
      errShow.value = true;
      errMessage.value = 'Deleting book failed';
    }
  } catch(error) {
    errShow.value = true
    errMessage.value = ''
  }
}

const logout = () => {
  usr.logout();
  router.push('/login')
}
</script>
