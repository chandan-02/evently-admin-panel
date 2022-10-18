
import { Button, Input } from "antd";
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

import Notification from '../helper/notification';
import axios from '../helper/axios';
//Components;
import InputLabel from './InputLabel';
import Spinner from '../components/Spinner';

export default function ForgotPassword({ setForgot }) {

    const [user, setUser] = useState({ email: '' })
    const [loading, setLoading] = useState(false);

    const ForgotPassword = async () => {
        setLoading(true)
        try {
            const forgotData = await axios.post('/user-main/forget-token', {
                email: user.email
            })
            if (forgotData?.data?.success) {
                Notification('Success', forgotData?.data?.data, 'success');
                setForgot(false)
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
    }


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }} onClick={() => setForgot(false)}>
                <ArrowLeftOutlined style={{ margin: 0, fontSize: '1.2rem' }} />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Go Back</h3>
            </div>
            <div>
                <InputLabel req={true} text={"Registered Email Address"} />
                <Input style={{ padding: '1rem' }} placeholder="example@gmail.com" onChange={text => setUser({ ...user, email: text.target.value })} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: '0.5rem' }} >
                <InfoCircleOutlined style={{ color: '#1890FF', marginTop: '5px' }} />
                <p style={{ margin: 0, color: '#1890FF' }}>Please enter a registered email, we will send you a password
                    reset link shortly</p>
            </div>

            <Button type="primary" style={{ height: '3rem' }}>
                {
                    loading ?
                        <Spinner size={24} /> :
                        <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} onClick={() => ForgotPassword()}>Send Reset Link</p>
                }
            </Button>
        </>
    );
}
