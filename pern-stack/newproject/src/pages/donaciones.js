import React from 'react'
import Navbar from '../components/navbar'
import DonationForm from '../components/DonationForm';
import Image from '../components/image'
import Text from '../components/text';

function Donaciones() {
  return (
    <div>
        <Navbar/>
        <Text/>
        <DonationForm/>
        <Image/>
    </div>
  )
}

export default Donaciones;