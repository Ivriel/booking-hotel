"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { subscribeNewsletter } from '@/lib/subscribe';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

function Footer() {
    const currentYear = new Date().getFullYear();
    const [subscribeEmail, setSubscribeEmail] = useState('')
    const [state, formAction, isPending] = useActionState(subscribeNewsletter, null)

    // reset isi value kalau udah kekirim
    useEffect(() => {
        if(state?.message) {
            setSubscribeEmail('')
            localStorage.removeItem('subscribeEmail')
        }
    }, [state?.message ])
    // dapatkan value saat halaman dimuat 
    useEffect(() => {
        setSubscribeEmail(localStorage.getItem('subscribeEmail') || '')
    }, [])

    // set item ke local storage 
    useEffect(() => {
        localStorage.setItem('subscribeEmail', subscribeEmail)
    }, [subscribeEmail])


    return (
        <footer className='bg-gray-900'>
            <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
                <div className="grid md:grid-cols-3 gap-7">
                    <div>
                        <Link href="/" className='mb-10 block'>
                            <Image src="/logo.png" alt='Logo Image' width={128} height={49} />
                        </Link>
                        <p className='text-gray-400'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid quisquam incidunt atque amet dolores? Natus!
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-20">
                            <div className="flex-1 md:flex-none">
                                <h4 className='mb-8 text-xl font-semibold text-white'>Links</h4>
                                <ul className='list-item space-y-5 text-gray-400'>
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/room">Rooms</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 md:flex-none">
                                <h4 className='mb-8 text-xl font-semibold text-white'>Legal</h4>
                                <ul className='list-item space-y-5 text-gray-400'>
                                    <li>
                                        <Link href="#">Legal</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Term & Condition</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Payment Method</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className='mb-8 text-xl font-semibold text-white'>Newsletter</h4>
                        <p className='text-gray-400'>
                            Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p>
                        <form action={formAction} className='mt-5'>
                            <div className="mb-5">
                                {state?.error?.email && (
                                    <p className="text-red-500 text-sm mb-2">
                                        {state.error.email}
                                    </p>
                                )}
                                {state?.message && (
                                    <p className="text-green-500 text-sm mb-2">{state.message}</p>
                                )}
                                <input type="email"
                                    value={subscribeEmail}
                                    onChange={(e) => setSubscribeEmail(e.target.value)}
                                    name='email'
                                    id='email'
                                    className='w-full p-3 rounded-sm bg-white text-black'
                                    placeholder='johndoe@gmail.com'
                                />
                            </div>
                            <button
                                type='submit'
                                disabled={isPending}
                                className={clsx(
                                    'bg-orange-400 p-3 font-bold text-white w-full text-center rounded-sm',
                                    {
                                        'hover:bg-orange-500': !isPending,
                                        'opacity-50 cursor-not-allowed': isPending
                                    }
                                )}>
                                {isPending ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
                &copy; Copyright {currentYear} | f0rgotten | All Right Reserved
            </div>
        </footer>
    )
}

export default Footer