<template>
  <div class="room-info-dialog-wrapper">
    <div class="room-title">{{`${roomData.rmUnit}单元${roomData.rmNo}室`}}</div>
    <div class="room-tags">

    </div>
    <div class="room-info-list">
      <MessageItem :styles="headerStyle" name="房间个数" labelWidth="56px"
                   :value="roomData.roomNum"/>
      <MessageItem :styles="headerStyle" name="管辖单位" labelWidth="56px"
                   :value="roomData.dataDeptName"/>
    </div>
    <div class="operation-btn">
      <el-link type="primary" :underline="false" style="margin-right: 12px" @click="gotoRoomDetail">户室详情</el-link>
    </div>
  </div>
</template>

<script>
  import MessageItem from '../MessageItem'
  export default {
    name: 'RoomInfoDialog',
    props: {
      roomData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        headerStyle: {
          width: '100%'
        }
      }
    },
    components: {
      MessageItem
    },
    methods: {
      gotoRoomDetail() {
        this.$router.push({
          name: 'roomDetail',
          query: {
            id: this.roomData.rmUuid
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.room-info-dialog-wrapper
  width 216px
  box-sizing border-box
  padding 8px
  .room-title
    flex none
    color rgba(0,0,0,0.70)
    font-size 16px
    font-weight bold
  .room-tags
    flex none
    height 24px
  .room-info-list
    display flex
    flex-direction column
  .operation-btn
    width 100%
    padding-left 68px
    margin-top 12px
</style>
