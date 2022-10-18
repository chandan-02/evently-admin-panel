const InputLabel = ({ text, req }) => {
    return (
        <h4 style={{
            margin: 0,
            marginBottom:'2px'
            // fontSize: '1rem'
        }}><span style={{ color: '#1890FF' }}>{req && '* '}</span>{text}</h4>
    )
}

export default InputLabel;