interface SectionProps {
    children: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    noExpandedBackground?: boolean;
}


function Section({ children, className, wrapperClassName, noExpandedBackground }: SectionProps) {
    return (
        <div className={`${noExpandedBackground ? 'max-w-screen-md' : ""} w-[100%] self-strech mx-auto ${wrapperClassName}`}>
            <section className={`my-0 mx-auto max-w-screen-md px-ds-32 max-[400px]:px-ds-24 ${className}`}>
                {children}
            </section>
        </div>
    );
}

export default Section;