import React, { useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import NorthIcon from '@mui/icons-material/North';
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import api from '../api/axios'

function AiAssistant() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [openAi, setOpenAi] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [model, setModel] = useState('openai/gpt-4o-mini')

    const handleSubmitAI = async () => {
        if (!prompt.trim()) return

        const userMessage = {
            role: 'user',
            content: prompt
        }

        setMessages(prev => [...prev, userMessage])
        setPrompt('')
        setLoading(true)

        try {
            const res = await api.post(`/aiAssistant`, { message: userMessage.content, model })

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
            <button className={`border border-[rgb(94,53,177,0.3)] bg-[rgb(237,231,246)] flex items-center mr-3 p-2 md:px-4 md:py-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm relative overflow-hidden group z-[0] hover:bg-[rgb(94,53,177)] md:hover:bg-transparent ${openAi && 'bg-gradient-to-r from-[rgb(94,53,177)] to-[rgb(94,53,177,0.4)]'} before:hidden md:before:block hover:be before:w-0 before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:from-[rgb(94,53,177)] before:to-[rgb(94,53,177,0.4)] before:duration-1000 before:z-[-1] hover:before:w-full`} onClick={() => { setOpenAi(true) }}>
                <AutoAwesomeIcon className='md:mr-2 text-[rgb(94,53,177)] group-hover:text-white' fontSize='small' />
                <span className='whitespace-nowrap text-xs text-[rgb(94,53,177)] font-semibold duration-1000 group-hover:text-white hidden md:block'>AI Assistant</span>
            </button>
            <Dialog
                open={openAi}
                onClose={() => setOpenAi(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'right' },
                    alignItems: { xs: 'center', sm: 'flex-start' }
                }}
                PaperProps={{
                    sx: {
                        borderRadius: { xs: '0px', sm: '20px 0 0 20px' },
                        overflow: 'hidden',
                        border: '0px solid rgb(94,53,177)',
                        width: { xs: '100vw', sm: '500px' },
                        height: { xs: '100vh', sm: '100%' },
                        maxHeight: { xs: '100vh', sm: '100%' },
                        margin: { xs: '0', sm: '0' },
                        backgroundColor: '#1a1a1a',
                    }
                }}
            >
                <DialogTitle className="flex items-center justify-between bg-gray-900 px-3 py-3 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <AutoAwesomeIcon className="text-purple-400" />
                        <span className="text-xl font-bold text-white">AI Assistant</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="rounded bg-purple-700 px-3 py-1 text-xs text-white hover:bg-purple-600 transition-colors cursor-pointer border border-purple-700" onClick={handleClearChat}>Clear chat</button>
                        <CloseIcon className="cursor-pointer rounded-sm border bg-gray-700 p-1 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors" onClick={() => setOpenAi(false)} />
                    </div>
                </DialogTitle>

                <DialogContent
                    sx={{
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: { xs: 'calc(95vh - 64px)', sm: '100%' },
                        backgroundColor: '#1a1a1a',
                    }}
                >
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-gray-900">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-purple-700 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl'
                                    : 'bg-gray-800 text-gray-100 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl'
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="text-gray-500 text-sm">AI is typing...</div>
                        )}
                    </div>

                    <div className="p-4 sm:p-5 bg-gray-900 border-t border-gray-800">
                        <div className="flex flex-col sm:flex-row items-center gap-2 border border-gray-700 px-2 py-1 sm:py-1 rounded-xl sm:rounded-full bg-gray-800">
                            <input
                                placeholder="Ask me anything..."
                                className="flex-1 w-full sm:w-auto px-4 py-2 text-sm rounded-full outline-none border-none bg-transparent text-white placeholder-gray-400"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmitAI()}
                            />

                            <div className="flex items-center w-full sm:w-auto gap-2">
                                <FormControl size="small" sx={{ width: { xs: '100%', sm: '180px' } }}>
                                    <Select
                                        key={model}
                                        value={model}
                                        onChange={(e) => { setModel(e.target.value) }}
                                        sx={{
                                            height: "36px",
                                            fontSize: { xs: "11px", sm: "12px" },
                                            borderRadius: "999px",
                                            width: "100%",
                                            backgroundColor: "#2d2d2d",
                                            color: "white",
                                            "& .MuiSelect-icon": {
                                                color: "white"
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                border: "none",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none",
                                            }
                                        }}
                                    >
                                        <MenuItem className='whiteSpace-nowrap text-white bg-gray-800 hover:bg-gray-700' value="openai/gpt-4o-mini">openai/gpt-4o-mini</MenuItem>
                                        <MenuItem className='whiteSpace-nowrap text-white bg-gray-800 hover:bg-gray-700' value="deepseek/deepseek-chat">deepseek/deepseek-chat</MenuItem>
                                        <MenuItem className='whiteSpace-nowrap text-white bg-gray-800 hover:bg-gray-700' value="anthropic/claude-3-haiku">anthropic/claude-3-haiku</MenuItem>
                                        <MenuItem className='whiteSpace-nowrap text-white bg-gray-800 hover:bg-gray-700' value="meta-llama/llama-3.3-70b-instruct">meta-llama/llama-3.3-70b-instruct</MenuItem>
                                        <MenuItem className='whiteSpace-nowrap text-white bg-gray-800 hover:bg-gray-700' value="mistralai/mistral-7b-instruct">mistralai/mistral-7b-instruct</MenuItem>
                                    </Select>
                                </FormControl>

                                <button onClick={handleSubmitAI} className="w-10 h-10 flex-shrink-0 flex items-center justify-center cursor-pointer bg-purple-700 rounded-full hover:bg-purple-600 transition">
                                    <NorthIcon className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default AiAssistant