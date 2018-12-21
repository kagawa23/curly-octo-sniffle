import Taro, {
  Component,
} from "@tarojs/taro";
import { AtAccordion, AtIcon } from 'taro-ui';
import Accordion from './accordion';
import { View, Text, ScrollView, Image, Icon } from "@tarojs/components";
import withShare from '../../components/withShare';
import "./style.scss";

@withShare({
  title: '可设置分享标题', 
  imageUrl: '可设置分享图片路径', 
  path: '可设置分享路径'
})
export default class Index extends Component {
  config = {
    navigationBarTitleText: "案例详情"
  };
  constructor(props) {
    super(props);
    this.state = {
      showDesignDescription: false,
    };
    this.showDesignDescriptionToggle = ()=> this.setState(({showDesignDescription})=>({ showDesignDescription:!showDesignDescription  }));
  }

  componentWillMount() {
    // console.log(this.$router.params); // 输出 { id: 2, type: 'test' }
    const {
      designCover,
      designName,
      designerName,
      avatar,
      assetId,
      name: decorationType
    } = this.$router.params;
    this.setState({
      designName,
      designerName,
      avatar,
      assetId,
      decorationType,
      designCover
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  $setSharePath = () => 'pages/designDetail/index'

  render() {
    const {
      designName,
      designerName,
      avatar,
      assetId,
      decorationType,
      designCover,
      showDesignDescription,
    } = this.state;
    return (
      <View className='design-detail'>
      <View className='design-detail-header'>
        <Image className='cover-image' src={designCover} />
        <View className='decoration-type'>{decorationType}</View>
        <View className='click-button'>
            <AtIcon prefixClass='iconfont' value='camera' size='20' color='white'></AtIcon>
          全屋漫游
        </View>
      </View>
      <View className='design-description'>
          <View className='first-row'>{designName}</View>
          <Accordion title='整体理念' renderHead={
              <View className='author-section'>
                   <View className='second-row-avatar'>
                   <Image src={avatar} className='avatar-image' />
                 </View>
                 <View className='second-row-authorname'>{designerName}</View>
                 </View>} 
          >
            <View className='accordion-body'>
               <Text>Hello world!</Text>
             </View> 
          </Accordion>
        </View>
      </View>
    );
  }
}
