<template>
  <div class="form__container">
    <div>
      <!-- <form
        @submit.prevent="handleSubmit"
        action=""
        class="q-gutter-y-md column"
        style="margin: 0 auto; max-width: 300px"
      >
        <h5 class="q-my-md">Sign up Form</h5>
        <q-input text filled v-model="firstName" placeholder="first Name" />
        <q-input text filled v-model="lastName" placeholder="lastName" />
        <q-input email filled v-model="email" placeholder="Email" />
        <q-input password filled v-model="password" placeholder="Password" />
        <q-input
          password
          filled
          v-model="password2"
          placeholder="Confirm Password"
        />
        <q-input text filled v-model="role" placeholder="role" />
        <q-input text filled v-model="dateOfBirth" placeholder="dateOfBirth" />
        <q-input text filled v-model="telephone" placeholder="Telephone" />
        <q-input text filled v-model="gender" placeholder="gender" />

        <div>
          <q-btn
            class="q-my-md"
            label="Sign Up"
            type="submit"
            color="primary"
          />
        </div>
      </form> -->

      <div class="form__container">
        <form @submit.prevent="handleSubmit" class="container">
          <div class="brand-logo">
            <img src="../assets/isfanny-smile-logo.png" alt="" />
          </div>
          <div class="brand-title">Sign Up</div>
          <div class="col-12">
            <div class="inputs">
              <label>First Name</label>
              <input
                v-model="firstName"
                type="text"
                placeholder="First Name"
                required
              />

              <label>Last Name</label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Last Name"
                required
              />

              <label>Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="email@example.com"
                required
              />

              <label>Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Enter Password"
                required
              />

              <label>Confirm Password</label>
              <input
                v-model="password2"
                type="password"
                placeholder="Enter Password again"
                required
              />

              <label>Role</label>
              <q-radio v-model="role" val="user" label="User" />
              <q-radio v-model="role" val="publisher" label="Publisher" />
              <!-- <input
                type="text"
                v-model="role"
                placeholder="user / publisher"
                required
              /> -->

              <label>Date of Birth</label>
              <input
                type="text"
                v-model="dateOfBirth"
                placeholder="DD/MM/YYYY"
                required
              />

              <label>Telephone</label>
              <input
                type="text"
                v-model="telephone"
                placeholder="0241234567"
                required
              />

              <label>Gender</label>
              <q-radio v-model="gender" val="male" label="Male" />
              <q-radio v-model="gender" val="female" label="Female" />
              <!-- <input
                type="text"
                v-model="gender"
                placeholder="Male / Female"
                required
              /> -->

              <button type="submit">REGISTER</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      role: "",
      dateOfBirth: "",
      telephone: "",
      gender: "",
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        password2: this.password2,
        role: this.role,
        dateOfBirth: this.dateOfBirth,
        telephone: this.telephone,
        gender: this.gender,
      };

      console.log(data);
      axios
        .post("https://meme-api-v1.herokuapp.com/api/v1/auth/register", data)
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.form__container {
  margin: 0;
  width: 100vw;
  background: #ecf0f3;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  place-items: center;
  overflow: auto;
}

.container {
  position: relative;
  margin: 3rem 0;
  width: 400px;
  /* height: 80%; */
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  /* box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white; */
}

@media screen and (min-width: 650px) {
  .container {
    width: 500px;
  }
}

.brand-logo {
  height: 100px;
  width: 100px;
  background: url("https://img.icons8.com/color/100/000000/twitter--v2.png");
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
}

.brand-title {
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.3rem;
  color: var(--color-dark);
  letter-spacing: 1px;
}

.inputs {
  text-align: left;
  margin-top: 20px;
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
  background: #ecf0f3;
  margin-bottom: 1rem;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}

button {
  color: white;
  margin-top: 20px;
  background: #1da1f2;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}

a {
  position: absolute;
  font-size: 8px;
  bottom: 4px;
  right: 4px;
  text-decoration: none;
  color: black;
  background: yellow;
  border-radius: 10px;
  padding: 2px;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
