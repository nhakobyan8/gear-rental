"use client";
import React from "react";

const LicenseSection = ({ title, description, items }) => (
  <section>
    <h2 className="text-3xl font-bold text-white mb-6 tracking-wide uppercase">{title}</h2>
    <p className="text-lg leading-relaxed text-gray-400 mb-6">{description}</p>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-4">
          <span className="block w-3 h-3 rounded-full bg-primary"></span>
          <p className="text-xl text-gray-300">
            <strong>{item.name}:</strong> {item.license}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

const TermsOfUse = () => (
  <section>
    <h2 className="text-3xl font-bold text-white mb-6 tracking-wide uppercase">Terms of Use</h2>
    <p className="text-lg leading-relaxed text-gray-400 mb-6">
      By using this project, you agree to the following terms:
    </p>
    <div className="pl-6 border-l-4 border-primary">
      <ol className="space-y-4 text-lg text-gray-300 list-decimal list-inside">
        <li>You may not distribute or sell proprietary components without explicit permission.</li>
        <li>You may modify and use open-source components under their respective licenses.</li>
        <li>Violations may result in termination of access to features or components.</li>
      </ol>
    </div>
  </section>
);

const ContactInfo = () => (
  <section className="text-center">
    <h2 className="text-3xl font-bold text-white mb-6 tracking-wide uppercase">Contact Information</h2>
    <p className="text-lg leading-relaxed text-gray-400">
      For any questions regarding licenses or terms of use, contact us at:{" "}
      <a href="mailto:support@yourproject.com" className="text-primary underline">
        hakobyannarek535@gmail.com
      </a>
    </p>
  </section>
);

export default function LicensePage() {
  const openSourceLicenses = [
    { name: "React", license: "MIT License" },
    { name: "Next.js", license: "MIT License" },
    { name: "TailwindCSS", license: "MIT License" },
    { name: "Redux Toolkit", license: "MIT License" },
  ];

  const proprietaryLicenses = [
    { name: "Custom UI Components", license: "Proprietary License" },
    { name: "Design Assets", license: "Proprietary License" },
    { name: "Custom Animations", license: "Proprietary License" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 px-3 py-16">
      <h1 className="md:text-5xl text-3xl font-extrabold mb-12 text-primary tracking-wider text-center uppercase">
        Licenses & Terms
      </h1>
      <div className="bg-gray-800 space-y-10 p-12 rounded-xl shadow-xl max-w-5xl w-full duration-300">
        <LicenseSection
          title="Open Source Licenses"
          description="This project utilizes various open-source libraries and tools. Below are the licenses for the main components used:"
          items={openSourceLicenses}
        />
        <LicenseSection
          title="Proprietary Licenses"
          description="Certain components of this project are licensed under proprietary terms. Please review the terms and conditions for these licenses below:"
          items={proprietaryLicenses}
        />
        <TermsOfUse />
        <ContactInfo />
      </div>
    </div>
  );
}
