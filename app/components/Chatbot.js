'use client'

import { useState } from 'react'

export default function Chatbot() {

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I am Victoria's AI assistant. Ask me anything about her skills, projects or experience! 👋"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  function toggleChat() {
    setIsOpen(prev => !prev)
  }

  async function sendMessage() {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`Server error ${response.status}: ${text}`)
      }

      const data = await response.json()

      setMessages([...newMessages, {
        role: 'assistant',
        content: data.reply ?? 'Sorry, I could not get a response.'
      }])

    } catch (error) {
      console.error('Chat error:', error)
      setMessages([...newMessages, {
        role: 'assistant',
        content: '⚠️ Something went wrong. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chatbot-wrapper">

      {isOpen && (
        <div className="chatbot-window">

          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">V</div>
              <div>
                <p className="chatbot-name">Victoria s Assistant</p>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button onClick={toggleChat} className="chatbot-close">✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'chat-bubble user' : 'chat-bubble assistant'}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble assistant">Thinking...</div>
            )}
          </div>

          <div className="chatbot-input-area">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me about Victoria..."
              className="chatbot-input"
            />
            <button onClick={sendMessage} className="chatbot-send">➤</button>
          </div>

        </div>
      )}

      <button onClick={toggleChat} className="chatbot-toggle">
        {isOpen ? '✕' : '💬'}
      </button>

    </div>
  )
}