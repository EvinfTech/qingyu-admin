// 菜单实体对象
export type MenuDataType = {
  id?: Number
  pid?: Number
  name?: string         // 英文名称
  title?: string        // 中文标题
  p_name?: string
  grade?: number
  icon?: string
  path?: string         // 访问路径
  hidden?: number
  component?: string    // 视图路径

  // menuType?: number
  // permissionTag?: string
}
