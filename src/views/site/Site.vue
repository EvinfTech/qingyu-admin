<template>
    <div>
        <el-row>

            <el-col :span="20">
                <el-table :data="tableData" style="width: 100%" size="large" :cell-style="cell2">
                    <el-table-column prop="time" label="" class="time"  align="center"/>
                    <el-table-column v-for="ground in groundList" :prop="ground" :label="ground" :min-width="itemWidth"  align="center">
                        <template #default="scope">
                            <div v-if="scope.row[ground] === 1" class="cell3 exist" >
                                <span>占用</span>
                            </div>
                            <div v-else class="cell3">
                                <span>空闲</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="4">
                <h4 class="title-left">预约信息</h4>
                <el-form :model="form" label-width="3.5vw">

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
                        <el-col :span="12"><h4 class="title-left">场次信息</h4></el-col>
                        <el-col :span="4" :offset="8"><el-text class="mx-1">全选</el-text></el-col>
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
                                    <el-col :span="7"><p class="text-time">14:00-15:00</p></el-col>
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
                            <el-col :span="6" :offset="9">
                                <el-text class="text-total-money">￥200</el-text>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-button type="primary" @click="onSubmit" style="width: 100%">结算</el-button>
                        </el-row>
                    </div>
                </el-form>
                    
            </el-col>

        </el-row>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const grounds = [1, 2, 3]

const form = reactive({
  name: '',
  phone: '',
  remark: '',
  items: ref([]),
})

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

var itemWidth = (500 / groundList.length) + "%";

function cell2() {
    return {
        "padding": 0,
        "padding-left": "0px",
        "padding-right": "0px",
    };
}


const tableData = [
    {
        "time": "06:00--07:00",
        "1号场": 1,
        "2号场": 1,
        "3号场": 1,
        "4号场": 1,
        "5号场": 1,
        "6号场": 1,
        "7号场": 1,
        "8号场": 1,
    },
    {
        "time": "07:00--08:00",
        "1号场": 1,
        "2号场": 1,
        "3号场": 1,
        "4号场": 1,
        "5号场": 1,
        "6号场": 1,
        "7号场": 1,
        "8号场": 1,
    },
    {
        "time": "08:00--09:00",
        "1号场": 1,
        "2号场": 1,
        "3号场": 1,
        "4号场": 1,
        "5号场": 1,
        "6号场": 1,
        "7号场": 1,
        "8号场": 1,
    },
];
</script>

<style scoped>
    .cell3 {
        height: 5vh;
        padding:0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .exist {
        background-color: skyblue;
    }

    .title-left{
        text-align: left;
        margin-left: 2vw;
        margin-top: 0;
    }
    .center{
        display: flex;
        align-items: center;
    }
    .text-date{
        font-size: 12px;
        color: #9E9E9E;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    .text-time{
        font-size: 13px;
        margin-top: 1px;
        margin-bottom: 5px;
    }
    .text-money{
        font-size: 15px;
        color: #F44336;
        margin-top: 0;
        margin-bottom: 5px;
    }
    .item-card{
        margin: 3px 0 0 2vw;
        padding-top: 6px;
    }
    .form-bottom{
        width: 13vw;
        position: fixed;
        bottom: 2vh; 
        margin-left: 2vw;
    }
    .text-total{
        display:flex;
        align-items:flex-end;
    }
    .text-total-money{
        font-size: 22px;
        color: #F44336;
    }
</style>