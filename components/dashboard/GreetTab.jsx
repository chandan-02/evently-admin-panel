import { Avatar } from 'antd';

const bgStyle = {
    margin: '1rem 1rem 0 1rem',
    background: '#fff',
    display: 'flex',
    padding: '2rem',
    alignItems: 'center',
    borderRadius: '5px',
    justifyContent: 'space-between'
};

const fontStyle = { margin: 0 }
const GreetTab = ({ user }) => {

    return (
        <div style={bgStyle}>
            {/* Left Side */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {
                    user && (
                        user?.dp ?
                            <img style={{ objectFit: 'cover', height: '80px', width: '80px', borderRadius: '200px' }} src={user?.dp} />
                            :
                            <Avatar style={{ backgroundColor: '#f56a00', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px', width: '80px' }} gap={2}>
                                {user.name[0]}{user.userType[0]?.toUpperCase()}
                            </Avatar>
                    )
                }
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Welcome, {user?.name}</h1>
                    <p style={{ ...fontStyle, marginTop: '5px' }}>Total Posts : 0</p>
                </div>
            </div>
            {/* Right Side */}
            <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                    <p style={{ ...fontStyle }}>Total Likes</p>
                    <h1 style={{ ...fontStyle, fontSize: '1.4rem' }}>0</h1>
                </div>
                <div>
                    <p style={{ ...fontStyle }}>Total Comments</p>
                    <h1 style={{ ...fontStyle, fontSize: '1.4rem' }}>0</h1>
                </div>
            </div>
        </div >
    )
}

export default GreetTab;