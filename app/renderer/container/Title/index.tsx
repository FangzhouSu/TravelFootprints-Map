import React from 'react';
import './index.less';
import Avatar from '../../../../assets/icon/add.png';

interface IProps {
  /**
   * @description 标题
   */
  text: string;
  /**
   * @description 样式
   */
  styles?: React.CSSProperties;
}

function Title({ text, styles }: IProps) {
  return (
    <div style={styles} styleName="title">
      {text}
      <Avatar />
    </div>
  );
}

export default Title;
