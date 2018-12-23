import Taro, { Component } from "@tarojs/taro";
import Accordion from "../accordion";

import { View, Text, ScrollView, Image, Icon } from "@tarojs/components";
import "./style.scss";

class DesignHead extends Component {
  static defaultProps = {
    data: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      hideDesignName: false
    };
    this.onClick = () =>
      this.setState(({ hideDesignName }) => ({
        hideDesignName: !hideDesignName
      }));
    // this.clickAuthor = e => {
    //   e.stopPropagation();
    //   console.log("add");
    // };
  }
  clickAuthor(e) {
    e.stopPropagation();
    console.log("add");
  }

  render() {
    const hideDesignName = this.state;
    const {
      data: { designName, avatar, designerName, designDescription }
    } = this.props;
    return (
      <View className='design-description'>
        <Accordion
          title='整体理念'
          renderHead={
            <View>
              <View className='first-row'>{designName}</View>
              <View
                className='author-section'
                onClick={this.clickAuthor.bind(this)}
              >
                <View className='second-row-avatar'>
                  <Image src={avatar} className='avatar-image' />
                </View>
                <View className='second-row-authorname'>{designerName}</View>
              </View>
            </View>
          }
          disabled={!designDescription}
        >
          <View className='accordion-body'>{designDescription}</View>
        </Accordion>
      </View>
    );
  }
}

export default DesignHead;
