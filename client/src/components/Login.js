import React, {useEffect, useState} from 'react'
import axios from '../config/axios'
import { Container, Row ,Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'react-bootstrap-icons';

function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error , seterror] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('usertoken')){
            navigate('/chat')
        }else{
            navigate('/')
        }
    }, [])
    

    const SubmitForm = async (e) =>{
      
        e.preventDefault();
        await axios.post('/user/login',{
            email,
            password
        }).then(res =>{
            if(res.data.token){
                console.log("login success")
                if(res.data.token !== null && res.data.token !== undefined){
                    localStorage.setItem('usertoken' , res.data.token)
                    navigate('/chat')
                }
            }else{
                seterror(res.data.msg)
            }
        }).catch(e => console.log(e))
    }

  return (
    <>
    <Container className="container" style={{marginTop:'150px'}}>
        <Row className='mx-auto'>
            <Col className='col-lg-4 mx-auto  shadow-lg'>
                <form className='form-group mt-5 px-4'
                    onSubmit={SubmitForm}
                    >
                    <h3 className='text-center p-3'>Sign In</h3>
                    {error ? <h4 className='text-danger h5'>{error}</h4>: ''}
                    <div>
                 
                    <label className='h5 py-3' htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange= {e => setemail(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label className='h5 py-3' htmlFor="password">Password</label>
                    <input
                        id="password"
                        type ="password"
                        className="form-control"
                        placeholder='Enter a password'
                        onChange= {e => setpassword(e.target.value)}
                    />
                    </div>
                    <div className="d-grid mb-5">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className='text-center mb-3'>
                        <Link className='btn btn-lg' to ="/signup">Create User <ArrowRight color="royalblue" size={25} /></Link>
                    </div>
                 
                </form>
            </Col>
        </Row>
    </Container>

    </>
  )
}

export default Login
