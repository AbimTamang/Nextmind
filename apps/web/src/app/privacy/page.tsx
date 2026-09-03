import SiteLayout from "@/components/SiteLayout";
import PrivacyContent from "./privacy-content";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Next Minds Infosys collects, uses, and protects your personal information when you use our website or services.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Next Minds Infosys collects, uses, and protects your personal information when you use our website or services.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <SiteLayout>
      <PrivacyContent />
    </SiteLayout>
  );
}
