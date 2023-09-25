import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Input from './Input';
import axios from 'axios';
import { getAllMessages } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid"

export default function ChatContainer({ userChat, contact }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMessages, {
          from: userChat,
          to: contact._id,
        });
        // Sử dụng prevMessages để cập nhật state messages
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();
  }, [contact]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-message" ref={scrollRef}>
        {messages.map((message) => {
          console.log(message)
          return(
            <div ref={scrollRef} key= {uuidv4()} className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          )
        })}
      </div>
      <Input contact={contact} userChat={userChat} messages={messages} setMessages={setMessages} />
    </Container>
  );
}

// ... Rest of the styling remains the same ...

const Container = styled.div`
  display: grid;
  grid-template-rows: 92% 8%;
  .chat-message{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message{
        display: flex;
        align-items: center;
        .content{
            max-width: 60%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1 rem;
            color: white;
            border-radius: 1rem;
        }
    }
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
}
.sended{
    justify-content: flex-end;
    .content{
        color: red;
        background-color: #997af0;
    }
}
.received{
    justify-content: flex-start;
    .content{
        color: red;
        background-color: cadetblue;
    }
}
`
