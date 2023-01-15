<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "@/firebase/init";
import type { User } from "@firebase/auth";
import CvUpdates from "@/components/CvUpdates.vue";

export default defineComponent({
  components: { CvUpdates },
  data() {
    return {
      email: "",
      user: {} as User,
    };
  },
  methods: {
    goCv(type: "full" | "mini", lang: "fr" | "en") {
      const id = this.email || this.user.email;
      this.$router.push({
        name: type !== "mini" ? "cv" : "mini-cv",
        query: { lang, id },
      });
    },
  },
  mounted() {
    const _this = this;
    auth.onAuthStateChanged((user) => {
      _this.user = user || ({} as User);
    });
  },
});
</script>

<template>
  <main>
    <div class="auth">
      <h1>Welcome<br />Publicis&nbsp;Sapient<br />CV&nbsp;generator</h1>
      <p class="auth__logged">
        You are: <span class="auth__username">{{ user.email }}</span>
      </p>
      <label class="auth__label" for="email">
        Which CV would you like to consult?<br />
        <i>Keep the field empty to see your CV</i>
      </label>
      <input class="auth__input" id="email" v-model="email" />
      <div class="auth__container">
        <button class="auth__button" @click="goCv('full', 'fr')">
          Consult 🇫🇷 CV
        </button>
        <button class="auth__button" @click="goCv('full', 'en')">
          Consult 🇺🇸 CV
        </button>
        <button class="auth__button" @click="goCv('mini', 'fr')">
          Consult 🇫🇷 mini CV
        </button>
        <button class="auth__button" @click="goCv('mini', 'en')">
          Consult 🇺🇸 mini CV
        </button>
      </div>
      <CvUpdates />
    </div>
  </main>
</template>

<style scoped lang="scss">
.auth {
  margin: auto;
  min-width: 500px;
  max-width: 800px;
  text-align: center;
  padding: 50px;

  &__logged {
    margin-top: 10px;
  }

  &__username {
    font-weight: 700;
  }

  &__button {
    width: 100%;
    background-color: #fe414d;
    color: #ffffff;
    height: 30px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px 0;

    & > button {
      width: calc(50% - 10px);
      margin-bottom: 10px;

      &:nth-child(2n) {
        margin-left: 20px;
      }
    }
  }

  &__label {
    display: block;
    margin: 20px 0 5px;
  }

  &__input {
    padding: 5px;
    outline: none;
    border-radius: 3px;
    box-shadow: none;
    width: 100%;
    border: solid 1px gray;
  }
}
</style>
