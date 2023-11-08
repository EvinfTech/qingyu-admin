<template>
    <div style="height: 100%">
        
        <div v-if="isChose" class="cell3 cell3-chose" @click="() => isChose=false">
            <span class="cell3-empty">￥100</span>
            <span class="tick"><el-icon><Check /></el-icon></span>
        </div>
        <div v-else class="cell3 cell3-empty-ct" @click="() => isChose=true">
            <span class="cell3-empty">￥100</span>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const isChose : Ref<boolean> = ref(false);

</script>

<style scoped>
.cell3 {
    height: 4vh;
    margin: 0.3vh 0.2vw;
    padding:0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #EFF3FF;
    border-radius: 2px;
}
.cell3-empty{
    font-size: 15px;
    color: #9E9E9E;
}
.cell3-chose{
    position: relative;
    border: solid 2px;
    border-color: #0077FF;
}
.tick{
    position: absolute;
    top: 0;
    right: 1px;
    color: #0077FF;
}
.cell3-empty-ct:hover{
    border: solid 2px;
    border-color: #0077FF;
}
</style>