<template lang="pug">
  .production
    .page-top
      .page-back(@click="back()") 返回
      .page-title 作品展示
    .page-content
      .page-tab-content
        .tab-list
          .tab-item(v-for="item in tabList" :key="item.type" :class="{active: tab === item.type}") {{item.label}}
      .page-preview-content
        setBuildStructure
</template>

<script type="text/ecmascript-6">
  import setBuildStructure from './module/setBuildStructure/setBuildStructure'
  export default {
    name: 'production',
    components: {
      setBuildStructure
    },
    data() {
      return {
        tab: 'build',
        tabList: [{
          type: 'build',
          label: '建筑物编辑'
        }]
      }
    },
    methods: {
      back() {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.production
  width 100%
  height 100vh
  display flex
  flex-direction column
  .page-top
    display flex
    width 100%
    height 40px
    border-bottom 1px solid #e4e4e4
    align-items center
    padding 0 16px
    box-sizing border-box
    .page-back
      flex none
      font-size 12px
      margin-right 16px
    .page-title
      flex none
  .page-content
    flex 1 1 auto
    overflow auto
    display flex
    .page-tab-content
      flex none
      width 200px
      height 100%
      border-right 1px solid #e4e4e4
      box-shadow 3px 0px 6px -3px rgba(0,0,0,0.16)
      .tab-list
        width 100%
        .tab-item
          width 100%
          height 36px
          line-height 36px
          padding 0 12px
          font-size 14px
          box-sizing border-box
          position relative
          &.active
            border-right 3px solid #00a78e
          &:hover
            &:after
              width 100%
          &:after
            content ''
            width 0
            transition width .16s linear
            height 1px
            position absolute
            bottom 0
            left 0
            background #00a78e
    .page-preview-content
      flex 1 1 auto
      height 100%
</style>
