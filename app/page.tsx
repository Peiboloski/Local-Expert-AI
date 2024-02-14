import Link from "next/link";
import { ButtonLink } from "./_components/atoms/button";

export default function Home() {
  return (
    <div className="bg-ds-green-100 min-h-screen">
      <Header />
      <div className="max-w-screen-md flex flex-col mx-auto">
        <Hero />
        <FeatureDescription />
        <ExploreNearbyAttractions />
      </div>
    </div>
  );
}

// Header component
function Header() {
  return (
    <header className="flex flex-row gap-ds-12 justify-between self-stretch px-ds-32 py-ds-16 bg-ds-grey-900">
      <nav className="flex flex-row w-[100%] self-stretch gap-ds-12 justify-between align-middle">
        <Link style={{ margin: "auto 0" }} href="/">
          <span className="text-ds-grey-100 text-ds-16 font-medium">LOCAL GUIDE</span>
          <span className="text-ds-green-500 text-ds-16 font-medium"> AI</span>
        </Link>
        <ButtonLink type="primary" size="small" href="/explore">
          Explore nearby atractions
        </ButtonLink>
      </nav>
    </header>
  );
}

function Section({ children, className, bgColor }: { children: React.ReactNode, className?: string, bgColor?: string }) {
  return (
    <section className={`px-ds-32 ${bgColor} ${className}`}>
      {children}
    </section>
  );
}

function Hero() {
  return (
    <Section className="py-ds-64">
      <div className="container mx-auto">
        <header className="txt-hero">
          Your <span className="text-ds-green-500">local guide</span> right in your hands
        </header>
      </div>
    </Section>
  );
}

function FeatureDescription() {
  return (
    <Section className="flex flex-col py-ds-16 gap-ds-24">
      <header className="txt-section-label whitespace-nowrap">
        HOW IT WORKS?
      </header>
      <p className="txt-main-text-medium">1. Select the nearby landmark you are currently visiting</p>
      <p className="txt-main-text-medium">2. Check the summary with the most important information of the place</p>
      <p className="txt-main-text-medium">3. Chat with our local guide AI and ask anything else you want to know</p>
    </Section>
  );
}

function ExploreNearbyAttractions() {
  return (
    <Section className="flex flex-col self-stretch text-base font-medium max-w-[430px] text-neutral-700 py-ds-32 pb-ds-64">
      <ButtonLink href="/explore" type="secondary" size="normal">Explore nearby attractions</ButtonLink>
    </Section>
  );
}