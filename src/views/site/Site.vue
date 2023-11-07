<template>
    <div style="height: 100%">
        <el-row class="outer">

            <el-col :span="19">
                <div class="header-row">
                    <div v-for="header in groundList" class="cell4">
                        <span class="header-cell">{{ header }}</span>
                </div>
                </div>
                <template v-for="ground in tableData" :key="ground.time">
                    <!-- <template #default="scope"> -->
                    <div style="width: 100%" class="cell-row">
                        <div class="cell-time">
                            {{ ground.time }}
                        </div>
                        <div v-for="i in groundList" class="cell4">
                            <div v-if="isOvertime(ground.time)" class="cell3 overtime" >
                                <span class="text-online">￥100</span>
                            </div>
                            <div v-else-if="ground[i] == 1" class="cell3 online" >
                                <span class="text-online">线上预定</span>
                            </div>
                            <div v-else-if="ground[i] == 2" class="cell3 offline" >
                                <span class="text-offline">线下预定</span>
                            </div>
                            <div v-else-if="isChose(ground, i)" class="cell3 cell3-chose" >
                                <span class="cell3-empty">￥1002</span>
                            </div>
                            <div v-else class="cell3 cell3-empty-ct" @click="() => choose(ground, i)">
                                <span class="cell3-empty">￥100</span>
                            </div>
                        </div>
                    </div>
                </template>
                <div style="width: 100%" class="cell-row">
                    <div class="cell-time">
                            {{ tableData[tableData.length-1].time }}
                    </div>
                </div>
            </el-col>

            <el-col :span="1" style="background-color: #FFFFFF" />

            <el-col :span="4" style="height: 100%">
                <div class="div-right">
                    <h4 class="title-left">预约信息</h4>
                    <el-form :model="form" label-width="2.5vw">

                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="用户姓名"/>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="form.phone" placeholder="手机号码" />
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" placeholder="备注信息" />
                        </el-form-item>
                        
                        <el-row class="center">
                            <el-col :span="12">
                                <h4 class="title-left">场次信息</h4>
                            </el-col>
                            <el-col :span="4" :offset="8">
                                <el-text class="mx-1" @click="chooseAll">全选</el-text>
                            </el-col>
                        </el-row>
                        <template v-for="ground in grounds">
                            <el-row class="center item-card" style="background-color: #EFF3FF;">
                                <el-col :span="2">
                                    <!-- <el-checkbox :label="ground" size="large" /> -->
                                    <input type="checkbox" :value="ground" v-model="form.items">
                                </el-col>
                                <el-col :span="20">
                                    <el-row><el-text class="mx-1">线下预约：{{ground}}号场</el-text></el-row>
                                    <el-row class="center">
                                        <el-col :span="5.5"><p class="text-date">今天08-08</p></el-col>
                                        <el-col :span="7.5"><p class="text-time">14:00-15:00</p></el-col>
                                        <el-col :span="4" :offset="6"><p class="text-money">￥100</p></el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>

                        <div class="form-bottom">
                            <el-row>
                                <el-col :span="6" class="text-total">
                                    合计：
                                </el-col>
                                <el-col :span="8" :offset="7">
                                    <el-text class="text-total-money">￥200.00</el-text>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-button type="primary" @click="onSubmit" style="width: 90%">结算</el-button>
                            </el-row>
                        </div>
                    </el-form>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'

var currentHour = (new Date()).getHours();


const grounds = [1, 2, 3]

const _items :Ref<Number[]> = ref([])

const form = reactive({
  name: '',
  phone: '',
  remark: '',
  items: _items,
})

const isOvertime = (startTime: string) => {
    let hour = parseInt(startTime.substring(0, 3));
    if (hour <= currentHour) {
        return true;
    }
    return false;
}

const chooseAll = () => {
    _items.value = grounds;
}

const onSubmit = () => {
  console.log('submit!')
}

const groundList = [
    "1号场",
    "2号场",
    "3号场",
    "4号场",
    "5号场",
    "6号场",
    "7号场",
    "8号场",
    "9号场",
    "10号场"
];

const itemSpan = 24 / (groundList.length+1);

