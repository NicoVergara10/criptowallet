<template>
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
          <span class="icon"><ion-icon name="calculator"></ion-icon></span>
          <span class="title"><router-link to="/status">Estado Actual</router-link></span>
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon"><ion-icon name="bar-chart-outline"></ion-icon></span>
          <span class="title"><router-link to="/analysis">Inversiones</router-link></span>
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon"><ion-icon name="arrow-undo"></ion-icon></span>
          <span class="title" v-on:click="quit()">SALIR</span>
        </a>
      </li>
    </ul>
    <div class="toggle"></div>
  </div>
</template>
<script>
  export default  {
    data() {
      return {

      };
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
<style scoped>
  .navigation {
    min-height: 90vh;
    position: fixed;
    inset: 20px;
    background: #1d2e4eb9;
    width: 80px;
    border-left: 10px solid #1d2e4eb9;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.05);
    transition: 0.5s;
  }
  .navigation.active {
    width: 250px;
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
    color: rgb(255, 255, 255);
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
    text-transform: uppercase;
    position: relative;
    display: block;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    text-align: start;
    white-space: nowrap;
  }
</style>