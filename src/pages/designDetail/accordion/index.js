import Taro, { Component } from "@tarojs/taro";
import { AtAccordion, AtIcon } from "taro-ui";
import {
  fontColorDeep,
  fontColorShallower,
  fontWeightBold
} from "../../../constants";
import { View, Text, ScrollView, Image, Icon } from "@tarojs/components";
import "./style.scss";

const accordionClose = {
  accoridonControl: {
    position: "absolute",
    right: 0,
    bottom: 0,
    fontColor: fontColorShallower
  },
  accordionIcon: {
    transform: "rotate(0)",
    fontColor: fontColorShallower,
    fontSize: "14px"
  }
};

const accordionOpen = {
  accoridonControl: {
    position: "relative",
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "34rpx",
    fontWeight: fontWeightBold,
    fontColor: fontColorDeep
    // lineHeight: "48rpx"
  },
  accordionIcon: {
    transform: "rotate(180)",
    fontColor: fontColorDeep,
    fontSize: "34rpx"
  }
};

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = { showDesignDescription: false };
    this.accordionToggle = () =>
      this.setState(({ isAccordionOpen }) => ({
        isAccordionOpen: !isAccordionOpen
      }));
  }
  render() {
    const { disabled } = this.props;
    const { isAccordionOpen } = this.state;
    const styles = isAccordionOpen ? accordionOpen : accordionClose;
    return (
      <View
        className={`zc-accordion ${
          isAccordionOpen ? "accordion-open" : "accordion-close"
        }`}
      >
        <View className='accordion-main'>
          {isAccordionOpen ? null : this.props.renderHead}
          {disabled ? null : (
            <View
              className='accoridon-control'
              style={styles.accoridonControl}
              onClick={this.accordionToggle}
            >
              整体理念
              <AtIcon
                prefixClass='at-icon'
                value={isAccordionOpen ? "chevron-up" : "chevron-down"}
                size={14}
                color={isAccordionOpen ? fontColorDeep : fontColorShallower}
              />
            </View>
          )}
        </View>
        {isAccordionOpen ? this.props.children : null}
      </View>
    );
  }
}

export default Accordion;
