import { Header } from '@/components/ui/Header'
import { WorkflowInput } from '@/components/workflow/WorkflowInput'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
        <WorkflowInput />
      </main>
    </div>
  )
}