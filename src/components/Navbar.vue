<template>
    <nav class="d-flex flex-row align-items-center">
        <router-link class="home-link" to="/search">Home</router-link>
        <input v-model="searchText" placeholder="Search...">
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      searchText: null,
    };
  },
  created() {
    this.searchText = this.$route.query.query;
  },
  watch: {
    searchText() {
      this.$router.replace({
        query: { query: this.searchText },
      }).catch(() => {});
    },
  },
};
</script>

<style scoped>
    a {
        color: white;
    }

    a:hover {
        color: white;
        text-decoration: none;
    }

    nav {
        background-color: #24292e;
        padding: 1rem;
    }

    .home-link {
        margin: 0px 10px;
    }
</style>
