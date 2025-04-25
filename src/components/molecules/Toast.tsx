"use client"

import { useEffect } from "react";

interface ToastProps {
    messages: string[];
    onRemoveMessage: (index: number) => void;
}

export const Toast = ({ messages, onRemoveMessage }: ToastProps) => {
    useEffect(() => {
        if (messages.length > 0) {
            const timer = setTimeout(() => {
                onRemoveMessage(0); // Remove the first message after 10 seconds
            }, 10000); // 10 seconds timeout for each message
            return () => clearTimeout(timer);
        }
    }, [messages, onRemoveMessage]);

    return (
        <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3"
                >
                    <span>{msg}</span>
                    <button
                        className="text-white font-bold"
                        onClick={() => onRemoveMessage(index)}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
};


