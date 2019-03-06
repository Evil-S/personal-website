<template lang="pug">
  div.skills-cube-wrapper(ref="skillsBox")
    .skill-cube
      .front
        .skill-img
          img(height='180px' width='180px' :src='skill.url')
        .skill-name {{skill.name}}
      .hide
        p {{skill.level}}
</template>

<script type="text/ecmascript-6" scoped>
  import {Cure} from '../script/cube'

  export default {
    name: 'skillsCube',
    props: {
      'skill': {
        type: Object,
        default: {
          name: '',
          level: '',
          url: ''
        }
      }
    },
    mounted() {
      /* eslint-disable no-new */
      new Cure(this.$refs.skillsBox)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  div.skills-cube-wrapper
    position relative
    width 180px
    height 180px
    list-style none
    margin 5px
    perspective 300px
    .skill-cube
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      transform-style preserve-3d
      transform-origin 50% 50% -90px
      animation 200ms ease-out 0ms 1 normal forwards
      .front
        display flex
        flex-direction column
        .skill-img
          flex 1 1 auto
          width 100%
          height 0
          position relative
          img
            position absolute
            left 50%
            top 50%
            width 70%
            height auto
            transform translate(-50%, -50%)
        .skill-name
          flex 0 0 auto
          width 100%
          height 24px
          line-height 24px
          text-align center
          font-size 16px
      .front, .hide
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background-color #fff
        box-sizing border-box
        padding 10px
      .hide/* 3D空间内移动一个元素的位置 */
        color #fff
        background-color #00a78e
        text-align center
        transform translate3d(0,0,-1px)
        padding 16px
        vertical-align middle
        p
          width 100%
          height 100%
          vertical-align middle
          line-height 32px
          font-size 16px
          text-align left
  /*鼠标顶部进出*/
  .inTop .hide,
  .outTop .hide
  {
    transform-origin: 0% 100%!important;
    transform: translate3d(0, -100%, 0) rotate3d(1,0,0,90deg)!important;
  }
  .inTop .skill-cube{
    animation-name: inTop!important;
    animation-play-state: running!important;
  }
  .outTop .skill-cube{
    animation-name: outTop!important;
    animation-play-state: running!important;
  }
  @keyframes inTop {
    from  {transform: rotate3d(0,0,0,0deg)}
    to    {transform: rotate3d(-1,0,0,90deg)}
  }
  @keyframes outTop {
    from {transform: rotate3d(-1,0,0,90deg)}
    to   {transform: rotate3d(0,0,0,0deg)}
  }
  /*鼠标右侧进出*/
  .inRight .hide,
  .outRight .hide {
    transform-origin: 0% 0%!important;
    transform: translate3d(100%, 0, 0) rotate3d(0,1,0,90deg)!important;
  }
  .inRight .skill-cube{
    animation-name: inRight!important;
    animation-play-state: running!important;
  }
  .outRight .skill-cube{
    animation-name: outRight!important;
    animation-play-state: running!important;
  }
  @keyframes inRight {
    from  {transform: rotate3d(0,0,0,0deg)}
    to    {transform: rotate3d(0,-1,0,90deg)}
  }

  @keyframes outRight {
    from  {transform: rotate3d(0,-1,0,90deg)}
    to    {transform: rotate3d(0,0,0,0deg)}
  }
  /*鼠标底侧进出*/
  .inBottom .hide,
  .outBottom .hide {
    transform-origin: 0% 0%!important;
    transform: translate3d(0, 100%, 0) rotate3d(-1,0,0,90deg)!important;
  }
  .inBottom .skill-cube{
    animation-name: inBottom!important;
    animation-play-state: running!important;
  }
  .outBottom .skill-cube{
    animation-name: outBottom!important;
    animation-play-state: running!important;
  }
  @keyframes inBottom {
    from  {transform: rotate3d(0,0,0,0deg)}
    to    {transform: rotate3d(1,0,0,90deg)}
  }
  @keyframes outBottom {
    from  {transform: rotate3d(1,0,0,90deg)}
    to    {transform: rotate3d(0,0,0,0deg)}
  }
  /*鼠标左侧进出*/
  .inLeft .hide,
  .outLeft .hide {
    transform-origin: 100% 0!important;
    transform: translate3d(-100%,0,0) rotate3d(0,-1,0,90deg)!important;
  }
  @keyframes inLeft {
    from  {transform: rotate3d(0,0,0,0deg)}
    to    {transform: rotate3d(0,1,0,90deg)}
  }
  @keyframes outLeft {
    from  {transform: rotate3d(0,1,0,90deg)}
    to    {transform: rotate3d(0,0,0,0deg)}
  }
  .inLeft .skill-cube{
    animation-name: inLeft!important;
    animation-play-state: running!important;
  }
  .outLeft .skill-cube{
    animation-name: outLeft!important;
    animation-play-state: running!important;
  }
</style>
