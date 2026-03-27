import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { LeaderboardTable } from '@/components/leaderboard-table'
import { FineTuningSection } from '@/components/fine-tuning-section'
import { GeneralizationSection } from '@/components/generalization-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <LeaderboardTable />
      <FineTuningSection />
      <GeneralizationSection />
      <Footer />
    </main>
  )
}
