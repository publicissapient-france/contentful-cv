<template>
  <table class="footer">
    <tr>
      <td class="footer__address"><span>Publicis Sapient France</span> - 94 avenue Gambetta - 75020 Paris</td>
      <td class="footer__contact">{{ $t('footer.contact') }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped lang="scss">
  .footer {
    background-color: #FFFFFF;
    height: 50px;
    font-size: .6rem;
    padding: 10px 50px;
    width: 794px;
    position: fixed;
    bottom: 0;

    &__address {
      width: 50%;
    }

    &__contact {
      width: 50%;
      text-align: right;
    }
  }
</style>
