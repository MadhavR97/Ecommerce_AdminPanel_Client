import React, { useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import NorthIcon from '@mui/icons-material/North';
import { Box, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function AiAssistant() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [openAi, setOpenAi] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [model, setModel] = useState('openai/gpt-4o-mini')

    const handleSubmitAI = async () => {
        if (!prompt.trim()) return

        console.log(model)

        const userMessage = {
            role: 'user',
            content: prompt
        }

        setMessages(prev => [...prev, userMessage])
        setPrompt('')
        setLoading(true)

        console.log(messages)

        try {
            const res = await axios.post(`${API_URL}/aiAssistant`, { message: userMessage.content, model })

            const aiMessage = {
                role: 'assistant',
                content: res.data.reply,
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error(error)
            alert('AI error, try again')
        } finally {
            setLoading(false)
        }
    }

    const handleClearChat = () => {
        setMessages([])
        setPrompt('')
        setModel('openai/gpt-4o-mini')
        setLoading(false)
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
                    <div>
                        <button className='text-[10px] border border-[rgb(94,53,177)] text-white bg-[rgb(94,53,177)] hover:bg-[rgb(94,53,177,0.9)] py-1 px-2 rounded mr-3 cursor-pointer' onClick={handleClearChat}>Clear chat</button>
                        <CloseIcon className='cursor-pointer border p-1 rounded-sm text-white bg-gray-500' onClick={() => setOpenAi(false)} />
                    </div>
                </DialogTitle>
                <DialogContent
                    sx={{
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <div className="flex-1 overflow-y-auto p-6 space-y-3">
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

                    <div className="p-5">
                        <div className="flex items-center gap-2 border border-gray-400 px-2 py-1 rounded-full">
                            <input
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2 text-sm rounded-full outline-none border-none bg-transparent"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmitAI()}
                            />
                            <FormControl size="small">
                                <Select
                                    displayEmpty
                                    key={model}
                                    value={model}
                                    onChange={(e) => { setModel(e.target.value) }}
                                    sx={{
                                        height: "36px",
                                        fontSize: "12px",
                                        borderRadius: "999px",
                                        width: "180px",
                                        backgroundColor: "#f5f5f5",
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        }
                                    }}
                                >
                                    <MenuItem className='whiteSpace-nowrap' value="openai/gpt-4o-mini">openai/gpt-4o-mini</MenuItem>
                                    <MenuItem className='whiteSpace-nowrap' value="deepseek/deepseek-chat">deepseek/deepseek-chat</MenuItem>
                                    <MenuItem className='whiteSpace-nowrap' value="anthropic/claude-3-haiku">anthropic/claude-3-haiku</MenuItem>
                                    <MenuItem className='whiteSpace-nowrap' value="meta-llama/llama-3.3-70b-instruct">meta-llama/llama-3.3-70b-instruct</MenuItem>
                                    <MenuItem className='whiteSpace-nowrap' value="mistralai/mistral-7b-instruct">mistralai/mistral-7b-instruct</MenuItem>
                                </Select>
                            </FormControl>

                            <button onClick={handleSubmitAI} className="w-10 h-10 flex items-center justify-center bg-black rounded-full hover:bg-gray-800 transition">
                                <NorthIcon className="text-white" />
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
};


export default AiAssistant
