<template>

  <div style="height: 500px; width: 80%">
    <div style="height: 200px; overflow: auto;">
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
<!--      <p-->
<!--          v-for="postcard in postcards"-->
<!--          :key="postcard.id"-->
<!--      >-->
<!--        {{ `${postcard.lat_from}, ${postcard.lng_from}` }}-->
<!--      </p>-->
    </div>
    <l-map
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
    >
      <l-tile-layer
          :url="url"
          :attribution="attribution"
      />
      <l-marker
          v-for="postcard in postcards"
          :key="postcard.id + 'from'"
          :lat-lng="postcard.coords_from"
      >
        <l-icon
          icon-url="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
        >
        </l-icon>
        <l-popup>
          <img :src="postcard.url_front">
        </l-popup>
      </l-marker>
      <l-marker
          v-for="postcard in postcards"
          :key="postcard.id + 'to'"
          :lat-lng="postcard.coords_to"
      >
        <l-icon
          icon-url="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
        >
        </l-icon>
        <l-popup/>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker, LPopup, LTooltip, LIcon} from "vue2-leaflet";
import ky from 'ky';

export default {
  name: "Map",
  component: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon
  },
  data() {
    return {
      postcards: [],
      zoom: 6,
      center: latLng(55.7504461, 37.6174943),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // postcardFrom: latLng(this.latFrom, this.lngFrom),
      // postcardTo: latLng(this.latTo, this.lngTo),
      currentZoom: 11.5,
      currentCenter: this.center,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  },
  async created() {
    // const postcardResponse = await ky.get("http://127.0.0.1:3000/postcards/51").json();
    const postcardsResponse = await ky.get("http://127.0.0.1:3000/postcards").json();
    this.postcards = postcardsResponse.map(p => ({id: p.id, coords_from: latLng(p.lat_from, p.lng_from), coords_to: latLng(p.lat_to, p.lng_to), url_front: p.url_front}));
    // console.log(randomPostcardsResponse.map(p => latLng(p.lat_to, p.lng_to)));
    // this.markersTo = randomPostcardsResponse.map(p => latLng(p.lat_to, p.lng_to));
    // this.markersFrom = randomPostcardsResponse.map(p => latLng(p.lat_from, p.lng_from));
    // TODO filter data without coords on backend
    // this.latTo = +postcardResponse["lat_to"];
    // this.lngTo = +postcardResponse["lng_to"];
    // this.latFrom = +postcardResponse["lat_from"];
    // this.lngFrom = +postcardResponse["lng_from"];
    // this.postcardTo = latLng(this.latTo, this.lngTo);
    // this.postcardFrom = latLng(this.latFrom, this.lngFrom);
    // this.center = latLng(this.latFrom, this.lngFrom);
  }
};
</script>
