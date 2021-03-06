import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import { fetchDesigns } from '../../io/request';
import { get as getGlobalData } from '../../globalData';

import Card from './designCard';
import './index.scss';

const FIXED_QUANTITY = 15;

export default class Index extends Component {
  config = {
    navigationBarTitleText: '案例列表',
  };
  constructor(props) {
    super(props);
    this.state = {
      designs: [],
      offset: 0,
    };
    this.updateDesign = async (offset, designs) => {
      const {
        data: { cases },
      } = await fetchDesigns(offset, FIXED_QUANTITY);
      this.setState({
        designs: [...designs, ...cases],
        offset: offset + FIXED_QUANTITY,
      });
    };
    this.onScrollToLower = () => {
      // console.log('lower');
      const { offset, designs } = this.state;
      this.updateDesign(offset, designs);
    };
    this.onScrollToUpper = () => {
      // console.log('upper');
      this.updateDesign(0, []);
    };
  }

  componentWillMount() {
    const { offset, designs } = this.state;
    this.updateDesign(offset, designs);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { designs } = this.state;
    const windowHeight = getGlobalData('window_height');
    return (
      <ScrollView
        className="scrollview"
        scrollY
        scrollWithAnimation
        scrollTop="0"
        style={`height:${windowHeight}px`}
        lowerThreshold="60"
        upperThreshold="60"
        onScrollToUpper={this.onScrollToUpper}
        onScrollToLower={this.onScrollToLower}
      >
        {designs.map(design => {
          const { assetId } = design;
          return <Card key={assetId} design={design} />;
        })}
      </ScrollView>
    );
  }
}
