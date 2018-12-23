import Taro, { Component } from "@tarojs/taro";
import { AtAccordion, AtIcon } from "taro-ui";
import Accordion from "./accordion";
import DesignHead from "./designHead";
import { View, Text, ScrollView, Image, Icon } from "@tarojs/components";
import withShare from "../../components/withShare";
import { fetchDesignDetail } from "../../io/request";
import "./style.scss";

@withShare({
  title: "可设置分享标题",
  imageUrl: "可设置分享图片路径",
  path: "可设置分享路径"
})
export default class Index extends Component {
  config = {
    navigationBarTitleText: "案例详情"
  };
  constructor(props) {
    super(props);
    this.state = {
      showDesignDescription: false
    };
  }

  async componentWillMount() {
    // console.log(this.$router.params); // 输出 { id: 2, type: 'test' }
    const { assetId } = this.$router.params;
    const [err, resp] = await fetchDesignDetail(assetId);
    if (!err) {
      const { data } = resp;

      // console.log(data);
      console.log(data);
      const {
        bathRoomNum,
        bedRoomNum,
        livingRoomNum,
        caseCover: designCover,
        name: designName,
        description: designDescription,
        originUser: { name: designerName, avatarUrl: avatar }
      } = data;
      this.setState({
        designName,
        designerName,
        avatar,
        assetId,
        decorationType: `${bedRoomNum}${livingRoomNum}${bathRoomNum}`,
        designCover,
        designDescription
      });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  $setSharePath = () => "pages/designDetail/index";

  render() {
    const {
      designName,
      designerName,
      avatar,
      assetId,
      decorationType,
      designCover,
      designDescription
    } = this.state;
    return (
      <View className='design-detail'>
        <View className='design-detail-header'>
          <Image className='cover-image' src={designCover} />
          <View className='decoration-type'>{decorationType}</View>
          <View className='click-button'>
            <AtIcon
              prefixClass='iconfont'
              value='camera'
              size='20'
              color='white'
            />
            全屋漫游
          </View>
        </View>
        <DesignHead
          data={{ designName, avatar, designerName, designDescription }}
        />
      </View>
    );
  }
}
