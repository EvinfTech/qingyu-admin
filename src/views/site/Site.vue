<template>
  <div class="site-main">
    <div class="left">
      <div class="left-top">
        <h3>订场面板</h3>
        <div class="example-container" style="background-color: #0077FF;"/>
        <span class="text-example">线下预定</span>

        <div class="example-container" style="background-color: #FFC300;"/>
        <span class="text-example">线上预定</span>

        <div class="example-container" style="background-color: #D8D8D8;"/>
        <span class="text-example">不可预定</span>

        <div class="example-container" style="background-color: #EFF3FF;"/>
        <span class="text-example">可预定</span>

        <div class="example-container example-container-chose" style="background-color: #EFF3FF;">
                        <span class="tick">
                            <el-icon size="10"><Check/></el-icon>
                        </span>
        </div>
        <span class="text-example">已选择</span>
      </div>
      <div class="left-main">
        <div class="date-select">
          <el-button round v-for="n in 7" :key="n" :class="{ active: n == upBtn }" @click="dateButton(n-1)">
            {{ getDate(n - 1) }}
          </el-button>
        </div>
        <div class="site-select">
          <div>
            <el-table class="my_table" :data="SiteTimeEnum" style="width: 100%"
                      :cell-style="{padding:'2px 0px 2px 0px'}">
              <el-table-column prop="time" label="Date" width="100" index="0">
                <template #default="scope">
                  <div v-if="scope.$index ==0" class="time-enum-start">
                    {{ getTimeEnumStart(SiteTimeEnum[0].time) }}
                  </div>
                  <div class="time-enum">
                    {{ getTimeEnum(scope.row.time) }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-for="(column, index) in SiteDetail" :label="column.site_name" :key="index"
                               :prop="column" :highlight-current-row="true"
                               width="130">
                <template #default="scope">
                  <div>
                    <!--                                                            {{ scope.row.time }}-->
                    <!--                    <el-button class="site-select-button" color="#EFF3FF" type="success"-->
                    <!--                               style="width: 110px;height: 55px;color: #9E9E9E">￥100-->
                    <!--                    </el-button>-->
                    <!--                    类型：1:时间段过了  2:线上  3:线下-->
                    <CanChoose :money="getMoney(scope.row.time,scope.column.property)"
                               :status="getStatus(scope.row.time,scope.column.property)"
                               @click="updateSiteDetail(scope.column.property,scope.row.time)"
                               style="width: 110px;height: 55px"/>
                    <!--                    <div>{{getMoney(scope.row.time,scope.column.property)}}</div>-->
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>


        </div>
      </div>

    </div>

    <div class="right">
      <div class="right-top">
        <h3>预约信息</h3>
        <el-form :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="form.phone"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remake"/>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-middle">
        <h3>场次信息</h3>

        <div v-for="item in SiteSelectDetail">
          <div v-if="item.time_enum.length!=0">
            <div class="right-middle-show">
              <div class="right-middle-show-top">线下预约:{{ getSiteName(item) }}</div>
              <div class="right-middle-show-bottom">
                <div style="color:#9E9E9E;">今天 12-07 共{{ getSiteCount(item) }}场</div>
                <div style="color: #F44336;font-size: 17px">￥{{ getSiteSumMoney(item) }}</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="bill">
        <div class="bill-top">
          <h3>合计</h3>
          <h3 style="color: #F44336">￥{{ getOrderSumMoney() }}</h3>
        </div>
        <el-button @click="submit()" type="primary" style="width: 100%;height: 40%">结算</el-button>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {SaasAddOrder, SaasGetSiteReserve} from "@/api/site";
import {useEnumStore} from "@/stores/enum.ts";
import CanChoose from "@/views/site/CanChoose.vue";
import {ElMessage} from "element-plus";
import {Check} from "@element-plus/icons-vue";

var SiteTimeEnum = ref<any>([])
var SiteDetail = ref<any>([])
let TimeEnum = useEnumStore()
var currentHour = (new Date()).getHours();
const today = new Date();
var SiteSelectDetail = ref<any>([])
let form = reactive({
  name: '',
  phone: '',
  remake: '',
})
//选择的日期
let selectDate = ''
//按钮颜色
let upBtn = 0


function getDate(aa: any) {
  window.setTimeout(function () {
    window.requestAnimationFrame(getDate)
  }, 1000 / 2)
  var d = new Date(today.getTime() + 24 * aa * 60 * 60 * 1000);
  var month: any = d.getMonth() + 1;  //获取月，从 Date 对象返回月份 (0 ~ 11)，故在此处+1
  var day: any = d.getDay()    //获取日
  var days: any = d.getDate() //获取日期

  if (month < 10) month = "0" + month
  if (days < 10) days = "0" + days

  var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

  var a = month + "-" + days
  var c = week[day]

  if (aa == 0) {
    return "今天 " + a
  } else {
    return c + " " + a
  }


}

onMounted(() => {
  upBtn = 1
  selectDate = getTodayDate()
  infoData(getTodayDate())

  //整理数据
})

function dateButton(n: any) {
  //清空选择列表
  SiteSelectDetail = ref<any>([])
  upBtn = n + 1
  const today = new Date(new Date().getTime() + 24 * n * 60 * 60 * 1000);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const thisDayDate = `${year}-${month}-${day}`; //打印当前日期
  selectDate = thisDayDate
  infoData(thisDayDate)
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const thisDayDate = `${year}-${month}-${day}`; //打印当前日期
  return thisDayDate
}

//计算订单总金额
function getOrderSumMoney() {
  let sumMoney = 0
  SiteSelectDetail.value.forEach((value: any) => {
    sumMoney += getSiteSumMoney(value)
  })
  return sumMoney
}

//初始化方法
function infoData(date: any) {
  SiteDetail.value = []
  SiteTimeEnum.value = []
  SaasGetSiteReserve({shop_id: 1, date: date}).then((res: any) => {
    //初始时间枚举
    var timeEnum = ref<any>([])
    res.data.data.forEach((value: any) => {
      value.store_time_enum.forEach((v: bigint) => {
        timeEnum.value.push(v)
      })
      SiteDetail.value.push({
        site_id: value.site_id,
        site_name: value.site_name,
        price: value.price,
        saas_reserve_time_enum: value.saas_reserve_time_enum,
        online_reserve_time_enum: value.online_reserve_time_enum,
      })
    })

    const uniqueArr = [...new Set(timeEnum.value)];
    const sortedArr = uniqueArr.sort((a: any, b: any) => a - b);
    sortedArr.forEach((vv: any) => {
      SiteTimeEnum.value.push({time: vv})
    })
    //处理价格信息

  })
}

function getStatus(time: any, data: any) {
  var status = 0
  if (currentHour >= TimeEnum.Enum.time_enum[time].split(":")[0]) {
    status = 1
  }
  if (data.saas_reserve_time_enum.length != 0) {
    data.saas_reserve_time_enum.forEach((value: any) => {
      if (value == time) {
        status = 3
      }
    })
  }
  if (data.online_reserve_time_enum.length != 0) {
    data.online_reserve_time_enum.forEach((value: any) => {
      if (value == time) {
        status = 2
      }
    })
  }
  return status
}

function getSiteName(site: any) {
  return site.site_name
}


function getSiteCount(site: any) {
  return site.time_enum.length
}

function getSiteSumMoney(site: any) {
  let totalMoney = 0

  SiteDetail.value.forEach((value: any) => {
    if (value.site_id == site.site_id) {
      site.time_enum.forEach((v: any) => {
        value.price.forEach((vv: any) => {
          if (v == vv.time_enum) {
            totalMoney += vv.price
          }
        })
      })
    }
  })
  return totalMoney / 100

}


// {
//      "user_name":"散客",
//     "user_phone":"19999999999",
//     "remake":"这个人打球很垃圾",
//     "shop_id":1,
//     "gmt_site_use":"2023-11-14",
//     "site_detail":[
//   {
//     "site_id":1,
//     "time_enum":[1,2,3]
//   },
//   {
//     "site_id":2,
//     "time_enum":[1,2,3]
//   }
// ]
// }
function submit() {
  var data = reactive<any>({
    user_name: form.name,
    user_phone: form.phone,
    remake: form.remake,
    shop_id: 1,
    gmt_site_use: selectDate,
    site_detail: [],
  })
  SiteSelectDetail.value.forEach((value: any) => {
    if (value.time_enum.length > 0) {
      data.site_detail.push({site_id: value.site_id, time_enum: value.time_enum})
    }
  })
  SaasAddOrder(data).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage({
        type: "success",
        message: "提交成功了，需要付钱:" + res.data.data.money
      })
    }
  })

}

