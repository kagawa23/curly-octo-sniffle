import Taro, { Component } from '@tarojs/taro';
import { CategoryCard } from './categoryCard';
import DesignHead from './designHead';
import SpaceCard from './spaceCard';
import PanoButton from './panoButton';
import ShareCanvas from './shareCanvas';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { get as getGlobalData } from '../../globalData';
import withShare from '../../components/withShare';
import { fetchDesignDetail } from '../../io/request';
import { backgroundColor as bgColor } from '../../constants';
import './style.scss';

const styles = {
  stickyHead: {
    position: 'fixed',
    top: '0rpx',
    width: '100%',
    zIndex: 10,
    boxSizing: 'border-box',
  },
  stickyMarginTop: {
    mariginTop: '120rpx',
  },
};

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
    this.state = {
      isSticky: false,
    };
    this.stickyThreshhold = 422 / getGlobalData('pixel_ratio');
  }

  async componentWillMount() {
    const { assetId } = this.$router.params;
    const [err, resp] = await fetchDesignDetail(assetId);
    if (!err) {
      const { data } = resp;
      console.log(data);
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
        photo360Url,
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
        naviPano: photo360Url,
      });
    }
  }

  componentDidMount() {
    // this.drawImage();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  $setSharePath = () =>
    `pages/designDetail/index?assetId=${this.$router.params.assetId}`;

  $setShareTitle = () => this.state.designName;

  setShareDone({ tempFilePath }) {
    this.shareCover = tempFilePath;
  }

  drawImage = () => {
    const ctx = Taro.createCanvasContext('myCanvas');
    let width = 0;
    var height = getGlobalData('window_height');
    width = getGlobalData('window_width') * 0.8;
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 0, width, height);
    ctx.draw(false, () => {
      Taro.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: res => {
          this.shareCover = res.tempFilePath;
        },
      });
    });
  };

  $setShareImageUrl = () => {
    console.log(this.shareCover);
    return this.shareCover;
  };

  onClickNaviPano() {
    const { naviPano } = this.state;
    Taro.navigateTo({
      url: `/pages/pano/index?url=${encodeURIComponent(naviPano)}`,
    });
  }

  onScroll(event) {
    const {
      detail: { scrollTop, deltaY },
    } = event;
    if (deltaY < 0) {
      if (
        this.scrollTopPrev <= this.stickyThreshhold &&
        scrollTop >= this.stickyThreshhold
      ) {
        this.setState({ isSticky: true });
      }
    } else if (deltaY > 0) {
      if (
        this.scrollTopPrev >= this.stickyThreshhold &&
        scrollTop <= this.stickyThreshhold
      ) {
        this.setState({ isSticky: false });
      }
    }
    this.scrollTopPrev = scrollTop;
  }
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
      isSticky,
      naviPano,
    } = this.state;
    const windowHeight = getGlobalData('window_height');
    return (
      <ScrollView
        className="design-detail"
        style={`height:${windowHeight}px`}
        scrollY
        scrollWithAnimation
        scrollTop="0"
        onScroll={this.onScroll.bind(this)}
      >
        <View
          className="design-detail-header"
          onClick={this.onClickNaviPano.bind(this)}
        >
          <Image className="cover-image" src={designCover} />
          <View className="decoration-type">{decorationType}</View>
          {naviPano && <PanoButton>全屋漫游</PanoButton>}
        </View>
        <DesignHead
          data={{ designName, avatar, designerName, designDescription }}
          headStyle={isSticky ? styles.stickyHead : {}}
        />
        <View style={isSticky ? styles.stickyMarginTop : {}}>
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

        <View style={{ height: 0, overflow: 'hidden' }}>
          <ShareCanvas onSetShareDone={this.setShareDone.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}
