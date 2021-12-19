<template>
  <div class="nav">
    <div  class="dlist">
      <select class="form-control" @change="cityFrom($event)">
        <option value="" selected disabled>Откуда</option>
        <option v-for="cit in city" :value="cit.id" :key="cit.id">{{ cit.name }}</option>
      </select>
    </div>
    <div  class="dlist">
      <select class="form-control" @change="cityTo($event)">
        <option value="" selected disabled>Куда</option>
        <option v-for="cit in city" :value="cit.id" :key="cit.id">{{ cit.name }}</option>
      </select>
    </div>
    <div  class="dlist">
      <select class="form-control" @change="timePeriod($event)">
        <option value="" selected disabled>Период времени</option>
        <option v-for="perio in period" :value="perio.id" :key="perio.id">{{ perio.name }}</option>
      </select>
    </div>
    <div  class="search">
      <button>Найти</button>
    </div>
  </div>

</template>

<script>
import ky from 'ky';

export default {
  name: 'Header',
  components: {
  },
  data(){
    return {
      city: [
      { name: "Москва", id: 1 },
      { name: "Санкт-Петербург", id: 2 },
      { name: "Томск", id: 3 },
      { name: "Владивосток", id: 4 },
      { name: "Казань", id: 5 },
      { name: "Новосибирск", id: 6 },
      { name: "Екатеринбург", id: 7 },
      { name: "Петрозаводск", id: 8 },
      { name: "Самара", id: 9 },
      { name: "Пермь", id: 10 },
      { name: "Обнинск", id: 11 }
      ],
      period: [
      { name: "Дореволюционный", id: 1 },
      { name: "Советский", id: 2 },
      { name: "Постсоветский", id: 3 }
      ]
    };
  },
  methods: {
    async cityFrom (event) {
      this.selectedJobTitle = event.target.options[event.target.options.selectedIndex].text;
      // TODO filter by location name
      const response = await ky.get("http://127.0.0.1:8000/postcards/51").json();
      console.log("OK", response, String(response.address_from));
    },
    async cityTo (event) {
      this.selectedJobTitle = event.target.options[event.target.options.selectedIndex].text;
      // TODO filter by location name
      const response = await ky.get("http://127.0.0.1:8000/postcards/51").json();
      console.log("OK", response, String(response.address_to));
    },
    async timePeriod (event) {
      this.selectedJobTitle = event.target.options[event.target.options.selectedIndex].text;
      // TODO filter by period name
      const response = await ky.get("http://127.0.0.1:8000/postcards/51").json();
      console.log("OK", response, String(response.time_period));
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
.nav{
  background-color:#333;
  overflow:hidden
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
.search {
  float: left;
  padding: 14px 16px;
  text-aling: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}
</style>

//dropdow list (https://renatello.com/dynamic-drop-down-list-in-vue-js/)