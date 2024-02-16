'use client';
import { useParams } from "next/navigation";
import { title } from "process";
import ArrowRight from "../_components/icons/small/arrowRight";
import Section from "../_components/atoms/section";
import Link from "next/link";
import { Button } from "../_components/atoms/button";
import { useEffect, useRef, useState } from "react";

import OpenAI from "openai";
import { getAssistantMessage } from "./actions/serverActions";


interface MessageInterface {
    isUserMessage: boolean,
    message: string
}

export default function ChatPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const {
        title,
        municipality,
        countrySecondarySubdivision,
        countrySubdivision,
        country
    } = searchParams

    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isAssistantTyping, setIsAssistantTyping] = useState(true);

    //Get first assistant message
    useEffect(() => {
        const setAssistantMessage = async () => {
            const message = await getAssistantMessage({ title: title as string, municipality: municipality as string, countrySecondarySubdivision: countrySecondarySubdivision as string, countrySubdivision: countrySubdivision as string, country: country as string })
            setMessages([...messages, { isUserMessage: false, message }]);
            setIsAssistantTyping(false);
        }
        setAssistantMessage();
    }, []);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, { isUserMessage: true, message }]);
    }

    return (
        <div className="relative h-[100%]">
            <div className="absolute inset-0 flex flex-col mx-auto h-[100%]" >
                <ChatHeader title={title as string} />
                <Chat messages={messages} isAssistantTyping={isAssistantTyping} />
                <ChatTextInput shouldBeDisabled={isAssistantTyping} onMessage={handleSendMessage} />
            </div>
        </div>
    );
}


function ChatHeader({ title }: { title: string }) {
    return (
        <Section wrapperClassName="bg-ds-grey-200" noExpandedBackground>
            <header className="flex flex-row justify-start items-center py-ds-24 gap-ds-24">
                <Link href="/explore">
                    <ArrowRight className="flex-shrink-0 rotate-180" />
                </Link>
                <div className="flex flex-col justify-center gap-ds-4">
                    <p className="txt-section-label text-ds-grey-800">LOCAL GUIDE</p>
                    <p className="txt-section-label text-ds-grey-600">{title}</p>
                </div>
            </header>
        </Section >
    );
}

function Chat({ messages, isAssistantTyping }: { messages: MessageInterface[], isAssistantTyping: boolean }) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Section wrapperClassName="bg-ds-grey-100 flex-grow overflow-scroll" noExpandedBackground>
            <div className="inline-flex flex-col flex-col pt-ds-24 pb-ds-32 gap-ds-24 mr-auto w-[100%] h-[100%]">
                {messages.map((message, index) => <ChatMessage key={index} isUserMessage={message.isUserMessage}>{message.message}</ChatMessage>)}
                {isAssistantTyping && <ChatMessage isUserMessage={false}>Typing...</ChatMessage>}
                <div ref={messagesEndRef} />
            </div>
        </Section>
    );
}

function ChatMessage({ isUserMessage, children }: { isUserMessage?: boolean, children: React.ReactNode }) {
    return (
        <div className={`p-ds-12 ${isUserMessage ? "bg-ds-green-200 ml-auto" : "bg-ds-grey-200 mr-auto"} rounded-[12px] flex-grow-0 txt-paragraph`}>
            {children}
        </div>
    )
}


function ChatTextInput({ onMessage, shouldBeDisabled }: { onMessage: (message: string) => void, shouldBeDisabled?: boolean }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim()) {
            onMessage(message);
            setMessage('');
        }
    };

    const emptyMessage = message.trim() === '';

    return (
        <Section wrapperClassName="bg-ds-grey-200" noExpandedBackground>
            <form className="flex flex-row justify-between items-center py-ds-16 gap-ds-12 rounded-[12px]" onSubmit={handleSubmit}>
                <input
                    className="bg-white rounded-[8px] p-ds-16 w-[100%] border-solid border-[1px] border-ds-grey-500 txt-main-text-medium"
                    type="text"
                    placeholder="What else do you want to know?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={shouldBeDisabled}
                />
                <Button type="primary" size="normal" disabled={emptyMessage || shouldBeDisabled}>
                    <ArrowRight />
                </Button>
            </form>
        </Section>
    );
}

