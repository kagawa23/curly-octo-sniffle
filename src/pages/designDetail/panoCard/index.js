import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { aspectRatios } from '../../../constants';
import { ImageContainer } from '../imageContainer';
import { getRandomInt } from '../../../utils';
import PanoButton from '../panoButton';

class PanoCard extends Component {
  static defaultProps = {
    coverUrl: '',
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.ratioIdx = getRandomInt(0, 4);
  }
  render() {
    const { coverUrl } = this.props;
    if (!coverUrl) return null;
    return (
      <ImageContainer url={coverUrl} aspectRatio={aspectRatios[this.ratioIdx]}>
        <PanoButton>全景图</PanoButton>
      </ImageContainer>
    );
  }
}

export default PanoCard;
