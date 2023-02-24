import React from 'react';
import { get } from '@common/utils/index';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less';

interface userInfoProps {
  avatar?: string;
  name?: string;
  id?: string;
  onClickUser?: () => void;
}

const UserInfo = (userInfo: userInfoProps) => {
  const { avatar, onClickUser } = userInfo;

  return (
    <div onClick={onClickUser}>
      <div styleName="avater-box">
        {/* <Avatar icon={<UserOutlined />} src={avater} /> */}
        <Avatar icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default UserInfo;
