import React, { useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import NorthIcon from '@mui/icons-material/North';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

function AiAssistant() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [openAi, setOpenAi] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmitAI = async () => {
        if (!prompt.trim()) return

        const userMessage = {
            role: 'user',
            content: prompt,
        }

        setMessages(prev => [...prev, userMessage])
        setPrompt('')
        setLoading(true)

        console.log(messages)

        try {
            const res = await axios.post(`${API_URL}/aiAssistant`, { message: userMessage.content })

            console.log('Response Ai', res.data.reply[0].message.content)

            const aiMessage = {
                role: 'assistant',
                content: res.data.reply[0].message.content,
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error(error)
            alert('AI error, try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button className='border border-[rgb(94,53,177,0.3)] hover:border-[rgb(94,53,177)] bg-[rgb(237,231,246)] flex items-center mr-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm' onClick={() => { setOpenAi(true) }}>
                <AutoAwesomeIcon className='mr-2 text-[rgb(94,53,177)]' fontSize='small' />
                <span className='whitespace-nowrap text-xs text-[rgb(94,53,177)] font-semibold'>AI Assistant</span>
            </button>
            <Dialog open={openAi} onClose={() => setOpenAi(false)} maxWidth="sm" fullWidth sx={{ display: 'flex', justifyContent: 'right' }} PaperProps={{ sx: { borderRadius: '20px', overflow: 'hidden', border: '0px solid rgb(94,53,177)', width: '500px', height: '100%' } }}>
                <DialogTitle sx={{ paddingX: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <div className='flex items-center mt-1'>
                        <AutoAwesomeIcon className='mr-3' />
                        <span className='text-xl font-bold'>AI Assistant</span>
                    </div>
                    <CloseIcon className='cursor-pointer' onClick={() => setOpenAi(false)} />
                </DialogTitle>
                <DialogContent
                    sx={{
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-[rgb(94,53,177)] text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl'
                                    : 'bg-gray-200 text-black rounded-tr-2xl rounded-br-2xl rounded-tl-2xl'
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="text-gray-400 text-sm">AI is typing...</div>
                        )}
                    </div>

                    {/* Input Box */}
                    <div className="p-5">
                        <div className='flex border border-gray-500 p-1 rounded-full gap-2'>
                            <input
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2 rounded-full outline-none"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmitAI()}
                            />
                            <button
                                className="w-10 h-10 flex justify-center items-center bg-black rounded-full"
                                onClick={handleSubmitAI}
                            >
                                <NorthIcon className="text-white" />
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
};


export default AiAssistant
