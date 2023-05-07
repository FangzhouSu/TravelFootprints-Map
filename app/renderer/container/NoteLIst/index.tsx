import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from '@common/constants/router';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.less';
import Notes from '../Notes';
import UserInfo from '../userInfo';
import { su1Note, su2Note, day1Plan } from './Notes';
// TODO: 这里不能直接引入位置，而要这么写
import { notesImage } from './notesImage';

import { Button, Row, Col, Image, Input, Modal, message } from 'antd';
// import { changeTitle, deleteResume, getResumes } from '@src/api';

interface ResumeItemProps {
  title: string;
  id: number;
  userId: number;
}

function NoteList() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [previewOption, setPreivewOption] = useState('live');
  const [notesItems, setResumeItems] = useState([
    { title: '苏州-留园之行', id: 123 },
    { title: '苏州-拙政园之行', id: 456 },
    { title: '杭州-西湖之旅第一天', id: 789 },
    // { title: '杭州-灵隐寺之行', id: 000 },
  ]);
  // const [notesItems, setResumeItems] = useState<ResumeItemProps[]>([]);
  // const [isShowModal, setIsShowModal] = useState(false); // 导出游记的弹窗
  // const [oldTitle,setOldTitle] = useState(''); // 选中的游记标题的原本标题
  const [title, setTitle] = useState(''); // 选中的游记标题
  const [id, setId] = useState(0); // 选中的游记的id

  useEffect(() => {
    // const getResumesInfo = async () => {
    //   try {
    //     const { data } = await getResumes();
    //     const code = data.error_code;
    //     setResumeItems(data.data);
    //     if (code === 40100) {
    //       message.error('用户登录信息过期，请重新登录');
    //       setTimeout(() => {
    //         navigate(ROUTER.login);
    //       }, 2000);
    //     }
    //     // getToken(data.error_code);
    //     // console.log('title',data.data[0].title);
    //   } catch (error: any) {
    //     message.error(error.message);
    //   }
    // };
    // getResumesInfo();
  }, []);

  // const getResumesInfo = async () => {
  //   try {
  //     const { data } = await getResumes();
  //     const code = data.error_code;
  //     setResumeItems(data.data);
  //     if (code === 40100) {
  //       message.error('用户登录信息过期，请重新登录');
  //       setTimeout(() => {
  //         navigate(ROUTER.login);
  //       }, 2000);
  //     }
  //     // getToken(data.error_code);
  //     // console.log('title',data.data[0].title);
  //   } catch (error: any) {
  //     message.error(error.message);
  //   }
  // };

  // 显示修改游记标题
  const showModal = (id: number, title: string) => {
    setId(id);
    // setOldTitle(title);
    setTitle(title);
    setIsModalOpen(true);
  };

  // 当输入的游记标题变化时
  const handleChangeTitle = (e: any) => {
    // console.log('value',e.target.value);
    setTitle(e.target.value);
  };

  // 确认编辑游记/修改游记标题
  const handleOk = async () => {
    // try {
    //   const { data } = await changeTitle({
    //     ResumeId: id,
    //     Title: title,
    //   });
    //   // console.log('data',data);
    //   getResumesInfo();
    // } catch (error: any) {
    //   message.error(error.message);
    // }
    if (isModalOpen) {
      message.success('成功修改游记标题!');
    } else {
      message.success('成功编辑游记!');
    }

    setIsModalOpen(false);
    setIsNoteOpen(false);
    setPreivewOption('live');
  };

  // 取消编辑游记/修改游记标题
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsNoteOpen(false);
    setPreivewOption('live');
  };

  // 预览游记
  const handleView = (id: number) => {
    setIsNoteOpen(true);
    setPreivewOption('preview');
  };

  // 编辑游记
  const handleEdit = (id: number) => {
    const params = { notesId: id };
    setIsNoteOpen(true);
    setPreivewOption('live');
  };

  // 删除游记
  const handleDelete = async (id: number) => {
    // try {
    //   const { data } = await deleteResume({
    //     notesId: id,
    //   });
    //   // console.log('data', data, id);
    //   // notesItems.filter((item) => {
    //   //   return item.id !== id;
    //   // });
    //   getResumesInfo();
    // } catch (error: any) {
    //   message.error(error.message);
    // }
    message.success('成功删除游记!');
  };

  return (
    <>
      <UserInfo />
      <div styleName="my-notes">
        <Modal title="游记记录📝" open={isNoteOpen} onOk={handleOk} onCancel={handleCancel}>
          {/* TODO: 打点位置更改则销毁一个笔记进程并开启另一个笔记进程 为了展示效果 暂时直接打开笔记部分  */}
          <Notes mkdSTR={su1Note} preview={previewOption} />
        </Modal>
        {notesItems &&
          notesItems.map((item, i) => {
            return (
              <Row justify="space-between" styleName="group-notes" key={i}>
                <Col span={6}>
                  <Image width={180} height={180} src={notesImage[i]} />
                </Col>
                <Col span={14} styleName="title">
                  <span>{item.title}</span>
                  <Button styleName="title-icon" type="link" onClick={() => showModal(item.id, item.title)}>
                    <EditOutlined />
                  </Button>
                  <Modal title="修改游记标题" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Row justify="space-between">
                      <Col span={3}>标题：</Col>
                      <Col span={21}>
                        <Input placeholder="请输入您的新标题" value={title} onChange={handleChangeTitle} />
                      </Col>
                    </Row>
                  </Modal>
                </Col>
                <Col span={4}>
                  <Button type="link" block styleName="notes-button" onClick={() => handleView(item.id)}>
                    预览
                  </Button>
                  <Button type="link" block styleName="notes-button" onClick={() => handleEdit(item.id)}>
                    编辑
                  </Button>
                  {/* <Button type="link" block styleName="notes-button" onClick={() => handleDownload(item.title)}>下载</Button> */}
                  <Button type="link" block styleName="notes-button" onClick={() => handleDelete(item.id)}>
                    删除
                  </Button>
                </Col>
              </Row>
            );
          })}
      </div>
    </>
  );
}
export default NoteList;
