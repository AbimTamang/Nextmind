import SiteLayout from "@/components/SiteLayout";
import StoriesPage from "./stories-content";

export const metadata = {
  title: "Testimonials",
  description:
    "What our students say about training at Next Minds Infosys — graduate spotlights and student reviews.",
  openGraph: {
    title: "Testimonials",
    description:
      "What our students say about training at Next Minds Infosys — graduate spotlights and student reviews.",
  },
};

/**
 * Cached and revalidated rather than rendered per request.
 *
 * `force-dynamic` made Next send `Cache-Control: private, no-store` on every
 * response, which (a) disables the browser's back/forward cache entirely and
 * (b) meant every visit rendered from scratch against the database with
 * `x-vercel-cache: MISS`. Nothing on this page is per-visitor - the navbar
 * reads its session client-side - so it can be served from the CDN and
 * refreshed on an interval. Admin edits appear within the window below.
 */
export const revalidate = 300;

export default function Page() {
  return (
    <SiteLayout>
      <StoriesPage />
    </SiteLayout>
  );
}
