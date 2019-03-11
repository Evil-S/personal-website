<template lang="pug">
  .content-wrapper
    #home.header
      .container
        .top-header
          .logo
            h1
              a
                span P
                |ERSONAL
          .nav-list-wrapper
            ul.nav-list
              li(:class="menus === menu?'active':''" v-for="menu in menusList")
                a(:data-hover="menu" @click="scrollToFunc(menu)") {{menu}}
        .personal-info-wrapper
          .personal-info
            .info-top
              h1.title_block Hi!
              h6 Web Front-end developer
            .info-content
              ul
                li
                  .info-name Name
                  .info-message 邵敏杰
                li
                  .info-name D.O.B
                  .info-message 1994-07-24
                li
                  .info-name PHONE
                  .info-message +86 15757856515
                li
                  .info-name ADDRESS
                  .info-message 杭州市萧山区
                li
                  .info-name E-MAIL
                  .info-message 178490658@qq.com
          .personal-img
            img(src="../../static/images/header/account.jpg")
    #about.about(ref="about")
      .about-left
      .about-right
        .about-banner
          ul(:style="{left: -(aboutIndex-1) * 100+'%'}")
            li(v-for="item in about")
              .about-item
                .title {{item.title}}
                .content(v-html ="item.message")
                .btn-wrapper
          .ul-ctrl
            ul
              li(v-for="index in 2" @click="aboutIndex = index" :class="aboutIndex === index?'cur':''")
    #skills.chapter(ref="skills")
      .container
        chapterTitle(:color="skills.color" :tip="skills.tip" :title="skills.title")
        .skills-cubes-wrapper
          .skill-item(v-for="skill in skillsData")
            skillsCube(:skill="skill")
    #experience.chapter(ref="experience")
      .container
        chapterTitle(:color="experience.color" :tip="experience.tip" :title="experience.title")
        .experiences
          experience-line
    #contact.chapter(ref="contact")
      .container
        chapterTitle(:color="contact.color" :tip="contact.tip" :title="contact.title")
        .contact-wrapper
          .contact-box
            .icon
              i.glyphicon.glyphicon-envelope
            .title Contact By Email
            .contact-message
              span E-mail：
              a(href="mailto:178490658@qq.com") 178490658@qq.com
            .contact-message
              span E-mail：
              a(href="mailto:qq178490658@163.com") qq178490658@163.com
          .contact-box
            .icon
              i.glyphicon.glyphicon-earphone
            .title Contact By Phone
            .contact-message
              span Phone：
              span 15757856515
          .contact-box
            .icon
              i.glyphicon.glyphicon-list-alt
            .title GET MY RESUME
            .contact-message
              p
                a(href="../../static/file/邵敏杰-web前端.pdf" download="邵敏杰-web前端")
                  |download&nbsp;
                  i.glyphicon.glyphicon-download-alt
</template>

