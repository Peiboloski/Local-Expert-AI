function Section({ children, className, wrapperClassName }: { children: React.ReactNode, className?: string, wrapperClassName?: string }) {
    return (
        <div className={`w-[100%] ${wrapperClassName}`}>
            <section className={`my-0 mx-auto max-w-screen-md px-ds-32 max-[400px]:px-ds-24 ${className}`}>
                {children}
            </section>
        </div>
    );
}

export default Section;