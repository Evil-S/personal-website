<template>
  <div class="room-item-wrapper" :style="roomStyle" @contextmenu.prevent="roomRightClick">
    <div class="room-item" :class="{active: active, selected: roomSelected}" @click="gotoRoomDetail()">
      <div class="room-name">
        <div class="icon" :style="{borderColor: tagColor[roomColor].color, background: tagColor[roomColor].bgColor}"></div>
        <div class="name">{{roomData.rmNo}}</div>
      </div>
    </div>
    <div class="delete-btn" v-if="editing&&structureType!==3" @click="handleDeleteRoom"><i class="el-icon-delete"></i></div>
    <el-dialog
      append-to-body
      title="编辑"
      :close-on-click-modal="false"
      :visible.sync="rightClickVisible"
      width="320px"
      top="15vh"
    >
      <el-form style="width: 100%;">
        <el-form-item label="户室名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="户室性质">
          <el-select v-model="form.type" placeholder="请选择户室性质" style="width: 100%;">
            <el-option v-for="item in dictionary.room_type" :key="item.id" :value="item.code" :label="item.name"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRoomInfo">保 存</el-button>
        <el-button @click="rightClickVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {tagColor, dictionary} from '../js/dic'
  import {roomConfig} from './config/dic'

  export default {
    name: 'RoomItem',
    props: {
      singleWidth: {
        type: Number,
        default: 0
      },
      roomData: {
        type: Object,
        default() {
          return {}
        }
      },
      active: {
        type: Boolean,
        default: false
      },
      selectedType: {
        type: Array,
        default() {
          return []
        }
      },
      maxLayer: {
        type: Number,
        default: 1
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
    data() {
      return {
        roomConfig: roomConfig,
        tagColor: tagColor,
        rightClickVisible: false,
        form: {
          name: '',
          type: ''
        }
      }
    },
    computed: {
      dictionary() {
        return dictionary
      },
      // 房间类型是否选中
      roomSelected() {
        return this.selectedType ? this.selectedType.indexOf(this.roomData.rmType) > -1 : false
      },
      // 房间类型颜色
      roomTypesColor() {
        const color = ['blue', 'orange', 'red', 'green', 'gary']
        let obj = {}
        // eslint-disable-next-line no-unused-expressions
        this.dictionary.room_type ? this.dictionary.room_type.map((item, index) => {
          obj[item.code] = color[index]
        }) : []
        return obj
      },
      roomColor() {
        return this.roomTypesColor[this.roomData.rmType]
      },
      // 房间宽度
      roomStyle() {
        if (this.singleWidth) {
          // 自动计算宽度
          return {
            width: this.singleWidth * this.roomData.rowspan + 'px',
            height: roomConfig.height * this.roomData.colspan + 'px',
            left: this.roomData.x * this.singleWidth + 'px',
            top: (this.maxLayer - 1 - this.roomData.y) * roomConfig.height + 'px'
          }
        } else {
          return {
            width: roomConfig.width * this.roomData.rowspan + 'px',
            height: roomConfig.height * this.roomData.colspan + 'px',
            left: this.roomData.x * roomConfig.width + 'px',
            top: (this.maxLayer - 1 - this.roomData.y) * roomConfig.height + 'px'
          }
        }
      }
    },
    created() {
    },
    methods: {
      // 跳转房间详情
      gotoRoomDetail() {
        if (this.editing) return // 编辑阶段不跳转
        // 没有id不跳转
        if (this.roomData.rmUuid) {
          this.$router.push({
            name: 'roomDetail',
            query: {
              id: this.roomData.rmUuid
            }
          })
        }
      },
      // 右键修改类型
      roomRightClick() {
        this.form.name = this.roomData.rmNo
        this.form.type = this.roomData.rmType
        this.rightClickVisible = true
      },
      // 右键修改类型
      saveRoomInfo() {
        if (this.roomData.rmUuid) {
          this.$post('/ctm01pcbase-web/building/updateRoom', {
            'rmNo': this.form.name,
            'rmType': this.form.type,
            'rmUuid': this.roomData.rmUuid
          }).then(() => {
            this.$message.success('修改成功')
            this.rightClickVisible = false
            this.$parent.$parent.roomInfoChange()
          })
        } else {
          this.rightClickVisible = false
          this.roomData.rmNo = this.form.name
          this.roomData.rmType = this.form.type
          this.$emit('onEdit')
        }
      },
      // 删除房间
      handleDeleteRoom() {
        this.$emit('onDelete', this.roomData)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .room-item-wrapper
    width 96px
    height 64px
    background-color #E1EBFA
    border 1px solid #fff
    position absolute
    box-sizing border-box
    z-index 99
    .delete-btn
      position absolute
      top 4px
      right 4px
      cursor pointer

    .room-item
      width 100%
      height 100%
      display flex
      flex-direction column
      padding 10px
      box-sizing border-box
      &:hover
        background-color #C9DDF8
      &.active
        background-color #C9DDF8

      &.selected
        background-color #9FC7FF
        border 1px solid #2080F7

        .room-name .name
          color rgba(0, 0, 0, 0.90)

      .room-name
        height 20px
        display flex
        align-items center

        .icon
          width 12px
          height 12px
          margin-right 4px
          box-sizing border-box
          border 1px solid

        .name
          font-size 14px
          color rgba(0, 0, 0, 0.70)
          line-height 20px

      .room-tags
        display flex
        align-items center
        justify-content flex-start
        margin-top 4px

</style>