function updateSiteDetail(site: any, timeEnum: any) {
  let jump = 0
  if (SiteSelectDetail.value.length == 0) {
    SiteSelectDetail.value.push({site_id: site.site_id, site_name: site.site_name, time_enum: [timeEnum]})
  } else {
    SiteSelectDetail.value.forEach((value: any, index: any) => {
      if (value.site_id == site.site_id) {
        for (let i = 0; i < value.time_enum.length; i++) {
          if (value.time_enum[i] == timeEnum) {
            value.time_enum.splice(i, 1)
            jump = 1
            return
          }
        }
        SiteSelectDetail.value[index].time_enum.push(timeEnum)
        jump = 1
      }
    })
    if (jump == 0) {
      SiteSelectDetail.value.push({site_id: site.site_id, site_name: site.site_name, time_enum: [timeEnum]})
    }
  }

}

function getMoney(time: any, data: any) {
  let price = -1
  data.price.forEach((value: any) => {
    if (value.time_enum == time) {
      price = value.price / 100
      return price
    }
  })
  return price
}

function getTimeEnum(time: any) {
  return TimeEnum.Enum.time_enum[time].split("~")[1]
}

function getTimeEnumStart(time: any) {
  return TimeEnum.Enum.time_enum[time].split("~")[0]
}
</script>

