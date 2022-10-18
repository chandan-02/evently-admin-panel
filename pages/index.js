import styles from "../styles/Home.module.css";
import { Button, Input, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from "react";
import logo from '../public/images/logo.svg'
import Image from 'next/image';
import { useRouter } from "next/dist/client/router";

import axios from "../helper/axios";
import Notification from '../helper/notification';
import useAuth from '../helper/useAuth';
//Components;
import InputLabel from '../components/InputLabel';
import ForgotPassword from "../components/ForgotPassword";
import Spinner from '../components/Spinner';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ email: '', password: '' })
  const [forgot, setForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAuth()

  const handleSignIn = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/user-main/login", {
        email: user.email, password: user.password
      })
      if (response?.data?.success) {
        localStorage.setItem('token', response.data.jwt.token)
        localStorage.setItem('islogged', true);
        localStorage.setItem('tokenexpiry', response.data.jwt.expiry)
        localStorage.setItem('user', JSON.stringify(response.data.data))
        Notification('Success', 'Logged in successfully', 'success');
        window.location.reload();
        // router.replace("/dashboard");
        setLoading(false);
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
  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>

          <div className={styles.logo} style={{ marginBottom: '1rem' }}>
            <Image src={logo} alt="logo"/>
          </div>

          {
            !forgot ?
              <>
                <div>
                  <InputLabel req={true} text={"Enter Email Address"} />
                  <Input style={{ padding: '1rem' }} placeholder="example@gmail.com" onChange={text => setUser({ ...user, email: text.target.value })} />
                </div>

                <div>
                  <InputLabel req={true} text={"Enter Password"} />
                  <Input.Password
                    onChange={text => setUser({ ...user, password: text.target.value })}
                    style={{ padding: '1rem' }}
                    placeholder="********"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </div>

                <h3 style={{ color: '#1890FF', margin: 0, cursor: 'pointer' }} onClick={() => setForgot(true)}>Forgot Password ?</h3>
                <Button type="primary" style={{ height: '3rem' }} onClick={() => !loading && handleSignIn()}>
                  {
                    loading ?
                      <Spinner size={24} /> :
                      <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Continue</p>
                  }
                </Button>
              </> :
              <ForgotPassword setForgot={setForgot} />
          }
        </div>
        {/* Dummy div for pushing content to top */}
        <div style={{ height: '10rem' }}>
        </div>
      </div>
    );

  } else {
    router.push('/events');
    return <div></div>
  }

}
