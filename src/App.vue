<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "@/firebase/init";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default defineComponent({
  mounted() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email || "", window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          this.$router.push({ name: "home" });
        })
        .catch(() => console.error);
    }
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push({ name: "login" });
      }
    });
  },
});
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/reset.scss";
@import "@/assets/variables.scss";
@import "@/assets/theme.scss";

@page {
  size: A4;
  margin: 0;
}

@page landscape {
  size: $PTT-width-mm $PTT-height-mm;
}

@media print {
  html,
  body {
    border: 0;
  }
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
}

div.landscape-content {
  page: landscape;
}

body {
  margin: 0;
  font-size: 14px;
}

ul {
  margin: 5px;
  padding-left: 10px;
  list-style: none;

  p {
    margin: 0;
    display: inline-block;
  }
}

li {
  &::before {
    vertical-align: top;
    content: "\2022";
    color: #fe414d;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }

  li {
    &::before {
      content: "\25E6";
      margin-left: -1em;
    }
  }
}

#app {
  margin: auto;
  font-family: FuturaNext, sans-serif;
  font-weight: 400;
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
</style>
