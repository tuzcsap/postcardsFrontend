import Vue from 'vue';
import App from './App.vue';

import {LMap, LMarker, LTileLayer, LTooltip, LPopup, LIcon} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import LControlFullscreen from 'vue2-leaflet-fullscreen';

import vuetify from './plugins/vuetify'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-popup', LPopup);
Vue.component('l-icon', LIcon);
Vue.component('l-control-fullscreen', LControlFullscreen);

Vue.config.productionTip = false;

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')

let rangeInput = document.querySelector(".range-input input");
let rangeValue = document.querySelector(".range-input .value div");

let start = parseFloat(rangeInput.min);
let end = parseFloat(rangeInput.max);
let step = parseFloat(rangeInput.step);

for(let i=start;i<=end;i+=step){
  rangeValue.innerHTML += '<div>'+i+'</div>';
}

rangeInput.addEventListener("input",function(){
  let top = parseFloat(rangeInput.value)/step * -40;
  rangeValue.style.marginTop = top+"px";
});