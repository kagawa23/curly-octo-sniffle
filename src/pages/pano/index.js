import Taro, { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';

import './index.scss';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  componentWillMount() {
    const { url } = this.$router.params;
    this.setState({ url: url });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { url } = this.state;
    if (!url) return null;
    return <WebView src={url} />;
  }
}
