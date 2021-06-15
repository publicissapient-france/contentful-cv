<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="scss">

  @import "@/style/variables";

  @page {
    size: A4;
    margin: 0;
  }

  @page landscape {
    size: $PTT-width-mm $PTT-height-mm ;
  }

  @media print {
    html, body {
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
    background-color: lightgray;
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
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2B2B2B;
  }
</style>
