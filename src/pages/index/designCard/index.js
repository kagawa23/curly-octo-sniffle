import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import './style.scss';

class Card extends Component {
  static defaultProps = {
    design: {},
  };
  onClick() {
    const { assetId } = this.props.design;
    Taro.navigateTo({
      url: `/pages/designDetail/index?assetId=${assetId}`,
    });
  }
  render() {
    const {
      designCover,
      designerAvatar,
      designerName,
      style: designStyle,
      area,
      roomType,
      livingRoom,
      bathRoom,
      browseCount,
      favoriteCount,
    } = this.props.design;
    const roomTypeInTitle =
      roomType && livingRoom && bathRoom
        ? `${roomType}${livingRoom}${bathRoom}`
        : null;
    return (
      <View className="card" onClick={this.onClick.bind(this)}>
        <Image src={designCover} className="card-image" />
        <View className="card-description">
          <View className="first-row">
            <View className="first-row-name">{designStyle}</View>
            {' · '}
            {roomTypeInTitle ? (
              <View className="first-row-rooms">{roomTypeInTitle}</View>
            ) : null}
            {' · '}
            <View className="first-row-area">{area}</View>
          </View>
          <View className="second-row">
            <View className="second-row-avatar">
              <Image src={designerAvatar} className="avatar-image" />
            </View>
            <View className="second-row-authorname">{designerName}</View>
            <View className="second-row-views">
              <View className="iconfont iconfont-eye" />
              {'  '}
              {browseCount}
            </View>
            <View className="second-row-likes">
              <View className="iconfont iconfont-thumbup" />
              {'  '}
              {favoriteCount}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Card;
