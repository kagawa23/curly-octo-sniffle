import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { aspectRatios } from '../../../constants';
import { ImageContainer } from '../imageContainer';
import { getRandomInt } from '../../../utils';
import PanoButton from '../panoButton';

class PanoCard extends Component {
  static defaultProps = {
    pano: {},
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.ratioIdx = getRandomInt(0, 4);
  }

  onClick() {
    const {
      pano: { photo360Url },
    } = this.props;
    Taro.navigateTo({
      url: `/pages/pano/index?url=${encodeURIComponent(photo360Url)}`,
    });
  }

  render() {
    const {
      pano: { coverUrl },
    } = this.props;
    if (!coverUrl) return null;
    return (
      <View className="pano-card" onClick={this.onClick.bind(this)}>
        <ImageContainer
          url={coverUrl}
          aspectRatio={aspectRatios[this.ratioIdx]}
        >
          <PanoButton>全景图</PanoButton>
        </ImageContainer>
      </View>
    );
  }
}

export default PanoCard;
