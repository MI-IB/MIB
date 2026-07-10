'use client'

import { 
  LiveKitRoom, 
  VideoConference, 
  ControlBar,
  useTracks,
} from '@livekit/components-react'
import { Track } from 'livekit-client'
import { X } from 'lucide-react'

interface CallUIProps {
  token: string;
  onClose: () => void;
  video: boolean;
}

export default function CallUI({ token, onClose, video }: CallUIProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <div className="absolute top-4 right-4 z-[110]">
        <button 
          onClick={onClose}
          className="p-2 bg-dark-secondary rounded-full hover:bg-dark-tertiary text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <LiveKitRoom
        video={video}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: '100dvh' }}
        onDisconnected={onClose}
      >
        <VideoConference />
        <ControlBar />
      </LiveKitRoom>
    </div>
  )
}