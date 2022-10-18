import styles from "../../styles/Home.module.css";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from "react";
import logo from '../../public/images/logo.svg'
import Image from 'next/image';
import { useRouter } from "next/router";

import Notification from '../../helper/notification';
import axios from '../../helper/axios';
//Components;
import InputLabel from '../../components/InputLabel';
import Spinner from "../../components/Spinner";

export default function ChangePassword() {

    const [user, setUser] = useState({ cpassword: '', password: '' })
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { token } = router.query

    const changePassword = async () => {
        const { password, cpassword } = user;
        if (cpassword === password) {
            try {
                setLoading(true);
                const changePass = await axios.post("/user-main/forget-change-password", {
                    token, newPassword: user.password
                })
                if (changePass?.data?.success) {
                    Notification('Success', changePass?.data?.data, 'success');
                    router.push('/');
                }
                setLoading(false);
            } catch (error) {
                if (error?.response?.data) {
                    Notification('Error', error?.response?.data?.data, 'error');
                } else {
                    Notification('Error', error?.message, 'error');
                }
                setLoading(false);
            }
        } else {
            Notification('Error', "Passwords don't match", 'error')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>

                <div className={styles.logo} style={{ marginBottom: '1rem' }}>
                    <Image src={logo} alt="logo" />
                </div>

                <div>
                    <InputLabel req={true} text={"Enter Password"} />
                    <Input.Password
                        onChange={text => setUser({ ...user, password: text.target.value })}
                        style={{ padding: '1rem' }}
                        placeholder="Password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>

                <div>
                    <InputLabel req={true} text={"Confirm Password"} />
                    <Input.Password
                        onChange={text => setUser({ ...user, cpassword: text.target.value })}
                        style={{ padding: '1rem' }}
                        placeholder="Password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>

                <Button type="primary" style={{ height: '3rem' }}>
                    {
                        loading ?
                            <Spinner size={24} /> :
                            <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} onClick={() => changePassword()}>Save Changes</p>
                    }
                </Button>

            </div>
            {/* Dummy div for pushing content to top */}
            <div style={{ height: '10rem' }}>
            </div>
        </div>
    );
}
