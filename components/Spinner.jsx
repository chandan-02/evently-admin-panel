import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner({ size, color }) {
    const antIcon = <LoadingOutlined style={{ fontSize: size, color: color ? color : '#fff' }} spin />;
    return <Spin indicator={antIcon} />;
}