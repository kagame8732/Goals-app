import { useState,useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const {email,password} = formData

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
    toast.success('User logged in successfully')

  }
 
  return (
    <>
    <section className="heading">
      <h1><FaSignInAlt /> Login</h1>
      <p>Login and start setting goals</p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="email" className="form-control" id="email"
            name="email" placeholder="Enter your email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password"
            name="password" placeholder="Enter password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
  </>
  )
}

export default Login
