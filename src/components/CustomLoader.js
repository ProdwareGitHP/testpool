import React from 'react'
import { Oval } from 'react-loader-spinner'

const CustomLoader = () => {
  return (
<Oval
height={80}
width={80}
color="#124590"
wrapperStyle={{}}
wrapperClass=""
visible={true}
ariaLabel='oval-loading'
secondaryColor="#124590"
strokeWidth={2}
strokeWidthSecondary={2}

>

</Oval>
  )
}

export default CustomLoader