<template>
<div class="body">
  <nav>
    <div class="navigation">
      <ul>
        <li>
          <a href="#">
            <span class="icon"><ion-icon name="person-circle"></ion-icon></span>
            <span class="title"> {{ $store.state.idUser }}</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"><ion-icon name="log-in"></ion-icon></span>
            <span class="title"><router-link to="/">Login</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"><ion-icon name="logo-bitcoin"></ion-icon></span>
            <span class="title"><router-link to="/transactions">Compra-Venta</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"><ion-icon name="list"></ion-icon></span>
            <span class="title"><router-link to="/history">Historial</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"><ion-icon name="arrow-undo"></ion-icon></span>
            <span class="title" @click="quit()">SALIR</span>
          </a>
        </li>
      </ul>
      <div class="toggle"></div>
    </div>
  </nav>
  <router-view></router-view>
</div>
</template>
<script>
  export default  {
    data() {
      return {};
    },
    methods:{
      quit(){
        this.$router.push("/");
      }
    },
    mounted(){
      let navigation = document.querySelector('.navigation');
      let toggle = document.querySelector('.toggle');
      toggle.onclick = function(){
        navigation.classList.toggle('active')
      }
    },
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.body {
  /* position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px; */
  /* background-image: url("./assets/matxcoin.png"); */
  margin: 0;
  background-attachment: fixed;
}
.navigation {
  min-height: 100vh;
  position: fixed;
  inset: 20px;
  background: #287bff;
  width: 80px;
  border-left: 10px solid #287bff;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.05);
  transition: 0.5s;
}
.navigation.active {
  width: 300px;
  border-radius: 20px;
}
.toggle {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle::before {
  content: '';
  position: absolute;
  width: 26px;
  height: 3px;
  border-radius: 3px;
  background: #365fa1;
  transform: translateY(-5px);
  transition: 1s;
}
.toggle::after {
  content: '';
  position: absolute;
  width: 26px;
  height: 3px;
  border-radius: 3px;
  background: #365fa1;
  transform: translateY(5px);
  transition: 1s;
}
.navigation.active .toggle::before{
  transform: translateY(0px) rotate(-405deg);
}
.navigation.active .toggle::after{
  transform: translateY(0px) rotate(225deg);
}
.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.navigation ul li {
  position: relative;
  list-style: none;
  width: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.navigation ul li:hover {
  background: #fff;
}
.navigation ul li:nth-child(1) {
  top: 20px;
  margin-bottom: 40px;
  background: none;
}
.navigation ul li:not(:first-child):hover::before{
  content: '';
  position: absolute;
  top: -20px;
  right: 0;
  width: 20px;
  height: 20px;
  background: transparent;
  border-bottom-right-radius: 20px;
  box-shadow: 7.5px 7.5px 0 7.5px #fff;
}
.navigation ul li:not(:first-child):hover::after{
  content: '';
  position: absolute;
  bottom: -20px;
  right: 0;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-right-radius: 20px;
  box-shadow: 7.5px -7.5px 0 7.5px #fff;
}
.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #fff;
}
.navigation ul li:hover:not(:first-child) a{
  color: #365fa1;
}
.navigation ul li a .icon{
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 70px;
  text-align: center;
}
.navigation ul li a .icon ion-icon{
  font-size: 1.75em;
}
.navigation ul li a .title{
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}
</style>
