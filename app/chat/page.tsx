'use client';
import ArrowRight from "../_components/icons/small/arrowRight";
import Section from "../_components/atoms/section";
import Link from "next/link";
import { Button } from "../_components/atoms/button";
import { useEffect, useRef, useState } from "react";

import { getAssistantMessage } from "./actions/serverActions";
import { MessageInterface } from "./types/types";
import DOMPurify from "isomorphic-dompurify";

import './styles/chatStyles.scss';

export default function ChatPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const {
        title,
        municipality,
        countrySecondarySubdivision,
        countrySubdivision,
        country
    } = searchParams

    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isAssistantTyping, setIsAssistantTyping] = useState(false);

    const setAssistantMessage = async () => {
        const message = await getAssistantMessage({ messages, title: title as string, municipality: municipality as string, countrySecondarySubdivision: countrySecondarySubdivision as string, countrySubdivision: countrySubdivision as string, country: country as string })
        setMessages([...messages, { role: 'assistant', conent: message }]);
        setIsAssistantTyping(false);
    }

    //Initial message is called twice in development, because of the use of strict mode
    useEffect(() => {
        if (!isAssistantTyping && (messages.length === 0 || (messages[messages.length - 1].role === 'user'))) {
            setIsAssistantTyping(true);
            setAssistantMessage();
        }
    }, [messages, isAssistantTyping]);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, { role: 'user', conent: message }]);
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
    //TODO: Scroll to message not working in mobile for user sent messages
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isAssistantTyping]);

    //Add is assistant typing message at the end
    const processedMessages = isAssistantTyping ? [...messages, { role: 'assistant', conent: 'Typing...' }] : messages;
    const allExceptLastMessage = processedMessages.slice(0, processedMessages.length - 1);
    const lastMessage = processedMessages[processedMessages.length - 1];

    return (
        <Section wrapperClassName="bg-ds-grey-100 flex-grow overflow-scroll" noExpandedBackground>
            <div className="inline-flex flex-col pt-ds-24 pb-ds-32 gap-ds-24 mr-auto w-[100%] h-[100%]">
                {allExceptLastMessage.map((message, index) => (
                    <ChatMessage key={index} isUserMessage={message.role === 'user'}>
                        {message.conent}
                    </ChatMessage>
                ))}
                <div ref={messagesEndRef} className="mt-[-24px]" />
                {lastMessage && <ChatMessage isUserMessage={lastMessage.role === 'user'}>
                    {lastMessage.conent}
                </ChatMessage>}
            </div>
        </Section>
    );
}

function ChatMessage({ isUserMessage, children }: { isUserMessage?: boolean, children: React.ReactNode }) {

    // Sanitize the incoming HTML string
    const sanitizedHtml = DOMPurify.sanitize(children as string);

    // Now safely set the sanitized HTML
    const createMarkup = () => ({ __html: sanitizedHtml });


    return (
        <div className={`p-ds-12 ${isUserMessage ? "bg-ds-green-200 ml-auto" : "bg-ds-grey-200 mr-auto"} rounded-[12px] flex-grow-0 txt-paragraph`}>
            <div className="chat-styles" dangerouslySetInnerHTML={createMarkup()} />
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
                    placeholder={shouldBeDisabled ? "Waiting for assistant response..." : "What else do you want to know?"}
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

