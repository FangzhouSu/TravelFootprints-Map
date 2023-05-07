import React, { useState } from 'react';
import { Modal, Tooltip, Progress } from 'antd';
import UserInfo from '../userInfo';
import './index.less';

const FootPrint = () => {
  const [isSetting, setIsSetting] = useState(false);
  const handleSelect = () => {
    setIsSetting(true);
  };

  return (
    <div>
      <UserInfo />
      <Modal open={isSetting}>
        <div styleName="setting">
          <h2>地区</h2>
          <a data-level="4">久居</a>
          <a data-level="3">深度游</a>
          <a data-level="2">浅游</a>
          <a data-level="1">去过</a>
          <a data-level="0">没去过</a>
        </div>
      </Modal>
      <div styleName="china">
        <svg styleName="svgBox" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1548 1210">
          <g styleName="area">
            <polygon id="黑龙江" points="1306,150 1306,308 1100,308 1100,150" />
            <polygon id="吉林" points="1100,308 1100,393 1306,393 1306,308" />
            <polygon id="辽宁" points="1067,393 1067,512 1221,512 1221,393" />
            <path id="河北" d="M1067,427H932v180h117c0-59,0-59,0-59s0,0-80,0v-95h80v59h18V427z" />
            <rect id="北京" x="969" y="453" width="80" height="52" />
            <polygon id="天津" points="969,505 1049,505 1049,548 969,548" />
            <polygon
              id="内蒙古"
              points="1100,150 944,150 944,308 705,308 705,535 932,535 932,427 1067,427 1067,393 1100,393"
            />
            <polygon id="山西" points="860,535 860,643 932,643 932,535" />
            <polygon id="山东" points="1049,607 985,607 985,655 1124,655 1124,563 1049,563" />
            <polygon id="江苏" level="1" points="1105,655 1105,719 1088,719 1088,742 1043,742 1043,655" />
            <polygon id="浙江" level="3" points="1058,742 1088,742 1088,766 1132,766 1132,850 1058,850" />
            <polygon id="福建" points="1029,850 1029,957 1102,957 1102,850" />
            <rect id="上海" x="1088" y="719" width="72" height="47" />
            <polygon id="安徽" points="1058,742 1043,742 1043,655 985,655 985,793 1058,793" />
            <polygon id="江西" points="1029,850 1058,850 1058,793 955,793 955,923 1029,923" />
            <polygon
              id="广东"
              points="1029,923 955,923 955,905 885,905 885,986 907,986 907,973 952,973 952,986 964,986 964,973 1006,973 1006,986 1029,986"
            />
            <polygon id="陕西" points="791,770 860,770 860,535 791,535" />
            <polygon id="河南" points="985,607 932,607 932,643 860,643 860,724 985,724" />
            <polygon id="湖南" points="860,805 955,805 955,905 860,905" />
            <polygon id="湖北" points="955,793 985,793 985,724 860,724 860,805 955,805" />
            <polygon id="广西" points="885,905 743,905 743,986 885,986" />
            <rect id="香港" x="964" y="973" width="42" height="33" />
            <rect id="澳门" x="907" y="973" width="45" height="33" />
            <polygon id="贵州" points="860,826 771,826 771,854 743,854 743,905 860,905" />
            <rect id="重庆" x="771" y="770" width="89" height="56" />
            <polygon id="四川" points="771,854 771,770 791,770 791,679 595,679 595,854" />
            <polygon id="云南" points="743,854 595,854 595,969 743,969" />
            <polygon id="宁夏" points="791,535 705,535 705,631 791,631" />
            <polygon id="甘肃" points="705,631 791,631 791,679 648,679 648,512 557,512 557,308 705,308" />
            <polygon id="青海" points="595,679 648,679 648,512 434,512 434,743 595,743" />
            <polygon id="西藏" points="595,887 241,887 241,583 434,583 434,743 595,743" />
            <polygon id="新疆" points="241,583 241,204 557,204 557,512 434,512 434,583" />
            <rect id="台湾" x="1124" y="905" width="45" height="87" />
            <rect id="海南" x="821" y="1014" width="78" height="46" />
          </g>
          <g styleName="gName">
            <text x="867" y="383">
              内蒙古
            </text>
            <text x="1159" y="240">
              黑龙江
            </text>
            <text x="1174" y="359">
              吉林
            </text>
            <text x="1114" y="464">
              辽宁
            </text>
            <text x="979" y="488">
              北京
            </text>
            <text x="979" y="536">
              天津
            </text>
            <text x="959" y="586">
              河北
            </text>
            <text x="1069" y="605">
              山
            </text>
            <text x="1069" y="635">
              东
            </text>
            <text x="893" y="696">
              河南
            </text>
            <text x="892" y="775">
              湖北
            </text>
            <text x="892" y="852">
              湖
            </text>
            <text x="892" y="882">
              南
            </text>
            <text x="1054" y="692">
              江
            </text>
            <text x="1054" y="722">
              苏
            </text>
            <text x="1093" y="752">
              上海
            </text>
            <text x="1080" y="802">
              浙
            </text>
            <text x="1080" y="832">
              江
            </text>
            <text x="1049" y="901">
              福
            </text>
            <text x="1049" y="931">
              建
            </text>
            <text x="1131" y="943">
              台
            </text>
            <text x="1131" y="973">
              湾
            </text>
            <text x="830" y="1047">
              海南
            </text>
            <text x="927" y="959">
              广东
            </text>
            <text x="980" y="853">
              江
            </text>
            <text x="980" y="883">
              西
            </text>
            <text x="1001" y="720">
              安
            </text>
            <text x="1001" y="750">
              徽
            </text>
            <text x="881" y="583">
              山
            </text>
            <text x="881" y="613">
              西
            </text>
            <text x="810" y="653">
              陕
            </text>
            <text x="810" y="683">
              西
            </text>
            <text x="733" y="577">
              宁
            </text>
            <text x="733" y="607">
              夏
            </text>
            <text x="617" y="421">
              甘
            </text>
            <text x="617" y="451">
              肃
            </text>
            <text x="509" y="637">
              青海
            </text>
            <text x="661" y="777">
              四川
            </text>
            <text x="640" y="922">
              云南
            </text>
            <text x="783" y="956">
              广西
            </text>
            <text x="774" y="876">
              贵州
            </text>
            <text x="785" y="808">
              重庆
            </text>
            <text x="312" y="756">
              西藏
            </text>
            <text x="371" y="405">
              新疆
            </text>
          </g>
          {/* <text id="分数" x="35" y="883">
            分数
          </text> */}
        </svg>
      </div>
      <div styleName="level">
        足迹分👇
        <Tooltip title="记录30次以上的足迹">
          <div styleName="level4">久居4</div>
        </Tooltip>
        <Tooltip title="记录16-30次的足迹">
          <div styleName="level3">深度游３</div>
        </Tooltip>
        <Tooltip title="记录6-15次的足迹">
          <div styleName="level2">浅游２</div>
        </Tooltip>
        <Tooltip title="记录5次以下的足迹">
          <div styleName="level1">去过１</div>
        </Tooltip>
        <div styleName="level0">没去过</div>
      </div>
      <Tooltip title="足迹分相加/中国总足迹分">
        <div styleName="score">
          <div>{'足迹👣进度条👇'}</div>
          <Progress
            type="circle"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={2.9}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default FootPrint;
