import { Breadcrumb, Button } from 'antd';

const BreadCustom = ({ titles, btn, btnTxt, handler }) => {

    const bgStyle = {
        margin: '1rem 1rem 0 1rem',
        background: '#fff',
        display: 'flex',
        padding: '1rem',
        alignItems: 'center',
        borderRadius: '5px',
        justifyContent: 'space-between'
    };

    const fontStyle = { margin: 0, fontSize: '1rem' };
    const btnStyle = { padding: '1.1rem 1.7rem', display: 'flex', alignItems: 'center', gap: '7px' };

    return (
        <>
            <div style={bgStyle}>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item style={fontStyle}>Home</Breadcrumb.Item>{
                        titles.map(itm => {
                            return <Breadcrumb.Item key={itm} style={fontStyle}>{itm}</Breadcrumb.Item>
                        })
                    }
                </Breadcrumb>
                {
                    btn &&
                    <Button type='primary' style={btnStyle} onClick={() => handler()}>
                        <p style={fontStyle}>
                            {btnTxt}
                        </p>
                    </Button>
                }
            </div>
            <style>{
                `
                .ant-breadcrumb > ol {
                    margin:0px;
                    padding-left:15px
                }
                `
            }</style>
        </>
    )
}

export default BreadCustom;