<template>
  <div class="nav">
    <div class="dlist frame">
      <select class="form-control" @change="cityFrom($event)">
        <option value="" selected disabled>Откуда  &#9662;</option>
        <option v-for="city in citiesFrom" :value="city.id" :key="city.id">{{ city.name }}</option>
      </select>
    </div>
<!--    <v-select-->
<!--        @change="cityFrom($event)"-->
<!--        :items="citiesFrom"-->
<!--        item-text="name"-->
<!--        item-value="name">-->
<!--    </v-select>-->
    <div class="dlist frame">
      <select class="form-control" @change="cityTo($event)">
        <option value="" selected disabled>Куда  &#9662;</option>
        <option v-for="city in citiesTo" :value="city.id" :key="city.id">{{ city.name }}</option>
      </select>
    </div>
    <div class="dlist frame">
      <select class="form-control" @change="timePeriod($event)">
        <option value="" selected disabled>Период времени  &#9662;</option>
        <option v-for="perio in period" :value="perio.id" :key="perio.id">{{ perio.name }}</option>
      </select>
    </div>
    <div class="dlist timeline">
      <div class="range-input">
        <input type="range" min="1" max="21" value="0" step="1">
        <div class="value">
          <div>Выберите век</div>
        </div>
      </div>
    </div>
<!--    <v-btn @click="$emit('updatePostcardList',-->
<!--          'Дореволюционные')"-->
<!--    >Сбросить-->
<!--    </v-btn>-->
    <div class="dlist-search">
      <v-btn @click="$emit('updatePostcardList',
          selectedPeriod,
          selectedCityFrom,
          selectedCityTo)"
      >Найти
      </v-btn>
    </div>
  </div>

</template>

<script>
import ky from 'ky';

export default {
  name: 'Header',
  components: {},
  data() {
    return {
      citiesFrom: [],
      citiesTo: [],
      period: [
        {name: "Дореволюционные", id: 1},
        {name: "Советские", id: 2},
        {name: "Современные", id: 3}
      ],
      selectedPeriod: "",
      selectedCityFrom: "",
      selectedCityTo: ""
    };
  },
  methods: {
    async cityFrom(event) {
      this.selectedCityFrom = event.target.options[event.target.options.selectedIndex].text;
      console.log(this.selectedCityFrom);
    },
    async cityTo(event) {
      this.selectedCityTo = event.target.options[event.target.options.selectedIndex].text;
      console.log(this.selectedCityTo);
    },
    async timePeriod(event) {
      this.selectedPeriod = event.target.options[event.target.options.selectedIndex].text;
      console.log(this.selectedPeriod);
    },
    // updatePostcardList() {
    //   console.log("emit update");
    //   this.$emit(
    //       "updatePostcardList",
    //       this.selectedPeriod,
    //       this.selectedCityFrom,
    //       this.selectedCityTo
    //   )
    // }
  },
  async created() {
    const citiesToResponse = await ky.get("http://127.0.0.1:8000/cities/to").json();
    this.citiesTo = citiesToResponse.map((city, index) => ({name: city, id: index}));
    const citiesFromResponse = await ky.get("http://127.0.0.1:8000/cities/from").json();
    this.citiesFrom = citiesFromResponse.map((city, index) => ({name: city, id: index}));
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
}

.nav {
  background-color: #f4ebdb;
  overflow: hidden
}

.frame{
  border: 0px solid #8e9b97; 
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}



.dlist {
  float: left;
  color: #f2f2f2f2;
  padding: 14px 16px;
  text-aling: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 2%;
  margin-left: 2%;
  margin-top: 2%;
}

.timeline{
  margin-top: 0.5%
}

.dlist-search {
  float: right;
  color: #f2f2f2f2;
  padding: 14px 16px;
  text-aling: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 2%;
  margin-left: 2%;
  margin-top: 1.5%
}

.range-input input {
  -webkit-appearance:none;
  width:200px;
  height:2px;
  background:#2c4a52;
  border:none;
  outline:none;
}
.range-input input::-webkit-slider-thumb {
  -webkit-appearance:none;
  width:20px;
  height:20px;
  background:#eee;
  border:2px solid #2c4a52;
  border-radius:50%;
}
.range-input input::-webkit-slider-thumb:hover {
  background:#2c4a52;
}
.range-input .value {
  color:#2c4a52;
  text-align:center;
  font-weight:600;
  line-height:40px;
  height:40px;
  overflow:hidden;
  margin-left:10px;
}
.range-input .value div {
  transition:all 300ms ease-in-out;
}

</style>

//dropdow list (https://renatello.com/dynamic-drop-down-list-in-vue-js/)