// 金钱格式化
export function formatMoney(value: number) {
  return '￥' + (value / 100).toFixed(2)
}
