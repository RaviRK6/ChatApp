import React, {useState} from 'react'
import axios from '../config/axios'
import { Container, Row ,Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons';

function Signup() {
    const [userid, setuserid] =useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error , seterror] = useState('')
    let navigate = useNavigate()
    const SubmitForm = async (e) =>{
        e.preventDefault();
        await axios.post('/user/create',{
            userid,
            email,
            password
        }).then(res =>{
            if(res.data.msg){
                seterror(res.data.msg)
            }else {
                console.log("user created")
                navigate('/')
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
                    <div className='mb-3'>
                        <Link className='btn btn-lg' to ="/"> <ArrowLeft color="royalblue" size={25} /> LogIn</Link>
                    </div>
                    <h3 className='text-center p-3'>Sign Up</h3>
                    {error ? <h4 className='text-danger h5'>{error}</h4>: ''}
                    <div>
                    <label className='h5 py-3' htmlFor="userid">User Id</label>
                    <input
                        id ="userid"
                        type="text"
                        className="form-control"
                        placeholder="Enter User Id"
                        value={userid}
                        onChange= {e => setuserid(e.target.value)}
                    />
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
                </form>
            </Col>
        </Row>
    </Container>

    </>
  )
}

export default Signup
