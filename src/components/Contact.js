import React, {useState} from 'react'
import {Form, Card, Button} from "react-bootstrap"
import {db} from '../firebase';


const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");

    const [loader, setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        db.collection("feedbackReports")
            .add({
                name: name,
                email: email,
                feedback: feedback,
            })
            .then(() => {
                setLoader(false);
                alert("Your feedback has been submitted");
            })
            .catch((error) => {
                alert(error.message);
                setLoader(false);
            });

        setName("");
        setEmail("");
        setFeedback("");
    };


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Edge Weather Feedback</h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="John West" value={name}
                                          onChange={(e) => setName(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" value={email}
                                          onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Message" value={feedback}
                                          onChange={(e) => setFeedback(e.target.value)} required/>
                        </Form.Group>
                        <div className="container mt-3 text-center">
                            <Button className="text-center mb-2" type="submit" size="lg" style={{ background: loader ? "#ccc" : " rgb(13, 110, 253)" }}>
                                Submit
                            </Button>
                        </div>

                    </Form>

                </Card.Body>
            </Card>
        </>
    )
}

export default Contact;