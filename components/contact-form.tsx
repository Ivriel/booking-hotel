"use client"
import { useActionState } from 'react'
import { ContactMessage } from '@/lib/actions'
import { useEffect,useState } from 'react'
import clsx from 'clsx'

function ContactForm() {
  const [state,formAction,isPending] = useActionState(ContactMessage,null)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [subject,setSubject] = useState('')
  const [message,setMessage] = useState('')

// bersihkan semua form kalau pengiriman berhasil wir

useEffect(() => {
if(state?.message) {
  setName('')
  setEmail('')
  setSubject('')
  setMessage('')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('subject')
  localStorage.removeItem('message')
}
},[state?.message])
 // Ambil data dari localStorage saat komponen dimuat
 useEffect(() => {
  setName(localStorage.getItem('name') || '');
  setEmail(localStorage.getItem('email') || '');
  setSubject(localStorage.getItem('subject')||'')
  setMessage(localStorage.getItem('message') || '');
}, []);

  // Simpan data ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('subject',subject)
    localStorage.setItem('email', email);
    localStorage.setItem('message', message);
  }, [name, email,subject, message]);
  
  return (
    <div className='bg-white p-8 rounded-sm shadow-sm'>
      {state?.message?(
        <div className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-green-50" role='alert'>
          <div className="font-medium">{state.message}</div>
        </div>
      ):null}
        <form action={formAction}>
            <div className="grid md:grid-cols-2 gap-7 mt-6">
                <div>
                     <input type="text" value={name}  onChange={(e) => setName(e.target.value)} name='name' className='bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light' placeholder='tour name' id='name' />
                      <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>{state?.error?.name}</p>
                      </div>
                </div>
                <div>
                     <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)}  name='email' className='bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light' placeholder='johndoe@example.com' id='email' />
                      <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>{state?.error?.email}</p>
                      </div>
                </div>
                <div className='md:col-span-2'>
                     <input type="text" value={subject}  onChange={(e) => setSubject(e.target.value)} name='subject' className='bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light' placeholder='subject' id='subject'/>
                      <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>{state?.error?.subject}</p>
                      </div>
                </div>
                <div className='md:col-span-2'>
                     <textarea name='message' value={message}  onChange={(e) => setMessage(e.target.value)} rows={5} className='bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light' placeholder='your message' id='message'>
                      </textarea>
                      <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>{state?.error?.message}</p>
                      </div>
                </div>
            </div>
            <button type='submit' disabled={isPending} className={clsx("px-10 text-center py-4 font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer",{
              "opacity-50 cursor-progress animate-pulse" : isPending
            })}>
              {isPending?"Loading...":"Send Message"}
            </button>
        </form>
    </div>
  )
}

export default ContactForm