import Taro, { Component } from '@tarojs/taro';
import '@tarojs/async-await';

import Index from './pages/index';
import { set as setGlobalData, get as getGlobalData } from './globalData';
import './app.scss';
import './iconfont.scss';
// 生成canvas
// https://www.jianshu.com/p/6204e9d9b277
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/designDetail/index',
      'pages/pano/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  componentWillMount() {
    this.getSysInfo();
  }
  getSysInfo() {
    const info = Taro.getSystemInfoSync();
    // console.log(info);
    setGlobalData('window_height', info.windowHeight);
    setGlobalData('window_width', info.windowWidth);
    setGlobalData('pixel_ratio', info.pixelRatio);
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
