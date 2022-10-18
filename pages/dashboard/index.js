// import styles from "../../styles/Dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Column, Line, Pie } from '@ant-design/plots';
import { Col, Row, Divider } from 'antd';
import styles from '../../styles/Dashboard.module.css'
import moment from 'moment';

//components
import GreetTab from "../../components/dashboard/GreetTab";
import TabNotification from '../../components/dashboard/notiTab';

const config = {
    xField: 'time',
    yField: 'sales',
    label: {
        position: 'middle',
        style: {
            fill: '#FFFFFF',
            opacity: 0.6,
        },
    },
    seriesField: 'type',
    isGroup: true,
    colorField: 'time', // or seriesField in some cases
    color: ['#FF3535', '#40A9FF'],
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
        },
    },
    meta: {
        type: {
            alias: 'Date Time',
        },
        sales: {
            alias: 'Sales',
        },
    },
    columnStyle: {
        radius: [10, 10, 0, 0],
    },
};
const configLine = {
    padding: 'auto',
    xField: 'time',
    yField: 'views',
    xAxis: {
        // type: 'timeCat',
        tickCount: 5,
    },
    smooth: true,
};
const configPie = {
    appendPadding: 1,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
            textAlign: 'center',
            fontSize: 14,
        },
    },
    interactions: [
        {
            type: 'element-selected',
        },
        {
            type: 'element-active',
        },
    ],
    legend: {
        layout: 'horizontal',
        position: 'bottom-left',
    },
    statistic: {
        title: false,
        content: {
            style: {
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            content: 'Order',
        },
    },
};
const configCircle = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{percentage}',
    },
    legend: {
        layout: 'horizontal',
        position: 'bottom-left',
    },
    interactions: [
        {
            type: 'element-selected',
        },
        {
            type: 'element-active',
        },
    ],
};

