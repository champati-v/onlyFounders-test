import { PageLayout } from "../layout/page-layout"

export default function UpdatesPage() {
  return (
    <PageLayout currentPage="updates">
      {/* Project Updates Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-xl font-bold mb-1">Project Updates</h2>
        <p className="text-gray-400 text-sm">Latest news and announcements</p>

        {/* Empty space for updates - matching the reference image */}
        <div className="h-16"></div>
      </div>
    </PageLayout>
  )
}
