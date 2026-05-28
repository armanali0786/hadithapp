import React from 'react';

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-isl-green mb-3">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">الخُصُوصِيَّة</div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            How IlmHadith collects, uses, and protects your information.
          </p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-8 md:p-10">
          <p className="text-xs text-gray-400 mb-8 border-b border-isl-stone/30 pb-4">
            <strong className="text-gray-500">Last Updated:</strong> May 2026
          </p>

          <p className="text-gray-600 text-sm leading-relaxed mb-10">
            This Privacy Policy describes how <strong className="text-isl-green">IlmHadith</strong> ("we", "us", or
            "our"), a project of the Qadri Jame Masjid Foundation, Parsauni Khas, Gopalganj, Bihar, India, collects,
            uses, and safeguards information when you use our website and services. By using IlmHadith, you agree to
            the practices described in this policy.
          </p>

          <Section title="1. Information We Collect">
            <p>
              <strong className="text-isl-dark">Account Information:</strong> When you register for an account, we
              collect your name, email address, and a hashed password. If you sign in via Google OAuth, we receive
              your name, email, and profile picture as provided by Google.
            </p>
            <p>
              <strong className="text-isl-dark">Usage Data:</strong> We may automatically collect information about
              how you interact with the platform — such as pages visited, hadiths viewed, quizzes completed, and
              bookmarks saved — to improve the service.
            </p>
            <p>
              <strong className="text-isl-dark">Volunteer & Contact Forms:</strong> Information you submit through
              our contact or volunteer forms (name, email, phone, message) is collected solely to respond to your
              enquiry or application.
            </p>
            <p>
              <strong className="text-isl-dark">Donation Information:</strong> If you make a donation, payment
              processing is handled by our payment provider. We do not store your full card details.
            </p>
          </Section>

          <Section title="2. How We Use Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Create and manage your account.</li>
              <li>Save your bookmarks and personalise your experience.</li>
              <li>Respond to your messages and volunteer applications.</li>
              <li>Improve the content and features of IlmHadith.</li>
              <li>Send occasional updates about new content or features (you may opt out at any time).</li>
              <li>Process donations securely.</li>
            </ul>
            <p>
              We do <strong className="text-isl-dark">not</strong> sell, rent, or share your personal information
              with third parties for marketing purposes.
            </p>
          </Section>

          <Section title="3. Data Security">
            <p>
              We take reasonable technical and organisational measures to protect your personal data from unauthorised
              access, loss, or misuse. Passwords are stored using industry-standard hashing algorithms (bcrypt).
              All data transmission is encrypted via HTTPS/TLS.
            </p>
            <p>
              While we strive to protect your information, no method of transmission over the internet is 100%
              secure. We encourage you to use a strong, unique password for your account.
            </p>
          </Section>

          <Section title="4. Cookies">
            <p>
              IlmHadith uses cookies and similar technologies to maintain your logged-in session and remember your
              preferences (such as theme settings). We do not use advertising or tracking cookies.
            </p>
            <p>
              You can disable cookies in your browser settings, but this may affect the functionality of certain
              features, including the ability to remain logged in.
            </p>
          </Section>

          <Section title="5. Third-Party Services (Google OAuth)">
            <p>
              We offer the option to sign in using <strong className="text-isl-dark">Google OAuth</strong>. When you
              choose this option, you are redirected to Google's authentication service. Google's privacy policy
              governs the information you provide to them during that process.
            </p>
            <p>
              We only receive the basic profile data (name, email, profile picture) necessary to create and identify
              your account. We do not access your Google contacts, drive, or any other Google services.
            </p>
          </Section>

          <Section title="6. Children's Privacy">
            <p>
              IlmHadith is intended for general audiences. We do not knowingly collect personal information from
              children under the age of 13 without verifiable parental consent. If you believe a child has provided
              us with personal information, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
              law. When we make significant changes, we will update the "Last Updated" date at the top of this page.
              We encourage you to review this policy periodically.
            </p>
            <p>
              Continued use of IlmHadith after any changes constitutes your acceptance of the revised policy.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your
              personal data, please contact us:
            </p>
            <div className="bg-isl-green/5 border border-isl-green/20 rounded-xl p-5 mt-2">
              <p className="font-medium text-isl-dark mb-1">Qadri Jame Masjid Foundation</p>
              <p>Parsauni Khas, Gopalganj, Bihar, India</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:armanali.shaikh77@gmail.com"
                  className="text-isl-green hover:underline"
                >
                  armanali.shaikh77@gmail.com
                </a>
              </p>
              <p>Phone: +91 731 9977 276</p>
            </div>
          </Section>
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