const data = [
    {

        time: moment().subtract(7, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 3801,
    },
    {

        time: moment().subtract(7, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 3201,
    },
    //6
    {
        time: moment().subtract(6, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 4122,
    },
    {
        time: moment().subtract(6, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 5122,
    },
    //5
    {
        time: moment().subtract(5, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 6100,
    },
    {
        time: moment().subtract(5, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 5120,
    },
    //4
    {
        time: moment().subtract(4, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 1815,
    },
    {
        time: moment().subtract(4, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 1015,
    },
    //3
    {
        time: moment().subtract(3, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 3218,
    },
    {
        time: moment().subtract(3, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 7218,
    },
    // 2
    {
        time: moment().subtract(2, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 3970,
    },
    {
        time: moment().subtract(2, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 2800,
    },
    // 1
    {
        time: moment().subtract(1, 'd').format('DD MMM YYYY'),
        type: "Digital",
        sales: 7218,
    },
    {
        time: moment().subtract(1, 'd').format('DD MMM YYYY'),
        type: "COD",
        sales: 3118,
    },
];
const dataLine = [
    //6
    {
        time: moment().subtract(21, 'd').format('DD MMM YYYY'),
        views: 4122,
    },
    //5
    {
        time: moment().subtract(20, 'd').format('DD MMM YYYY'),
        views: 6100,
    },
    //4
    {
        time: moment().subtract(18, 'd').format('DD MMM YYYY'),
        views: 1815,
    },
    //3
    {
        time: moment().subtract(17, 'd').format('DD MMM YYYY'),
        views: 3218,
    },
    // 2
    {
        time: moment().subtract(16, 'd').format('DD MMM YYYY'),
        views: 3970,
    },
    // 1
    {
        time: moment().subtract(15, 'd').format('DD MMM YYYY'),
        views: 3818,
    },
    {

        time: moment().subtract(14, 'd').format('DD MMM YYYY'),
        views: 3801,
    },
    //6
    {
        time: moment().subtract(13, 'd').format('DD MMM YYYY'),
        views: 4122,
    },
    //5
    {
        time: moment().subtract(12, 'd').format('DD MMM YYYY'),
        views: 6100,
    },
    //4
    {
        time: moment().subtract(11, 'd').format('DD MMM YYYY'),
        views: 6815,
    },
    //3
    {
        time: moment().subtract(10, 'd').format('DD MMM YYYY'),
        views: 3218,
    },
    // 2
    {
        time: moment().subtract(9, 'd').format('DD MMM YYYY'),
        views: 3970,
    },
    // 1
    {
        time: moment().subtract(8, 'd').format('DD MMM YYYY'),
        views: 5218,
    },
    {

        time: moment().subtract(7, 'd').format('DD MMM YYYY'),
        views: 3801,
    },
    //6
    {
        time: moment().subtract(6, 'd').format('DD MMM YYYY'),
        views: 4122,
    },
    //5
    {
        time: moment().subtract(5, 'd').format('DD MMM YYYY'),
        views: 9100,
    },
    //4
    {
        time: moment().subtract(4, 'd').format('DD MMM YYYY'),
        views: 1815,
    },
    //3
    {
        time: moment().subtract(3, 'd').format('DD MMM YYYY'),
        views: 3218,
    },
    // 2
    {
        time: moment().subtract(2, 'd').format('DD MMM YYYY'),
        views: 3970,
    },
    // 1
    {
        time: moment().subtract(1, 'd').format('DD MMM YYYY'),
        views: 7218,
    },
];
const dataPie = [
    {
        type: 'Proccessing',
        value: 27,
    },
    {
        type: 'Proccessed',
        value: 25,
    },
    {
        type: 'Shipping',
        value: 18,
    },
    {
        type: 'Delivered',
        value: 15,
    },
    {
        type: 'Cancelled',
        value: 10,
    },
    {
        type: 'Accepted',
        value: 5,
    },
];
const dataCircle = [
    {
        type: 'Digital Sales',
        value: 270921,
    },
    {
        type: 'Cash on delivery',
        value: 22115,
    },

];

const index = () => {
    const router = useRouter();
    const [user, setUser] = useState(user);

    useEffect(() => {
        const profileUser = JSON.parse(localStorage.getItem('user'));
        setUser(profileUser)
    }, [])

    return (
        <div className={styles.container}>
            <GreetTab user={user} />
            <div style={{marginTop:'1.5rem'}}>

            </div>
            {/* sales & notification */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: '0 1rem' }}>
                <Col span={12} style={{ display: 'flex' }}>
                    <div className={styles.card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#727272', alignItems: 'center' }}>
                            <h1 className={styles.cardTitle}>Sales</h1>
                            <h1 style={{ marginBottom: '1.5rem' }}>7 days prior statistics</h1>
                        </div>
                        <Column {...config} data={data} />
                    </div>
                </Col>

                <Col span={12} style={{ display: 'flex' }}>
                    <div className={styles.card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#727272' }}>
                            <h1 className={styles.cardTitle}>Latest Notifications</h1>
                            <h1 style={{ color: '#6E99F0', cursor: 'pointer', textDecoration: 'underline', fontSize: '16px' }}>View all</h1>
                        </div>
                        <TabNotification type="order" message={"Ankit placed new order with id #ODRikgfdiert32hjk"} />
                        <TabNotification type="order_cancel" message={"Mark cancelled his order with id #ODRikgfdiert32hjk"} />
                        <TabNotification type="customer" message={"Ankit placed new order with id #ODRikgfdiert32hjk"} />
                        <TabNotification type="order" message={"Ankit placed new order with id #ODRikgfdiert32hjk"} />
                    </div>
                </Col>
            </Row>
            <div style={{ margin: '1rem' }}></div>
            {/* order traffic stats */}
            <Row gutter={12} style={{ padding: '0 1rem' }}>
                <Col span={12} style={{ display: 'flex' }}>
                    {/* Pies */}
                    <Row gutter={12} style={{ width: '100%' }}>
                        {/* order stats */}
                        <Col span={12} style={{ display: 'flex' }}>
                            <div className={styles.card}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#727272', alignItems: 'center' }}>
                                    <h1 className={styles.cardTitle}>Overall Orders status</h1>
                                    <h1 style={{ color: '#FE3E3F', cursor: 'pointer', marginBottom: '1.5rem' }}>Export Report</h1>
                                </div>
                                <Pie {...configPie} data={dataPie} />
                            </div>
                        </Col>
                        <Col span={12} style={{ display: 'flex' }}>
                            <div className={styles.card}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#727272', alignItems: 'center' }}>
                                    <h1 className={styles.cardTitle}>Online vs COD </h1>
                                    <h1 style={{ color: '#FE3E3F', cursor: 'pointer', marginBottom: '1.5rem' }}>Export Report</h1>
                                </div>
                                <Pie {...configCircle} data={dataCircle} />
                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col span={12} style={{ display: 'flex' }}>
                    <div className={styles.card}>
                        <h1 className={styles.cardTitle}>Last Week Traffic Statistics</h1>
                        <Line {...configLine} data={dataLine} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default index;