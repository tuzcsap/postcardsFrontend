<template>
  <div id="app">
    <Header/>
<!--    <ListPost class="el"/>-->
    <Map class="el"/>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Header from "./components/Header.vue";
// import ListPost from "./components/ListPost.vue";

export default {
  name: 'App',
  components: {
    Map,
    Header,
    // ListPost
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.all {
  overflow:hidden ;
}
.el {
  float: left;
}
</style>