<style scoped>
.my_table >>> .el-table__body tr:hover > td {
  background-color: #fff !important;
}

</style>
<style lang="scss">
//.el-table__body{
//  -webkit-border-horizontal-spacing: 100px;  // 水平间距
//  -webkit-border-vertical-spacing: -500px;  // 垂直间距
//}
.site-main {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #e5e5e5;
  overflow-y: hidden;


  .left {
    width: 80%;
    height: 100%;
    margin-right: 20px;

    .left-top {
      height: 5%;
      width: 100%;
      padding-left: 30px;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      margin: 10px;

      .example-container {
        width: 3%;
        height: 40%;
        margin-left: 2%;
        margin-right: 1%;
        background-color: #0077FF;

        .tick {
          position: absolute;
          top: 0;
          right: 0;
          margin-top: -5px;
          color: #0077FF;
        }
      }

      .example-container-chose {
        border: solid 1.5px;
        border-color: #0077FF;
        position: relative;
      }

      .text-example {
        font-size: 13px;
        margin-top: 3px;
      }

    }

    .left-main {
      background-color: #FFFFFF;
      margin: 10px;
      height: 100%;
      width: 100%;

      .date-select {
        padding-left: 10px;
        display: flex;
        align-items: center;
        height: 5%;

        .active {
          color: #1890ff;
          border-color: #badeff;
          background-color: #e8f4ff
        }
      }

      .site-select {
        width: 100%;
        height: 100%;

        .my_table {
          padding: 10px;
          height: 80vh;

          .time-enum {
            position: absolute;
            right: 0;
            bottom: -9px;
          }

          .time-enum-start {
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        .el-table {
          --el-table-border-color: '#FFFFFF' !important;
        }
      }

    }

  }

  .right {
    background-color: #FFFFFF;
    width: 20%;
    height: 100%;
    padding: 20px;
    position: relative;

    .right-top {
      width: 100%;
      height: 17%;
    }

    .right-middle {
      width: 100%;
      height: 70%;

      .right-middle-show {
        padding: 10px 25px 10px 25px;
        width: 100%;
        height: 8%;
        background-color: #EFF3FF;
        margin-bottom: 20px;

        .right-middle-show-top {
          margin-bottom: 4px;
          font-size: 15px;
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
        }

        .right-middle-show-bottom {
          font-size: 13px;
          height: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .bill {
      position: absolute;
      bottom: 2%;
      right: 10%;
      height: 8%;
      width: 80%;

      .bill-top {
        display: flex;
        justify-content: space-between;
      }
    }
  }

}


</style>