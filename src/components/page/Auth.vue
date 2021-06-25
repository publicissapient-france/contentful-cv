<template>
  <div class="auth">
    <h1>Bienvenue sur le générateur de CV Publicis Sapient France</h1>
    <div v-if="$auth.isAuthenticated">
      Connecté en tant que : {{$auth.user.email}}
    </div>
    <div v-if="$auth.isAuthenticated">
      <label class="auth__label" for="email">Entrez le courriel correspondant au CV à consulter.<br/><i>Laissez le champ
        vide pour consulter votre CV</i></label>
      <input class="auth__input" id="email" v-model="email">
    </div>
    <div class="auth__container">
      <div v-if="!$auth.isAuthenticated">
        <button class="auth__button" @click="login">Se connecter</button>
      </div>
      <div v-if="$auth.isAuthenticated">
        <button class="auth__button" @click="goCvFr">Consulter le CV en 🇫🇷</button>
      </div>
      <div v-if="$auth.isAuthenticated">
        <button class="auth__button" @click="goCvEn">Consulter le CV en 🇬🇧</button>
      </div>
      <div v-if="$auth.isAuthenticated">
        <button class="auth__button" @click="goMiniCvFr">Consulter le mini CV en 🇫🇷</button>
      </div>
      <div v-if="$auth.isAuthenticated">
        <button class="auth__button" @click="goCvEn">Consulter le mini CV en 🇬🇧</button>
      </div>
      <div v-if="$auth.isAuthenticated">
        <button class="auth__button" @click="logout">Se déconnecter</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        email: '',
      };
    },
    methods: {
      login() {
        this.$auth.loginWithRedirect();
      },
      goCvFr() {
        this.$router.push(`/cv/${this.email.length > 1 ? this.email : this.$auth.user.email}?lang=fr`);
      },
      goCvEn() {
        this.$router.push(`/cv/${this.email.length > 1 ? this.email : this.$auth.user.email}?lang=en`);
      },
      goMiniCvFr() {
        this.$router.push(`/mini-cv/${this.email.length > 1 ? this.email : this.$auth.user.email}?lang=fr`);
      },
      logout() {
        this.$auth.logout({
          returnTo: window.location.origin
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .auth {
    width: 500px;
    margin: auto;
    text-align: center;
    padding: 50px;

    &__button {
      width : 100%;
      background-color: #FE414D;
      color: #FFFFFF;
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

      &>div{
        width : calc(50% - 10px);
        margin-bottom: 10px;

        &:nth-child(2n){
          margin-left:20px;
        }

      }
    }

    &__label {
      display: block;
      margin: 20px 0 5px;
    }

    &__input {
      padding: 10px;
      outline: none;
      border-radius: 3px;
      box-shadow: none;
      width: 250px;
      border: solid 1px gray;
    }
  }
</style>
