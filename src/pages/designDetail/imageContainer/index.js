import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { fontColorShallow, fontWeightBold } from '../../../constants';

class ImageContainer extends Component {
  static defaultProps = {
    url: '',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { url, aspectRatio } = this.props;
    if (!url) return null;
    return (
      <View
        style={{
          width: '100%',
          paddingTop: `${100 * aspectRatio}%`,
          height: 0,
          position: 'relative',
        }}
      >
        <Image
          src={url}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: '0rpx',
            top: '0rpx',
          }}
        />
        {this.props.children}
      </View>
    );
  }
}

export default ImageContainer;
