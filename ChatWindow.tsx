'use client'

import { MoreVertical, Phone, Video, Search, Smile, Paperclip, Mic, Send } from 'lucide-react'
import { Contact, Message } from '@/lib/types'
import { useState } from 'react'

interface ChatWindowProps {
  contact?: Contact;
  onCall: (type: 'audio' | 'video') => void;
}

export default function ChatWindow({ contact, onCall }: ChatWindowProps) {
  const [input, setInput] = useState('')

  if (!contact) {
    return (
      <div className="flex-1 bg-dark-secondary flex flex-col items-center justify-center border-b-[6px] border-dark-highlight">
        <div className="text-center">
          <h2 className="text-3xl font-light text-dark-text mt-4">MIB Chat</h2>
          <p className="text-sm text-dark-muted mt-4 max-w-sm">
            Envoyez et recevez des messages sans garder votre téléphone connecté.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b141a]">
      {/* Header */}
      <div className="h-[60px] bg-dark-secondary flex items-center justify-between px-4 border-l border-dark-tertiary">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-dark-tertiary" />
          <div>
            <h3 className="text-dark-text font-medium leading-none">{contact.name}</h3>
            <span className="text-xs text-dark-muted">en ligne</span>
          </div>
        </div>
        <div className="flex gap-6 text-dark-muted">
          <button onClick={() => onCall('audio')} title="Appel vocal">
            <Phone className="w-5 h-5 hover:text-dark-text" />
          </button>
          <button onClick={() => onCall('video')} title="Appel vidéo">
            <Video className="w-5 h-5 hover:text-dark-text" />
          </button>
          <Search className="w-5 h-5 cursor-pointer hover:text-dark-text" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-dark-text" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-10 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-40">
        {/* Placeholder for messages */}
        <div className="flex justify-start">
          <div className="bg-dark-secondary p-2 rounded-lg max-w-xs text-sm">
            Salut ! Comment ça va ?
            <span className="text-[10px] text-dark-muted block text-right mt-1">10:45</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-dark-highlight text-black p-2 rounded-lg max-w-xs text-sm">
            Ça va super, et toi ?
            <span className="text-[10px] text-dark-primary/60 block text-right mt-1">10:46</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="min-h-[62px] bg-dark-secondary flex items-center px-4 py-2 gap-4">
        <Smile className="w-6 h-6 text-dark-muted cursor-pointer" />
        <Paperclip className="w-6 h-6 text-dark-muted cursor-pointer" />
        <div className="flex-1 bg-dark-tertiary rounded-lg px-4 py-2">
          <input 
            type="text" 
            placeholder="Taper un message"
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-dark-muted"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {input ? (
          <Send className="w-6 h-6 text-dark-highlight cursor-pointer" />
        ) : (
          <Mic className="w-6 h-6 text-dark-muted cursor-pointer" />
        )}
      </div>
    </div>
  )
}