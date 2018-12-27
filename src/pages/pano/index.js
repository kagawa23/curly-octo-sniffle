import Taro, { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';
import withShare from '../../components/withShare';

import './index.scss';

@withShare({
  title: '可设置分享标题',
  imageUrl: '可设置分享图片路径',
  path: '可设置分享路径',
})
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  componentWillMount() {
    const { url } = this.$router.params;
    this.setState({ url: decodeURIComponent(url) });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  $setSharePath = () => {
    const { url } = this.$router.params;
    return `/pages/pano/index?url=${encodeURIComponent(url)}`;
  };

  render() {
    const { url } = this.state;
    if (!url) return null;
    return <WebView src={url} />;
  }
}