interface Data {
    [index: string]: string|number,
}

const tableData : Data[] = [
    {
        "time": "06:00",
        "1号场": 1,
        "2号场": 1,
        "3号场": 1,
        "4号场": 1,
        "5号场": 2,
        "6号场": 1,
        "7号场": 0,
        "8号场": 1,
    },
    {
        "time": "07:00",
        "1号场": 1,
        "2号场": 1,
        "3号场": 1,
        "4号场": 1,
        "5号场": 1,
        "6号场": 2,
        "7号场": 0,
        "8号场": 1,
    },
    {
        "time": "08:00",
        "1号场": 1,
        "2号场": 1,
        "3号场": 2,
        "4号场": 1,
        "5号场": 1,
        "6号场": 1,
        "7号场": 0,
        "8号场": 1,
    },
    {
        "time": "09:00",
        "3号场": 1,
        "4号场": 1,
        "5号场": 1,
    },
    {
        "time": "10:00",
        "2号场": 1,
    },
    {
        "time": "11:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 1,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "12:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "13:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 2,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "14:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 2,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "15:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "16:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 1,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "17:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "18:00",
        "1号场": 0,
        "2号场": 2,
        "3号场": 0,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "19:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "20:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 1,
    },
    {
        "time": "21:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 1,
        "4号场": 0,
        "5号场": 0,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    },
    {
        "time": "22:00",
        "1号场": 0,
        "2号场": 0,
        "3号场": 0,
        "4号场": 0,
        "5号场": 1,
        "6号场": 0,
        "7号场": 0,
        "8号场": 0,
    }
];

const choseList : Data[] = []

const choose = (data: Data, index: string) => {
    console.log(data);
    console.log(index);
    let flag = false;
    choseList.forEach((item) => {
        console.log(item);
        
        if (item.time === data.time) {
            item[index] = 5;
            flag = true;
            return;
        }
    })
    if (!flag) {
        choseList.push({
        time: data.time,
        [index]: 5,
    })
    }
    console.log(choseList);
    
}

const isChose = (data: Data, index: string) => {
    choseList.forEach((item) => {
        if (item.time == data.time) {
            if (item[index] == 5) {
                return true;
            } else {
                return false;
            }
        }
    })
}

</script>

<style scoped>
.outer{
    height: 100%;
    background-color: #f6f8fa;
}
.header-row{
    width: 94%;
    margin-left: 6%;
    display: flex;
}
.header-cell{
    height: 4vh;
    margin: 0.3vh 0.2vw;
    padding:0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cell-row{
    display: flex;
    justify-content: space-between;
}
.cell-time{
    width: 6%;
    margin-top: -0.5%;
    padding-left: 3%;
}
.cell4{
    width: 10%;
}
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
    .cell3-empty-ct:hover{
        border: solid 2px;
        border-color: #0077FF;
    }
    .online{
        background: #FFC300;
    }
    .text-online{
        color: #FFFFFF;
    }
    .offline{
        background: #0077FF;
    }
    .overtime{
        background: #D8D8D8;
    }
    .text-offline{
        font-size: 15px;
        color: #FFFFFF;
    }
    .title-left{
        text-align: left;
        margin-left: 1vw;
        margin-top: 0;
        padding-top: 2vh;
    }
    .center{
        display: flex;
        align-items: center;
    }

    .div-right{
        height: 100%;
        margin-left: 1rem;
        padding-right: 2rem;
        background-color: #FFFFFF;
    }
    .text-date{
        font-size: 12px;
        color: #9E9E9E;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    .text-time{
        font-size: 13px;
        margin-top: 0.15rem;
        margin-bottom: 5px;
        margin-left: 0.4rem;
    }
    .text-money{
        font-size: 15px;
        color: #F44336;
        margin-top: 0;
        margin-bottom: 5px;
    }
    .item-card{
        margin: 3px 0 0 1vw;
        padding-top: 6px;
    }
    .form-bottom{
        width: 13%;
        position: fixed;
        bottom: 2vh; 
        margin-left: 2vw;
    }
    .text-total-money{
        font-size: 22px;
        color: #F44336;
    }
</style>