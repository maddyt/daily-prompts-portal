import { PromptsList } from '@/components/PromptsList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Daily Prompts</h1>
          <p className="text-xl text-purple-100">
            Discover unique prompts generated every day at midnight
          </p>
        </div>

        {/* Prompts Grid */}
        <PromptsList />

        {/* Footer */}
        <div className="text-center mt-16 text-purple-100">
          <p className="text-sm">
            Built with Next.js, Supabase, and Copilot AI
          </p>
        </div>
      </div>
    </div>
  );
}
