<template>
  <div class="login">
   <div class="wrapper">
      <div class="logo">
          <img src="../assets/pngwing.com.png" alt="">
      </div>
      <div class="text-center mt-4 name">
          CRIPTO WALLET
      </div>
      <form class="p-3 mt-3">
          <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input type="text" name="idUsuario" v-model="idUser" id="idUsuario" placeholder="ID">
          </div>
          <button class="btn mt-3" @click="enter">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      idUser: "",
    };
  },
  methods: {
    enter() {
      if (this.idUser.trim() === "") {
        this.$toast.error("Error! el campo no debe estar vacío");
      } else {
        if (this.idUser.length > 10) {
          this.$toast.error(
            "Error! El ID de usuario no debe contener más de 10 caracteres"
          );
        } else {
          this.$store.commit("modificarIdUsuario", this.idUser);
          this.$store.commit("cargarTransacciones");
          this.$router.push("/transactions");
        }
      }
    }
  }
};
</script>

<style scoped>
  .wrapper {
    max-width: 350px;
    min-height: 500px;
    margin: 80px auto;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
  }

  .logo {
    width: 90px;
    margin: auto;
  }

  .logo img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #5f5f5f,
      0px 0px 0px 5px #ecf0f3,
      8px 8px 15px #a7aaa7,
      -8px -8px 15px #fff;
  }

  .wrapper .name {
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: 1.3px;
    padding-left: 10px;
    color: #555;
    padding: 20px;
  }

  .wrapper .form-field input {
    width: 100%;
    display: block;
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 15px 10px;
  }

  .wrapper .form-field {
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
  }

  .wrapper .form-field .fas {
    color: #555;
  }

  .wrapper .btn {
    box-shadow: none;
    width: 100%;
    height: 40px;
    background-color: #0a70a0;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,
        -3px -3px 3px #fff;
    letter-spacing: 1.3px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }

  .wrapper .btn:hover {
    background-color: #039BE5;
  }

  .wrapper a {
    text-decoration: none;
    font-size: 0.8rem;
    color: #03A9F4;
  }

  .wrapper a:hover {
    color: #039BE5;
  }

  @media(max-width: 380px) {
    .wrapper {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
  }
</style>