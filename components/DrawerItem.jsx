import {
    HomeOutlined, UserOutlined, FileProtectOutlined, FileAddOutlined, DollarCircleOutlined,
    MoneyCollectOutlined, IdcardOutlined, LogoutOutlined, FundViewOutlined, VideoCameraOutlined, 
    ScheduleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Notification from '../helper/notification';

export default function DrawerItems({ setCollapsed }) {
    const router = useRouter()

    let drawerItem = {
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem',
        padding: '10px', borderRadius: '5px', cursor: 'pointer',
    }
    let drawerFont = {
        margin: 0,
        fonstSize: '1.3rem',
        fontWeight: '600',
        cursor: 'pointer'
    }
    let drawerIcon = {
        fontSize: '1.5rem',
        cursor: 'pointer'
    }
    const label = {
        paddingLeft: '10px', margin: 0
    }
    const active = (path, type) => {
        if (type === 'font') {
            let activeFont = router.pathname === `/${path}` ? '#fff' : '#000';
            return activeFont;
        }
        if (type === 'bg') {
            let activeFont = router.pathname === `/${path}` ? '#1890FF' : '#fff';
            return activeFont;
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenexpiry')
        localStorage.removeItem('islogged')
        localStorage.removeItem('user')
        Notification('Info', 'Logged out !', 'success');
        router.push('/')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <>
                {/* General stuff here */}
                <p style={label}>General</p>
                {/* <div style={{ ...drawerItem, background: active('dashboard', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/dashboard');
                }}>
                    <HomeOutlined style={{ ...drawerIcon, color: active('dashboard', 'font') }} />
                    <p style={{ ...drawerFont, color: active('dashboard', 'font') }}>Dashboard</p>
                </div> */}

                <div style={{ ...drawerItem, background: active('user-management', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/user-management')
                }}>
                    <IdcardOutlined style={{ ...drawerIcon, color: active('user-management', 'font') }} />
                    <p style={{ ...drawerFont, color: active('user-management', 'font') }}>User Management</p>
                </div>

                {/* <div style={{ ...drawerItem, background: active('dynamic-content', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/dynamic-content')
                }}>
                    <FundViewOutlined style={{ ...drawerIcon, color: active('dynamic-content', 'font') }} />
                    <p style={{ ...drawerFont, color: active('dynamic-content', 'font') }}>Dynamic Content</p>
                </div> */}

                {/* Blog management here */}

                {/* <p style={label}>Blog</p>
                <div style={{ ...drawerItem, background: active('blog-management', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/blog-management')
                }}>
                    <FileProtectOutlined style={{ ...drawerIcon, color: active('blog-management', 'font') }} />
                    <p style={{ ...drawerFont, color: active('blog-management', 'font') }}>Blog Management</p>
                </div>

                <div style={{ ...drawerItem, background: active('create-a-post', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/create-a-post')
                }}>
                    <FileAddOutlined style={{ ...drawerIcon, color: active('create-a-post', 'font') }} />
                    <p style={{ ...drawerFont, color: active('create-a-post', 'font') }}>Create A Post</p>
                </div> */}
                
                {/* Event Management here */}
                <p style={label}>Events</p>
                <div style={{ ...drawerItem, background: active('events', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/events')
                }}>
                    <VideoCameraOutlined style={{ ...drawerIcon, color: active('events', 'font') }} />
                    <p style={{ ...drawerFont, color: active('events', 'font') }}>Event Management</p>
                </div>

                <div style={{ ...drawerItem, background: active('bookings', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/bookings')
                }}>
                    <ScheduleOutlined style={{ ...drawerIcon, color: active('bookings', 'font') }} />
                    <p style={{ ...drawerFont, color: active('bookings', 'font') }}>All Bookings</p>

                </div>

                {/* Donation here */}
                {/* <p style={label}>Donation</p>
                <div style={{ ...drawerItem, background: active('donations', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/donations')
                }}>
                    <DollarCircleOutlined style={{ ...drawerIcon, color: active('donations', 'font') }} />
                    <p style={{ ...drawerFont, color: active('donations', 'font') }}>Donations</p>
                </div>

                <div style={{ ...drawerItem, background: active('crypto-donations', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/crypto-donations')
                }}>
                    <MoneyCollectOutlined style={{ ...drawerIcon, color: active('crypto-donations', 'font') }} />
                    <p style={{ ...drawerFont, color: active('crypto-donations', 'font') }}>Crypto Donations</p>

                </div> */}
                {/* Profile here */}
                {/* <p style={label}>Profile</p>
                <div style={{ ...drawerItem, background: active('my-profile', 'bg') }} onClick={() => {
                    setCollapsed(false);
                    router.push('/my-profile')
                }}>
                    <UserOutlined style={{ ...drawerIcon, color: active('my-profile', 'font') }} />
                    <p style={{ ...drawerFont, color: active('my-profile', 'font') }}>My Profile</p>

                </div>

                <div style={{ ...drawerItem, background: active('logout', 'bg') }} onClick={() => {
                    handleLogout();
                }}>
                    <LogoutOutlined style={{ ...drawerIcon, color: active('logout', 'font') }} />
                    <p style={{ ...drawerFont, color: active('logout', 'font') }} >Log Out</p>
                </div> */}
            </>
        </div>
    );
}
