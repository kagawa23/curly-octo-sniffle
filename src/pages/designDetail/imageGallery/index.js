import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { aspectRatios } from '../../../constants';
import { ImageContainer } from '../imageContainer';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class ImageGalllery extends Component {
  static defaultProps = {
    list: [],
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.ratioIdx = getRandomInt(0, 4);
  }
  render() {
    const { list } = this.props;
    if (list.length === 0) return null;
    return (
      <ImageContainer
        url={list[0].coverUrl}
        aspectRatio={aspectRatios[this.ratioIdx]}
      >
        <View
          style={{
            position: 'absolute',
            right: '10rpx',
            bottom: '10rpx',
            color: 'white',
          }}
        >
          1/{list.length}
        </View>
      </ImageContainer>
    );
  }
}

export default ImageGalllery;
