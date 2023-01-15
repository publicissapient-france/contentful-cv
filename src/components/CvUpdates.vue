<template>
  <h2 class="title">CV updates</h2>
  <div
    class="body"
    :key="update.firstName + update.name"
    v-for="update in cvUpdates"
  >
    <span class="body__left">{{ dayjs(update.updatedAt).fromNow(true) }}</span>
    <span class="body__middle">{{ update.firstName }} {{ update.name }}</span>
    <span class="body__right">
      <button class="body__button" @click="goCv(update.id, 'full', 'fr')">
        🇫🇷
      </button>
      <button class="body__button" @click="goCv(update.id, 'full', 'en')">
        🇺🇸
      </button>
      <button class="body__button" @click="goCv(update.id, 'mini', 'fr')">
        🇫🇷 mini
      </button>
      <button class="body__button" @click="goCv(update.id, 'mini', 'en')">
        🇺🇸 mini
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { auth } from "@/firebase/init";
import dayjs from "dayjs";

interface CvUpdate {
  firstName: string;
  name: string;
  updatedAt: Date;
  id: string;
}

export default defineComponent({
  data() {
    return {
      cvUpdates: [] as CvUpdate[],
    };
  },
  methods: {
    dayjs,
    async getCvUpdates(accessToken: string) {
      const res = await axios.get<CvUpdate[]>(
        "https://europe-central2-contentful-cv.cloudfunctions.net/fcvUpdates",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      this.cvUpdates = res.data;
    },
    goCv(id: string, type: "full" | "mini", lang: "fr" | "en") {
      this.$router.push({
        name: type !== "mini" ? "cv" : "mini-cv",
        query: { lang, id },
      });
    },
  },
  mounted() {
    auth.onAuthStateChanged(async (user) => {
      const accessToken = await user?.getIdToken();
      await this.getCvUpdates(accessToken!);
    });
  },
});
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 15px;
}

.body {
  display: flex;
  width: 100%;
  margin-bottom: 5px;

  &__middle {
    flex: 1;
  }

  &__right {
    display: flex;
    gap: 5px;
  }

  &__button {
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
