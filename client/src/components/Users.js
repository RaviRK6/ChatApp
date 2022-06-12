import React ,{useEffect, useState} from 'react'
import axios from '../config/axios'
import {useNavigate } from 'react-router-dom'
import { Card, ListGroup} from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

function Users() {
    let navigate = useNavigate()
    const [alluser, setalluser] = useState([])
    useEffect(() => {

        axios.get('/user/users',{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('usertoken')}`
            }
        }).then(res =>{
            setalluser(res.data)
        }).catch(e => console.log(e))
    }, [])
  return (
    <>
    <Card  className='mt-5 shadow-lg text-center'>
    {alluser.map((users)=>(
        <ListGroup>
            <Card.Text>   
                <ListGroup.Item onClick={()=>  navigate('/message')} action variant="success">
                    <PersonCircle className='m-2' size={20} />
                    <h6>{users.userid}</h6>
                    <h6>{users.email}</h6>
                </ListGroup.Item>
            </Card.Text>
        </ListGroup>
    ))}
        
    </Card>
    </>
  )
}

export default Users