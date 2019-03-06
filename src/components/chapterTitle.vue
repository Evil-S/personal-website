<template lang="pug">
  .chapter-title-wrapper
    .chapter-title
      .tip
        h4.title_block {{tip}}
      h3(:class="color === 'white'?'white':'black'") {{title}}
      span(:class="color === 'white'?'white':'black'")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'chapterTitle',
    props: {
      'color': {
        type: String,
        default: 'white'
      },
      'tip': {
        type: String
      },
      'title': {
        type: String
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .chapter-title-wrapper
    text-align center
    .chapter-title
      display inline-block
      .tip
        text-align center
      h3
        font-size 32px
        line-height 48px
        font-weight 300
        font-family 'Open Sans', sans-serif
        margin 0
        &.white
          color #fff
        &.black
          color #1b242f
      span
        width: 208px;
        background: #fff
        height 1px
        display block
        position relative
        margin 16px auto 0px
        &.white
          background-color #fff
        &.black
          background-color #1b242f
        &:after
          content ' '
          position absolute
          background #00a78e
          height 7px
          display block
          width 73px
          top -4px
          left 65px
</style>
