import { Table, Tag, Space, Skeleton, Modal, DatePicker, Input, Select, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
//Functionalities 
import Notification from '../../helper/notification';
import axios from '../../helper/axios';

// Components
import ExportExcelFile from '../Export';

const { Option } = Select;
const { RangePicker } = DatePicker;

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

const styleSearch = { display: 'flex', gap: '1.2rem', alignItems: 'center', margin: '1rem 0 1.6rem 0', justifyContent: 'space-between' };

//components
import Spinner from '../Spinner';

const RazorpayTable = () => {
    const router = useRouter();
    //
    const [donationData, setDonationData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const [viewDonation, setViewDonation] = useState() //view donation stored here 
    //search 
    const [search, setSearch] = useState({ email: '', from: '', to: '', status: '' })
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState(false);

    const getUserData = async () => {
        setDataLoading(true)
        try {
            const { status, email, from, to } = search;
            const usersData = await axios.get(`/donation/rzr?email=${email}&status=${status}&from=${from}&to=${to}`);
            setDonationData(usersData?.data?.data);
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

    useEffect(() => {
        getUserData();
    }, [getData])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: text => <p>₹{text}</p>
        },
        {
            title: 'Payment Id',
            dataIndex: 'paymentid',
            key: 'paymentid',
        },
        {
            title: 'Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <p>{moment(text).format('DD/MM/YYYY hh:mm A')}</p>
        },
        {
            title: 'Status ',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag color={status === 'success' ? 'green' : 'red'} key={status} >{status.toUpperCase()}</Tag >
        },
        {
            title: 'Actions',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <p style={{ cursor: 'pointer', color: '#40A9FF' }} onClick={() => {
                        setViewDonation(record);
                        setModal(true);
                    }}>View</p>
                </Space >
            ),
        },
    ];
    return (
        <div>
            <Modal
                visible={modal}
                title="Donation Detail"
                onCancel={() => setModal(false)}
                footer={false}
            >

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Name:</h4>
                        <p style={{ margin: 0 }}>{viewDonation?.name}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Email:</h4>
                        <p style={{ margin: 0 }}>{viewDonation?.email}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Amount:</h4>
                        <p style={{ margin: 0 }}>₹{viewDonation?.amount}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Payment id:</h4>
                        <p style={{ margin: 0 }}>{viewDonation?.paymentid}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Status:</h4>
                        <p style={{ margin: 0 }}>{viewDonation?.status}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Time:</h4>
                        <p style={{ margin: 0 }}>{moment(viewDonation?.createdAt).format('DD/MM/YYYY hh:mm A')}</p>
                    </div>
                    {
                        viewDonation?.status === 'failure' && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <h4 style={{ margin: 0 }}>Reason:</h4>
                                <p style={{ margin: 0 }}>{viewDonation?.reason}</p>
                            </div>
                        )
                    }
                </div>
            </Modal>
            <div style={styleSearch}>
                <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', margin: '1rem 0 1.6rem 0' }}>

                    <Input
                        onChange={text => setSearch({ ...search, email: text.target.value })}
                        style={{ padding: '0.5rem', width: '301px' }}
                        placeholder="Search By Email"
                    />

                    <RangePicker style={{ padding: '0.5rem' }} onChange={e => {
                        if (e) {
                            let fromD = moment(e[0]);
                            let toD = moment(e[1]);
                            setSearch({ ...search, from: fromD.toISOString(), to: toD.toISOString() })
                        }
                    }} />

                    <Select defaultValue={"Status"} style={{ width: '301px' }} onChange={(v) => {
                        setSearch({ ...search, status: v })
                    }}>
                        <Option value="success" key={"success"}>Success</Option>
                        <Option value="failure" key={"failure"}>Failure</Option>
                    </Select>

                    <Button type="primary" style={{ height: '2.5rem', width: '120px' }} onClick={() => !loading && setGetData(getData + 2)}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Search</p>
                        }
                    </Button>
                    <Button shape="circle" style={{ height: '2.2rem', width: '2.2rem' }} onClick={() => router.reload()} icon={<ReloadOutlined />} />
                </div>
                <ExportExcelFile csvData={donationData} fileName="Razorpay - Donations"/>
            </div>
            {dataLoading ? <SkeletonLoader /> :
                <Table columns={columns} dataSource={donationData} pagination={{ defaultPageSize: 10 }} />
            }
        </div>
    )
}

export default RazorpayTable;