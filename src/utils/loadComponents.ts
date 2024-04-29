import {App} from "vue"
import ActionBar from "@/components/ActionBar.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export const loadCommonComponents = (app: App): App => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component("ActionBar",ActionBar)

  return app
}
