import React ,{useEffect, useState} from 'react'
import axios from '../config/axios'
import {useNavigate } from 'react-router-dom'
import { Container, Row ,Col,  Card} from 'react-bootstrap'
import {Sidebar, Item, LogoText} from 'react-sidebar-ui'
import { List,ChatDotsFill,  Person, BoxArrowRight } from 'react-bootstrap-icons'
import Users from './Users'

function Chat() {
    const [user,setuser] = useState({})
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('usertoken') !== null && localStorage.getItem('usertoken')  !== undefined){
            navigate('/chat')
        }else{
            navigate('/')
        }

        axios.get('/user/me',{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('usertoken')}`
            }
        }).then(res =>{
            setuser(res.data[0])
        }).catch(e => console.log(e))
    }, [])
    const logout = ()=>{
        axios.get('/user/logout',{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('usertoken')}`
            }
        }).then(res =>{
            localStorage.removeItem('usertoken')
            navigate('/')
            console.log(res.data)
        }).catch(e => console.log(e))
    }
  return (
    <>
    <Container fluid={true}>
        <Row>
            <Col>
                <Sidebar classes="bgcolor" isCollapsed={false}>
                    <br />
                    <LogoText>Chat App</LogoText>
                    <br />
                    <Item classes="bgcolor">
                    <List size={40}/> Menu
                    </Item>
                    <Item classes="bgcolor">
                        <ChatDotsFill size={40}/> chat
                    </Item>
                    <Item classes="bgcolor">
                        <Person size={40}/> profile
                    </Item>
                    <Item classes="bgcolor" onClick={logout} >
                        <BoxArrowRight size={40}/> logout
                    </Item>
                </Sidebar>
            </Col>

        </Row>
    </Container>
    <Container>
        <Row className='mt-5'>
            <Col style={{marginLeft : '150px'}}>
                <LogoText>Contact</LogoText>
                <Users />
            </Col>
            <Col className='mt-5 shadow-lg text-center'>
                <Card>
                    <Card.Img  variant='top' src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"/>
                    <Card.Body className='pb-4'>
                        <Card.Title className='pb-4'>Profile Details</Card.Title>
                        <Card.Text>
                        UserId : {user.userid}
                        </Card.Text>
                        <Card.Text>
                        UserName : {user.email}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
   
  
    </>
  )
}


export default Chat
