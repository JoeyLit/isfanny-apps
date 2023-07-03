<template>
  <!-- <div style="width: 100%; height: 100vh">
    <div>
      <form
        @submit.prevent="handleSubmit"
        action=""
        class="q-gutter-y-md column"
        style="margin: 0 auto; max-width: 300px"
      >
        <h5 class="q-my-md">Login Form</h5>
        <q-input email filled v-model="email" placeholder="Email" />
        <q-input password filled v-model="password" placeholder="Password" />
        <div>
          <q-btn class="q-my-md" label="Submit" type="submit" color="primary" />
        </div>
      </form>
    </div>
  </div> -->

  <div class="form__container">
    <form @submit.prevent="handleSubmit" class="container">
      <div class="brand-logo">
        <img src="../assets/isfanny-smile-logo.png" alt="" />
      </div>
      <div class="brand-title">Login</div>
      <div class="inputs">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          ref="textEmail"
          placeholder="email"
        />
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          ref="textPassword"
          placeholder="Password"
        />
        <button type="submit">LOGIN</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
  },
  data() {
    return {
      email: "",
      password: "",

      textErrors: [],
      dollarQ: this.$q,
    };
  },
  methods: {
    showLoading() {
      this.dollarQ.loading.show({
        // delay: 400,
      });
    },
    hideLoading() {
      this.dollarQ.loading.hide();
    },
    formValidation() {
      this.textErrors = [];
      if (!this.email || this.email == "") {
        this.$refs.textEmail.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "email required.",
          position: "top-right",
        });
        this.textErrors.push("email required");
        return;
      }
      if (!this.password || this.password == "") {
        this.$refs.textPassword.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "password required.",
          position: "top-right",
        });
        this.textErrors.push("password required");
        return;
      }
    },
    handleSubmit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.formValidation();
      this.showLoading();
      if (this.textErrors.length > 0) {
        this.hideLoading();
        return;
      } else {
        axios
          .post("https://meme-api-v1.herokuapp.com/api/v1/auth/login", data)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            this.hideLoading();
            this.dollarQ.notify({
              type: "positive",
              message: "Logged in Successfully.",
              position: "top-right",
            });
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err.message);
            this.hideLoading();
            this.dollarQ.dialog({
              title: "Failed to Login",
              message:
                "Ooops! Something went wrong. Check your email and password. Else check your internet and try again",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.form__container {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #ecf0f3;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  place-items: center;
  overflow: hidden;
}

.container {
  position: relative;
  width: 350px;
  height: 500px;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  /* box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white; */
}

.brand-logo {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: 100px;
  width: 100px;
  /* background: url("../assets/isfanny-smile-logo.png"); */
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
}

.brand-logo img {
  margin: 0 auto;
}

.brand-title {
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.8rem;
  color: #1da1f2;
  letter-spacing: 1px;
}

.inputs {
  text-align: left;
  margin-top: 30px;
}

label,
input,
button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;
}

label:nth-of-type(2) {
  margin-top: 12px;
}

input::placeholder {
  color: gray;
}

input {
  /* background: #ecf0f3; */
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 10px;
  /* box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; */
}

button {
  color: white;
  margin-top: 20px;
  background: #1da1f2;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  /* box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white; */
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
