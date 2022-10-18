import styles from "../../styles/User-Management.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Select, DatePicker, Table, Tag, Space, Skeleton, Upload, Divider } from 'antd';
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

const SkeletonLoader = () => {
    return (
        <div>
            <Skeleton avatar paragraph={{ rows: 1 }} active />
            <Skeleton avatar paragraph={{ rows: 1 }} active />
            <Skeleton avatar paragraph={{ rows: 1 }} active />
            <Skeleton avatar paragraph={{ rows: 1 }} active />
        </div>
    )
}

const { Option } = Select;
const { RangePicker } = DatePicker;
const bgStyle = {
    margin: '2rem 1rem',
    background: '#fff',
    padding: '2rem',
    // alignItems: 'center',
    borderRadius: '5px',
    // justifyContent: 'space-between'
};

const imageStyle = {
    objectFit: 'cover',
    height: '140px', width: '140px',
    border: '1px solid #e8e8e8', borderRadius: '200px', display: 'flex',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
}


const index = () => {
    //for refreshing data without refrsh;
    const [getData, setGetData] = useState(0);
    //
    const router = useRouter();
    const [imgRef, setImageRef] = useState(null);
    //
    const [allUserData, setAllUserData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [image, setImage] = useState({ loading: false, url: null });
    //modals
    const [modal, setModal] = useState({ visible: false, deleteVisible: false, editVisible: false })
    //normal user related
    const [userData, setUserData] = useState({ name: '', userId: '', email: '', userType: 'Role', password: '', cpassword: '', dp: '' }); //add user
    const [userDataEdit, setUserDataEdit] = useState({ name: '', userId: '', email: '', userType: 'Role', id: '' }); //edit user
    const [userDataDelete, setUserDataDelete] = useState({ name: '', userType: 'Role', id: '' }); //delete user
    const [search, setSearch] = useState({ name: '', email: '', from: '', to: '', userType: '' });
    const [loading, setLoading] = useState(false);
    //

    const clearState = () => {
        setImageRef(null);
        setImage({ loading: false, url: null });
        setUserData({ name: '', userId: '', email: '', userType: 'Role', password: '', cpassword: '', dp: '' });
        setUserDataEdit({ name: '', userId: '', email: '', userType: 'Role', id: '' });
        setUserDataDelete({ name: '', userType: 'Role', id: '' });
        setModal({ visible: false });
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

    const handleAddUser = async () => {
        setLoading(true)
        if (userData.password === userData.cpassword) {
            try {
                const userAdd = await axios.post('/user/new/', userData);
                if (userAdd?.data?.success) {
                    Notification('Success', "New user added successfully", 'success');
                    clearState();
                    setModal({ visible: false });
                    setLoading(false);
                    setGetData(getData + 1);
                }
            } catch (error) {
                if (error?.response?.data) {
                    Notification('Error', error?.response?.data?.data, 'error');
                } else {
                    Notification('Error', error?.message, 'error');
                }
                setLoading(false);
            }
        } else {
            Notification('Error', "Passwords don't match", 'error');
            setLoading(false);

        }
    }

    const handleUpdateUser = async () => {
        setLoading(true)
        try {
            const userUpdated = await axios.put(`/user/${userDataEdit.id}`, userDataEdit);
            if (userUpdated?.data?.success) {
                Notification('Success', "User updated successfully", 'success');
                clearState();
                setModal({ editVisible: false });
                setLoading(false);
                setGetData(getData + 1);
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

    const handleDeleteUser = async () => {
        setLoading(true)
        try {
            const userDelete = await axios.delete(`/user/${userDataDelete.id}`);
            if (userDelete?.data?.success) {
                Notification('Success', "User Deleted successfully", 'success');
                clearState();
                setModal({ deleteVisible: false });
                setLoading(false);
                setGetData(getData + 1);
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

    const uploadButton = (
        <div style={imageStyle}>
            {image.loading ? <Spinner color="#40A9FF" /> : <PlusOutlined />}
            <div style={{ marginTop: 2 }}>Picture</div>
            
        </div>
    );

    const handleImageUpload = async ({ file, onSuccess }) => {
        setImage({ ...image, loading: true });
        try {
            let refName = `profile_pictures/${Date.now()}evently`;
            const res = await UploadImage(file, refName);

            setImageRef(refName);
            setImage({ url: res, loading: false });
            setUserData({ ...userData, dp: res });

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
        <div>
            <InputLabel req={true} text={"Full Name"} />
            <Input
                value={userData.name}
                onChange={text => {
                    setUserData({ ...userData, name: text.target.value })
                }}
                style={{ padding: '0.5rem' }}
                placeholder=" Jhon Doe"
            />
        </div>
        <div>
            <InputLabel req={true} text={"User Name"} />
            <Input
                value={userData.userId}
                onChange={text => setUserData({ ...userData, userId: text.target.value })}
                style={{ padding: '0.5rem' }}
                placeholder="Example : jhondoe002"
            />
        </div>
        <div>
            <InputLabel req={true} text={"Email id"} />
            <Input
                value={userData.email}
                onChange={text => setUserData({ ...userData, email: text.target.value })}
                style={{ padding: '0.5rem' }}
                placeholder="example@gmail.com"
            />
        </div>
        <div>
            <InputLabel req={true} text={"Password"} />
            <Input.Password
                value={userData.password}
                onChange={text => setUserData({ ...userData, password: text.target.value })}
                style={{ padding: '0.5rem' }}
                placeholder="**********"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </div>
        <div>
            <InputLabel req={true} text={"Confirm Password"} />
            <Input.Password
                value={userData.cpassword}
                onChange={text => setUserData({ ...userData, cpassword: text.target.value })}
                style={{ padding: '0.5rem' }}
                placeholder="**********"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />

        </div>
        <div>
            <InputLabel req={true} text={"User Type"} />
            <Select defaultValue="Role" style={{ width: '100%', }} onChange={(v) => {
                setUserData({ ...userData, userType: v })
            }}>
                <Option value="admin" key={"admin"}>Admin</Option>
                <Option value="editor" key={"editor"}>Editor</Option>
            </Select>
        </div>
        <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleAddUser()}>
            {
                loading ?
                    <Spinner size={24} /> :
                    <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Add</p>
            }
        </Button>
    </div >

    const getUserData = async () => {
        setDataLoading(true)
        try {
            const { name, email, userType, from, to } = search;
            const usersData = await axios.get(`/user?name=${name}&email=${email}&userType=${userType}&from=${from}&to=${to}`);
            setAllUserData(usersData?.data?.data);
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
            title: 'Profile',
            dataIndex: 'dp',
            key: 'dp',
            render: link => <img src={link ?? 'https://i.pinimg.com/564x/ee/6a/64/ee6a64202573297aea04a50268ffd379.jpg'} alt="dp" style={{ objectFit: 'cover', height: '50px', width: '50px', borderRadius: '200px' }} />,
        },
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
            title: 'Registered ',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <p>{moment(text).format('DD/MM/YYYY hh:mm A')}</p>
        },
        {
            title: 'Role',
            key: 'userType',
            dataIndex: 'userType',
            render: role => <Tag color={role === 'admin' ? 'geekblue' : 'green'} key={role} >{role.toUpperCase()}</Tag >

        },
        {
            title: 'Actions',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <p style={{ cursor: 'pointer', color: '#40A9FF' }} onClick={() => {
                        setUserDataEdit({ name: record?.name, email: record?.email, userId: record?.userId, userType: record?.userType, id: record?._id });
                        setModal({ ...modal, editVisible: true });
                    }}>Edit</p>
                    <p style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                        setUserDataDelete({ name: record?.name, userType: record?.userType, id: record?._id });
                        setModal({ ...modal, deleteVisible: true })
                    }}>Delete</p>
                </Space>
            ),
        },
    ];


    return (
        <div className={styles.container}>
            {/* Add user modal */}
            <Modal
                visible={modal.visible}
                title="Add New User"
                onCancel={cancelModal}
                footer={false}
            >

                {ModalBody}
            </Modal>
            {/* Delete user modal */}
            <Modal
                visible={modal.deleteVisible}
                title="Are you sure, you want to delete this user?"
                onCancel={() => setModal({ ...modal, deleteVisible: false })}
                footer={false}
            >

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0 }}>Name:</h4>
                    <p style={{ margin: 0 }}>{userDataDelete.name}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <h4 style={{ margin: 0 }}>Role:</h4>
                    <p style={{ margin: 0 }}>{userDataDelete.userType}</p>
                </div>
                <Divider />
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <Button type="danger" style={{ height: '3rem', width: '50%' }} onClick={() => !loading && handleDeleteUser()}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Delete User</p>
                        }
                    </Button>
                    <Button danger style={{ height: '3rem', width: '50%' }} onClick={() => !loading && setModal({ ...modal, deleteVisible: false })}>
                        <p style={{ fontSize: '1rem', margin: 0, color: '#red', cursor: 'pointer' }} >Cancel</p>
                    </Button>
                </div>
            </Modal>
            {/* Edit user modal */}
            <Modal
                visible={modal.editVisible}
                title="Edit User"
                onCancel={() => setModal({ ...modal, editVisible: false })}
                footer={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <InputLabel req={true} text={"Full Name"} />
                        <Input
                            value={userDataEdit.name}
                            onChange={text => {
                                setUserDataEdit({ ...userDataEdit, name: text.target.value })
                            }}
                            style={{ padding: '0.5rem' }}
                            placeholder=" Jhon Doe"
                        />
                    </div>
                    <div>
                        <InputLabel req={true} text={"User Name"} />
                        <Input
                            value={userDataEdit.userId}
                            onChange={text => setUserDataEdit({ ...userDataEdit, userId: text.target.value })}
                            style={{ padding: '0.5rem' }}
                            placeholder="Example : jhondoe002"
                        />
                    </div>
                    <div>
                        <InputLabel req={true} text={"Email id"} />
                        <Input
                            value={userDataEdit.email}
                            onChange={text => setUserDataEdit({ ...userDataEdit, email: text.target.value })}
                            style={{ padding: '0.5rem' }}
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div>
                        <InputLabel req={true} text={"User Type"} />
                        <Select defaultValue={userDataEdit.userType} style={{ width: '100%', }} onChange={(v) => {
                            setUserDataEdit({ ...userDataEdit, userType: v })
                        }}>
                            <Option value="admin" key={"admin"}>Admin</Option>
                            <Option value="editor" key={"editor"}>Editor</Option>
                        </Select>
                    </div>
                    <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleUpdateUser()}>
                        {
                            loading ?
                                <Spinner size={24} /> :
                                <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Save Changes</p>
                        }
                    </Button>
                </div>
            </Modal>
            <BreadCustom titles={["User Management"]} btn={true} btnTxt={"Add User"} handler={() => setModal({ visible: true })} />
            <div style={bgStyle}>
                <div className={styles.searchSection}>
                    <Input
                        onChange={text => setSearch({ ...search, name: text.target.value })}
                        style={{ padding: '0.5rem', width: '301px' }}
                        placeholder="Search By Name"
                    />
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
                    <Select defaultValue={userDataEdit.userType} style={{ width: '301px' }} onChange={(v) => {
                        setSearch({ ...search, userType: v })
                    }}>
                        <Option value="admin" key={"admin"}>Admin</Option>
                        <Option value="editor" key={"editor"}>Editor</Option>
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
                <div className={styles.tableStyles}>
                    {dataLoading ? <SkeletonLoader /> :
                        <Table columns={columns} dataSource={allUserData} pagination={{ defaultPageSize: 6 }} />
                    }
                </div>
            </div>
        </div >
    )
}

export default index;