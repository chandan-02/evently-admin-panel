import { AlignLeftOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Router, useRouter } from 'next/router';
import { Avatar, Popover } from 'antd';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import logo from '../public/images/logo.svg'

//functinalities 
import Notification from '../helper/notification';

export default function NavBar({ collapsed, setCollapsed }) {
    const router = useRouter();
    const [profile, setProfile] = useState();
    useEffect(() => {
        const profileUser = JSON.parse(localStorage.getItem('user'));
        setProfile(profileUser)
        // console.log('Logged in as -->', profileUser.name)
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenexpiry')
        localStorage.removeItem('islogged')
        localStorage.removeItem('user')
        Notification('Info', 'Logged out !', 'success');
        router.push('/')
    }

    const content = (
        <div style={{ width: "200px", display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.4rem', }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => router.push('/my-profile')}>
                <UserOutlined style={{ fontSize: '1rem' }} />
                <p style={{ margin: 0, fontSize: '1rem' }}>My Profile</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handleLogout()}>
                <LogoutOutlined style={{ fontSize: '1rem' }} />
                <p style={{ margin: 0, fontSize: '1rem' }}>Sign Out</p>
            </div>
        </div>
    );

    return (

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            {/* left side */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem' }}>
                <AlignLeftOutlined style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => {
                    setCollapsed(!collapsed);
                }} />
                <Image src={logo} alt="logo" />
            </div>
            {/* right side */}
            <div>
                <Popover content={content} title={<p style={{ margin: 0, padding: '0.5rem' }}>{`@${profile?.userId}`}</p>} trigger="click" placement='bottomRight'>
                    {
                        profile && (
                            profile?.dp ?
                                <img style={{ objectFit: 'cover', height: '50px', width: '50px', borderRadius: '200px', cursor: 'pointer' }} src={profile?.dp} />
                                :
                                <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', cursor: 'pointer' }} size="large" gap={2}>
                                    {profile.name[0]}{profile.userType[0]?.toUpperCase()}
                                </Avatar>
                        )
                    }
                </Popover>
            </div>
        </div>

    );
}
