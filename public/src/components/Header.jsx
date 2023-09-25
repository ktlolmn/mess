import React from 'react';
import styled from 'styled-components';

export default function Header({ contact }) {
  return (
      contact && (
        <Container>
          <div className="contact">
            <img src={contact.avatarImage} alt="" />
            <h2>{contact.username}</h2>
          </div>
        </Container>
      )
  );
}
const Container = styled.div`
height: auto;
border-radius: 10px;
background-color: #0003;
  .contact{
    display: flex;
    justify-content: center;
    padding: 10px;
    align-items: center;
    img{
      height: 55px;
      border-radius: 50%;
    }
    h2{
      padding-left: 20px;
      color: white;
    }
  }
`