import Taro, {
    Component,
  } from "@tarojs/taro";
import { AtAccordion, AtIcon } from 'taro-ui';
import { View, Text, ScrollView, Image, Icon } from "@tarojs/components";
import './style.scss';

class Accordion extends Component {
    static options = {
        addGlobalClass: true
    }
    constructor(props) {
        super(props);
        this.state = {showDesignDescription:false  }
        this.showDesignDescriptionToggle = ()=> this.setState(({showDesignDescription})=>({ showDesignDescription:!showDesignDescription  }));

    }
    render() {
        const { showDesignDescription } = this.state; 
        return (          
        <View className={`zc-accordion ${showDesignDescription? 'accordion-open':'accordion-close'}`}>
        {showDesignDescription? null: this.props.renderHead}
             <AtAccordion
               title='整体理念'
               open={showDesignDescription}
               onClick={this.showDesignDescriptionToggle}
             >
             {this.props.children}
             </AtAccordion>
         </View>);
    }
}
 
export default Accordion;