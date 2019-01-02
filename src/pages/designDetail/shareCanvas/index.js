import Taro, { Component } from '@tarojs/taro';
import { Canvas, View } from '@tarojs/components';
import { get as getGlobalData } from '../../../globalData';

const description =
  "菲涅耳是一位建築師的兒子，出生於厄爾省布羅伊（Broglie）。他年少時在學習方面較遲鈍，直到八歲時仍然不會閱讀。十三歲時他進入法國卡昂中央理工學院（École Centrale in Caen），十六歲多進入巴黎綜合理工學院，在那裡他以優異的成績證明了自己的天分。1806年畢業之後他進入國立橋路學校，並與1809年畢業。從1812年起，他曾先後在旺代省、德龍省與伊勒-維萊訥省的政府機關擔任見習工程師協助建造連接西班牙與義大利的皇家高速公路。[2] 1815年拿破崙百日王朝期間，出於對波旁王朝的支持，他失去了工作。他開始利用這被迫獲得的閒暇時間研究光學，寫了一篇關於光行差的論文，雖然這份文件從未被發表。此後，拿破崙戰敗被流放，波旁王朝復辟。他在巴黎重新獲得一份工程師的工作，從那時候起，他大多數人生都在巴黎度過。1818年，他寫了一篇關於繞射的研究報告，因此於次年獲得法蘭西學術院的大賽獎。1819年，他被提名為「燈塔委員」，他發明了一種特別的透鏡，稱為菲涅耳透鏡，可以用來替代燈塔的鏡子。[2] 1823年，大家一致推選他成為學術院的會員，並於1825年成為了英國倫敦皇家學會的會員。1827年，他罹患了重病，倫敦皇家學會授予他一枚「拉姆福德獎章」。[2] 1827年，菲涅耳因結核病死於在巴黎附近的阿弗雷城（Ville-d'Avray），年僅39歲。[2] 在他有生之年，他對於光學所做出的貢獻並沒有得到學術界認知。一直等到他往世後多年，很多論文才開始被法蘭西學術院發表印行。但是，如同他於1824年寫給托馬斯·楊的信所述，「深藏在我內心的那種感覺或虛幻，即世俗對於榮耀的追尋與愛慕，是何等的單調乏味；所有阿拉戈、拉普拉斯、必歐加諸於我的讚賞，遠不及我因發現大自然的理論真締或做實驗確認計算的結果而博得的喜樂。」[2] 在艾菲爾鐵塔上共刻有72位法國知名人士的名字之中，可以找到菲涅耳的名字。";

const textByteLength = (text, num, maxLines) => {
  // text为传入的文本  num为单行显示的字节长度
  let strLength = 0; // text byte length
  let rows = 1;
  let str = 0;
  let arr = [];
  let j = 0;
  for (j = 0; j < text.length && rows <= maxLines + 1; j++) {
    if (text.charCodeAt(j) > 255) {
      strLength += 2;
      if (strLength > rows * num) {
        strLength++;
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    } else {
      strLength++;
      if (strLength > rows * num) {
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    }
  }
  if (rows <= maxLines + 1) {
    arr.push(text.slice(str, text.length));
  } else {
    const line = arr.pop();
    const newLine = line.concat('...');
    arr.push(newLine);
  }
  return [strLength, arr, rows]; //  [处理文字的总字节长度，每行显示内容的数组，行数]
};
export default class Index extends Component {
  componentDidMount() {
    const ctx = Taro.createCanvasContext('shareCanvas', this.$scope);
    const canvasWidth = getGlobalData('window_width');
    const canvasHeight = getGlobalData('window_width') * 0.8;

    // tags
    ctx.font = '14px Georgia';
    ctx.setFontSize(14);

    const label = ['日本', '动物保护协会', '生态环境'];
    const labelWidth = label.map(l => ({
      width: ctx.measureText(l).width,
      height: ctx.measureText(l).height,
    }));
    let fontSize = 14;
    const fontHeight = 11;
    const fontWidth = fontSize;
    const fontVerticalPadding = 5;
    const fontHorizontalPadding = 10;
    const rectHeight = fontHeight + fontVerticalPadding * 2;

    let left = 30;
    let right = 30;
    let top = 30;
    let bottom = 30;

    let leftOffset = left;

    label.forEach((l, idx) => {
      ctx.setFillStyle('green');
      ctx.fillRect(
        leftOffset,
        top,
        labelWidth[idx].width + fontHorizontalPadding * 2,
        rectHeight,
      );

      ctx.setFillStyle('black');
      ctx.fillText(
        l,
        leftOffset + fontHorizontalPadding,
        top + fontHeight + fontVerticalPadding,
      );
      leftOffset =
        leftOffset +
        labelWidth[idx].width +
        fontHorizontalPadding * 2 +
        fontHorizontalPadding;
    });

    // 简介;
    let topOffset = 100;
    fontSize = 20;
    let contentHh = fontSize + 5 + 5;

    ctx.setFontSize(20);

    const [, contentArray, ,] = textByteLength(
      description,
      (canvasWidth - right - left) / (fontSize / 2),
      Math.ceil((canvasHeight - topOffset - bottom) / contentHh),
    );
    // console.log(contentLeng, contentArray, contentRows);

    ctx.setTextAlign('left');
    ctx.setFillStyle('black');

    for (
      let m = 0;
      m < contentArray.length && topOffset < canvasHeight - bottom;
      m++
    ) {
      topOffset = 100 + contentHh * m;
      //   console.log(contentArray[m]);
      //   console.log(contentArray[m].length);
      ctx.fillText(contentArray[m], left, topOffset);
    }
    ctx.draw(false, () => {
      Taro.canvasToTempFilePath(
        {
          canvasId: 'shareCanvas',
          success: res => {
            // this.$scope.shareCover = res.tempFilePath;
            this.props.onSetShareDone(res);
          },
        },
        this.$scope,
      );
    });
  }

  render() {
    const windowWidth = getGlobalData('window_width');
    return (
      <Canvas
        canvasId="shareCanvas"
        style={{
          width: `100%`,
          height: `${windowWidth * 0.8}px`,
        }}
      />
    );
  }
}
