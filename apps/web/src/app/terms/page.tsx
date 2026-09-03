import SiteLayout from "@/components/SiteLayout";
import TermsContent from "./terms-content";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of Next Minds Infosys website, courses, and related services.",
  openGraph: {
    title: "Terms & Conditions",
    description:
      "The terms and conditions governing your use of Next Minds Infosys website, courses, and related services.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <SiteLayout>
      <TermsContent />
    </SiteLayout>
  );
}
