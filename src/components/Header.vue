<template>
  <div class="nav">
    <div class="dlist">
      <select class="form-control" @change="cityFrom($event)">
        <option value="" selected disabled>Откуда</option>
        <option v-for="city in citiesFrom" :value="city.id" :key="city.id">{{ city.name }}</option>
      </select>
    </div>
<!--    <v-select-->
<!--        @change="cityFrom($event)"-->
<!--        :items="citiesFrom"-->
<!--        item-text="name"-->
<!--        item-value="name">-->
<!--    </v-select>-->
    <div class="dlist">
      <select class="form-control" @change="cityTo($event)">
        <option value="" selected disabled>Куда</option>
        <option v-for="city in citiesTo" :value="city.id" :key="city.id">{{ city.name }}</option>
      </select>
    </div>
    <div class="dlist">
      <select class="form-control" @change="timePeriod($event)">
        <option value="" selected disabled>Период времени</option>
        <option v-for="perio in period" :value="perio.id" :key="perio.id">{{ perio.name }}</option>
      </select>
    </div>
    <div class="dlist">
      <div class="range-input">
        <input type="range" min="1" max="100" value="1" step="10">
        <div class="value">
          <div></div>
        </div>
      </div>
    </div>
<!--    <v-btn @click="$emit('updatePostcardList',-->
<!--          'Дореволюционные')"-->
<!--    >Сбросить-->
<!--    </v-btn>-->
    <v-btn @click="$emit('updatePostcardList',
          selectedPeriod,
          selectedCityFrom,
          selectedCityTo)"
    >Найти
    </v-btn>
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
  margin-top: 60px;
}

.nav {
  background-color: #f6ffed;
  overflow: hidden
}

.dlist {
  float: left;
  color: #f2f2f2f2;
  padding: 14px 16px;
  text-aling: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px
}

.range-input input {
  -webkit-appearance:none;
  width:200px;
  height:2px;
  background:#4471ef;
  border:none;
  outline:none;
}
.range-input input::-webkit-slider-thumb {
  -webkit-appearance:none;
  width:20px;
  height:20px;
  background:#eee;
  border:2px solid #4471ef;
  border-radius:50%;
}
.range-input input::-webkit-slider-thumb:hover {
  background:#4471ef;
}
.range-input .value {
  color:#4471ef;
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