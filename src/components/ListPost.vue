<template>
  <div style="height: 800px; width: 20%; border: dashed #f6ffed;">
    <ul id="example-1">
        <li v-for="item in items" :key="item.message">
            {{ item.message }}
        </li>
    </ul>
  </div>

</template>

<script>


export default {
  name: 'Header',
  components: {
  },
  data(){
    return {
        items: [
        { message: '"id": 51' },
        { message: '"url_front": "https://forum.vgd.ru/file.php?fid=454522&key=231157345"' },
        { message: '"url_back": "https://forum.vgd.ru/file.php?fid=454521&key=510927720",' },
        { message: '"text_language": "русский",' },
        { message: '"date_written": "xx.xx.xxxx",' },
        { message: '"date_sent": "xx.05.1910",' },
        { message: '"date_received": "06.05.1910",' },
        { message: '"address_from": "Москва",' },
        { message: '"address_to": "Ростов на Дону, Летнее помещение коммерческого клуба, Симфонический оркестр Л.П.Штейнберга",' },
        { message: '"country_from": "Российская империя",' },
        { message: '"settlement_from": "Московская губерния, Московский уезд, город Москва",' },
        { message: '"settlement_to": "Область Войска Донского, Ростовский уезд, город Ростов-на-Дону",' },
        { message: '"name_from": "М.Каневски",' },
        { message: '"name_to": "П. Перов "' },
        { message: '"lat_from": "55.7504461",' },
        { message: '"lng_from": "37.6174943",' },
        { message: '"lat_to": "47.2213858",' },
        { message: '"lng_to": "39.7114196",' },
        { message: '"time_period": "Дореволюционные",' },
        { message: '"tags": [ "Просьба", "Искусство", "Шлю привет"]' }
        ]
    };
  }
}
</script>