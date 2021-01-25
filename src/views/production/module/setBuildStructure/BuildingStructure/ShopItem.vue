<template>
  <div class="shop-item-wrapper" :style="shopStyle">
    <RoomItem v-for="(room, indexR) in shopData.roomList"
              :key="'room'+indexR"
              @onDelete="handleDeleteRoom"
              @onEdit="handleEditRoom"
              :roomData="room"
              :init="init"
              :structureType="structureType"
              :singleWidth="singleWidth"
              :selectedType="selectedType"
              :maxLayer="shopData.height"
              :editing="editing"></RoomItem>
    <div class="layers-content" v-if="editing">
      <div class="layers-item" v-for="layer in shopData.height" :key="layer">
        <RoomAddItem v-for="room in shopData.width"
                     @onAdd="handleAddRoom"
                     :singleWidth="singleWidth"
                     :key="room"
                     :x="room-1"
                     :y="layer-1"
                     :maxLayer="shopData.height"></RoomAddItem>
      </div>
    </div>
    <template v-if="editing && (structureType !== 3)">
      <div class="col-manage">
        <div class="btn" @click="handleAddCol(1)">增加一列</div>
        <div class="btn" @click="handleAddCol(-1)">减少一列</div>
      </div>
      <div class="row-manage">
        <div class="btn" @click="handleAddRow(-1)">减少一层</div>
        <div class="btn" @click="handleAddRow(1)">增加一层</div>
      </div>
    </template>
  </div>
</template>

<script>
  import RoomItem from './RoomItem'
  import RoomAddItem from './RoomAddItem'
  import {roomConfig} from './config/dic'

  export default {
    name: 'ShopItem',
    components: {
      RoomItem, RoomAddItem
    },
    props: {
      structureWidth: {
        type: Number,
        default: 0
      },
      shopData: {
        type: Object,
        default() {
          return null
        }
      },
      editing: {
        type: Boolean,
        default: false
      },
      init: {
        type: Boolean,
        default: false
      },
      selectedType: {
        type: Array,
        default() {
          return []
        }
      },
      structureType: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        deleteRooms: []
      }
    },
    computed: {
      shopStyle() {
        return {
          width: this.structureWidth,
          height: roomConfig.height * this.shopData.height + 'px'
        }
      },
      singleWidth() {
        return this.structureWidth / this.shopData.width
      }
    },
    created() {
    },
    methods: {
      /**
       * 删除房间
       * 若存在rmUuid,则先存贮，用于还原房间
       */
      handleDeleteRoom(room) {
        if (room.rmUuid) {
          this.deleteRooms.push(room)
        }
        this.shopData.roomList = this.shopData.roomList.filter(roomItem => {
          return roomItem !== room
        })
        this.$emit('onUpdateData')
      },
      /**
       * 新增
       * 先根据新增的x,y值去比对可还原房间列表
       * 若存在则还原，若不存在，则新建
       */
      handleAddRoom(room) {
        let reBackRoom = this.deleteRooms.filter(item => (item.x === room.x && item.y === room.y))
        if (reBackRoom.length > 0) {
          this.shopData.roomList.push(reBackRoom[0])
        } else {
          this.shopData.roomList.push(room)
        }
        this.$emit('onUpdateData')
      },
      // 编辑信息
      handleEditRoom() {
        this.$emit('onUpdateData')
      },
      /**
       * 层数改变
       * 增加层数看看是否有需要复原的房间
       * 减少层数时，判断房间是否已保存，rmUuid是否存在
       */
      handleAddRow(num) {
        this.shopData.height = this.shopData.height + num
        let layer = this.shopData.height
        // 层数
        if (num < 0) {
          this.shopData.roomList = this.shopData.roomList.filter(item => {
            if (item.y + 1 > layer && item.rmUuid) {
              this.deleteRooms.push(item)
            }
            return item.y + 1 <= layer
          })
        } else {
          let reBackRoom = this.deleteRooms.filter(item => item.y + 1 <= layer)
          // 该层已存在的房间的x值
          let reBackObj = {}
          reBackRoom.map(item => {
            reBackObj[item.x] = true
          })
          let arr = Array.from({length: this.shopData.width}, (k, v) => v)
          arr.map(item => {
            if (!reBackObj[item]) {
              reBackRoom.push({
                bdUuid: this.$route.query.id,
                rmNo: `${layer}${item > 8 ? item + 1 : '0' + (item + 1)}`,
                rmType: '0',
                colspan: 1,
                rowspan: 1,
                x: item,
                y: layer - 1
              })
            }
          })
          this.shopData.roomList = this.shopData.roomList.concat(...reBackRoom)
        }
        this.$emit('onUpdateData')
      },
      /**
       * 每层房间数变化
       */
      handleAddCol(num) {
        this.shopData.width = this.shopData.width + num

        if (num < 0) {
          this.shopData.roomList = this.shopData.roomList.filter(item => {
            if (item.x + 1 > this.shopData.width && item.rmUuid) {
              this.deleteRooms.push(item)
            }
            return item.x + 1 <= this.shopData.width
          })
        } else {
          let reBackRoom = this.deleteRooms.filter(item => item.x + 1 <= this.shopData.width)
          let room = this.shopData.width
          // 该列已存在的房间的y值
          let reBackObj = {}
          reBackRoom.map(item => {
            reBackObj[item.y] = true
          })
          let arr = Array.from({length: this.shopData.height}, (k, v) => v)
          arr.map(item => {
            if (!reBackObj[item]) {
              reBackRoom.push({
                bdUuid: this.$route.query.id,
                rmNo: `${item + 1}${room > 9 ? room : '0' + room}`,
                rmType: '0',
                colspan: 1,
                rowspan: 1,
                x: room - 1,
                y: item
              })
            }
          })
          this.shopData.roomList = this.shopData.roomList.concat(...reBackRoom)
        }

        this.$emit('onUpdateData')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .shop-item-wrapper
    width 100%
    position relative
    .layers-content
      width 100%
      height 100%
      display flex
      flex-direction column-reverse
      .layers-item
        display flex

    .row-manage
      display none
      position absolute
      height 24px
      top -24px
      width 100%
      z-index 100

      .btn
        flex none
        height 24px
        padding 5px 12px
        background-color #ffffff
        border-radius 12px
        z-index 100
        cursor pointer
        text-align center
        box-shadow: 0 6px 12px 0 rgba(158, 168, 179, 0.24)
        box-sizing border-box
        font-size 12px
        line-height 14px
        margin-right 8px

        &:last-child
          margin-right 0

    .col-manage
      display none
      position absolute
      width 24px
      right -24px
      top 50%
      transform translateY(-50%)
      height 100%
      flex-direction column
      z-index 100

      .btn
        flex none
        width 24px
        padding 12px 5px
        background-color #ffffff
        border-radius 12px
        z-index 100
        cursor pointer
        text-align center
        box-shadow: 0 6px 12px 0 rgba(158, 168, 179, 0.24)
        box-sizing border-box
        font-size 12px
        line-height 12px
        margin-bottom 8px

        &:last-child
          margin-bottom 0

    &:hover
      .row-manage
        display flex
        justify-content center

      .col-manage
        display flex
        justify-content center

      .add-col
        display block
</style>
