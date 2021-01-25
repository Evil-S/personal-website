<template>
  <div class="wrapper" :class="{preview:!editing}">
    <div class="building-structure-wrapper">
      <div class="structure-content">
        <div class="structure left" :style="{height: leftHeight+'px'}">
          <div class="top"></div>
        </div>
        <div class="building-structure">
          <div class="units" v-if="structureData">
            <UnitItem v-for="(item, index) in structureData.units"
                      :key="index"
                      :unitData="item"
                      :selectedType="selectedType"
                      @onUpdateData="handleUploadData"
                      :lastChild="index === structureData.units.length - 1"
                      :init="init"
                      :structureType="structureData.structureType"
                      @onAddUnit="handleAddUnit"
                      @onDeleteUnit="handleDeleteUnit"
                      :editing="editing"></UnitItem>
          </div>
          <div class="shops" v-if="structureData.store&&structureData.store.underShop === 1">
            <ShopItem :structureWidth="structureWidth"
                      key="store"
                      :selectedType="selectedType"
                      :shop-data="structureData.store"
                      :editing="editing"
                      :init="init"
                      :structureType="structureData.structureType"
            />
          </div>
          <div class="shops" v-if="structureData.shop">
            <ShopItem :structureWidth="structureWidth"
                      key="shop"
                      :selectedType="selectedType"
                      :shop-data="structureData.shop"
                      :editing="editing"
                      :init="init"
                      :structureType="structureData.structureType"
            />
          </div>
          <div class="shops" v-if="structureData.store&&structureData.store.underShop === 0">
            <ShopItem :structureWidth="structureWidth"
                      key="store"
                      :selectedType="selectedType"
                      :shop-data="structureData.store"
                      :editing="editing"
                      :init="init"
                      :structureType="structureData.structureType"
            />
          </div>
          <div class="shops" v-if="structureData.basements">
            <ShopItem :structureWidth="structureWidth"
                      key="basements"
                      :selectedType="selectedType"
                      :shop-data="structureData.basements"
                      :editing="editing"
                      :init="init"
                      :structureType="structureData.structureType"
            />
          </div>
        </div>
        <div class="structure right" :style="{height: rightHeight+'px'}">
          <div class="top"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UnitItem from './UnitItem'
  import ShopItem from './ShopItem'
  import {roomConfig} from './config/dic'
  export default {
    name: 'BuildingStructure',
    components: {
      UnitItem, ShopItem
    },
    props: {
      structureData: {
        type: Object,
        default() {
          return {}
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
      }
    },
    data() {
      return {
        deleteUnits: []
      }
    },
    computed: {
      // 建筑物宽度
      structureWidth() {
        let width = (this.structureData.units.length - 1) * 4
        this.structureData.units.map(item => {
          width += item.width * roomConfig.width
        })
        return width
      },
      // 一单元的高度
      leftHeight() {
        let {units, basements, store, shop} = this.structureData
        let height = 0
        if (units.length > 0) {
          let layers = units[0].height +
            (basements ? basements.height : 0) +
            (store ? store.height : 0) +
            (shop ? shop.height : 0)
          height = layers * 64 + 60
        }
        return height
      },
      // 最右侧单元的高度
      rightHeight() {
        let {units, basements, store, shop} = this.structureData
        let height = 0
        if (units.length > 0) {
          let layers = units[units.length - 1].height +
            (basements ? basements.height : 0) +
            (store ? store.height : 0) +
            (shop ? shop.height : 0)
          height = layers * 64 + 60
        }
        return height
      }
    },
    created() {
    },
    methods: {
      roomInfoChange() {
        this.$emit('roomChange')
      },
      handleUploadData() {
        this.$emit('onUpdateData')
      },
      /**
       * 增加单元
       */
      handleAddUnit() {
        let lastUnit = this.structureData.units[this.structureData.units.length - 1]
        let reBackUnit = this.deleteUnits.filter(item => item.sort === lastUnit.sort + 1)
        // 若存在sort值为新增的单元的sort值，直接还原单元，否则先建单元
        if (reBackUnit.length > 0) {
          this.structureData.units.push(reBackUnit[0])
        } else {
          // 新建单元直接复制最后一个单元的数据
          let newUnit = JSON.parse(JSON.stringify(lastUnit))
          newUnit.name = this.structureData.units.length + 1 + '单元'
          this.structureData.units.push(newUnit)
        }
        this.$emit('onUpdateData')
      },
      /**
       * 删除单元
       * @param delUnit
       */
      handleDeleteUnit(delUnit) {
        if (delUnit.id) {
          // 若存在id，则先存储，方便还原单元
          this.deleteUnits.push(delUnit)
        }
        this.structureData.units = this.structureData.units.filter(item => item !== delUnit)
        this.$emit('onUpdateData')
      }
    }
  }
</script>

<style scoped lang="stylus">
.wrapper
  width 100%
  height 100%
  overflow auto
  &.preview
    display flex
.building-structure-wrapper
  margin 0 auto
  display flex
  box-sizing border-box
  padding-bottom 40px
  .structure-content
    flex none
    display flex
    position relative
    box-sizing border-box
    padding 40px 40px 0
    .building-structure
      flex none
      .units
        display flex
        flex-wrap nowrap
        align-items flex-end
    .structure
      flex none
      width 40px
      display flex
      flex-direction column
      justify-content space-between
      position absolute
      bottom 0
      &.left
        left 0
        .top
          background-image url("images/top-left.png")
      &.right
        right 0
        .top
          background-image url("images/top-right.png")
          background-position right
      .top
        width 100%
        height 60px
      .bottom
        width 100%
        height 12px
</style>
