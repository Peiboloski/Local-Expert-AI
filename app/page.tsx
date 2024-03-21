import Image from "next/image";
import { ButtonLink } from "./_components/atoms/button";
import Section from "./_components/atoms/section";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto">
      <Hero />
      <FeatureDescription />
      <ExploreNearbyAttractions />
    </div>
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
    <Section className="flex flex-col py-ds-16 gap-ds-24 pb-ds-64">
      <header className="txt-section-label whitespace-nowrap">
        HOW IT WORKS?
      </header>
      <p className="txt-main-text-medium">1. Enable GPS location and get the key information of the place you are currently visiting.</p>
      <Image src="/images/HomePageMockup.png" width={400} height={1000} alt="Home page mockup" />
      <p className="txt-main-text-medium">2. Check the list with the musts during your visit, and the traditional food of the city.</p>
      <Image src="/images/mustVisitMockup.png" width={400} height={1000} alt="Explore page mockup" />
      <p className="txt-main-text-medium">3. Chat with our local guide AI to get the key information of a particular place, and ask anything else you want to know.</p>
      <Image src="/images/chatMockup.png" width={400} height={1000} alt="Chat page mockup" />
    </Section>
  );
}

function ExploreNearbyAttractions() {
  return (
    <Section wrapperClassName="bg-ds-grey-800" className="flex flex-col justify-center items-center self-stretch text-base font-medium max-w-[430px] text-neutral-700 py-ds-64 gap-ds-32">
      <p className="txt-hero text-ds-grey-100 mx-auto">Try it for <span className="text-ds-green-500">free</span></p>
      <div className="flex justify-center">
        <ButtonLink href="/explore" type="secondary" size="normal">Start exploring</ButtonLink>
      </div>

    </Section>
  );
}