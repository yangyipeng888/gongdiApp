// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button, List, Cell, Tabbar, TabbarItem,
  Field, Popup, Grid, GridItem, Image as VanImage, Overlay
  , NavBar, Empty, Loading, TreeSelect, Picker, Icon, Tab,
  Tabs, Circle, Search, Swipe, SwipeItem, Form, Uploader
} from 'vant'

Vue.use(Uploader)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Search)
Vue.use(Button)
Vue.use(Form)
Vue.use(Cell)
Vue.use(Popup)
Vue.use(Field)
Vue.use(List)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(TreeSelect)
Vue.use(Picker)
Vue.use(Circle)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Overlay)
Vue.use(NavBar)
Vue.use(Empty)
Vue.use(Loading)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar).use(TabbarItem)
