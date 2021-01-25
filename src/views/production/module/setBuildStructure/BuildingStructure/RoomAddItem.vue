<template>
  <div class="room-item-wrapper" :style="roomStyle" :x="x" :y="y">
    <div class="room-item">
      <el-button icon="el-icon-plus" title="增加房间" circle @click="addDialogVisible = true"></el-button>
    </div>
    <el-dialog
      title="编辑"
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      width="320px"
      top="15vh"
    >
      <el-form style="width: 100%;" v-if="addDialogVisible">
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
        <el-button type="primary" @click="handleAddRoom">添 加</el-button>
        <el-button @click="addDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {roomConfig} from './config/dic'
  import {dictionary} from '../js/dic'
  export default {
    name: 'RoomAddItem',
    props: {
      singleWidth: {
        type: Number,
        default: 0
      },
      maxLayer: {
        type: Number,
        default: 1
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        roomConfig: roomConfig,
        addDialogVisible: false,
        form: {
          name: '',
          type: '0'
        }
      }
    },
    computed: {
      dictionary() {
        return dictionary
      },
      // 房间宽度
      roomStyle() {
        if (this.singleWidth) {
          // 自动计算宽度
          return {
            width: this.singleWidth + 'px',
            height: roomConfig.height + 'px',
            left: this.x * this.singleWidth + 'px',
            top: (this.maxLayer - 1 - this.y) * roomConfig.height + 'px'
          }
        } else {
          return {
            width: roomConfig.width + 'px',
            height: roomConfig.height + 'px',
            left: this.x * roomConfig.width + 'px',
            top: (this.maxLayer - 1 - this.y) * roomConfig.height + 'px'
          }
        }
      }
    },
    created() {
    },
    methods: {
      roomRightClick() {
        if (!this.roomData.rmUuid) {
          return false
        }
        this.form.name = this.roomData.rmNo
        this.form.type = this.roomData.rmType
        this.rightClickVisible = true
      },
      // 增加房间
      handleAddRoom() {
        let room = {
          bdUuid: this.$route.query.id,
          rmNo: this.form.name,
          rmType: this.form.type,
          colspan: 1,
          rowspan: 1,
          x: this.x,
          y: this.y
        }
        this.addDialogVisible = false
        this.$emit('onAdd', room)
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
    box-sizing border-box
    .room-item
      width 100%
      height 100%
      display flex
      flex-direction column
      padding 10px
      box-sizing border-box
      align-items center
      justify-content center

</style>
