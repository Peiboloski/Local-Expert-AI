import Link from "next/link";
import ArrowRight from "../../icons/small/arrowRight";
import classNames from "classnames";

const Card = ({ link = null, children }: { link?: string | null, children: any }) => {
    const hasLink = link !== null;
    const linkClassName = classNames('flex flex-row justify-between items-center gap-ds-12')
    const CardWrapperComponent = hasLink ?
        ({ children }: { children: any; }) => <Link href={link} className={linkClassName}>{children}</Link> :
        ({ children }: { children: any; }) => <div className={linkClassName}>{children}</div>;

    return (
        <li className="flex flex-col bg-ds-white p-ds-16 rounded-[8px] border border-solid border-ds-grey-700 hover:bg-ds-green-300">
            <CardWrapperComponent>
                <div className="flex flex-col gap-ds-12">
                    {children}
                </div>
                <ArrowRight className="flex-shrink-0" />
            </CardWrapperComponent>
        </li>
    )
}

const CardTitle = ({ title }: { title: string }) => {
    return (
        <h2 className="txt-main-text-medium">{title}</h2>
    )
}

const CardDescription = ({ description }: { description: string }) => {
    return (
        <p className="txt-main-text-medium text-ds-grey-600">{description}</p>
    )
}

const CardDistance = ({ distance }: { distance: number }) => {
    return (
        <p className="txt-main-text-medium text-ds-grey-600">{`${distance} m`}</p>
    )
}

export { Card, CardTitle, CardDescription, CardDistance }
