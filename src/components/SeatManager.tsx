'use client'
import { getRoomByIdThunk } from '@/features/rooms/roomThunks'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Seat } from '@/types/rooms'
import React, { useEffect, useState } from 'react'
import SeatGrid from './SeatGrid'

interface seatprops{
    roomId:string
}

const SeatManager = ({roomId}:seatprops) => {
  const {isAdmin} = useAppSelector(state=>state.auth)
  const [seats,setSeats]=useState<Seat[][]>([])
  const [roomName,setRoomName] = useState("")

    const dispatch = useAppDispatch()

    const fetchRoom = async()=>{
        const room = await dispatch(getRoomByIdThunk(roomId)) as { payload: { name: string; layout: Seat[][] } }
        // console.log('room',room);
        setRoomName(room.payload?.name)
        setSeats(room?.payload?.layout)
    }
    // console.log("seats",seats);
    

    useEffect(()=>{
        fetchRoom()
    },[])

  return (
    <div className='p-6'>
      <h2 className='text-center my-4'>{roomName}</h2>
      {seats.length > 0 && (
        <>
        <SeatGrid seats={seats} isAdmin={isAdmin} roomId={roomId}/>
        </>
      )}
    </div>
  )
}

export default SeatManager