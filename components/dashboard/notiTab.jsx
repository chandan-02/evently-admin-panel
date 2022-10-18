
import { GiftOutlined, UserOutlined } from '@ant-design/icons'
import { Divider } from 'antd';

const iconOrder = { fontSize: '2rem', color: '#CC7A28', backgroundColor: '#FFCF31', padding: '0.8rem', borderRadius: "1000px", }
const iconOrderCancel = { fontSize: '2rem', color: '#FE3E3F', backgroundColor: 'rgba(254, 62, 63,0.5)', padding: '0.8rem', borderRadius: "1000px", }
const iconOrderCustomer = { fontSize: '2rem', color: '#19978F', backgroundColor: 'rgba(84, 186, 185,0.5)', padding: '0.8rem', borderRadius: "1000px", }

const TabNotification = ({ type, message }) => {

    const RenderTitle = () => {
        if (type === 'order') {
            return <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Order Update</h1>
        }
        if (type === 'order_cancel') {
            return <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Order Cancelled</h1>
        }
        if (type === 'customer') {
            return <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Customer info</h1>
        }
    }
    const renderIcon = () => {
        if (type === 'order') {
            return <GiftOutlined style={iconOrder} />
        }
        if (type === 'order_cancel') {
            return <GiftOutlined style={iconOrderCancel} />
        }
        if (type === 'customer') {
            return <UserOutlined style={iconOrderCustomer} />
        }
    }
    return (
        <>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div>
                    {
                        renderIcon()
                    }
                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#727272' }}>
                        {RenderTitle()}
                        <h1>14 June 2022 at 12:45 PM</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#727272' }}>
                        <h1>{message}</h1>
                        <h1 style={{ color: '#FE3E3F', cursor: 'pointer' }}>Clear</h1>
                    </div>
                </div>
                <style jsx>{
                    `
                h1 {
                    margin:0;
                }
                `
                }</style>
            </div>
            < Divider />
        </>)
}

export default TabNotification;