<template>
  <div style="height: 100%">
    <div type="button" v-if="status ==1 || money ==-1"  class="cell3" style="background-color: #D8D8D8;color:#9E9E9E">不可选择
    </div>
    <div type="button" class="cell3" v-else-if="status ==2" style="background-color:#FFC300;color: #FFFFFF">线上预定
    </div>
    <div class="cell3" v-else-if="status ==3" style="background-color:#0077FF;color: #FFFFFF">线下预定
    </div>
    <div v-else style="height: 100%">
      <div type="button" v-if="isChose" class="cell3 cell3-chose" @click="() => isChose=false">
        <span class="cell3-empty">￥{{ props.money }}</span>
        <span class="tick"><el-icon><Check/></el-icon></span>
      </div>
      <div type="button" v-else class="cell3 cell3-empty-ct" @click="() => isChose=true">
        <span class="cell3-empty">￥{{ props.money }}</span>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Ref} from 'vue'
import {Check} from "@element-plus/icons-vue";

const isChose: Ref<boolean> = ref(false);
const props = defineProps({
  money: {
    type: Number,
  },
  status: {
    type: Number
  }

});
</script>

<style scoped>
.cell3 {
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EFF3FF;
  border-radius: 2px;
}

.cell3-empty {
  font-size: 15px;
  color: #9E9E9E;
}

.cell3-chose {
  position: relative;
  border: solid 2px;
  border-color: #0077FF;
}

.tick {
  position: absolute;
  top: 0;
  right: 1px;
  color: #0077FF;
}

.cell3-empty-ct:hover {
  border: solid 2px;
  border-color: #0077FF;
}
</style>