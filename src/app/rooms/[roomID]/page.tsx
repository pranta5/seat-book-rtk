'use client';

import { useParams } from 'next/navigation';
import SeatManager from '@/components/SeatManager';

export default function SingleRoomPage() {
  const params = useParams();
  const roomId = params?.roomID as string;
  console.log("roomid",roomId);
  

  return (
    <div>
      <SeatManager roomId={roomId} />
    </div>
  );
}
