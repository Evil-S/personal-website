<template>
  <div class="set-build-structure-wrapper">
    <div class="structure-config-content" v-if="init">
      <div class="config-title">房屋结构设置</div>
      <div class="config-form noScrollbar">
        <el-form label-width="120px" :model="form">
          <el-form-item prop="type" label="房屋结构类型">
            <el-select v-model="form.type" placeholder="请选择房屋结构类型" style="width: 100%;" @change="handelBuildTypeChange">
              <el-option v-for="item in types" :key="item.id" :value="item.value" :label="item.name"/>
            </el-select>
          </el-form-item>
          <el-form-item prop="unit" label="单元数" v-if="form.type === 1">
            <el-input-number style="width: 100%;" :min="1" v-model="form.unit"></el-input-number>
          </el-form-item>
          <template v-if="form.type === 3">
            <el-form-item prop="roomName" label="房间名称">
              <el-input style="width: 100%;" v-model="form.roomName"></el-input>
            </el-form-item>
            <el-form-item prop="roomType" label="房间性质">
              <el-select v-model="form.roomType" placeholder="请选择房间性质" style="width: 100%;">
                <el-option v-for="item in dictionary.room_type" :key="item.id" :value="item.code" :label="item.name"/>
              </el-select>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item prop="layer" label="层数" v-if="form.type !== 3">
              <el-input-number style="width: 100%;" :min="1" v-model="form.layer"></el-input-number>
            </el-form-item>
            <el-form-item prop="room" label="房间数/层" v-if="form.type !== 3">
              <el-input-number style="width: 100%;" :min="1" v-model="form.room"></el-input-number>
            </el-form-item>
            <el-form-item prop="roomType" label="房间性质">
              <el-select v-model="form.roomType" placeholder="请选择房间性质" style="width: 100%;">
                <el-option v-for="item in dictionary.room_type" :key="item.id" :value="item.code" :label="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item prop="order" label="排序规则">
              <el-radio-group v-model="form.order">
                <el-radio :label="1">默认</el-radio>
                <el-radio :label="2">单元累计房间号</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="order" label="字符类型">
              <el-radio-group v-model="form.wordType">
                <el-radio :label="1">数字</el-radio>
                <el-radio :label="2">字母(A-Z)</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="order" label="过滤选项">
              <el-checkbox-group v-model="form.filterType">
                <el-checkbox :label="1">单元号</el-checkbox>
                <el-checkbox :label="2">层数</el-checkbox>
                <el-checkbox :label="3">房间号</el-checkbox>

              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="order" label="过滤字符" v-if="form.filterType.length > 0">
              <el-input v-model="form.filterWord" placeholder="以#分割过滤字符"></el-input>
            </el-form-item>
            <el-form-item prop="order" label="房间号规则">
              <el-radio-group v-model="form.roomCodeRule">
                <el-radio :label="1">楼层+房间</el-radio>
                <el-radio :label="2">单元+楼层+房间</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
          <el-form-item prop="order" label="是否有商铺">
            <el-radio-group v-model="form.hasShop">
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="form.hasShop">
            <el-form-item prop="shopLayers" label="商铺层数">
              <el-input-number style="width: 100%;" :min="1" v-model="form.shopLayers"></el-input-number>
            </el-form-item>
            <el-form-item prop="shopRooms" label="商铺数/层">
              <el-input-number style="width: 100%;" :min="1" v-model="form.shopRooms"></el-input-number>
            </el-form-item>
          </template>
          <el-form-item prop="order" label="是否有储藏室">
            <el-radio-group v-model="form.hasStoreRoom">
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="form.hasStoreRoom">
            <el-form-item prop="order" label="位于商铺" v-if="form.hasShop">
              <el-radio-group v-model="form.storeRoomPosition">
                <el-radio :label="0">下</el-radio>
                <el-radio :label="1">上</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="storeLayers" label="储藏室层数">
              <el-input-number style="width: 100%;" :min="1" v-model="form.storeLayers"></el-input-number>
            </el-form-item>
            <el-form-item prop="storeRooms" label="储藏室数/层">
              <el-input-number style="width: 100%;" :min="1" v-model="form.storeRooms"></el-input-number>
            </el-form-item>
          </template>
          <el-form-item prop="order" label="是否有地下车库">
            <el-radio-group v-model="form.hasCarPort">
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="form.hasCarPort">
            <el-form-item prop="carPortLayers" label="地下车库层数">
              <el-input-number style="width: 100%;" :min="1" v-model="form.carPortLayers"></el-input-number>
            </el-form-item>
            <el-form-item prop="carPortRooms" label="地下车库数/层">
              <el-input-number style="width: 100%;" :min="1" v-model="form.carPortRooms"></el-input-number>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class="config-btn">
        <el-button type="success" @click="handleSaveRoomsData()">保存</el-button>
        <el-button type="primary" @click="handleCreateStructure()">生成结构</el-button>
        <el-button @click="handleCancer">取消</el-button>
      </div>
    </div>
    <div class="structure-preview-content">
      <div class="preview-structure">
        <BuildingStructure
          v-if="structureData"
          :structureData="structureData"
          @onUpdateData="updateData"
          editing
          :init="init"
        ></BuildingStructure>
      </div>
      <div class="save-btn" v-if="!init">
        <el-button type="success" @click="handleSaveRoomsData()">保存</el-button>
        <el-button @click="handleCancer">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {indexToWord, getIndexToNumber, dictionary} from './js/dic'
  import BuildingStructure from './BuildingStructure/BuildingStructure'

  export default {
    name: 'setBuildStructure',
    components: {
      BuildingStructure
    },
    data() {
      return {
        id: this.$route.query.id,
        form: {
          unit: 1,
          layer: 1,
          room: 1,
          roomName: '',
          type: 1,
          order: 1,
          wordType: 1,
          filterType: [],
          filterWord: '',
          roomCodeRule: 1,
          hasShop: false,
          shopLayers: 1,
          shopRooms: 1,
          hasStoreRoom: false,
          storeRoomPosition: 0,
          storeLayers: 1,
          storeRooms: 1,
          hasCarPort: false,
          carPortLayers: 1,
          carPortRooms: 1,
          roomType: '0'
        },
        types: [{
          name: '普通多层建筑',
          value: 1
        }, {
          name: '无单元房间',
          value: 2
        }, {
          name: '农村建房',
          value: 3
        }],
        init: true,
        structureData: null,
        buildInfo: null
      }
    },
    computed: {
      dictionary() {
        return dictionary
      }
    },
    created() {
    },
    mounted() {},
    methods: {
      /**
       * 建筑物类型改变
       */
      handelBuildTypeChange(value) {
        this.form = {
          unit: 1,
          layer: 1,
          room: 1,
          roomName: '',
          type: value,
          order: 1,
          wordType: 1,
          filterType: [],
          filterWord: '',
          roomCodeRule: 1,
          hasShop: false,
          shopLayers: 1,
          shopRooms: 1,
          hasStoreRoom: false,
          storeRoomPosition: 0,
          storeLayers: 1,
          storeRooms: 1,
          hasCarPort: false,
          carPortLayers: 1,
          carPortRooms: 1,
          roomType: '0'
        }
        this.structureData = null
      },
      /**
       * 生成层级结构数据
       */
      handleCreateStructure() {
        let unitList = this.makeStructureData()
        let shops = this.form.hasShop ? this.makeOtherData('shop') : null
        let store = this.form.hasStoreRoom ? this.makeOtherData('store') : null
        let basements = this.form.hasCarPort ? this.makeOtherData('carport') : null
        if (store) {
          store.underShop = this.form.storeRoomPosition
        }
        this.structureData = {
          'bdId': this.id,
          'basements': basements,
          'store': store,
          'shop': shops,
          'units': unitList,
          'structureType': this.form.type
        }
      },
      /**
       * 生成户室层级结构数据
       */
      makeStructureData() {
        // eslint-disable-next-line one-var
        let bdUuid = this.id, {unit, layer, room} = this.form, layerRooms = [], unitList = []
        // 生成每层房间
        for (let i = 0; i < room; i++) {
          layerRooms.push({
            bdUuid: bdUuid,
            rmNo: '',
            rmType: '',
            colspan: 1,
            rowspan: 1,
            x: 0,
            y: 0
          })
        }
        let roomType = this.form.roomType
        let _this = this
        // 过滤字符数组
        let filterWords = this.form.filterWord.split('#')
        /**
         * 房号类型为字母，room不大于26
         * 若单元累计房号，则 unit * room 不大于26
         */
        if (this.form.wordType === 2) {
          if (room > 26) {
            this.$message.warning('字母类型房间数量过大')
            return
          } else if (this.form.order === 2 && unit * room > 26) {
            this.$message.warning('字母类型房间数量过大')
            return
          }
        }
        /**
         * @param index 序号
         * @returns {string|*|string}
         *
         */
        let max = 0
        if (this.form.order === 2) {
          if (layer > (unit * room)) {
            max = layer + filterWords.length
          } else {
            max = unit * room + filterWords.length
          }
        } else {
          if (layer > room) {
            max = layer + filterWords.length
          } else {
            max = room + filterWords.length
          }
        }
        if (max < unit) {
          max = unit
        }
        let indexToNumber = getIndexToNumber(max)
        /**
         * 是否启用过滤
         */
        let beforeFilterWord = [] // 未过滤的数据
        if (this.form.wordType === 1) {
          beforeFilterWord = indexToNumber
        } else {
          beforeFilterWord = indexToWord
        }
        let filteredWord = beforeFilterWord.filter(item => !(filterWords.indexOf('' + item) > -1)) // 过滤后的数据

        let filteredNumber = indexToNumber.filter(item => !(filterWords.indexOf('' + item) > -1)) // 过滤后的单元，楼层可用字符

        /**
         *
         * @param index 序号
         * @param type 1 unit, 2 layer, 3 room
         * @returns {string}
         */

        function getCodeNumber(index, type) {
          let word = ''
          if (type === 3) {
            // 房号过滤
            if (_this.form.filterType.indexOf(type) > -1) {
              word = filteredWord[index]
            } else {
              word = beforeFilterWord[index]
            }
          } else {
            // 单元和楼层过滤
            if (_this.form.filterType.indexOf(type) > -1) {
              word = filteredNumber[index]
            } else {
              word = indexToNumber[index]
            }
          }
          if (type === 3) {
            if (_this.form.wordType === 1) {
              return word > 9 ? word : '0' + word
            } else {
              return word
            }
          } else {
            return word
          }
        }

        // 获取楼层
        function getLayerObject(unit, layer) {
          let layerWord = getCodeNumber(layer, 2)
          let rooms = layerRooms.map((item, index) => {
            let roomWord = ''
            // 是否按单元号累计
            if (_this.form.order === 1) {
              roomWord = getCodeNumber(index, 3)
            } else {
              if (_this.form.filterType.indexOf(1) > -1) {
                let unitIndex = filteredNumber.indexOf(unit)
                roomWord = getCodeNumber(room * unitIndex + index, 3)
              } else {
                roomWord = getCodeNumber(room * (unit - 1) + index, 3)
              }
            }
            let roomCode = ''
            if (_this.form.roomCodeRule === 1) {
              roomCode = layerWord + roomWord
            } else {
              roomCode = unit + '-' + layerWord + roomWord
            }
            // 农村建房 取roomName
            item.rmNo = _this.form.type === 3 ? _this.form.roomName : roomCode
            item.rmType = roomType
            item.x = index
            item.y = layer
            return item
          })

          return {
            unit: '' + unit,
            layer: '' + layerWord,
            roomInfoList: JSON.parse(JSON.stringify(rooms))
          }
        }

        // 生成单元列表
        for (let i = 0; i < unit; i++) {
          let unitRooms = []
          // 生成单元楼层
          let unitWord = getCodeNumber(i, 1) // 单元号
          for (let j = 0; j < layer; j++) {
            let obj = getLayerObject(unitWord, j)
            unitRooms = unitRooms.concat(obj.roomInfoList)
          }
          let name = ''
          if (this.form.type === 1) {
            name = unitWord + '单元'
          } else if (this.form.type === 2) {
            name = '无单元房'
          }
          let unit = {
            'height': layer,
            'name': name,
            'roomList': unitRooms,
            'sort': i,
            'width': room
          }
          unitList.push(unit)
        }

        return unitList
      },
      makeOtherData(type) {
        let bdUuid = this.id
        let layer, room
        let unitWord = '' // 单元号
        let roomType = ''
        if (type === 'shop') {
          layer = this.form.shopLayers
          room = this.form.shopRooms
          unitWord = 'S'
          roomType = this.dictionary.room_type.filter(item => item.name === '商用')[0].code
        } else if (type === 'store') {
          layer = this.form.storeLayers
          room = this.form.storeRooms
          unitWord = 'C'
          roomType = this.dictionary.room_type.filter(item => item.name === '储藏室')[0].code
        } else if (type === 'carport') {
          layer = this.form.carPortLayers
          room = this.form.carPortRooms
          unitWord = 'D'
          roomType = this.dictionary.room_type.filter(item => item.name === '地下车库')[0].code
        }
        let layerRooms = []
        // 生成每层房间
        for (let i = 0; i < room; i++) {
          layerRooms.push({
            bdUuid: bdUuid,
            rmNo: '',
            rmType: '',
            colspan: 1,
            rowspan: 1,
            x: 0,
            y: 0
          })
        }

        let _this = this
        // 过滤字符数组
        let filterWords = this.form.filterWord.split('#')
        /**
         * 房号类型为字母，room不大于26
         * 若单元累计房号，则 unit * room 不大于26
         */
        if (this.form.wordType === 2 && room > 26) {
          this.$message.warning('字母类型房间数量过大')
          return
        }
        /**
         * @param index 序号
         * @returns {string|*|string}
         *
         */
        let max = 0
        if (layer > room) {
          max = layer + filterWords.length
        } else {
          max = room + filterWords.length
        }
        let indexToNumber = getIndexToNumber(max)
        /**
         * 是否启用过滤
         */
        let beforeFilterWord = [] // 未过滤的数据
        if (this.form.wordType === 1) {
          beforeFilterWord = indexToNumber
        } else {
          beforeFilterWord = indexToWord
        }
        let filteredWord = beforeFilterWord.filter(item => !(filterWords.indexOf('' + item) > -1)) // 过滤后的数据

        let filteredNumber = indexToNumber.filter(item => !(filterWords.indexOf('' + item) > -1)) // 过滤后的单元，楼层可用字符

        /**
         *
         * @param index 序号
         * @param type 1 unit, 2 layer, 3 room
         * @returns {string}
         */

        function getCodeNumber(index, type) {
          let word = ''
          if (type === 3) {
            // 房号过滤
            if (_this.form.filterType.indexOf(type) > -1) {
              word = filteredWord[index]
            } else {
              word = beforeFilterWord[index]
            }
          } else {
            // 单元和楼层过滤
            if (_this.form.filterType.indexOf(type) > -1) {
              word = filteredNumber[index]
            } else {
              word = indexToNumber[index]
            }
          }
          if (type === 3) {
            if (_this.form.wordType === 1) {
              return word > 9 ? word : '0' + word
            } else {
              return word
            }
          } else {
            return word
          }
        }

        // 获取楼层
        function getLayerObject(unit, layer) {
          let layerWord = getCodeNumber(layer, 2)
          let rooms = layerRooms.map((item, index) => {
            let roomWord = getCodeNumber(index, 3)
            item.rmNo = unit + '-' + layerWord + roomWord
            item.rmType = roomType
            item.x = index
            item.y = layer
            return item
          })

          return {
            unit: '' + unit,
            layer: '' + layerWord,
            roomInfoList: JSON.parse(JSON.stringify(rooms))
          }
        }

        // 生成类型对象
        let unitRooms = []
        // 生成类型楼层
        for (let j = 0; j < layer; j++) {
          let obj = getLayerObject(unitWord, j)
          unitRooms = unitRooms.concat(obj.roomInfoList)
        }
        return {
          'height': layer,
          'roomList': unitRooms,
          'width': room
        }
      },
      /**
       * 保存建房信息
       */
      handleSaveRoomsData() {
        this.$post('/ctm01pcbase-web/bdStructure/saveBuildingStructure', this.structureData).then(() => {
          this.$message.success('保存成功')
          this.$router.go(-1)
        })
      },
      updateData() {
        this.$set(this, 'structureData', this.structureData)
      },
      handleCancer() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .set-build-structure-wrapper
    width 100%
    height 100%
    display flex
    background-color #f5f5f5

    .structure-config-content
      flex none
      width 400px
      background-color #fff
      height 100%
      box-shadow: 0 6px 12px 0 rgba(158, 168, 179, 0.24)
      display: flex
      flex-direction column
      box-sizing border-box
      padding 12px

      .config-title
        width 100%
        flex none
        height 56px
        font-size 18px
        line-height 56px
        text-align center

      .config-form
        flex 1 1 auto
        overflow auto

      .config-btn
        flex none
        width 100%
        height 48px
        display flex
        align-items center
        justify-content center

    .structure-preview-content
      flex 1 1 auto
      width 0
      height 100%
      overflow hidden
      display flex
      flex-direction column
      .preview-structure
        flex 1 1 auto
        width 100%
        overflow auto
      .save-btn
        flex none
        width 100%
        height 48px
        background-color #fff
        display flex
        align-items center
        justify-content center
</style>
