import React, { useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import NorthIcon from '@mui/icons-material/North';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

function AiAssistant() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [openAi, setOpenAi] = useState(false);
    const [aiAssistantPrompt, setAiAssistantPrompt] = useState({ userMessage: '' });

    const handleSubmitAI = async () => {
        try {
            const response = await axios.post(`${API_URL}/chat`, { aiAssistantPrompt });
            console.log("AI Response:", response.data);
        } catch (error) {
            console.error("AI Error:", error.response?.data || error.message);
            alert("AI failed. Please try again.");
        }

        setAiAssistantPrompt({ userMessage: "" });
    };

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
                <DialogContent sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
                    {/* AI Prompt Box */}
                    <div className='border border-gray-400 flex justify-between items-center gap-2 px-2 rounded-full'>
                        <input
                            placeholder="Ask me anything, what you want to know?"
                            className='w-95 p-4 rounded-lg focus:outline-gray-400 outline-none'
                            onChange={(e) => { setAiAssistantPrompt((prev) => { return { ...prev, userMessage: e.target.value } }) }}
                            name='userMessage'
                            value={aiAssistantPrompt.userMessage}
                            rows={1}
                        />
                        <button className='border flex w-10 h-10 flex justify-center items-center bg-black rounded-full cursor-pointer' onClick={handleSubmitAI}>
                            <NorthIcon className='text-white' />
                        </button>
                    </div>
                </DialogContent>
                {/* <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
                    <div className='flex justify-end w-full items-center'>
                        <div className='flex gap-2'>
                            <button onClick={() => setOpenAi(false)} className='px-4 py-2 text-sm text-gray-700 border border-gray-300 hover:border-gray-400 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>
                            <button onClick={handleSubmitAI} className='px-4 py-2 text-sm text-[rgb(94,53,177)] rounded-lg flex items-center border border-[rgb(94,53,177,0.3)] cursor-pointer group duration-1000 hover:text-white before:duration-500 relative overflow-hidden z-[0] before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-r before:from-[rgb(94,53,177,0.5)] before:to-[rgb(94,53,177)] before:z-[-1] hover:before:w-full'>
                                <AutoAwesomeIcon fontSize='small' className='mr-2 text-[rgb(94,53,177)] group-hover:text-white group-hover:duration-5000' />
                                Generate Response
                            </button>
                        </div>
                    </div>
                </DialogActions> */}
            </Dialog>
        </>
    )
}

export default AiAssistant
