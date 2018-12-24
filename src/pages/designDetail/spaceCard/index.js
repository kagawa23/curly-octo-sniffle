import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView, Image, Icon } from "@tarojs/components";
import "./style.scss";

class Card extends Component {
  static defaultProps = {
    space: {}
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    const {space} = this.props;
    return <View className='space-card'>{space}</View>
  }
}
export default Card;