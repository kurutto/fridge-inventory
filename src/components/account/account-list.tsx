import React from 'react'
import Button from '../ui/button'
import Box from '../ui/box'
import Heading from '../ui/heading'

const AccountList = () => {
  return (
      <ul className='space-y-4 pt-4'>
        <li className='text-center'>
          <Button color="outline" className='min-w-52'>アカウント1</Button>
        </li>
        <li className='text-center'>
        <Button color="outline" className='min-w-52'>アカウント2</Button>
        </li>
      </ul>
  )
}

export default AccountList