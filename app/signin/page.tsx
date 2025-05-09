import React from 'react'
import {LoginGoogleButton} from '@/components/login-button'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title:"Sign In",
}
async function SignInPage({// karena promise maka ditambahkan async pada functionnya 
  searchParams
}: {
  searchParams?:Promise<{redirect_url?:string}>
}) { 
  const params = (await searchParams)?.redirect_url
  let redirectUrl;
  if(!params) {
    redirectUrl = "/"
  } else {
    redirectUrl= `/${params}`
  }
  return (
    <div className="min-h-screen flex items-center">
        <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
            <h1 className='text-4xl font-bold mb-1'>Sign In</h1>
            <p className='font-medium mb-5 text-gray-500 '>Sign In to your account</p>
            <div className="py-4 text-center">
                <LoginGoogleButton redirectUrl = {redirectUrl}/>
            </div>
        </div>
    </div>
  )
}

export default SignInPage