<template>
  <div class="unit-item" :class="{editing: editing}">
    <div class="unit-title" v-if="unitData.name" @contextmenu.prevent="roomRightClick">
      {{unitData.name}}
      <template v-if="editing&&lastChild&&(structureType===1)">
        <div class="unit-btn add" @click="handleAddUnit"><i class="el-icon-circle-plus-outline"></i></div>
        <div class="unit-btn delete" @click="handleDeleteUnit"><i class="el-icon-remove-outline"></i></div>
      </template>
    </div>
    <div class="top"></div>
    <div v-if="unitData" class="layers" :style="unitStyle">
      <RoomItem v-for="(room, indexR) in unitData.roomList"
                :key="'room'+indexR"
                @onDelete="handleDeleteRoom"
                @onEdit="handleEditRoom"
                :roomData="room"
                :structureType="structureType"
                :init="init"
                :selectedType="selectedType"
                :maxLayer="unitData.height"
                :editing="editing"></RoomItem>
      <div class="layers-content" v-if="editing">
        <div class="layers-item" v-for="layer in unitData.height" :key="layer">
          <RoomAddItem v-for="room in unitData.width"
                       @onAdd="handleAddRoom"
                       :key="room"
                       :x="room-1"
                       :y="layer-1"
                       :maxLayer="unitData.height"></RoomAddItem>
        </div>
      </div>
      <template v-if="editing&&(structureType !== 3)">
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
    <el-dialog
      append-to-body
      title="编辑"
      :close-on-click-modal="false"
      :visible.sync="rightClickVisible"
      width="320px"
      @close="rightDialogClose"
      top="15vh"
    >
      <el-form style="width: 100%;">
        <el-form-item label="单元名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="单元户室性质">
          <el-select v-model="form.type" placeholder="请选择户室性质" style="width: 100%;" clearable>
            <el-option v-for="item in dictionary.room_type" :key="item.id" :value="item.code" :label="item.name"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUnitInfo">保 存</el-button>
        <el-button @click="rightClickVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import RoomItem from './RoomItem'
  import RoomAddItem from './RoomAddItem'
  import {roomConfig} from './config/dic'
  import {dictionary} from '../js/dic'

  export default {
    name: 'UnitItem',
    components: {
      RoomItem, RoomAddItem
    },
    props: {
      roomConfig: roomConfig,
      unitData: {
        type: Object,
        default() {
          return null
        }
      },
      selectedType: {
        type: Array,
        default() {
          return []
        }
      },
      lastChild: {
        type: Boolean,
        default: false
      },
      editing: {
        type: Boolean,
        default: false
      },
      init: {
        type: Boolean,
        default: false
      },
      structureType: {
        type: Number,
        default: 1
      }
    },
    computed: {
      dictionary() {
        return dictionary
      },
      unitStyle() {
        return {
          width: roomConfig.width * this.unitData.width + 'px',
          height: roomConfig.height * this.unitData.height + 'px'
        }
      }
    },
    data() {
      return {
        // 拟删除的已存在的房间
        deleteRooms: [],
        rightClickVisible: false,
        form: {
          name: '',
          type: ''
        }
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
        this.unitData.roomList = this.unitData.roomList.filter(roomItem => {
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
          this.unitData.roomList.push(reBackRoom[0])
        } else {
          this.unitData.roomList.push(room)
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
        this.unitData.height = this.unitData.height + num
        let layer = this.unitData.height
        // 层数
        if (num < 0) {
          this.unitData.roomList = this.unitData.roomList.filter(item => {
            if (item.y + 1 > layer && item.rmUuid) {
              this.deleteRooms.push(item)
            }
            return item.y + 1 <= layer
          })
        } else {
          let reBackRoom = this.deleteRooms.filter(item => item.y + 1 === layer)
          // 该层已存在的房间的x值
          let reBackObj = {}
          reBackRoom.map(item => {
            reBackObj[item.x] = true
          })
          let arr = Array.from({length: this.unitData.width}, (k, v) => v)
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
          this.unitData.roomList = this.unitData.roomList.concat(...reBackRoom)
        }
        this.$emit('onUpdateData')
      },
      /**
       * 每层房间数变化
       */
      handleAddCol(num) {
        this.unitData.width = this.unitData.width + num

        if (num < 0) {
          this.unitData.roomList = this.unitData.roomList.filter(item => {
            if (item.x + 1 > this.unitData.width && item.rmUuid) {
              this.deleteRooms.push(item)
            }
            return item.x + 1 <= this.unitData.width
          })
        } else {
          let reBackRoom = this.deleteRooms.filter(item => item.x + 1 === this.unitData.width)
          let room = this.unitData.width
          // 该列已存在的房间的y值
          let reBackObj = {}
          reBackRoom.map(item => {
            reBackObj[item.y] = true
          })
          let arr = Array.from({length: this.unitData.height}, (k, v) => v)
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
          this.unitData.roomList = this.unitData.roomList.concat(...reBackRoom)
        }

        this.$emit('onUpdateData')
      },
      /**
       * 增加单元
       */
      handleAddUnit() {
        this.$emit('onAddUnit')
      },
      /**
       * 删除单元
       */
      handleDeleteUnit() {
        this.$emit('onDeleteUnit', this.unitData)
      },
      /**
       * 单元名称修改
       * 单元房间属性设置
       */
      roomRightClick() {
        if (!this.editing) return
        this.form.name = this.unitData.name
        this.rightClickVisible = true
      },
      saveUnitInfo() {
        this.unitData.name = this.form.name
        if (this.form.type) {
          this.unitData.roomList = this.unitData.roomList.map(item => {
            item.rmType = this.form.type
            return item
          })
        }
        this.$emit('onUpdateData')
        this.rightClickVisible = false
      },
      rightDialogClose() {
        this.form = {
          name: '',
          type: ''
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .unit-item
    flex none
    display flex
    flex-direction column
    position relative
    padding-right 4px
    box-sizing border-box

    &:last-child
      padding-right 0

    .unit-title
      position absolute
      left 50%
      transform translate(-50%, -32px)
      width 74px
      height 28px
      background-image url("images/unitTitle.png")
      line-height 28px
      text-align center
      color #415176
      font-size 14px
      user-select none

      .unit-btn
        position absolute
        top 50%
        transform translateY(-50%)
        font-size 20px
        cursor pointer

        &.add
          right -24px

        &.delete
          left -24px

    .top
      flex none
      width 100%
      height 60px
      background-image url("images/center.png")
      background-repeat repeat-x

    .layers
      flex none
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

    .bottom
      flex none
      width 100%
      height 12px
      background-image url("images/bottom.png")
      background-repeat repeat-x

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
