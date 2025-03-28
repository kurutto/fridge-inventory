import AccountList from '@/components/account/account-list'
import CreateAccount from '@/components/account/create-account'
import Heading from '@/components/ui/heading'
import Paragraph from '@/components/ui/paragraph'
import React from 'react'

const page = () => {
  return (
    <>
      <Heading level={1}>FIショッピングリスト</Heading>
      <AccountList />
      <Paragraph color='gray' className='text-center'>or</Paragraph>
      <CreateAccount />
    </>
  )
}

export default page