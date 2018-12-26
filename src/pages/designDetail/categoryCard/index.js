import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import './style.scss';

class Card extends Component {
  static defaultProps = {
    head: '',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { head, categoryStyle } = this.props;
    return (
      <View className="category-card" style={categoryStyle}>
        <View className="category-name">{head}</View>
        <View className="category-content">{this.props.children}</View>
      </View>
    );
  }
}
export default Card;
