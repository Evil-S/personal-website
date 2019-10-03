<template lang="pug">
  .experience-line-wrapper
    .experience-line
      .line
      .today 至今
      .experience-list
        .experience-item(v-for="(item,index) in experience")
          .date {{item.startTime}}
          .company-info
            .company-name {{item.company}}
            .company-message(v-html="item.workContent")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'experienceLine',
    data() {
      return {
        experience: [{
          company: '杭州海康威视数字技术股份有限公司',
          startTime: '2019-05',
          workContent: `在浙江业务中心担任前端开发岗位，负责部门项目PC端页面的前端开发工作，使用React，Vue或者JQuery完成各类定制任务的开发`
        }, {
          company: '聚光科技（杭州）股份有限公司',
          startTime: '2016-03',
          workContent: `在环境安全事业部信息化子事业部担任前端开发职位，负责部门PC端的前端开发工作，推进了公司UI框架的升级和Vue的使用；<br/>
              负责各项目复杂页面的开发（驾驶舱大屏，系统概览首页，定制化单点登录页面等）；<br/>
              负责解决各类前端bug，游览器兼容等问题。`
        }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .experience-line-wrapper
    width 100%

    .experience-line
      width 100%
      text-align center
      position relative

      .line
        width 2px
        height 100%
        background-color #00a78e
        position absolute
        left 50%
        top 0
        margin-left -1px

      .today
        width 50px
        height 50px
        border-radius 50%
        background-color #00a78e
        text-align center
        line-height 50px
        color #fff
        font-size 16px
        margin 0 auto

      .experience-list
        width 50px
        margin 100px auto

        .experience-item
          width 50px
          height 50px
          border-radius 50%
          background-color #00a78e
          text-align center
          line-height 50px
          color #fff
          font-size 16px
          position relative
          background-image url("../../static/images/computer.png")
          background-size 30px 30px
          background-position center center
          background-repeat no-repeat
          margin-bottom 160px

          &:last-child
            margin-bottom 0

          .date
            width 140px
            height 40px
            padding-right 20px
            line-height 40px
            text-align center
            position absolute
            right 180px
            top 5px
            background-color #666666
            border-radius 0 20px 20px 0

          .company-info
            position absolute
            left 100px
            top -20px
            width 400px
            min-height 188px
            box-sizing border-box
            padding 16px 24px
            box-shadow 0 1px 6px rgba(0, 0, 0, 0.175)
            border-bottom 5px solid #00a78e

            .company-name
              width 100%
              height 32px
              line-height 32px
              font-size 18px
              color #191919
              text-align left

            .company-message
              width 100%
              line-height 24px
              font-size 14px
              color #191919
              text-align left

            &:before
              position: absolute;
              top: 28px;
              left: -15px;
              display: inline-block;
              border-top: 15px solid transparent;
              border-right: 15px solid #ccc;
              border-left: 0 solid #ccc;
              border-bottom: 15px solid transparent;
              content: " ";

            &:after
              position: absolute;
              top: 29px;
              left: -14px;
              display: inline-block;
              border-top: 14px solid transparent;
              border-right: 14px solid #fff;
              border-left: 0 solid #fff;
              border-bottom: 14px solid transparent;
              content: " ";
</style>
