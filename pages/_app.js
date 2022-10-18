import "../styles/globals.css";
import "../styles/antd.less";
import { Layout, Drawer, } from 'antd';
import { useState } from "react";
const { Header, Content ,Footer} = Layout;

import useAuth from '../helper/useAuth';
//Components
import HeadMain from '../components/Head';
import NavBar from '../components/NavBar';
import DrawerItems from '../components/DrawerItem';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const isLoggedIn = useAuth();

  if ((router.pathname === '/' || router.pathname.includes('/change-password') || router.pathname === '/_error')) {
    return (
      <>
        <HeadMain />
        <Component {...pageProps} />
      </>
    )
  }
  else {
    if (isLoggedIn) {
      return (
        <>
          <HeadMain /> {/* custom */}
          <Layout>
            <Header style={{ background: '#fff', height: '5.5rem' }}>
              <NavBar collapsed={collapsed} setCollapsed={setCollapsed} /> {/* custom */}
            </Header>
            <Layout>
              <Drawer
                size="default"
                title="Evently - Admin Panel"
                placement={"left"}
                closable={false}
                onClose={() => setCollapsed(false)}
                visible={collapsed}
                key={"left"}
              >
                <DrawerItems setCollapsed={setCollapsed} /> {/* custom */}
              </Drawer>
              <Content><Component {...pageProps} /></Content>
            </Layout>

          </Layout>
        </>
      )
    } else {
      // router.push('/');
      return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontSize: '1rem' }}>403 |  Unauthorised</div>
    }
  }
}

export default MyApp;
