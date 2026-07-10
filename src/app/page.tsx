'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatWindow from '@/components/ChatWindow'
import CallUI from '@/components/CallUI'
import { Contact } from '@/lib/types'

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Joe Mib', lastMessage: 'Salut admin !', time: '10:45', status: 'online' },
  { id: '2', name: 'Karim', lastMessage: 'Appelle-moi plus tard', time: 'Hier', status: 'offline' },
]

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>()
  const [isAdmin, setIsAdmin] = useState(true) // Simulé pour le démo
  const [activeCall, setActiveCall] = useState<{type: 'audio' | 'video', contact: Contact, token?: string} | null>(null)

  const handleAddContact = () => {
    const name = prompt('Nom du nouveau contact :')
    if (name) {
      const newContact: Contact = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        lastMessage: 'Nouveau contact ajouté',
        time: 'Maintenant',
        status: 'offline'
      }
      setContacts([...contacts, newContact])
    }
  }

  const handleRemoveContact = (id: string) => {
    if (confirm('Supprimer ce contact ?')) {
      setContacts(contacts.filter(c => c.id !== id))
      if (selectedContact?.id === id) setSelectedContact(undefined)
    }
  }

  const handleStartCall = (type: 'audio' | 'video') => {
    if (selectedContact) {
      // Dans un cas réel, on appellerait une API pour générer un token LiveKit
      setActiveCall({ type, contact: selectedContact, token: 'dev-token' })
    }
  }

  return (
    <main className="h-screen w-screen flex overflow-hidden">
      <Sidebar 
        contacts={contacts}
        selectedId={selectedContact?.id}
        onSelectContact={setSelectedContact}
        isAdmin={isAdmin}
        onAddContact={handleAddContact}
        onRemoveContact={handleRemoveContact}
      />
      
      <ChatWindow 
        contact={selectedContact}
        onCall={handleStartCall}
      />

      {/* Interface d'appel LiveKit */}
      {activeCall && activeCall.token && (
        <CallUI 
          token={activeCall.token}
          video={activeCall.type === 'video'}
          onClose={() => setActiveCall(null)}
        />
      )}
    </main>
  )
}
