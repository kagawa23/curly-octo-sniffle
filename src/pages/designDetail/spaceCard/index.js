import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import {
  fontColorShallow,
  fontWeightBold,
  roomTypeMap,
} from '../../../constants';
import Accordion from '../accordion';
import ImageGallery from '../imageGallery';
import PanoCard from '../panoCard';

import './style.scss';

const filterByTypes = renderImgs => {
  if (!renderImgs) return { panos: [], imgs: [] };
  return renderImgs.reduce(
    ({ panos, imgs }, curr) => {
      const { renderType } = curr;
      if (renderType === 'image') return { panos, imgs: [...imgs, curr] };
      else if (renderType === 'panorama')
        return { imgs, panos: [...panos, curr] };
      return { panos, imgs };
    },
    { panos: [], imgs: [] },
  );
};
class Card extends Component {
  static defaultProps = {
    space: {},
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      space: { description, renderImgs, roomTypeCode },
    } = this.props;
    const { imgs: images = [], panos: panoramas = [] } = filterByTypes(
      renderImgs,
    );
    // 这边的条件渲染似乎有问题
    const isEmpty = images.length === 0 && panoramas.length === 0;
    return (
      <View
        className="space-card"
        style={{ display: isEmpty ? 'none' : 'block' }}
      >
        <Accordion
          title="空间描述"
          renderHead={
            <View
              style={{
                fontWeight: fontWeightBold,
                textAlign: 'left',
                color: fontColorShallow,
                height: '42rpx',
                lineHeight: '42rpx',
                fontSize: '30rpx',
              }}
            >
              {roomTypeMap[roomTypeCode]}
            </View>
          }
          disabled={!description}
          buttonStyle={{ lineHeight: '42rpx' }}
          accordionStyle={{ marginBottom: '24rpx' }}
        >
          <View className="accordion-body">{description}</View>
        </Accordion>
        {panoramas.map(p => (
          <PanoCard key={p.id} pano={p} />
        ))}
        <ImageGallery list={images} />
      </View>
    );
  }
}
export default Card;
