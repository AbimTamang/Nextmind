import SiteLayout from "@/components/SiteLayout";
import PrivacyContent from "./privacy-content";

export const metadata = {
  title: "Privacy Policy | Next Minds Infosys",
  description:
    "Learn how Next Minds Infosys collects, protects, and handles student data, course enrollments, and website information in compliance with modern privacy standards.",
  openGraph: {
    title: "Privacy Policy | Next Minds Infosys",
    description:
      "Learn how Next Minds Infosys collects, protects, and handles student data, course enrollments, and website information in compliance with modern privacy standards.",
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
