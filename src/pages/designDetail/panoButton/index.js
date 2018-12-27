import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './style.scss';

class Button extends Component {
  static defaultProps = {
    // coverUrl: '',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { buttonStyle } = this.props;
    return (
      <View className="click-button" style={buttonStyle}>
        <AtIcon prefixClass="iconfont" value="camera" size="20" color="white" />{' '}
        {this.props.children}
      </View>
    );
  }
}

export default Button;
