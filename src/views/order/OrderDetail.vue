<script setup lang="ts">
interface Goods {
  id: string
  datetime: Date
  price: number
  state: string
}

const handleEdit = (index: number, row: Goods) => {
  // router.push('/order_detail')
  console.log(index, row)
}

const tableData: Goods[] = [
  {
    id: '2号场地',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    price: 200,
    state: '正常',
  },
]
</script>

<template>
  <div class="detail_main">
    <p class="detail_title">
      <span>订单编号：20230808121232323</span>
      <span>下单时间：2023-08-08 12:11:56</span>
      <span>预约场地</span>
    </p>
    <div class="detail_step">
      <div class="detail_state">
        <p>买家已下单，待支付</p>
        <p>应付金额：￥100.00</p>
        <p>订单需要在2023-08-08 11:11:11前完成支付</p>
        <p>
          <el-button type="warning">确认支付</el-button
          ><el-button type="warning">取消订单</el-button>
        </p>
      </div>
      <div class="detail_step_box">
        <el-steps :active="1" align-center>
          <el-step title="买家下单" description="2023-08-08 12:12:00" />
          <el-step title="买家付款" description="Some description" />
          <el-step title="买家使用" description="Some description" />
          <el-step title="订单完成" description="Some description" />
        </el-steps>
      </div>
    </div>
    <div class="detail_info">
      <div class="detail_info_box">
        <h1>订单信息</h1>
        <p>订单编号：20230808101022223333</p>
        <p>订单类型：预约</p>
        <p>订单来源：小程序</p>
        <p>订单状态：待支付</p>
        <p>下单时间：2023-08-08 12:00:00</p>
        <p>应付金额：￥100.00</p>
      </div>
      <div class="detail_info_box">
        <h1>付款信息</h1>
        <p>支付状态：未支付</p>
        <p>支付方式：无</p>
        <p>支付时间：无</p>
        <p>支付单号：无</p>
        <p>实付金额：无</p>
      </div>
      <div class="detail_info_box">
        <h1>预约信息</h1>
        <p>预约人：涨涨涨</p>
        <p>预约内容：2号场(2023-10-10 14:00-15:00)</p>
        <p>买家留言：无</p>
      </div>
      <div class="detail_info_box">
        <h1>其他信息</h1>
        <p>商家备注：无</p>
        <p>退款时间：2023-11-11 12:00:00</p>
        <p>退款金额：￥100.00</p>
        <p>退款方式：原路退回</p>
        <p>退款原因：无</p>
      </div>
    </div>
    <div class="detail_detail">
      <p>商品明细</p>

      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="场地">
            <template #default="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="时间" width="280">
            <template #default="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格" width="180">
            <template #default="scope">
              <span>￥{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="200">
            <template #default="scope">
              <el-tag>{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <p class="detail_all">
        订单总计：<span class="detail_price">￥300.00</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.detail_main {
  /* padding: 10px; */
  margin: 20px;
  .detail_title span {
    margin-right: 20px;
  }
  .detail_step {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* .detail_state {
      width: 30%;
    } */
    .detail_step_box {
      width: 70%;
    }
  }
  .detail_info {
    background: #f6f8fa;
    padding: 0 50px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    .detail_info_box p {
      color: #b1b4c3;
      font-size: 14px;
      line-height: 14px;
    }
  }

  .detail_detail {
    .detail_all {
      float: right;
      .detail_price {
        font-size: 24;
        color: #f44336;
      }
    }
  }
}
</style>
