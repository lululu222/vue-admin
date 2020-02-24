import axios from 'axios'
const MyHttpserver = {}
MyHttpserver.install = (Vue) => {
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpserver
