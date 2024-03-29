import React, {useEffect} from 'react';
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from "axios";
import Spinner from '../components/Spinner';

function Login() {
  
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const rules = [
    {
      required: true,
      message: "required",
    }
  ]

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem('Expense Tracker- User', JSON.stringify({...response.data, password: ""}));
      setLoading(false);
      message.success("Login Successful");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login Failed");
    }
  };

  useEffect(() => {
     if(localStorage.getItem('Expense Tracker- User')){
       navigate("/");
     }
  }, []);

  return (
    <div className="register">
      {loading && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">

        {/* Lottie Animations */}
        <div className="col-md-5">
           <div className="lottie">
              <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json" background="transparent" speed="1" loop autoplay></lottie-player>
           </div>
        </div>

        {/* Form */}
        <div className="col-md-4">
            <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                <h1 className="mb-4">Expense Tracker- LOGIN</h1>
                <Form.Item label="Email" name="email" rules={rules}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Password" name="password" rules={rules}>
                    <Input type="password"/>
                </Form.Item>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/register">Not Registered Yet, Click Here To Register</Link>
                    <button className="primary" type="submit">Login</button>
                </div>
            </Form>
        </div>

        

      </div>
    </div>
  )
}

export default Login;
