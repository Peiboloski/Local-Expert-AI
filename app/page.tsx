import { ButtonLink } from "./_components/atoms/button";
import Header from "./_components/molecules/header";

export default function Home() {
  return (
    <div className="max-w-screen-md flex flex-col mx-auto">
      <Hero />
      <FeatureDescription />
      <ExploreNearbyAttractions />
    </div>
  );
}

function Section({ children, className, bgColor }: { children: React.ReactNode, className?: string, bgColor?: string }) {
  return (
    <section className={`px-ds-32 max-[400px]:px-ds-24 ${bgColor} ${className}`}>
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