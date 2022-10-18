import styles from "../../styles/Donations.module.css";
import { useRouter } from "next/router";
import { Tabs } from 'antd';

//components
import RazorpayTable from '../../components/donations/razorpay';
import StripeTable from '../../components/donations/stripe';
import BreadCustom from "../../components/BreadCustom";

const { TabPane } = Tabs;
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
    const handleTabChange = (tab) => {
        console.log(tab)
    }

    return (
        <div className={styles.container}>
            <BreadCustom titles={["Donations"]} btn={false} />
            <div style={bgStyle}>
                <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                    <TabPane tab="Razorpay Donations" key="1">
                        <RazorpayTable />
                    </TabPane>
                    <TabPane tab="Stripe Donations" key="2">
                        <StripeTable />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default index;