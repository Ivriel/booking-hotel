"use client"
import React from 'react'
import { useRef, useState, useTransition, useActionState, useEffect } from 'react'
import { saveRoom } from '@/lib/actions'
import { IoCloudUploadOutline, IoTrashOutline } from 'react-icons/io5'
import { type PutBlobResult } from '@vercel/blob'
import Image from 'next/image'
import { BarLoader } from 'react-spinners'
import { Amenities } from '@prisma/client'
import clsx from 'clsx'

function CreateForm({ amenities }: { amenities: Amenities[] }) {
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState("")
    const [message, setMessage] = useState("")
    const [pending, startTransition] = useTransition()
    const [roomName, setRoomName] = useState("")
    const [description, setDescription] = useState("")
    const [capacity, setCapacity] = useState("")
    const [price, setPrice] = useState("")

    const handleUpload = () => {
        if (!inputFileRef.current?.files) return null;
        const file = inputFileRef.current.files[0]
        const formData = new FormData()
        formData.set("file", file)
        startTransition(async () => {
            try {
                const response = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData
                })
                const data = await response.json()
                if (response.status !== 200) {
                    setMessage(data.message)
                }
                const img = data as PutBlobResult
                setImage(img.url)
            } catch (error) {
                console.log(error)
            }
        })
    }

    const deleteImage = (image: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this image?");
        if (!confirmed) return; // kalau false

        startTransition(async () => {
            try {
                await fetch(`/api/upload/?imageUrl=${image}`, {
                    method: "DELETE"
                })
                setImage("")
            } catch (error) {
                console.log(error)
            }
        })
    }

    const [state, formAction, isPending] = useActionState(saveRoom.bind(null, image), null);

    // bersihkan semua form kalau pengiriman berhasil wir

// useEffect(() => {
//     if(state?.message) {
//       setRoomName('')
//       setDescription('')
//       setCapacity('')
//       setPrice('')
//       localStorage.removeItem('room_name')
//       localStorage.removeItem('description')
//       localStorage.removeItem('capacity')
//       localStorage.removeItem('price')
//     }
//     },[state?.message])
     // Ambil data dari localStorage saat komponen dimuat
     useEffect(() => {
      setRoomName(localStorage.getItem('room_name') || '');
      setDescription(localStorage.getItem('description') || '');
      setCapacity(localStorage.getItem('capacity')||'')
      setPrice(localStorage.getItem('price') || '');
    }, []);
    
      // Simpan data ke localStorage setiap kali ada perubahan
      useEffect(() => {
        localStorage.setItem('room_name', roomName);
        localStorage.setItem('description',description)
        localStorage.setItem('capacity', capacity);
        localStorage.setItem('price', price);
      }, [roomName,description,capacity,price]);

    return (
        <form action={formAction}>
            <div className="grid md:grid-cols-12 gap-5">
                <div className="col-span-8 shadow-lg bg-white p-4 rounded-lg">
                    <div className="mb-4">
                        <input type="text" name="name" value={roomName}
                            onChange={(e) => setRoomName(e.target.value)} placeholder="Room Name" className='py-2 px-4 rounded-sm border border-gray-400 w-full' />
                        <div aria-live='polite' aria-atomic="true">
                            <span className='text-sm text-red-500 mt-2 '>{state?.error?.name}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea name="description" value={description}
                            onChange={(e) => setDescription(e.target.value)} placeholder='Description' rows={8} className='py-2 px-4 rounded-sm border border-gray-400 w-full'></textarea>
                        <div aria-live='polite' aria-atomic="true">
                            <span className='text-sm text-red-500 mt-2 '>{state?.error?.description}</span>
                        </div>
                    </div>
                    <div className="mb-4 grid md:grid-cols-3">
                        {amenities.map((item) => (
                            <div className='flex items-center mb-4' key={item.id}>
                                <input type="checkbox" defaultValue={item.id} name="amenities" placeholder="Room Name" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded' />
                                <label className='ms-2 text-sm font-medium text-gray-900 capitalize'>
                                    {item.name}
                                </label>
                            </div>
                        ))}

                        <div aria-live='polite' aria-atomic="true">
                            <span className='text-sm text-red-500 mt-2 '>{state?.error?.amenities}</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 rounded-lg shadow-lg bg-white p-4">
                    <label htmlFor="input-file" className='flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative'>
                        <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">

                            {pending ? <BarLoader /> : null}
                            {image ? ( // kalau ada gambar tampilkan button delete image
                                <button type='button' onClick={() => deleteImage(image)} className='flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-400'>
                                    <IoTrashOutline className='size-4 text-transparent hover:text-white cursor-pointer' />
                                </button>
                            ) : (// kalau gaada gambar tampilkan ini
                                <div className="flex flex-col items-center justify-center">
                                    <IoCloudUploadOutline className='size-8 cursor-pointer' />
                                    <p className='mb-1 text-sm font-bold'>Select Image</p>
                                    {message ? (
                                        <p className='text-xs text-red-500'>{message}</p>
                                    ) : (
                                        <p className='text-xs'>SVG,PNG,JPG,GIF, or Others (Max: 4MB)</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {!image ? (
                            <input type="file" ref={inputFileRef} onChange={handleUpload} id='input-file' className='hidden' />) :
                            (
                                <Image src={image} alt="Image" width={640} height={360} className='rounded-md absolute aspect-video object-cover' />
                            )}
                    </label>
                    <div className="mb-4">
                        <input type="text" name="capacity" value={capacity}
                            onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" className='py-2 px-4 rounded-sm border border-gray-400 w-full' />
                        <div aria-live='polite' aria-atomic="true">
                            <span className='text-sm text-red-500 mt-2 '>{state?.error?.capacity}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <input type="text" name="price" value={price}
                            onChange={(e) => setPrice(e.target.value)} placeholder="Price" className='py-2 px-4 rounded-sm border border-gray-400 w-full' />
                        <div aria-live='polite' aria-atomic="true">
                            <span className='text-sm text-red-500 mt-2 '>{state?.error?.price}</span>
                        </div>
                    </div>
                    {/* General Message */}
                    {state?.message ? (
                        <div className="mb-4 bg-red-200 p-2 rounded-md text-center">
                            <span className='text-sm text-gray-700 mt-2'>{state.message}</span>
                        </div>
                    ) : null}
                    <button type='submit' disabled={isPending} className={clsx('bg-orange-400 rounded-md text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer', {
                        "opacity-50 cursor-progress": isPending,
                    })}>
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CreateForm