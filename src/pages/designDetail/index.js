import Taro, { Component } from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { CategoryCard } from './categoryCard';
import DesignHead from './designHead';
import SpaceCard from './spaceCard';
import PanoButton from './panoButton';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import withShare from '../../components/withShare';
import { fetchDesignDetail } from '../../io/request';
import { backgroundColor as bgColor } from '../../constants';
import './style.scss';

@withShare({
  title: '可设置分享标题',
  imageUrl: '可设置分享图片路径',
  path: '可设置分享路径',
})
export default class Index extends Component {
  config = {
    navigationBarTitleText: '案例详情',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    const { assetId } = this.$router.params;
    const [err, resp] = await fetchDesignDetail(assetId);
    if (!err) {
      const { data } = resp;
      const {
        bathRoomNum,
        bedRoomNum,
        livingRoomNum,
        caseCover: designCover,
        name: designName,
        description: designDescription,
        spaceDetails,
        photo2DUrl,
        aerialUrl,
        originUser: { name: designerName, avatarUrl: avatar },
      } = data;
      this.setState({
        designName,
        designerName,
        avatar,
        assetId,
        decorationType: `${bedRoomNum}${livingRoomNum}${bathRoomNum}`,
        designCover,
        designDescription,
        spaceDetails,
        floorplanUrl: photo2DUrl,
        aerialUrl,
      });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  $setSharePath = () => 'pages/designDetail/index';

  render() {
    const {
      designName,
      designerName,
      avatar,
      assetId,
      spaceDetails,
      decorationType,
      designCover,
      designDescription,
      aerialUrl,
      floorplanUrl,
    } = this.state;
    return (
      <View className="design-detail">
        <View className="design-detail-header">
          <Image className="cover-image" src={designCover} />
          <View className="decoration-type">{decorationType}</View>
          <PanoButton>全屋漫游</PanoButton>
        </View>
        <DesignHead
          data={{ designName, avatar, designerName, designDescription }}
        />
        {floorplanUrl ? (
          <CategoryCard
            head="户型图"
            categoryStyle={{ backgroundColor: 'white' }}
          >
            <Image src={floorplanUrl} />
          </CategoryCard>
        ) : null}
        {aerialUrl ? (
          <CategoryCard
            head="鸟瞰图"
            categoryStyle={{ backgroundColor: 'white' }}
          >
            <Image style={{ width: '100%' }} src={aerialUrl} />
          </CategoryCard>
        ) : null}
        <CategoryCard
          head="案例空间"
          categoryStyle={{ backgroundColor: bgColor }}
        >
          {spaceDetails &&
            spaceDetails.map(space => (
              <SpaceCard key={`${assetId}/${space.roomId}`} space={space} />
            ))}
        </CategoryCard>
      </View>
    );
  }
}
