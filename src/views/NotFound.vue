<template>
  <h3 class="header divi">404</h3>
  <h3 class="header divi">Not Found</h3>
  <h3 class="header divi">/{{ catchAll }}</h3>
</template>

<script>
  export default {
    props: ['catchAll']
  }
</script>