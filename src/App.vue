<script>
export default {
  data(){
    return {
      city: '',
      error: '',
      info: null
    }
  },
  computed: {
    cityName(){
      return '"' + this.city + '"'
    },
    showTemp(){
      return 'Температура ' + this.info.main.temp
    },
    showFeelsLike(){
      return 'Ощущается как ' + this.info.main.feels_like
    },
    showMinTemp(){
      return 'Минимальная температура ' + this.info.main.temp_min
    },
    showMaxTemp(){
      return 'Максимальная температура ' + this.info.main.temp_max
    }
  },
  methods: {
    getWeather(){
      if(this.city.trim().length < 2){
        this.error = 'Нужно название больше одного символа'
        return false
      }
      this.error =''

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=e5ad4883ef12deabc748c346fad7b635`)
        .then(response => response.json())
        .then(data => this.info = data)
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <h1>Прогноз погоды</h1>
    <p>Узнать погоду в {{ city == '' ? 'вашем городе' : cityName }}</p>
    <input type="text" v-model="city"  id="" placeholder="Введите город">
    <button v-if="city != ''" @click="getWeather()">Получить погоду</button>
    <button disabled v-else>Введите название города</button>
    <p class='error'>{{ error }}</p>
    
    <div v-if="info != null">
      <p >{{ showTemp }}</p>
      <p >{{ showFeelsLike }}</p>
      <p >{{ showMinTemp }}</p>
      <p >{{ showMaxTemp }}</p>
    </div>
    

  </div>
</template>

<style scoped>

.error {
  color: red;
}

.wrapper {
  width: 900px;
  height: 500px;
  border-radius: 50px;
  padding: 20px;
  background-color: #1f0f24;
  text-align: center;
  color: #ffffff;
}

.wrapper h1 {
  margin-top: 50px;
}

.wrapper p {
  margin-top: 20px
}

.wrapper input {
  margin-top: 30px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid grey;
  color: aliceblue;
  font-size: 14px;
  padding: 5px 8px;
  outline: none;
}

.wrapper input:focus {
  border-bottom-color: #6e2d7d;
}

.wrapper button:disabled {
  background: #746027;
  cursor: not-allowed;
}

.wrapper button {
  background: #e3bc4b;
  color: #ffffff; 
  border-radius: 10px;
  border: 2px solid #b99935;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}
.wrapper button:hover {
  transform:scale(1.1) translateY(-5px)
}
</style>
