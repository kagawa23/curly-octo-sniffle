// 定义全局变量对象
const globalData = {
  userInfo: null,
  count: 10,
  device_model: '',
  isIpx: false,
  system_model: '',
  active_code: '',
};
// 修改值
export function set(key, val) {
  globalData[key] = val;
}
// 获取值
export function get(key) {
  return globalData[key];
}
