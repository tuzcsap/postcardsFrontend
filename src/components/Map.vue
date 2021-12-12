<template>

  <div style="height: 500px; width: 80%">
    <div style="height: 200px; overflow: auto;">
      <p>received coords: {{ latFrom}}, {{ lngFrom }}</p>
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
        v-if="showMap"
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
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            пункт отправления
            <p v-show="showParagraph">
              текст открытки
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            пункт назначения
            <p v-show="showParagraph">
              текст
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker, LPopup, LTooltip} from "vue2-leaflet";
import ky from 'ky';

export default {
  name: "Map",
  component: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      latFrom: null,
      lngFrom: null,
      latTo: null,
      lngTo: null,
      zoom: 6,
      center: latLng(this.latFrom, this.lngFrom),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(this.latFrom, this.lngFrom),
      withTooltip: latLng(this.latTo, this.lngTo),
      currentZoom: 11.5,
      currentCenter: latLng(this.latFrom, this.lngFrom),
      showParagraph: false,
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
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  },
  async created() {
    const postcardResponse = await ky.get("http://127.0.0.1:8000/postcards/51").json();
    // TODO filter data without coords on backend
    // new
    this.latTo = +postcardResponse["lat_to"];
    this.lngTo = +postcardResponse["lng_to"];
    this.latFrom = +postcardResponse["lat_from"];
    this.lngFrom = +postcardResponse["lng_from"];
    this.withPopup = latLng(this.latTo, this.lngTo);
    this.withTooltip = latLng(this.latFrom, this.lngFrom);
    this.center = latLng(this.latFrom, this.lngFrom);
  }
};
</script>
