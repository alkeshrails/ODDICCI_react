// React imports
import React from 'react';
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  //eslint-disable-next-line
  const phoneRegExp = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "26px"
  }

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      date_of_birth: '',
      phone: Number
    },

    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is Required!'),
      last_name: Yup.string().required('Last name is Required!'),
      email: Yup.string().required().matches(emailRegExp, 'Phone number is not valid'),
      phone: Yup.string().required('This field is Required').matches(phoneRegExp, 'Phone number is not valid'),
      date_of_birth: Yup.string().required('Date of birth is required')
    }),

    onSubmit: (values) => {
      const data = JSON.stringify({
        user: values
      });
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      axios.post("http://localhost:3001/users", data, config).then((res) => {
        if (res.status === 204) {
        alert('Register successfully')
      }
    })
    }
  });


  return (
    <div className='container'>

      <h5 style={buttonStyle}>Crm Form</h5>

      <form onSubmit={formik.handleSubmit}>
        <div className='form-group mt-2'>
          <label htmlFor='first_name' className=' mb-2'>First Name</label>
          <input type="text" className='form-control' id='first_name' name='first_name' value={formik.values.first_name} onChange={formik.handleChange} />
          <p><span style={{ color: 'red' }}>{ formik.errors.first_name }</span></p>
        </div>
        <div className='form-group mt-2'>
          <label htmlFor='last_name' className=' mb-2'>Last Name</label>
          <input type="text" className='form-control' id='last_name' name='last_name' value={formik.values.last_name} onChange={formik.handleChange} />
          <p><span style={{ color: 'red' }}>{ formik.errors.last_name }</span></p>
        </div>
        <div className='form-group mt-2'>
          <label htmlFor='Email' className=' mb-2'>Email</label>
          <input 
            id="email"
            placeholder="Enter your email"
            type="text"
            value={formik.values.email} onChange={formik.handleChange}
            className='form-control' name='email' />
          <p><span style={{ color: 'red' }}>{ formik.errors.email }</span></p>
        </div>
        <div className='form-group mt-2'>
          <label htmlFor='phoneNumber' className=' mb-2'>phone Number</label>
          <input type="text" className='form-control' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} />
          <p><span style={{ color: 'red' }}>{ formik.errors.phone }</span></p>
        </div>
        <div className='form-group mt-2'>
          <label htmlFor='date_of_birth' className=' mb-2'>Date Of Birth</label>
          <input type="text" className='form-control' id='date_of_birth' name='date_of_birth' value={formik.values.date_of_birth} onChange={formik.handleChange} />
          <p><span style={{ color: 'red' }}>{ formik.errors.date_of_birth }</span></p>
        </div>
        <div>
        <button type='submit' className='btn btn-primary'  style={buttonStyle}> submit form</button>
        </div>
      </form>
    </div>
  );
}

export default App
