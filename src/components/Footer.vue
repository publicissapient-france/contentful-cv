<template>
  <table class="footer">
    <tr>
      <td class="footer__address"><span>Publicis Sapient Engineering</span> - 94 avenue Gambetta - 75020 Paris</td>
      <td class="footer__contact"><span>Tél</span> : 01 53 89 99 99 - <span>Fax</span> : 01 53 89 99 97</td>
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
    font-size: .6rem;
    padding: 10px 50px;
    width: 100%;

    &__address {
      width: 50%;
    }

    &__contact {
      width: 50%;
      text-align: right;
    }
  }

  @media print {
    .footer {
      position: fixed;
      bottom: 0;
    }
  }
</style>
