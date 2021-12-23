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
    const citiesToResponse = await ky.get("https://fastapi-postcards-backend.azurewebsites.net/cities/to").json();
    this.citiesTo = citiesToResponse.map((city, index) => ({name: city, id: index}));
    const citiesFromResponse = await ky.get("https://fastapi-postcards-backend.azurewebsites.net/cities/from").json();
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

</style>

//dropdow list (https://renatello.com/dynamic-drop-down-list-in-vue-js/)