'use client'
import Link from "next/link";
import { ButtonLink } from "../../atoms/button";
import { usePathname } from 'next/navigation'

// Header component
function Header() {
    const pathname = usePathname()
    const isHomePage = pathname === '/'
    return (
        <header className="flex flex-row gap-ds-12 justify-between self-stretch px-ds-32 max-[400px]:px-ds-24 py-ds-16 bg-ds-grey-900">
            <nav className="flex flex-row w-[100%] self-stretch gap-ds-12 justify-between align-middle">
                <Link style={{ margin: "auto 0" }} href="/">
                    <span className="text-ds-grey-100 text-ds-16 font-medium">LOCAL EXPERT</span>
                    <span className="text-ds-green-500 text-ds-16 font-medium"> AI</span>
                </Link>
                {isHomePage && <ButtonLink type="primary" size="small" href="/explore">
                    Start Exploring
                </ButtonLink>}
            </nav>
        </header>
    );
}

export default Header;