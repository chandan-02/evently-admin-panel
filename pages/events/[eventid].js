
import styles from "../../styles/EventSeats.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Skeleton, Modal, Input, Button, Tabs, Upload } from 'antd';

//components
import BreadCustom from "../../components/BreadCustom";
import InputLabel from '../../components/InputLabel';
import Spinner from '../../components/Spinner';
//functionalities
import axios from '../../helper/axios';
import Notification from '../../helper/notification';
import About from "../../components/events/About";
import Artists from "../../components/events/Artists";
import Links from "../../components/events/Links";
import Gallery from "../../components/events/Gallery";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import UploadImage from '../../helper/imageUpload';
import DeleteImage from '../../helper/imageDelete';

const imageStyle = {
    objectFit: 'cover',
    height: '160px', width: '230px',
    border: '1px solid #e8e8e8', borderRadius: '5px', display: 'flex',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
}

const index = () => {
    const router = useRouter();
    const { eventid } = router.query;
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [singleModal, setSingleModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const [editSeatData, setEditSeatData] = useState({}); // for storing single seat  
    const [editNewData, setEditNewData] = useState({ price: '', name: '' }); // for storing edited price

    const [seatData, setSeatData] = useState({ rowstart: '', rowend: '', cols: '', price: '', indexstart: '', indexend: '' });
    const [singleSeat, setSingleSeat] = useState({ seat: '', price: '', index: '' });
    //
    const [seats, setSeats] = useState([]);
    const [event, setEvent] = useState({});
    const [imageUrl, setImageUrl] = useState();
    const [tabindex, setTabindex] = useState();
    //Add artist states
    const [image, setImage] = useState({ loading: false, url: null });
    const [artist, setArtist] = useState({ image: image.url, name: '' })
    const [imgRef, setImageRef] = useState(null);


    const handleTabChange = (tab) => {

        setTabindex(tab)
    } // for tab change on events
    const { TabPane } = Tabs;


    const clearState = () => {
        setSeatData({ rowstart: '', rowend: '', cols: '', price: '' });
        setImage({ loading: false, url: null });
        setImageRef(null)
        setArtist({ image: '', name: '' });
        setSingleSeat({ seat: '', price: '' })
        setEditNewData({ price: '' })
        setEditSeatData({})
        setModal(false);
        setSingleModal(false);
        setEditModal(false);
        setIsModalVisible(false)
    }
    //Seats creation multiple & single
    const handleCreateSeat = async () => {
        if (eventid !== undefined) {
            if ((seatData.rowstart - seatData.rowend) !== (seatData.indexstart - seatData.indexend)) {
                Notification('Error', "Invalid Rows Number & Seat Indexes", 'error');
                return
            }
            setLoading(true)
            let seatArr = [];
            let seatNo = [];

            for (let i = Number(seatData.rowstart) - 1; i <= Number(seatData.rowend); i++) {
                seatNo.push(i)
            }
            let x = 1;
            for (let i = Number(seatData.indexstart); i <= Number(seatData.indexend); i++) {
                seatArr.push({
                    seat: `${seatData.cols}${seatNo[x]}`,
                    index: i
                })
                x = x + 1;
            }
            console.log(seatArr)
            // if (seats.find(seat => seat.seat))
            try {
                const seatsAdd = await axios.post(`/seats/multiple`, { seats: seatArr, eventid, price: seatData.price });
                if (seatsAdd?.data?.success) {
                    Notification('Success', "Event Updated successfully", 'success');
                }
            } catch (error) {
                if (error?.response?.data) {
                    Notification('Error', error?.response?.data?.data, 'error');
                } else {
                    Notification('Error', error?.message, 'error');
                }
            }

            setRefresh(refresh + 1);
            // Notification('Success', "Event Updated successfully", 'success');
            clearState();
            setLoading(false);
        }
    }
    const handleCreateSingle = async () => {
        setLoading(true)
        try {
            const getSeats = await axios.post(`/seats`, { ...singleSeat, eventid });
            // console.log(getSeats?.data?.data); //18 object arr <- sort
            clearState()
            Notification('Success', "Seat Added successfully", 'success');
            setRefresh(refresh + 1);
            setLoading(false)
        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            setLoading(false)
        }
    }
    const handleEditSeat = async () => {
        setLoading(true)
        try {
            const getSeats = await axios.put(`/seats/update/${editSeatData._id}`, editNewData);
            // console.log(getSeats?.data?.data); //18 object arr <- sort
            if (getSeats?.data?.success) {
                clearState()
                setRefresh(refresh + 1);
                Notification('Success', "Seat Updated successfully", 'success');
            }
            setLoading(false)
        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            setLoading(false)
        }
    }
    //
    const getSeatsData = async () => {
        // setDataLoading(true)
        try {
            const getSeats = await axios.get(`/seats/${eventid}`);
            // console.log(getSeats?.data?.data); //18 object arr <- sort
            setSeats(getSeats?.data?.data);
            // setSeats(getSeats.data?.data?.sort((a, b) => {
            //     if (b.seat <= a.seat) {
            //         return 1;
            //     } else {
            //         return -1;
            //     }
            // }))

        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            // setDataLoading(false);
        }
    }
    const getEventData = async () => {
        try {
            const getEvent = await axios.get(`/event/${eventid}`);
            setEvent(getEvent?.data?.data);
        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
        }
    }
    useEffect(() => {
        if (eventid !== undefined) {
            getSeatsData();
            getEventData();
        }
    }, [refresh, router.isReady])


    const renderBlocks = () => {

        let row = router.query.row //1
        let col = router.query.col //1 2... 

        let index = 1;

        let arrView = [];
        let mainArr = []
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= col; j++) {
                let seat = seats?.find(itm => itm.index == index);
                arrView.push(
                    <div style={{ justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
                        {
                            seat ?
                                <p onClick={() => {
                                    setEditNewData({ price: seat.price, seat: seat.seat })
                                    setEditModal(true);
                                    setEditSeatData(seat)
                                }} style={{
                                    background: '#fff', height: '2.2rem', width: '2.2rem', borderRadius: '5px', border: '2px solid #3387CC', margin: 0,
                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                }}>{seat.seat}</p>
                                :
                                <div style={{ background: '#CCCCCC', height: '2.2rem', width: '2.2rem', borderRadius: '5px' }} dataindex={index} onClick={(e) => {
                                    setSingleSeat({ ...singleSeat, index: e.target.getAttribute('dataindex') })
                                    // console.log()
                                    setSingleModal(true)
                                }}>
                                </div>
                        }

                        <p style={{ margin: 0, textAlign: 'center', color: '#CCCCCC' }}>{index}</p>
                    </div>
                );
                index += 1;
            }
            mainArr.push(arrView);
            arrView = [];
        }
        // console.log(mainArr)
        return mainArr
    }


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = async () => {
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

    const uploadButton = (
        <div style={imageStyle}>
            {image.loading ? <Spinner color="#40A9FF" /> : <PlusOutlined />}
            <div style={{ marginTop: 2 }}>Artist Picture</div>
        </div>
    );

    const handleImageUpload = async ({ file, onSuccess }) => {
        setImage({ ...image, loading: true });
        try {
            let refName = `events/${Date.now()}_events`;
            const res = await UploadImage(file, refName);
            setImageRef(refName);
            setImage({ url: res, loading: false });
            // setNewEvent({ ...newEvent, image: res });
            onSuccess("ok");
        } catch (error) {
            setImage({ ...image, loading: false });
            console.log(error);
        }

    }
    const handleAddArtist = async () => {
        setLoading(true);
        try {
            const getArtist = await axios.put(`/event/artist/${event._id}`, { name: artist.name, image: image.url });
            if (getArtist?.data?.success) {
                setRefresh(refresh + 1);
                Notification('Success', "Event Updated successfully!", 'success');
                setLoading(false);
                clearState()
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
        <div className={styles.container}>
            {
                tabindex == 3 ? <BreadCustom titles={["Events", "All Seats"]} btn={true} btnTxt={"Add Artist"} handler={() => showModal(true)} /> : <BreadCustom titles={["Events", "All Seats"]} btn={true} btnTxt={"Create New Seat"} handler={() => setModal(true)} />
            }

            {/* Multiple seat adding modal*/}
            <Modal
                visible={modal}
                title="Add Seats "
                onCancel={() => setModal(false)}
                footer={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Rows x Cols x Price Multiple*/}
                    <h3 style={{ margin: 0 }}>Create Multiple Seat</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div>
                            <InputLabel req={true} text={"Alphabhet"} />
                            <Input
                                value={seatData.cols}
                                onChange={text => setSeatData({ ...seatData, cols: text.target.value })}
                                style={{ padding: '0.5rem' }}
                                placeholder="F"
                            />
                        </div>
                        <div>
                            <InputLabel req={true} text={"Price / Seat"} />
                            <Input
                                value={seatData.price}
                                onChange={text => setSeatData({ ...seatData, price: text.target.value })}
                                style={{ padding: '0.5rem' }}
                                placeholder="₹0"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div>
                            <InputLabel req={true} text={"Row Number (Start - End) "} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Input
                                    value={seatData.rowstart}
                                    onChange={text => setSeatData({ ...seatData, rowstart: text.target.value })}
                                    style={{ padding: '0.5rem' }}
                                    placeholder="1"
                                />

                                <Input
                                    value={seatData.rowend}
                                    onChange={text => setSeatData({ ...seatData, rowend: text.target.value })}
                                    style={{ padding: '0.5rem' }}
                                    placeholder="4"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div>
                            <InputLabel req={true} text={"Index (Start - End)"} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Input
                                    value={seatData.indexstart}
                                    onChange={text => setSeatData({ ...seatData, indexstart: text.target.value })}
                                    style={{ padding: '0.5rem' }}
                                    placeholder="1"
                                />

                                <Input
                                    value={seatData.indexend}
                                    onChange={text => setSeatData({ ...seatData, indexend: text.target.value })}
                                    style={{ padding: '0.5rem' }}
                                    placeholder="4"
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleCreateSeat()}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Save Changes</p>
                        }
                    </Button>
                </div>
            </Modal >

            {/* Single seat adding modal*/}
            <Modal
                visible={singleModal}
                title="Add Single Seat"
                onCancel={() => setSingleModal(false)}
                footer={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div>
                            <InputLabel req={true} text={"Seat"} />
                            <Input
                                value={singleSeat.seat}
                                onChange={text => setSingleSeat({ ...singleSeat, seat: text.target.value })}
                                style={{ padding: '0.5rem' }}
                                placeholder="Example : A2"
                            />
                        </div>
                        <div>
                            <InputLabel req={true} text={"Price of Single Seat"} />
                            <Input
                                value={singleSeat.price}
                                onChange={text => setSingleSeat({ ...singleSeat, price: text.target.value })}
                                style={{ padding: '0.5rem' }}
                                placeholder="₹0"
                            />
                        </div>
                        <div>
                            <InputLabel req={true} text={"Index"} />
                            <Input
                                value={singleSeat.index}
                                onChange={text => setSingleSeat({ ...singleSeat, index: text.target.value })}
                                style={{ padding: '0.5rem' }}
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleCreateSingle()}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Save Changes</p>
                        }
                    </Button>
                </div>
            </Modal >

            {/* Edit  modal*/}
            <Modal
                visible={editModal}
                title="Edit Seat"
                onCancel={() => setEditModal(false)}
                footer={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* */}

                    <div>
                        <InputLabel req={true} text={"Price (in ₹) "} />
                        <Input
                            value={editNewData.price}
                            onChange={text => setEditNewData({ ...editNewData, price: text.target.value })}
                            style={{ padding: '0.5rem', width: '100%' }}
                            placeholder="₹0"
                        />
                    </div>

                    <div>
                        <InputLabel req={true} text={"Seat Name"} />
                        <Input
                            value={editNewData.seat}
                            onChange={text => setEditNewData({ ...editNewData, seat: text.target.value })}
                            style={{ padding: '0.5rem', width: '100%' }}
                            placeholder="₹0"
                        />
                    </div>

                    <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleEditSeat()}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Save Changes</p>
                        }
                    </Button>
                </div>
            </Modal >

            {/* modal of artist create */}
            <Modal title="Edit Artist" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={false}>
                <div>
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
                    <h4 style={{ margin: "0px 0px 2px" }}><span style={{ color: "rgb(24, 144, 255)" }}>* </span>Full Name</h4>
                    <Input placeholder="Artist name" style={{ padding: "0.5rem", margin: "0 0 0.5rem 0" }}
                        value={artist.name}
                        onChange={text => {
                            setArtist({ ...artist, name: text.target.value });
                        }} />
                    <Button type="primary" block style={{ height: "3rem" }} onClick={handleAddArtist}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Add</p>
                        }
                    </Button>
                </div>
            </Modal>

            <Tabs defaultActiveKey="1" onChange={handleTabChange} style={{ margin: "1rem 1rem" }}>
                <TabPane tab="Seating Arrangement" key="1">
                    <div style={{
                        height: '20rem', width: 'auto', background: 'gray', borderRadius: '5px', margin: "1rem 0 0",
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <h1 style={{ margin: 0, color: '#fff', fontSize: '2rem' }}>Main Stage</h1>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                        {
                            renderBlocks().map((each, i) => {
                                return <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                                    {each}
                                </div>
                            })
                        }
                    </div>
                </TabPane>
                <TabPane tab="About Event" key="2">
                    <About eventData={event} refresh={refresh} setRefresh={setRefresh} />
                </TabPane>
                {/* <TabPane tab="Artists" key="3">
                    <Artists eventid={event._id} artists={event.artists} refresh={refresh} setRefresh={setRefresh} clearState={clearState} />
                </TabPane>
                <TabPane tab="Links" key="4">
                    <Links />
                </TabPane> */}
                {/* <TabPane tab="Gallery" key="5">
                    <Gallery />
                </TabPane> */}
            </Tabs>

        </div >
    )
}

export default index;
