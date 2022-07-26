<template>
  <div>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/transactions">Compra-Venta</router-link> |
      <router-link to="/history">Historial</router-link> |
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
  export default  {
    data() {
      return {};
    }
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
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  background-image: url("./assets/matxcoin.png");
  background-size: cover;
  z-index: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
