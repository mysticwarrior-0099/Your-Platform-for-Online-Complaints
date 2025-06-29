import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
   const style = {
      marginTop: '66px',
   };

   const navigate = useNavigate();
   const [userName, setUserName] = useState(''); // Corrected line
   const [toggle, setToggle] = useState({});
   const [agentComplaintList, setAgentComplaintList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
      const getData = async () => {
         setLoading(true);
         setError('');
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { _id, name } = user;
               setUserName(name); // Corrected line
               const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
               setAgentComplaintList(response.data);
            } else {
               navigate('/');
            }
         } catch (error) {
            setError('Failed to load complaints. Please try again later.');
            console.error(error);
         } finally {
            setLoading(false);
         }
      };

      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prevComplaints) =>
            prevComplaints.map((complaint) =>
               complaint._doc.complaintId === complaintId ? { ...complaint, _doc: { ...complaint._doc, status: 'completed' } } : complaint
            )
         );
      } catch (error) {
         setError('Failed to update complaint status. Please try again.');
         console.error(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <div className="body">
            <Navbar className="text-white" bg="dark" expand="lg">
               <Container fluid>
                  <Navbar.Brand className="text-white">Hi Agent {userName}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                     <Nav className="text-white me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink style={{ textDecoration: 'none' }} className="text-white">
                           View Complaints
                        </NavLink>
                     </Nav>
                     <Button onClick={LogOut} variant="outline-danger">
                        Log out
                     </Button>
                  </Navbar.Collapse>
               </Container>
            </Navbar>

            {loading ? (
               <div className="text-center mt-5">Loading complaints...</div>
            ) : error ? (
               <Alert variant="danger">{error}</Alert>
            ) : (
               <div className="container" style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
                  {agentComplaintList.length > 0 ? (
                     agentComplaintList.map((complaint) => {
                        const open = toggle[complaint._doc.complaintId] || false;
                        return (
                           <Card key={complaint._doc.complaintId} style={{ width: '18rem', margin: '15px' }}>
                              <Card.Body>
                                 <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                                 <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                                 <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                                 <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                                 <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                                 <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                                 <Card.Text><b>Status:</b> {complaint._doc.status}</Card.Text>

                                 {complaint._doc.status !== 'completed' && (
                                    <Button onClick={() => handleStatusChange(complaint._doc.complaintId)} variant="primary">
                                       Change Status
                                    </Button>
                                 )}
                                 <Button onClick={() => handleToggle(complaint._doc.complaintId)}
                                    aria-controls={`collapse-${complaint._doc.complaintId}`}
                                    aria-expanded={!open} className='mx-3' variant="primary">
                                    Message
                                 </Button>
                                 <Collapse in={!open} dimension="width">
                                    <div id="example-collapse-text">
                                       <Card body style={{ width: '250px', marginTop: '12px' }}>
                                          <ChatWindow complaintId={complaint._doc.complaintId} name={userName} />
                                       </Card>
                                    </div>
                                 </Collapse>
                              </Card.Body>
                           </Card>
                        );
                     })
                  ) : (
                     <Alert variant="info">
                        <Alert.Heading>No complaints to show</Alert.Heading>
                     </Alert>
                  )}
               </div>
            )}
         </div>
         <Footer style={style} />
      </>
   );
};

export default AgentHome;
