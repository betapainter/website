import FixedNav from "@/components/fixed-nav"
import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import EventsSection from "@/components/events-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <>
      <FixedNav />

      <main className="min-h-screen pt-16">
        <HeroSection />
        <GallerySection />
        <EventsSection />
        <ContactSection />
      </main>
    </>
  )
}
