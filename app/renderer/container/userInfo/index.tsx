import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Modal, Space, Form, Input, message, Upload, Button } from 'antd';
import { ipcRenderer } from 'electron';
import { UploadOutlined } from '@ant-design/icons';
import { get, post } from '@common/utils/index';
import { baseUrl } from '@common/config/index';
import { UserOutlined } from '@ant-design/icons';
import ROUTER from '@common/constants/router';

import './index.less';

interface userInfoProps {
  // 暂时没有需要传入的数据
}

// TODO: 弄明白上传头像时 file 的数据类型
// interface fileProps {
//   file: {
//     uid?: string; // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
//     name?: string; // 文件名
//     status?: string; // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
//     response?: string; // 服务端响应内容
//     linkProps?: string; // 下载链接额外的 HTML 属性
//   };
// }

const UserInfo = (userInfo: userInfoProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [user, setUser] = useState<{ username: string; avatar: string; signature: string }>({
  //   username: '',
  //   avatar: '',
  //   signature: '',
  // });
  const [avatar, setAvatar] = useState('');
  const [signature, setSignature] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUserInfo();
    console.log('enter the map, the avatar & signature is', avatar, signature);
  }, []);

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const { data } = await get('api/user/get_userinfo');

      // TODO: babel-loader 应该是失效了 可选链操作符(?.)用不了 检查下babel.config.js
      setAvatar(data.avatar);
      setSignature(data.signature);
      setName(data.username);

      console.log('the userData is:', data);
    } catch (err: any) {
      console.error('something is wrong!', err.msg);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 修改用户信息
  const handleOk = async (values: any) => {
    // const { signature } = values;

    const { data } = await post('/api/user/edit_userinfo', {
      signature,
      avatar,
    });

    console.log('the value is:', values);

    console.log('edit_successed, the current user_data is:', data, 'the signature is:', signature);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const exitLogin = () => {
    localStorage.removeItem('token');
    navigate(ROUTER.login);
    ipcRenderer.send('change-window-size', { width: 480, height: 600 });
  };

  // TODO: file的类型 & 回头再做上传头像功能
  // const handleSelect = (file: any) => {
  //   console.log('file.file', file.file);
  //   if (file && file.file.size > 200 * 1024) {
  //     message.error('上传头像不得超过 200 KB！！');
  //     return;
  //   }
  //   let formData = new FormData();
  //   formData.append('file', file.file);

  //   axios({
  //     method: 'post',
  //     url: `${baseUrl}/api/upload`,
  //     data: formData,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: token,
  //     },
  //   }).then((res) => {
  //     setAvatar(res.data);
  //   });
  // };

  const items: MenuProps['items'] = [
    {
      label: (
        <Space align="center">
          <Avatar icon={<UserOutlined />} src={avatar} />
          <a>{name}</a>
        </Space>
      ),
      key: '0',
    },
    {
      label: <div>个性签名: {signature}</div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={showModal}>修改个人信息</div>,
      key: '3',
    },

    {
      label: <div onClick={exitLogin}>退出登录</div>,
      key: '4',
    },
  ];

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e.fileList;
  };

  // 上传头像-设置如何将 event 的值转换成字段值
  // const normFile = (e: any) => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        dropdownRender={(menu) => <div styleName="dropdown-content">{menu}</div>}
      >
        <div styleName="avater-box">
          <Avatar icon={<UserOutlined />} src={avatar} />
        </div>
      </Dropdown>
      <Modal title="修改用户信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item
            label="修改个性签名"
            name="signature"
            rules={[{ required: true, message: '请输入要修改的个性签名!' }]}
          >
            <Input type="signature" value={signature} onChange={(e) => setSignature(e.target.value)} />
          </Form.Item>
          {/* <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> */}
          <Form.Item
            name="logo"
            label="修改头像"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="请上传头像"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>点击进行头像上传</Button>
            </Upload>
            {/* <Upload name="logo" onChange={handleSelect} listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload> */}
            {/* <Upload name="logo" listType="picture">
              <Button icon={<UploadOutlined />}>点击以上传头像</Button>
            </Upload> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserInfo;
