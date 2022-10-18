import React from 'react';
import { Card, Modal, Button, Input, Upload } from 'antd';
import { useState } from 'react';
//Components
import Spinner from '../Spinner';
//Fucntionalities
import axios from '../../helper/axios';
import Notification from '../../helper/notification';

function Artists({ eventid, artists, refresh, setRefresh, clearState }) {
  const [isModalVisibledele, setIsModalVisibledele] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deleteData, setDeleteData] = useState({}) //delete

  const showModaldele = () => {
    setIsModalVisibledele(true);

  };

  const handleOkdele = () => {
    setIsModalVisibledele(false);
  };

  const handleCanceldele = () => {
    setIsModalVisibledele(false);
  };
  const handleDeleteArtist = async () => {
    setLoading(true);
    try {
      const delEvent = await axios.delete(`/event/artist/${eventid}`, { data: { artistid: deleteData._id } });
      if (delEvent?.data?.success) {
        clearState()//clearState
        setRefresh(refresh + 1);
        Notification('Success', "Event Deleted successfully!", 'success');
        setLoading(false);
        setIsModalVisibledele(false)
      }
    } catch (error) {
      if (error?.response?.data) {
        Notification('Error', error?.response?.data?.data, 'error');
      } else {
        Notification('Error', error?.message, 'error');
      }
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

      <Modal title="Are you sure, you want to delete this user?" visible={isModalVisibledele} onOk={handleOkdele} onCancel={handleCanceldele}
        footer={false}>
        <div>
          <div style={{ display: "flex", gap: "0.2rem", margin: "0 0 0.5rem 0" }}>
            <p style={{ fontWeight: "bold" }}>Name:</p>
            <p>{deleteData?.name}</p>
          </div>
          <div style={{ display: "flex", gap: "0.2rem" }}>

            <Button type="primary" danger style={{ height: "3rem", width: "50%" }} onClick={handleDeleteArtist}>
              {
                loading ?
                  <Spinner size={24} /> :
                  <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Delete</p>
              }
            </Button>
            <Button danger style={{ height: "3rem", width: "50%" }} onClick={handleCanceldele}>Cancel</Button>
          </div>

        </div>
      </Modal>
      {

        artists?.map((item, i) => {
          return (

            <Card hoverable bordered={false} style={{ width: "20rem", display: "flex", justifyContent: "center", alignItems: "center" }} >
              <img style={{ objectFit: "cover", width: "15rem", height: "15rem", borderRadius: "100%" }} src={item?.image} />
              <div style={{ display: 'flex', flexDirection: "column", margin: '1rem 0rem 0 0', gap: '1rem', justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ margin: 0 }}>{item?.name}</h1>
                {/* <p style={{ color: "blue" }} onClick={showModal}>Edit</p> */}
                <p style={{ color: "red", margin: 0 }} onClick={() => {
                  setDeleteData(item)
                  showModaldele()
                }}>Delete</p>

              </div>
            </Card>

          )
        })
      }
    </div>
  )
}

export default Artists;
