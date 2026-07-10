'use client'

import { Search, MoreVertical, MessageSquare, Users, Trash2, Plus } from 'lucide-react'
import { Contact } from '@/lib/types'
import { useState } from 'react'

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedId?: string;
  isAdmin: boolean;
  onAddContact: () => void;
  onRemoveContact: (id: string) => void;
}

export default function Sidebar({ 
  contacts, 
  onSelectContact, 
  selectedId, 
  isAdmin, 
  onAddContact, 
  onRemoveContact 
}: SidebarProps) {
  const [search, setSearch] = useState('')

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="w-[400px] flex flex-col border-r border-dark-tertiary h-full bg-dark-primary">
      {/* Header */}
      <div className="h-[60px] bg-dark-secondary flex items-center justify-between px-4">
        <div className="w-10 h-10 rounded-full bg-dark-tertiary flex items-center justify-center">
          <span className="text-dark-text font-bold">M</span>
        </div>
        <div className="flex gap-4 text-dark-muted">
          {isAdmin && (
            <button onClick={onAddContact} title="Ajouter un contact">
              <Plus className="w-6 h-6 hover:text-dark-text cursor-pointer" />
            </button>
          )}
          <Users className="w-6 h-6 hover:text-dark-text cursor-pointer" />
          <MessageSquare className="w-6 h-6 hover:text-dark-text cursor-pointer" />
          <MoreVertical className="w-6 h-6 hover:text-dark-text cursor-pointer" />
        </div>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="bg-dark-secondary rounded-lg flex items-center px-4 py-2 gap-4">
          <Search className="w-5 h-5 text-dark-muted" />
          <input 
            type="text" 
            placeholder="Rechercher ou démarrer une discussion"
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-dark-muted"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((contact) => (
          <div 
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`flex items-center px-4 py-3 gap-3 hover:bg-dark-secondary cursor-pointer transition-colors ${selectedId === contact.id ? 'bg-dark-secondary' : ''}`}
          >
            <div className="w-12 h-12 rounded-full bg-dark-tertiary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-dark-text font-medium truncate">{contact.name}</h3>
                <span className="text-xs text-dark-muted">{contact.time}</span>
              </div>
              <p className="text-sm text-dark-muted truncate">{contact.lastMessage}</p>
            </div>
            {isAdmin && (
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveContact(contact.id)
                }}
                className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-dark-tertiary rounded-full transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}