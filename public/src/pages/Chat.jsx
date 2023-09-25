import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ChatContainer from '../components/ChatContainer';
import { getAllContacts } from '../utils/APIRoutes';
import Header from '../components/Header';

export default function Chat() {
  const [userChat, setUserChat] = useState(null);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('chat-app-user'));
    if (!data) {
      navigate('/setup');
    } else {
      setUserChat(data._id);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (userChat) {
        try {
          const { data } = await axios.get(`${getAllContacts}/${userChat}`);
          if (data.length > 0) {
            setContact(data[0]);
          }
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }
    };

    fetchContacts();
  }, [userChat]);


  return (
    <Container>
      <div className="container">
        {contact && <Header contact={contact} />}
        {userChat && contact && <ChatContainer userChat={userChat} contact={contact} />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100%;
  .container {
    display: grid;
    grid-template-rows: 12% 88%;
    height: 600px;
    width: 400px;
    background-color: #ffffff39;
    border-radius: 10px;
  }
`;
