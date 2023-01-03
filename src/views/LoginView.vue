<template>
  <main class="login">
    <h1>Welcome<br />Publicis&nbsp;Sapient<br />CV&nbsp;generator</h1>
    <p class="login__hint">
      Please login with you @publicissapient.com address to generate your CV.
    </p>
    <form @submit.prevent="login" class="login__form">
      <input
        class="login__input"
        v-model="email"
        placeholder="arthur@publicissapient.com"
        type="email"
        required
        pattern=".+@publicissapient\.com"
      />
      <button class="login__button">Login</button>
    </form>
  </main>
</template>

<script lang="ts">
import { sendSignInLinkToEmail } from "firebase/auth";
import { defineComponent } from "vue";
import { auth } from "@/firebase/init";

export default defineComponent({
  data() {
    return {
      email: "",
    };
  },
  methods: {
    login() {
      sendSignInLinkToEmail(auth, this.email, {
        url: import.meta.env.VITE_APP_URL,
        handleCodeInApp: true,
      })
        .then(() => {
          window.localStorage.setItem("emailForSignIn", this.email);
          this.$router.push({ name: "loginPending" });
        })
        .catch(() => console.error);
    },
  },
});
</script>

<style lang="scss">
.login {
  width: 500px;
  margin: auto;
  text-align: center;
  padding: 50px;

  &__hint {
    margin-top: 20px;
  }

  &__form {
    margin-top: 20px;
  }

  &__input {
    padding: 5px;
    outline: none;
    border-radius: 3px;
    box-shadow: none;
    border: solid 1px gray;
    width: 100%;
  }

  &__button {
    margin-top: 10px;
    width: 100%;
    background-color: #fe414d;
    color: #ffffff;
    height: 30px;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: darken(#fe414d, 10);
    }
  }
}
</style>
