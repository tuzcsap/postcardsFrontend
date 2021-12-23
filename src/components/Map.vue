<template>

  <div style="height: 800px; width: 100%">
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
      <l-control-fullscreen position="topleft"/>
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
          <v-img
              :src="postcard.url_front"
              contain
          >
          </v-img>
          <p>Откуда: {{ postcard.address_from }}</p>
          <p>Куда: {{ postcard.address_to }}</p>
          <a :href="'https://sysblok.ru/postcards/card/' + postcard.id">Подробнее</a>
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
        <l-popup>
          <v-img
              :src="postcard.url_front"
              contain
          >
          </v-img>
          <p>Откуда: {{ postcard.address_from }}</p>
          <p>Куда: {{ postcard.address_to }}</p>
          <a :href="'https://sysblok.ru/postcards/card/' + postcard.id">Подробнее</a>
        </l-popup>
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
  props: ["postcards"],
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
      // postcards: [],
      zoom: 6,
      center: latLng(55.7504461, 37.6174943),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
    const uri = "https://fastapi-postcards-backend.azurewebsites.net/timeperiod?time_period=Дореволюционные"
    const encoded = encodeURI(uri);
    const postcardsResponse = await ky.get(encoded).json();
    // const postcardsResponse = await ky.get("http://127.0.0.1:3000/postcards").json();
    this.postcards = postcardsResponse.map(p => ({
      id: p.id,
      coords_from: latLng(p.lat_from, p.lng_from),
      coords_to: latLng(p.lat_to, p.lng_to),
      url_front: p.url_front,
      address_from: p.address_from,
      address_to: p.address_to
    }));
  }
};
</script>
