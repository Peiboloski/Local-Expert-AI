import { useParams } from "next/navigation";
import { title } from "process";
import ArrowRight from "../_components/icons/small/arrowRight";
import Section from "../_components/atoms/section";
import Link from "next/link";

export default function ChatPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const {
        title,
        municipality,
        countrySecondarySubdivision,
        countrySubdivision,
        country
    } = searchParams

    return (
        <div className="flex flex-col mx-auto h-[100%]" >
            <ChatHeader title={title as string} />
            <Chat />
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

function Chat() {
    return (<Section wrapperClassName="bg-ds-grey-100 flex-grow" noExpandedBackground>
        <div className="inline-flex flex-col flex-col pt-ds-24 pb-ds-32 gap-ds-24 mr-auto w-[100%] h-[100%]" >
            <ChatMessage isUserMessage>
                It was constructed in 2000?
            </ChatMessage>
            <ChatMessage>
                No, it wasn&apos;t. It was constructed in 1999.
            </ChatMessage>
            <ChatMessage isUserMessage>
                Thank you!
            </ChatMessage>
        </div>
    </Section >)
}

function ChatMessage({ isUserMessage, children }: { isUserMessage?: boolean, children: React.ReactNode }) {
    return (
        <div className={`p-ds-12 ${isUserMessage ? "bg-ds-green-200 ml-auto" : "bg-ds-grey-200 mr-auto"} rounded-[12px] flex-grow-0 txt-paragraph`}>
            {children}
        </div>
    )
}

