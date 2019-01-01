import Taro, { Component } from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import { get as getGlobalData } from '../../globalData';
import withShare from '../../components/withShare';
import { backgroundColor as bgColor } from '../../constants';
import { downloadFile } from '../../io/request';
// import './style.scss';

const styles = {};

const cardInfo = {
  avatar:
    'https://rs.homestyler.com/floorplan/render/images/2018-12-26/71392623-3477-4718-a454-fb10d4238269/uFS1PPvh7d2PM5R4UnjTxK.jpg',
  qrCode:
    'https://rs.homestyler.com/floorplan/render/images/2018-12-26/71392623-3477-4718-a454-fb10d4238269/uFS1PPvh7d2PM5R4UnjTxK.jpg', //需要https图片路径
  TagText: '小姐姐', //标签
  Name: '小姐姐', //姓名
  Position: '程序员鼓励师', //职位
  Mobile: '13888888888', //手机
  Company: '才华无限有限公司', //公司
};

// downloadAvatar() {
//   const { avatar } = cardInfo;
//   const res = await downloadFile({url:avatar});
//   console.log(res);
// }

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
    this.state = {};
  }

  componentWillMount() {}

  async componentDidMount() {
    const { avatar, qrCode } = cardInfo;
    const { tempFilePath: avaterSrc } = await downloadFile({
      url: avatar,
    });
    console.log(avaterSrc);
    // const { tempFilePath: codeSrc } = await downloadFile({ url: qrCode });
    // console.log(codeSrc);

    const ctx = Taro.createCanvasContext('myCanvas');
    let width = 0;
    // this.canvasContainer
    //   .boundingClientRect(rect => {
    var height = getGlobalData('window_height');
    // console.log(rect.width);

    width = getGlobalData('window_width') * 0.8;
    var left = 0 + 5;
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 0, width, height);

    //头像为正方形
    if (avaterSrc) {
      ctx.drawImage(avaterSrc, left, 20, width, width);
      ctx.setFontSize(14);
      ctx.setFillStyle('#fff');
      ctx.setTextAlign('left');
    }
    // if (avatar) {
    //   ctx.drawImage(avatar, left, 20, width, width);
    //   ctx.setFontSize(14);
    //   ctx.setFillStyle('#fff');
    //   ctx.setTextAlign('left');
    // }

    //标签
    if (cardInfo.TagText) {
      ctx.fillText(cardInfo.TagText, left + 20, width - 4);
      const metrics = ctx.measureText(cardInfo.TagText); //测量文本信息
      ctx.stroke();
      ctx.rect(left + 10, width - 20, metrics.width + 20, 25);
      ctx.setFillStyle('rgba(255,255,255,0.4)');
      ctx.fill();
    }

    //姓名
    if (cardInfo.Name) {
      ctx.setFontSize(14);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText(cardInfo.Name, left, width + 60);
    }

    //职位
    if (cardInfo.Position) {
      ctx.setFontSize(12);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('left');
      ctx.fillText(cardInfo.Position, left, width + 85);
    }

    //电话
    if (cardInfo.Mobile) {
      ctx.setFontSize(12);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('left');
      ctx.fillText(cardInfo.Mobile, left, width + 105);
    }

    // 公司名称
    // if (cardInfo.Company) {
    //   const CONTENT_ROW_LENGTH = 24; // 正文 单行显示字符长度
    //   let [contentLeng, contentArray, contentRows] = that.textByteLength(
    //     cardInfo.Company,
    //     CONTENT_ROW_LENGTH,
    //   );
    //   ctx.setTextAlign('left');
    //   ctx.setFillStyle('#000');
    //   ctx.setFontSize(10);
    //   let contentHh = 22 * 1;
    //   for (let m = 0; m < contentArray.length; m++) {
    //     ctx.fillText(contentArray[m], left, width + 150 + contentHh * m);
    //   }
    // }

    //  绘制二维码
    // if (codeSrc) {
    //   ctx.drawImage(codeSrc, left + 160, width + 40, width / 3, width / 3);
    //   ctx.setFontSize(10);
    //   ctx.setFillStyle('#000');
    //   ctx.fillText('微信扫码或长按识别', left + 160, width + 150);
    // }

    // })
    // .exec();

    // setTimeout(function() {
    ctx.draw();
    // wx.hideLoading();
    // }, 500);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  refCanvas(dom) {
    this.canvasContainer = dom;
  }

  render() {
    return (
      <View
        ref={this.refCanvas}
        className="canvas-container"
        id="canvasContainer"
      >
        <Canvas
          canvasId="myCanvas"
          style={{ width: '100%', height: '900rpx' }}
        />
      </View>
    );
  }
}
