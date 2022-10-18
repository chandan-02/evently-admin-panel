import React from 'react';
import { useState } from "react";
import { Button, DatePicker } from 'antd';

import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
//Components
import Spinner from '../Spinner';
//Fucntionalities
import axios from '../../helper/axios';
import Notification from '../../helper/notification';

const bgStyle = {
    background: '#fff',
    padding: '2rem 2rem',
    borderRadius: '5px',
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    width: "30%",
    height: "max-content",
};

const About = ({ eventData, refresh, setRefresh }) => {

    const [loading, setLoading] = useState(false);

    const [event, setEvent] = useState({
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        venue: eventData.venue,
        image: eventData.image
    })

    const handleUpdateEvent = async () => {
        setLoading(true);
        try {
            const getEvent = await axios.put(`/event/detail/${eventData._id}`, event);
            if (getEvent?.data?.success) {
                setRefresh(refresh + 1);
                Notification('Success', "Event Updated successfully!", 'success');
                setLoading(false);
            }
        } catch (error) {
            if (error?.response?.data) {
                Notification('Error', error?.response?.data?.data, 'error');
            } else {
                Notification('Error', error?.message, 'error');
            }
            setLoading(false);
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "5rem", width: "100%" }}>
            <div style={bgStyle}>
                {/* <h2 style={{ fontWeight: "semi-bold" }}>Preview</h2> */}
                <img src={event.image} style={{ height: '300px', width: "auto", borderRadius: '5px',objectFit:'cover' }} />
                <h1 style={{ fontSize: "1.5rem", margin: 0 }}>{event?.title}</h1>
                <div>
                    <p style={{ margin: 0 }}>Description:</p>
                    <h1 style={{ fontSize: "1rem", fontWeight: "semi-bold" }}>{event?.description}</h1>
                </div>
                <div>
                    <p style={{ margin: 0 }}>Time:</p>
                    <h1 style={{ fontSize: "1rem", fontWeight: "semi-bold" }}>{event.date ? moment(event.date).format('DD/MM/YYYY hh:mm A') : "0/0/0 0:0:0 AM"}</h1>
                </div>
                <div>
                    <p style={{ margin: 0 }}>Venue:</p>
                    <h1 style={{ fontSize: "1rem", fontWeight: "semi-bold" }}>{event.venue}</h1>
                </div>
            </div>
            {/* <div style={{width:"30%"}}> */}
            <div style={bgStyle}>
                <h2 style={{ fontWeight: "semi-bold", margin: 0 }}>Edit Event Details</h2>
                <div>
                    <p>Title:</p>
                    <TextArea style={{ fontSize: "1rem", fontWeight: "semi-bold" }} value={event.title}
                        onChange={text => setEvent({ ...event, title: text.target.value })}></TextArea>
                </div>
                <div>
                    <p>Description:</p>
                    <TextArea style={{ fontSize: "1rem", fontWeight: "semi-bold" }} rows={4} value={event.description}
                        onChange={text => setEvent({ ...event, description: text.target.value })}></TextArea>
                </div>
                <div>
                    <p>Time:</p>
                    <DatePicker style={{ padding: '0.5rem', width: '100%' }} showTime onChange={time => {
                        setEvent({ ...event, date: moment(time).toISOString() })
                    }} />
                </div>
                <div>
                    <p>Venue:</p>
                    <TextArea style={{ fontSize: "1rem", fontWeight: "semi-bold" }} rows={2}
                        onChange={text => setEvent({ ...event, venue: text.target.value })} value={event.venue}></TextArea>
                </div>
                <Button type="primary" style={{ height: '3rem' }} onClick={handleUpdateEvent}>
                    {
                        loading ?
                            <Spinner size={24} /> :
                            <p style={{ fontSize: '1rem', margin: 0, color: '#fff', cursor: 'pointer' }} >Save Changes</p>
                    }
                </Button>
            </div>
            {/* </div> */}
        </div>
    );
}

export default About;
