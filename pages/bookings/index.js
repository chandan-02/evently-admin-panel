import styles from "../../styles/Booking.module.css";
import { useRouter } from "next/router";
import { Table, Tag, Space, Skeleton, Modal, DatePicker, Input, Select, Button } from 'antd';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import moment from 'moment';

const { Option } = Select;

//components
import BreadCustom from "../../components/BreadCustom";
import ExportExcelFile from '../../components/Export';

//Functionalities 
import Notification from '../../helper/notification';
import axios from '../../helper/axios';

const SkeletonLoader = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Skeleton paragraph={{ rows: 1 }} size={"default"} active />
            <Skeleton paragraph={{ rows: 1 }} size={"default"} active />
            <Skeleton paragraph={{ rows: 1 }} size={"default"} active />
            <Skeleton paragraph={{ rows: 1 }} size={"default"} active />
        </div>
    )
}

const bgStyle = {
    margin: '2rem 1rem',
    background: '#fff',
    padding: '2rem',
    // alignItems: 'center',
    borderRadius: '5px',
    // justifyContent: 'space-between'
};
const index = () => {
    const router = useRouter();
    //
    const [event, setEvent] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState({})
    const [allEvents, setAllEvents] = useState([])
    //
    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [refresh, setRefresh] = useState(0)

    const getData = async () => {
        setDataLoading(true)
        try {
            // const { status, email, from, to } = search;
            const usersData = await axios.get(`/book/event/${event}`);
            console.log(usersData?.data?.data)
            setData(usersData?.data?.data);
            setDataLoading(false);

        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            setDataLoading(false);
        }
    }
    const getEventData = async () => {
        // setLoading(true)
        try {
            const event = await axios.get(`/event/`);
            setEvent(event?.data?.data[0]._id)
            setSelectedEvent(event?.data?.data[0])
            setAllEvents(event?.data?.data);
            // setLoading(false);

        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            // setLoading(false);
        }
    }
    useEffect(() => {
        if (refresh == 0) {
            getEventData();
        }
    }, [])

    useEffect(() => {
        if (event) {
            getData()
        }
    }, [event])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'customerid',
            key: 'customerid',
            render: text => <p>{text.name}</p>

        },
        {
            title: 'Email',
            dataIndex: 'customerid',
            key: 'customerid',
            render: text => <p>{text.email}</p>
        },
        {
            title: 'Seats',
            dataIndex: 'seats',
            key: 'seats',
            render: text => <p>{text}</p>
        },
        {
            title: 'Total',
            dataIndex: 'amountpaid',
            key: 'amountpaid',
            render: text => <p>₹{text}</p>
        },
        {
            title: 'Booking Id',
            dataIndex: 'bookingid',
            key: 'bookingid',
        },
        {
            title: 'Payment Id',
            dataIndex: 'paymentid',
            key: 'paymentid',
            // render: text => <p>{moment(text).format('DD/MM/YYYY hh:mm A')}</p>
        },
        {
            title: 'Payment method ',
            dataIndex: 'paymentmethod',
            key: 'paymentmethod',
            // render: status => <Tag color={status === 'success' ? 'green' : 'red'} key={status} >{status.toUpperCase()}</Tag >
        },
        {
            title: 'Booked On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <p>{moment(text).format('DD/MM/YYYY hh:mm A')}</p>
        },
        // {
        //     title: 'Actions',
        //     key: 'action',
        //     dataIndex: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <p style={{ cursor: 'pointer', color: '#40A9FF' }} onClick={() => {
        //                 setViewDonation(record);
        //                 setModal(true);
        //             }}>View</p>
        //         </Space >
        //     ),
        // },
    ];

    return (
        <div className={styles.container}>
            <BreadCustom titles={["All Bookings", selectedEvent?.title]} btn={false} />
            <div style={bgStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Select defaultValue={"Select Event"} style={{ width: '350px', marginBottom: '2rem' }} onChange={(v) => {
                        v = JSON.parse(v)
                        setSelectedEvent(v)
                        setEvent(v._id)
                    }}>
                        {
                            allEvents.map(itm => {
                                return <Option value={JSON.stringify(itm)} key={itm._id}>{itm?.title}</Option>
                            })
                        }
                        {/* <Option value="editor" key={"editor"}>Editor</Option> */}
                    </Select>
                    <ExportExcelFile csvData={data} fileName={selectedEvent.title} />
                </div>

                {
                    !dataLoading ?
                        <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 10 }} />
                        :
                        <SkeletonLoader />
                }
            </div>
        </div>
    )
}

export default index;