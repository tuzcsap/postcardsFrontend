<template>

  <div style="height: 500px; width: 80%">
    <div style="height: 200px; overflow: auto;">
      <p>received coords: {{ latFrom}}, {{ lngFrom }}</p>
      <p>First marker is placed at {{ postcardFrom.lat }}, {{ postcardTo.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>

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
      <l-marker
        v-for="marker in markersFrom"
        :key="marker.id"
        :visible="marker.visible"
      >
        <l-popup :content="marker-tooltip" />
      </l-marker>
      <l-marker
        v-for="marker in markersTo"
        :key="marker.id"
        :visible="marker.visible"
      >
        <l-popup :content="marker-tooltip" />
      </l-marker>
      <l-marker :lat-lng="postcardFrom">
        <l-popup>
          <div @click="innerClick">
            <p v-show="showParagraph">
              текст открытки
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick" class="popUps">
            пункт отправления : {{ countryFrom}}
            пункт прибытия : {{ counrtyTo}}
            другой пункт отправления : {{ addressFrom}}
            другой пункт прибытия : {{ addressTo}}
            <p v-show="showParagraph">
              текст
            </p>
          </div>
        </l-popup>
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
<<<<<<< HEAD
      countryFrom: null,
      countryTo: null,
      addressFrom: null,
      addressTo: null,
=======
      markersTo: null,
      markersFrom: null,
>>>>>>> 987bec87ee2e044b8b2db8d2522fc6cc9e33b271
      zoom: 6,
      center: latLng(this.latFrom, this.lngFrom),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      postcardFrom: latLng(this.latFrom, this.lngFrom),
      postcardTo: latLng(this.latTo, this.lngTo),
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
  },
  async created() {
    const postcardResponse = await ky.get("http://127.0.0.1:8000/postcards/51").json();
    const randomPostcardsResponse = await ky.get("http://127.0.0.1:8000/randompostcards").json();
    console.log(randomPostcardsResponse);
    // console.log(randomPostcardsResponse.map(p => latLng(p.lat_to, p.lng_to)));
    this.markersTo = randomPostcardsResponse.map(p => latLng(p.lat_to, p.lng_to));
    this.markersFrom = randomPostcardsResponse.map(p => latLng(p.lat_from, p.lng_from));
    // TODO filter data without coords on backend
    this.latTo = +postcardResponse["lat_to"];
    this.lngTo = +postcardResponse["lng_to"];
    this.latFrom = +postcardResponse["lat_from"];
    this.lngFrom = +postcardResponse["lng_from"];
<<<<<<< HEAD
    this.countryFrom = +postcardResponse["country_from"];
    this.countryTo = +postcardResponse["country_to"];
    this.addressFrom = +postcardResponse["address_from"];
    this.addressTo = +postcardResponse["address_to"];
    this.withPopup = latLng(this.latTo, this.lngTo);
    this.withTooltip = latLng(this.latFrom, this.lngFrom);
=======
    this.postcardTo = latLng(this.latTo, this.lngTo);
    this.postcardFrom = latLng(this.latFrom, this.lngFrom);
>>>>>>> 987bec87ee2e044b8b2db8d2522fc6cc9e33b271
    this.center = latLng(this.latFrom, this.lngFrom);
  }
};
</script>

<style>
.popUps{
  width: 100px;
  height: 200px;
}

</style>