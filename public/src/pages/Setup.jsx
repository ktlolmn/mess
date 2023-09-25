import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { setUp, onChat } from '../utils/APIRoutes'
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';

export default function Setup() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [selected,setSelected] = useState("")
    const [userSelect, setUserSelect] = useState(undefined)
    const toastOptions = {
        position: "bottom-right",
        autoClose:8000,
        pauseOnHover: true,
        draggable:true,
        theme: 'dark',
    }
    useEffect(() => {
        const fetchContacts = async () => {
            try {
              const data = await axios.get(`${setUp}`);
              setUsers(data.data);
            } catch (error) {
              // Handle any errors here
              console.error("Error fetching contacts:", error);
            }
        };
      
        if (users) {
          fetchContacts();
        }
      }, []);


      const handleValidation = ()=>{        
        if(!userSelect){
            toast.error("Please select a character.",toastOptions);
            return false;
        }
        return true;
    }

      const handleSubmit = async ()=>{
        if(handleValidation()){
            console.log(userSelect)
            const {data} = await axios.post(onChat,{
                userSelect,
            })
             console.log(data,JSON.stringify(data))
            if(data.status === false)
                toast.error(data.msg, toastOptions);
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))       
                navigate("/")
            }
                
        }
    }
    return (
        <>
        <Container>
            <div className="title-container">
                <h1>Choose a character to start</h1>
            </div>
            <div className="users">
                {users.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className={`avatar ${selected === index ? 'selected' : ''}`}
                        >
                            <img
                                src={user.avatarImage}
                                alt="avatar"
                                onClick={() => {
                                    setSelected(index);
                                    setUserSelect(user._id)
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <button onClick={()=>{handleSubmit()}}>Start a message conversation</button>
        </Container>
        <ToastContainer />
        </>
    )
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader{
    height: 100%;
    width: 100%;
}
.title-container{
    h1{
        color: white;
    }
}
.users{
    display: flex;
    gap: 2rem;
    .avatar{

        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img{
            border-radius: 50%;
            height: 6rem;
        }
    }
    .selected{
        border: 0.4rem solid #4e0eff;
    }
}
button{
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  &:hover{
      background-color: #4e0eff;
  }
}
`
