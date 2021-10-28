import React, {useState, useEffect} from 'react'
import {Button, Card, Alert, Form} from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from "react-router-dom"
import {db} from "../firebase";

export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    useEffect(()=> {
        getUserInfo()

    }, []);
    async function getUserInfo () {
        const data = await queryFirestore();
        const {name, city} = data.docs[0].data();
        setName(name);
        setCity(city);
    }
    function queryFirestore() {
        return db.collection("userDetails")
            .where("email", "==", currentUser.email).get()
    }

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setLoader(true);

        db.collection("userDetails")
            .add({
                email: currentUser.email,
                name: name,
                city: city,
            })
            .then(() => {
                // setLoader(false);
                alert("Your Details Have Been Saved");
            })
            .catch((error) => {
                alert(error.message);
                // setLoader(false);
            });
        setName("");
        setCity("");
    };


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Logged in as: </strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100
                    mt-3">Update Profile
                    </Link>
                    <div className="container mt-3 text-center">
                        <Button varient="link" onClick={handleLogout}>Log Out</Button>
                    </div>
                    <h5 className="text-center p-4">Want updates? Fill in your details bellow:</h5>
                    <Form className="mb-3" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Your Full Name" value={name}
                                          onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Home City</Form.Label>
                            <Form.Control type="" placeholder="e.g. Melbourne" value={city}
                                          onChange={(e) => setCity(e.target.value)}/>
                        </Form.Group>
                        <div className="container mt-3 text-center">
                            <Button className="text-center mb-2" type="submit" size="lg">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
