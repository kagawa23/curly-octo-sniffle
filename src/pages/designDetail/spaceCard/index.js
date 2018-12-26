import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { fontColorShallow, fontWeightBold } from '../../../constants';
import Accordion from '../accordion';
import ImageGallery from '../imageGallery';

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
    console.log(images, panoramas);
    return (
      <View className="space-card">
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
              {roomTypeCode}
            </View>
          }
          disabled={!description}
          buttonStyle={{ lineHeight: '42rpx' }}
        >
          <View className="accordion-body">{description}</View>
          {/* {panoramas.map(p => (
            <Pano key={p.id} />
          ))} */}
          {/* {images.map(i => (
            <ImageGallery key={i.id} />
          ))} */}
        </Accordion>
        <ImageGallery list={images} />
      </View>
    );
  }
}
export default Card;
