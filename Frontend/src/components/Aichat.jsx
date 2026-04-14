import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from 'lucide-react';

const Aichat = ({problem}) => {
    const [messages, setMessages] = useState([
        { role: 'model', parts:[{text: "Hi! I can help you understand this problem. Ask me anything about the statement, examples, or how to approach it."}]},
    ]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors },  } = useForm();
    const messagesEndRef = useRef(null);

    const onSubmit = async (data) => {
        const userMessage = { role: 'user', parts:[{text: data.message}] };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setError(null);
        setIsSending(true);

        try{
            // Send the full conversation (including new user message) to the backend chat endpoint
            const response = await axiosClient.post("/ai/chat", {
                messages: updatedMessages,
                title: problem?.title,
                description: problem?.description,
                testCases: problem?.visibleTestCases,
                startCode: problem?.startCode || problem?.StartCode
            });
            const botReply = response?.data?.answer || response?.data?.message || "I'm thinking...";

            setMessages(prev => [...prev, { 
                role: 'model', 
                parts:[{text: botReply}] 
            }]);
        }


        catch(error)
        {
            console.error("API Error:", error);
            setError(error?.response?.data?.error || "Something went wrong. Please try again.");
            setMessages(prev => [...prev, { 
                role: 'model', 
                parts:[{text: "Error from AI Chatbot"}]
            }]);    
        }
        finally{
            setIsSending(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const bubbleStyles = (role) =>
        role === "user"
            ? "bg-gradient-to-r from-cyan-500/80 to-blue-500/80 text-white"
            : "bg-base-200 text-base-content";

    const roleLabel = (role) => (role === "user" ? "You" : "AI");

    // Preserve newlines and basic spacing for AI output and user messages
    const renderText = (text) => (
        <div className="whitespace-pre-wrap leading-relaxed text-sm">
            {text}
        </div>
    );

    return (
        <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 border-b border-base-300 bg-base-100 sticky top-0 z-10">
                <span className="font-semibold text-cyan-400">AI Helper</span>
                <span className="text-gray-500">for</span>
                <span className="text-gray-200 truncate">{problem?.title || "this problem"}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/40">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="avatar"
                                    src={
                                        msg.role === "user"
                                            ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                            : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                    }
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {roleLabel(msg.role)}
                            <time className="text-[11px] opacity-50 ml-1">
                                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </time>
                        </div>
                        <div className={`chat-bubble ${bubbleStyles(msg.role)} shadow-md`}>
                            {renderText(msg.parts[0].text)}
                        </div>
                        <div className="chat-footer opacity-50 text-[11px]">
                            {msg.role === "user" ? "Delivered" : "Seen"}
                        </div>
                    </div>
                ))}
                {isSending && (
                    <div className="chat chat-start">
                        <div className="chat-header text-xs mb-1 text-gray-400 px-1">AI</div>
                        <div className="chat-bubble bg-base-200 text-base-content animate-pulse shadow-md">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {error && (
                <div className="px-4 py-2 text-sm text-rose-400 bg-rose-950/40 border-t border-rose-900">
                    {error}
                </div>
            )}
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="sticky bottom-0 p-4 bg-base-100 border-t"
            >
                <div className="flex items-center">
                    <input 
                        placeholder="Ask me anything" 
                        className="input input-bordered flex-1" 
                        {...register("message", { required: true, minLength: 2 })}
                    />
                    <button 
                        type="submit" 
                        className="btn btn-ghost ml-2"
                        disabled={errors.message || isSending}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Aichat
