<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "style/reset.styl"
  @import "style/my.styl"
  body
    width 100%
    height 100%

  #app
    display flex
    width 100%
    height 100%
</style>
