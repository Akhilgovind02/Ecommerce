import React, {useCallback, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Api} from '../../utils/Api'
import './index.css'

function Index() {
  const {replace, push} = useHistory()

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phone,setPhone] = useState('')
  const [price,setPrice] = useState('')
  const [sports,setSports] = useState('')
  const [description,setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [imageFile, setImageFile] = useState(null); 
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const status = 0

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  }

  const _handleSubmit = useCallback(async () => {
    if (
      firstname.length > 2 &&
      sports.length > 2 &&
      description.length > 2 &&
      lastname.length > 2 &&
      phone.length > 2 &&
      email.length > 2 &&
      password.length > 2 &&
      price.length > 2 &&
      imageFile
    ) {
      setLoading(true);

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64Image = reader.result; 
        console.log(base64Image);
        const { statusCode, data } = await Api.postRequest('/api/players/registerPlayer', {
          email,
          firstname,
          lastname,
          phone,
          sports,
          status,
          description,
          price,
          password,
          imageUrl: base64Image,
        });

        if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
          setLoading(false);
          alert(data);
          return;
        }
        alert(data);
        replace('/signin');
      };
    }
  }, [email, firstname, lastname, phone, password, sports, description, price, imageFile, replace]);




 



  if (loading) return <h1>Loading...</h1>
  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              // backgroundColor: 'red',
            }}
          >
            <div style={{cursor: 'pointer'}} onClick={() => push('/')}>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Signup</p>
          </div>

          <label for="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your full name.."
            value={firstname}
            onChange={e => setFirstName(e.target.value)}
          />
          <label for="fname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Your full name.."
            value={lastname}
            onChange={e => setLastName(e.target.value)}
          />

          <label for="email">Email</label>
          <input
            type="email"
            id="lname"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Your full name.."
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <label for="fname">Sports</label>
          <select onChange={e => setSports(e.target.value)}>
            <option>FootBall</option>
            <option>Cricket</option>
          </select>
          <label for="fname">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Your Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          /><br />
          <label for="fname">Description</label>
          <textarea onChange={e => setDescription(e.target.value)} id="description"></textarea>
          <label for="password">Password</label>
          <input
            type="password"
            id="lname"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Link to="/signin" className="link">
            <span>Already have an account ?</span>
          </Link>
          <br />

          <input type="submit" value="Sign up" onClick={_handleSubmit} />
        </div>
      </div>
    </div>
  )
}


export default Index
