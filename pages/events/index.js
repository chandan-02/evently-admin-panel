import styles from "../../styles/Event.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Skeleton, Card, Modal, Upload, Input, Select, Button, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import moment from 'moment';
//components
import BreadCustom from "../../components/BreadCustom";
import InputLabel from '../../components/InputLabel';
import Spinner from '../../components/Spinner';
//functionalities
import axios from '../../helper/axios';
import Notification from '../../helper/notification';
import UploadImage from '../../helper/imageUpload';
import DeleteImage from '../../helper/imageDelete';

const { Meta } = Card;
const { Option } = Select;

const bgStyle = {
    background: '#fff',
    padding: '1rem',
    // alignItems: 'center',
    borderRadius: '5px',
    // justifyContent: 'space-between'
};
const imageStyle = {
    objectFit: 'cover',
    height: '160px', width: '230px',
    border: '1px solid #e8e8e8', borderRadius: '5px', display: 'flex',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
}
const SkeletonLoader = () => {
    return (
        <div style={{ display: 'flex', gap: '2rem ', margin: '2rem 1rem', flexWrap: 'wrap' }}>
            {[0, 1, 2, 3, 4].map(itm => <div key={itm} style={{ ...bgStyle, width: '320px' }}>
                <Skeleton.Image />
                <Skeleton />
            </div>
            )}
        </div>
    )
}
const index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [eventData, setEventData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [modal, setModal] = useState(false);

    //Create event
    const [newEvent, setNewEvent] = useState({ image: '', title: '', description: '', date: '', venue: '', status: '', row: 0, col: 0 })
    const [image, setImage] = useState({ loading: false, url: null });
    const [imgRef, setImageRef] = useState(null);
    //Edit event
    const [editEvent, setEditEvent] = useState({ status: '' })
    const [editModal, setEditModal] = useState(false);
    const [eventid, setEventId] = useState('');

    const getEventData = async () => {
        setLoading(true)
        try {
            const event = await axios.get(`/event/`);
            setEventData(event?.data?.data);
            setLoading(false);
        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            setLoading(false);
        }
    }

    const handleCreateEvent = async () => {
        setLoading(true)
        try {
            const eventAdd = await axios.post('/event/', newEvent);
            if (eventAdd?.data?.success) {
                Notification('Success', "New Event added successfully", 'success');
                clearState();
                setModal(false);
                setLoading(false);
                setRefresh(refresh + 1);
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

    const handleEditEvent = async () => {
        setLoading(true)
        try {
            const eventAdd = await axios.put(`/event/${eventid}`, editEvent);
            if (eventAdd?.data?.success) {
                Notification('Success', "Event Updated successfully", 'success');
                clearState();
                setEditModal(false);
                setLoading(false);
                setRefresh(refresh + 1);
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

    useEffect(() => {
        getEventData();
    }, [refresh])

    const uploadButton = (
        <div style={imageStyle}>
            {image.loading ? <Spinner color="#40A9FF" /> : <PlusOutlined />}
            <div style={{ marginTop: 2 }}>Event Picture</div>
        </div>
    );

    const clearState = () => {
        setImageRef(null);
        setImage({ loading: false, url: null });
        setNewEvent({ image: '', title: '', description: '', date: '', venue: '', status: '' });
        setEditEvent({ status: '' })
        setEventId('')
        setModal(false);
        setEditModal(false);
    }

    const cancelModal = async () => {
        if (imgRef) {
            const res = await DeleteImage(imgRef);
            if (res === 'success') {
                Notification('Success', 'Recently uploaded image deleted! ', res)
            }
            if (res === 'error') {
                Notification('Error', 'Failed to delete image, plesase delete manually ', res)
            }
        }
        clearState();
    };

    const handleImageUpload = async ({ file, onSuccess }) => {
        setImage({ ...image, loading: true });
        try {
            let refName = `events/${Date.now()}_events`;
            const res = await UploadImage(file, refName);
            setImageRef(refName);
            setImage({ url: res, loading: false });
            setNewEvent({ ...newEvent, image: res });

            onSuccess("ok");
        } catch (error) {
            setImage({ ...image, loading: false });
            console.log(error);
        }

    }
    const ModalBody = <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Upload
                accept="image/*"
                name="profile"
                showUploadList={false}
                customRequest={handleImageUpload}
            >
                {image.url ? <img style={imageStyle} src={image.url} alt="profile" /> : uploadButton}
            </Upload>
        </div>
        {/* Regular Inputs */}
        <div>
            <InputLabel req={true} text={"Event Title"} />
            <Input
                value={newEvent.title}
                onChange={text => {
                    setNewEvent({ ...newEvent, title: text.target.value })
                }}
                style={{ padding: '0.5rem' }}
                placeholder="Indian Classical Event"
            />
        </div>
        <div>
            <InputLabel req={true} text={"Event Description"} />
            <Input
                value={newEvent.description}
                onChange={text => setNewEvent({ ...newEvent, description: text.target.value })}
                style={{ padding: '0.5rem' }}
                placeholder="Describe event in 130 characters"
            />
        </div>
        <div>
            <InputLabel req={true} text={"Venue"} />
            <Input
                value={newEvent.venue}
                onChange={text => setNewEvent({ ...newEvent, venue: text.target.value })}
                style={{ padding: '0.5rem' }}
                placeholder="Address"
            />
        </div>


        {/* Date Picket and status */}
        <div>
            <InputLabel req={true} text={"Event Time"} />
            <DatePicker style={{ padding: '0.5rem', width: '100%' }} showTime onChange={time => {
                setNewEvent({ ...newEvent, date: moment(time).toISOString() })
            }} />
        </div>
        <div style={{ display: 'flex', gap: '2rem' ,alignItems:'center'}}>
            <div>
                <InputLabel req={true} text={"Seat Rows"} />
                <Input
                    value={newEvent.row}
                    onChange={text => setNewEvent({ ...newEvent, row: text.target.value })}
                    style={{ padding: '0.5rem', }}
                    placeholder="0"
                />
            </div>
            <div>
                <InputLabel req={true} text={"Seat Columns"} />
                <Input
                    value={newEvent.col}
                    onChange={text => setNewEvent({ ...newEvent, col: text.target.value })}
                    style={{ padding: '0.5rem',width:'100%' }}
                    placeholder="0"
                />
            </div>
        </div>
        <div>
            <InputLabel req={true} text={"Event Status"} />
            <Select defaultValue="Status" style={{ width: '100%', }} onChange={(v) => {
                setNewEvent({ ...newEvent, status: v })
            }}>
                <Option value="ongoing" key={"ongoing"}>On Going</Option>
                <Option value="comingsoon" key={"comingsoon"}>Coming Soon</Option>
                <Option value="disabled" key={"disabled"}>Disabled</Option>
            </Select>
        </div>
        <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleCreateEvent()}>
            {
                loading ?
                    <Spinner size={24} /> :
                    <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Add</p>
            }
        </Button>
    </div >

    return (
        <div className={styles.container}>
            <BreadCustom titles={["Events"]} btn={true} btnTxt={"Create New Event"} handler={() => setModal(true)} />
            {/* Add Event Modal */}
            <Modal
                visible={modal}
                title="Create New Event"
                onCancel={cancelModal}
                footer={false}
            >

                {ModalBody}
            </Modal>
            {/* Edit Modal */}
            <Modal
                visible={editModal}
                title="Update Event"
                onCancel={cancelModal}
                footer={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <InputLabel req={true} text={"Event Status"} />
                        <Select defaultValue="Status" style={{ width: '100%', }} onChange={(v) => {
                            setEditEvent({ ...editEvent, status: v })
                        }}>
                            <Option value="ongoing" key={"ongoing"}>On Going</Option>
                            <Option value="comingsoon" key={"comingsoon"}>Coming Soon</Option>
                            <Option value="disabled" key={"disabled"}>Disabled</Option>
                        </Select>
                    </div>
                    <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleEditEvent()}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Save Changes</p>
                        }
                    </Button>
                </div>
            </Modal>
            {/* Main body below */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', margin: '2rem 1rem' }}>
                {
                    !loading ?
                        eventData.map(itm => {
                            return <Card
                                hoverable
                                key={itm?._id}
                                style={{ width: 330 }}
                                cover={
                                    <img
                                        style={{ height: '240px', objectFit: "cover"}}
                                        alt="event_image"
                                        src={itm?.image}
                                    />
                                }
                            >
                                <Meta
                                    title={`${itm?.title} - 
                                    ${itm?.status === 'ongoing' ? 'On Going' : ''} 
                                    ${itm?.status === 'disabled' ? 'Disabled / Completed' : ''} 
                                    ${itm?.status === 'comingsoon' ? 'Coming Soon' : ''}`}
                                    description={<>
                                        <p style={{ margin: 0 }}>Venue : {itm?.venue}</p>
                                        <p style={{ margin: 0 }}>Time : {moment(itm?.date).format('DD-MM-YYYY')} at {moment(itm?.date).format('hh:mm A')}</p>
                                    </>
                                    }
                                />
                                <div style={{ display: 'flex', margin: '1rem 0rem 0 0', gap: '1rem' }}>
                                    <p className={styles.visitlink} onClick={() => router.push(`/events/${itm._id}?row=${itm.row}&col=${itm.col}`)}>View</p>
                                    <p className={styles.delete} onClick={() => {
                                        setEventId(itm?._id);
                                        setEditModal(true)
                                    }}>Update Status</p>
                                </div>
                            </Card>
                        })
                        : <SkeletonLoader />
                }
            </div>
        </div >
    )
}

export default index;