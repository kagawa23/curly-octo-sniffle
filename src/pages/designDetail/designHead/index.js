import Taro, { Component } from '@tarojs/taro';
import Accordion from '../accordion';

import { View, Text, ScrollView, Image, Icon } from '@tarojs/components';
import './style.scss';

class DesignHead extends Component {
  static defaultProps = {
    data: {},
    headStyle: {},
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  clickAuthor(e) {
    e.stopPropagation();
    console.log('click author');
  }

  render() {
    const {
      data: { designName, avatar, designerName, designDescription },
      headStyle,
    } = this.props;
    return (
      <View className="design-description" style={headStyle}>
        <Accordion
          title="整体理念"
          renderHead={
            <View>
              <View className="first-row">{designName}</View>
              <View
                className="author-section"
                onClick={this.clickAuthor.bind(this)}
              >
                <View className="second-row-avatar">
                  <Image src={avatar} className="avatar-image" />
                </View>
                <View className="second-row-authorname">{designerName}</View>
              </View>
            </View>
          }
          disabled={!designDescription}
          buttonStyle={{ lineHeight: '56rpx' }}
        >
          <View className="accordion-body">{designDescription}</View>
        </Accordion>
      </View>
    );
  }
}

export default DesignHead;
