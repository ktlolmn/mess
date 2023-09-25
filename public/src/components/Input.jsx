import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { sendMessage } from '../utils/APIRoutes';
import { io } from 'socket.io-client';
import { host } from '../utils/APIRoutes';

export default function Input({ userChat, contact, messages, setMessages }) {
  const scrollRef = useRef();
  const socket = useRef();
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userChat) {
        socket.current = io(host);
        socket.current.emit('add-user', userChat);
      }
    };

    fetchData();
  }, [userChat]);

  const sendMessageToServer = async (message) => {
    if (message) {
      try {
        await axios.post(sendMessage, {
          from: userChat,
          to: contact._id,
          message: message,
        });

        // Làm việc với socket
        socket.current.emit('send-msg', {
          from: userChat,
          to: contact._id,
          message: message,
        });

        const msgs = [...messages];
        msgs.push({
          fromSelf: true,
          message: message,
        });
        setMessages(msgs);
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setMessage('');
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
    sendMessageToServer(message);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  form {
    height: 100%;
    display: grid;
    grid-template-columns: 88% 12%;
    input {
      height: 100%; /* Đặt chiều cao của input theo chiều cao của phần tử cha */
      border-radius: 10px 0px 0px 10px;
      border: none;
      outline: none;
      font-size: 16px;
      padding-left: 10px;
      &::placeholder {
        color: #997af0;
      }
      &:focus {
        border: none;
      }
    }
    button {
      height: 100%; /* Đặt chiều cao của button theo chiều cao của phần tử cha */
      border-radius: 0px 10px 10px 0;
      border: none;
      background-color: #997af0;
      color: white;
      font-size: 17px;
    }
  }
`;
