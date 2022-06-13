import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        const event = new EventSource("http://localhost:5000/connect");
        event.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }

    const editInput = (e) => {
        setValue(e.target.value);
    }

    const sendMessage = async () => {
        await axios.post("http://localhost:5000/new-messages", {
            message: value,
            id: Date.now()
        })
    }

    return (
        <>
            <Form className="d-flex justify-content-center">
                <Form.Group className="mr-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control type="text" onChange={e => editInput(e)} defaultValue="" value={ value } />
                </Form.Group>
                <Button onClick={sendMessage}>
                    Submit
                </Button>
            </Form>
            <div>
                {messages.map(mess =>
                    <div className="message mt-1 mb-1" key={mess.id}>
                        {mess.message}
                    </div>
                )}
            </div>
        </>
    )
};
