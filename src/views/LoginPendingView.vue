<template>
  <main class="pending">
    <h1>Email sent</h1>
    <p class="pending__hint">
      Please, have a look to your mailbox (even junk directory) and click on the
      link to complete login.
    </p>
  </main>
</template>

<style lang="scss">
.pending {
  width: 500px;
  margin: auto;
  text-align: center;
  padding: 50px;

  &__hint {
    margin-top: 10px;
  }
}
</style>
