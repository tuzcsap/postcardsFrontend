<template>
  <div id="app">
    <Header @updatePostcardList="updatePostcardList"/>
    <!--    <ListPost class="el"/>-->
    <Map :postcards="postcards" class="el"/>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Header from "./components/Header.vue";

import ky from "ky";
import {latLng} from "leaflet";
// import ListPost from "./components/ListPost.vue";

export default {
  name: 'App',
  components: {
    Map,
    Header,
    // ListPost
  },
  data() {
    return {
      postcards: []
    }
  },
  methods: {
    async updatePostcardList(timePeriod, cityFrom, cityTo) {
      const uri = `http://127.0.0.1:8000/postcards/filter?time_period=${timePeriod}` +
          (cityFrom ? `&settlement_from=${cityFrom}` : '') +
          (cityTo ? `&settlement_to=${cityTo}` : '');
      const encoded = encodeURI(uri);
      const postcardsResponse = await ky.get(encoded).json();
      console.log(postcardsResponse);
      this.postcards = postcardsResponse.map(p => ({
        id: p.id,
        coords_from: latLng(p.lat_from, p.lng_from),
        coords_to: latLng(p.lat_to, p.lng_to),
        url_front: p.url_front,
        address_from: p.address_from,
        address_to: p.address_to
      }));
    }
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
  overflow: hidden;
}

.el {
  float: left;
}
</style>
