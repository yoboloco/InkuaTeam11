import React from 'react'
import Navbar from '../components/navbar'
import Text from '../components/text'
import  Form  from '../components/form'
import Image from '../components/image'

function Contact() {
  return (
    <div>
    <Navbar/>
    <Text/>
    <p style={{ textAlign: 'center', fontSize: '18px' }}>
        Si sos una ONG o tenes un proyecto solidario vinculado a lo ambiental, por favor contáctanos.
      </p>
    <Form/>
    <Image/>

</div>
  )
}

export default Contact