<script type="text/ecmascript-6">
  import chapterTitle from '../components/chapterTitle'
  import skillsCube from '../components/skillsCube'
  import experienceLine from '../components/experienceLine'
  import {
    about, skills
  } from '../script/mockData'
  export default {
    name: 'home',
    data() {
      return {
        menus: 'home',
        menusList: ['home', 'about', 'skills', 'experience', 'contact'],
        aboutIndex: 1,
        about: about,
        skills: {
          color: 'white',
          tip: 'WHAT I CAN',
          title: 'MY SKILLS'
        },
        experience: {
          color: 'black',
          tip: 'WHAT I DID',
          title: 'MY EXPERIENCE'
        },
        skillsData: skills,
        contact: {
          color: 'white',
          tip: 'CONTACT ME',
          title: 'GET IN TOUCH WITH ME'
        },
        scrollTop: 0
      }
    },
    methods: {
      scrollToFunc(menu) {
        this.$nextTick(() => {
          console.log(this.$refs[menu].getBoundingClientRect().top)
          document.documentElement.scrollTop = this.$refs[menu].getBoundingClientRect().top
        })
      }
    },
    components: {
      chapterTitle,
      skillsCube,
      experienceLine
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/mixins.styl"
  .content-wrapper
    width 100%
    #home.header
      background url('../../static/images/header/header_bg.jpg') no-repeat center top
      background-size cover
      min-height 650px
      position relative
      font-family 'Asap', sans-serif
      .container
        width 1140px
        margin 0 auto
        .top-header
          width 100%
          height 48px
          line-height 48px
          padding-top 32px
          display flex
          flex-direction row
          justify-content space-between
          .logo
            h1
              margin 0
              text-transform uppercase
              font-weight bold
              color #fff
              font-size 24px
              a
                text-decoration none
                color #fff
              span
                border 6px solid #00a78e
                padding 0 10px
                font-size 36px
                color #fff
                vertical-align baseline
          .nav-list-wrapper
            ul.nav-list
              display flex
              flex-direction row
              font-size 16px
              li
                padding 0 10px
                margin 0 12px
                cursor pointer
                a
                  display block
                  font-size 16px
                  height 24px
                  line-height 24px
                  color #fff
                  text-decoration none
                  text-transform uppercase
                  padding 10px 0
                  margin 0 12px
                  text-shadow none
                  position relative
                  font-family 'Open Sans', sans-serif
                  &::before
                    position absolute
                    font-size inherit
                    width 100%
                    top 0
                    left 0
                    overflow hidden
                    padding 10px 0
                    max-width 0
                    border-bottom 3px solid #00a78e
                    color #00a78e
                    content attr(data-hover)
                    transition max-width 0.5s
                  &:hover::before
                    max-width 100%
                &.active
                  a
                    color #00a78e
        .personal-info-wrapper
          width 100%
          height 484px
          margin-top 64px
          background rgba(23, 20, 20, 0.58)
          display flex
          flex-direction row
          .personal-info
            flex 1 1 auto
            width 0
            padding 48px
            .info-top
              h1.title_block
                width 100px
              h6
                font-size 16px
                color #c7c7c7
                margin 10px
            .info-content
              border-top 1px solid #afafaf
              margin-top 32px
              ul
                padding-left 10px
                padding-top 24px
                li
                  display flex
                  flex-direction row
                  font-size 16px
                  line-height 40px
                  color #fff
                  .info-name
                    flex 0 0 auto
                    width 120px
                  .info-message
                    flex 1 1 auto
                    width 0
          .personal-img
            width 400px
            height 400px
            overflow hidden
            position relative
            img
              position absolute
              left 50%
              top 50%
              transform translate(-50%,-50%)
              display block
              margin auto
              width 80%
              height 80%
    #about.about
      width 100%
      height 580px
      overflow hidden
      .about-left
        width 50%
        height 580px
        float left
        background-image url("../../static/images/pic2.jpg")
        background-size cover
      .about-right
        width 50%
        height 580px
        float left
        .about-banner
          width 100%
          height 100%
          position relative
          overflow hidden
          &>ul
            width 200%
            height 100%
            position absolute
            top 0
            left 0
            transition left .5s
            &>li
              float left
              display block
              width 50%
              height 100%
              box-sizing border-box
              padding 72px 0
              .about-item
                width 70%
                height 100%
                margin-left 80px
                .title
                  font-size 28px
                  line-height 40px
                  margin-bottom 40px
                .content
                  width 100%
                  font-size 16px
                  line-height 32px
                .btn-wrapper
                  height 56px
          &>.ul-ctrl
            position absolute
            top 255px
            left 40px
            z-index 99
            &>ul
              &>li
                display block
                width 14px
                height 14px
                border-radius 50%
                margin-bottom 14px
                background-color #191919
                cursor pointer
                &.cur
                  background-color #00a78e
                &:last-child
                  margin-bottom 0
    .chapter
      width 100%
      padding 80px 0
      .container
        width 80%
        height 100%
        margin 0 auto
      &#skills
        background-color #1b242f
        height 632px
        .skills-cubes-wrapper
          margin-top 88px
          text-align center
          overflow hidden
          .skill-item
            display inline-block
            margin 0 8px
      &#experience
        background-color #fff
        .experiences
          margin-top 80px
      &#contact
        background-color #1b242f
        .contact-wrapper
          margin-top 80px
          overflow hidden
          text-align center
          .contact-box
            background-color #fff
            width 440px
            height 200px
            text-align center
            box-sizing border-box
            padding 32px
            display inline-block
            border-right 1px solid #eee
            font-size 0
            vertical-align top
            border-top 1px solid #eee
            .icon
              color #00a78e
              font-size 28px
            .title
              margin 10px 0
              font-size 18px
              color #333
            .contact-message
              font-size 14px
              margin 10px 0
              text-align center
              &>span
                display inline-block
                width 80px
                text-align right
                color #999
              &>a
                display inline-block
                width 160px
                text-align left
                color #00a78e
                cursor pointer
              &>p
                color #00a78e
                cursor pointer
                a
                  color #00a78e
</style>
