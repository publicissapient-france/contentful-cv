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
  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }
  }

  body {
    margin: 0;
    font-size: 14px;
  }

  ul {
    margin: 5px 0;
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
    width: 794px; /* 96 ppi */
    margin: auto;
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2B2B2B;
  }
</style>
