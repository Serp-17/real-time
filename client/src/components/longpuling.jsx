import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const LongPuling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    console.log(123)
    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/get-messages");
            setMessages(prev => [data, ...prev])
            await subscribe();
        } catch {
            setTimeout(() => {
                subscribe()
            }, 5000)
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
                    <div className="message" key={mess.id}>
                        {mess.message}
                    </div>
                )}
            </div>
        </>
    )
};
