export default function TermsConditions() {
  return (
    <div
      className="min-h-screen w-full bg-[#15191F] flex flex-col items-center py-12 px-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Logo */}
      <div className="mb-2">
        <img
          src="https://f3ai.blob.core.windows.net/frontend-picture-storage/onlyFounder_logo.svg"
          alt="OnlyFounders Logo"
          style={{
            width: "300px",
          }}
        />
      </div>

      {/* Main Heading */}
      <h1
        className="text-white text-center mb-16"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "36px",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Terms & Conditions
      </h1>

      {/* Content Container */}
      <div className="max-w-[1000px] w-full space-y-8">
        {/* Introduction */}
        <p
          className="text-[#B8B8B8]"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          These Terms and Conditions {"("}"Terms"{")"} govern your access to and use of the OnlyFounders platform
          {"("}"Platform"{")"} for Web3 projects. By accessing or using the Platform, you agree to be bound by these
          Terms. If you do not agree to these Terms, do not access or use the Platform.
        </p>

        {/* Section 1: Definitions */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            1. DEFINITIONS
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.1 "Platform" refers to OnlyFounders, a permissionless fundraising platform operated by OnlyFounders Inc.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.2 "Web3" refers to blockchain-based applications, decentralized technologies, and related digital
              assets.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.3 "Founder" refers to any individual or entity creating a fundraising campaign for a Web3 project on the
              Platform.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.4 "Investor" refers to any individual or entity that contributes funds to Web3 projects listed on the
              Platform.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.5 "Digital Assets" refers to cryptocurrencies, tokens, NFTs, or other blockchain-based assets.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.6 "Smart Contract" refers to self-executing contracts with the terms directly written into code.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              1.7 "Token Offering" refers to any sale or distribution of tokens, including but not limited to ICOs,
              STOs, IDOs, or similar offerings.
            </p>
          </div>
        </div>

        {/* Section 2: Eligibility */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            2. ELIGIBILITY
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              2.1 You must be at least 18 years of age to use the Platform.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              2.2 You must have the legal capacity to enter into these Terms in your jurisdiction.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              2.3 You must complete all required verification procedures, which may include Know Your Customer
              {"("}KYC{")"} and Anti-Money Laundering {"("}AML{")"} checks.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              2.4 You must not be a resident of or located in any jurisdiction where participation in token offerings or
              cryptocurrency transactions is prohibited.
            </p>
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              2.5 Founders must have legal authority to represent the Web3 project they are fundraising for.
            </p>

          </div>
        </div>

        {/* Section 3: Founder Obligations */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            3. FOUNDER OBLIGATIONS
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.1 Project Legitimacy
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.1.1 Founders must provide accurate and complete information about their Web3 project.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.1.2 Founders must have legitimate rights to all intellectual property associated with their project.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.1.3 Founders must not engage in fraudulent activities, market manipulation, or misrepresentation.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.2 Regulatory Compliance
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.2.1 Founders are solely responsible for ensuring their token offerings comply with all applicable laws
              and regulations in all relevant jurisdictions.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.2.2 Founders must disclose whether their tokens may be classified as securities under relevant laws.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.2.3 Founders must implement appropriate restrictions to prevent participation from jurisdictions where
              their offering would be illegal.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.3 Smart Contract Security
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.3.1 Founders must conduct thorough security audits of all smart contracts before deployment.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.3.2 Founders must disclose the results of security audits to potential investors.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.3.3 Founders must implement reasonable security measures to protect investor funds.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.4 Disclosure Requirements
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.4.1 Founders must provide a comprehensive whitepaper or technical documentation.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.4.2 Founders must disclose all team members, advisors, and their relevant experience.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.4.3 Founders must provide clear tokenomics, including token distribution, vesting schedules, and use of
              funds.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.4.4 Founders must disclose all material risks associated with their project.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.5 Post-Fundraising Obligations
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.5.1 Founders must provide regular updates on project development and milestone achievements.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.5.2 Founders must use raised funds in accordance with their disclosed plans.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              3.5.3 Founders must maintain open communication channels with investors.
            </p>
          </div>
        </div>

        {/* Section 4: Investor Obligations */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            4. INVESTOR OBLIGATIONS
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.1 Due Diligence
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.1.1 Investors are responsible for conducting their own due diligence on Web3 projects.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.1.2 Investors acknowledge that the Platform does not endorse, guarantee, or verify the legitimacy of
              listed projects.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.1.3 Investors should review all project documentation, including whitepapers, smart contract code, and
              audit reports.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.2 Risk Acknowledgment
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.2.1 Investors acknowledge that investments in Web3 projects involve substantial risk, including total
              loss of investment.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.2.2 Investors acknowledge that past performance is not indicative of future results.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.2.3 Investors acknowledge that digital assets may experience extreme price volatility.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.3 Wallet Security
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.3.1 Investors are solely responsible for the security of their digital wallets and private keys.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.3.2 Investors must use secure, non-custodial wallets for transactions when possible.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.3.3 Investors must not share private keys or seed phrases with any third party, including the Platform.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.4 Compliance with Laws
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.4.1 Investors must comply with all applicable laws in their jurisdiction regarding digital asset
              investments.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.4.2 Investors must not use the Platform to engage in money laundering, terrorist financing, or other
              illegal activities.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              4.4.3 Investors are responsible for reporting and paying all applicable taxes on their investments.
            </p>
          </div>
        </div>

        {/* Section 5: Platform Services */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            5. PLATFORM SERVICES
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.1 Listing Services
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.1.1 The Platform provides a marketplace for Web3 projects to list their fundraising campaigns.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.1.2 The Platform may review projects for basic compliance but does not guarantee project quality or
              legitimacy.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.1.3 The Platform reserves the right to remove any project that violates these Terms.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.2 Transaction Services
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.2.1 The Platform may facilitate transactions between Founders and Investors.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.2.2 The Platform may integrate with third-party services for transaction processing.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.2.3 The Platform is not responsible for transaction failures due to blockchain network issues.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.3 Smart Contract Integration
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.3.1 The Platform may provide templates for fundraising smart contracts.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.3.2 Founders are responsible for reviewing and customizing any smart contract templates.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.3.3 The Platform does not guarantee the security or functionality of smart contracts.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.4 Information Services
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.4.1 The Platform may provide educational resources about Web3 investments.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              5.4.2 Information provided by the Platform is for educational purposes only and does not constitute
              investment advice.
            </p>
          </div>
        </div>

        {/* Section 6: Fees and Payments */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            6. FEES AND PAYMENTS
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.1 Platform Fees
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.1.1 The Platform charges fees as outlined in the Fee Structure document.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.1.2 Fees may be charged in fiat currency or specified digital assets.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.1.3 The Platform reserves the right to modify fees with 30 days' notice.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.2 Payment Methods
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.2.1 The Platform accepts payments in specified cryptocurrencies and fiat currencies.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.2.2 All cryptocurrency transactions are final and irreversible once confirmed on the blockchain.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.2.3 Fiat currency transactions may be subject to additional verification and processing time.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.3 Gas Fees
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.3.1 Users are responsible for all blockchain network fees {"("}gas fees{")"} associated with
              transactions.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.3.2 The Platform does not control or benefit from gas fees.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              6.3.3 The Platform may provide estimates of gas fees but cannot guarantee their accuracy.
            </p>
          </div>
        </div>

        {/* Section 7: Intellectual Property */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            7. INTELLECTUAL PROPERTY
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.1 Platform IP
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.1.1 All Platform content, including logos, trademarks, and software, is the property of OnlyFounders Inc.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.1.2 Users may not copy, modify, or distribute Platform content without explicit permission.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.2 Project IP
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.2.1 Founders retain all intellectual property rights to their projects.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.2.2 By listing a project, Founders grant the Platform a non-exclusive
              license to display project information.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.2.3 Investors do not acquire intellectual property rights through their
              investments unless explicitly stated in investment agreements.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.3 Open Source Considerations
            </h3>
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.3.1 Founders must disclose whether their project uses open-source components.
            </p>
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.3.2 Founders must comply with all open-source license requirements.
            </p>
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              7.3.3 Founders must disclose whether their own code will be open-sourced and under what license.
            </p>

          </div>
        </div>

        {/* Section 8: Disclaimers */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            8. PRIVACY AND DATA
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.1 Data Collection
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.1.1 The Platform collects user data as described in the Privacy Policy.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.1.2 Users consent to the collection and processing of their data for Platform
              operations.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.2 Blockchain Transparency
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.2.1 Users acknowledge that blockchain transactions are publicly visible.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.2.2 The Platform cannot remove or modify information recorded on public blockchains.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.3 KYC/AML Information
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.3.1 The Platform collects identity verification information for compliance purposes.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              8.3.2 The Platform may share KYC/AML information with regulatory authorities when legally required.
            </p>
          </div>
        </div>

        {/* Section 9: Limitation of Liability */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            9. RISK DISCLOSURES
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.1 Technology Risks
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.1.1 Web3 technologies are experimental and may contain unknown vulnerabilities.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.1.2 Smart contracts may contain bugs or security flaws despite audits.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.1.3 Blockchain networks may experience congestion, forks, or other technical
              issues.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.2 Market Risks
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.2.1 Digital assets may experience extreme price volatility.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.2.2 Liquidity for tokens may be limited or non-existent.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.2.3 Market manipulation may occur despite preventative measures.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.3 Regulatory Risks
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.3.1 Regulations regarding digital assets are evolving and may change rapidly.
            </p>


            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.3.2 Future regulatory changes may adversely affect Web3 projects or token values.
            </p>


            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.3.3 Regulatory actions may require the Platform to delist projects or restrict certain activities.
            </p>


            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.4 Project Risks
            </h3>


            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.4.1 Web3 projects may fail to deliver on their roadmap.
            </p>
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.4.2 Team members may leave projects, affecting development.
            </p>


            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.4.3 Projects may pivot or change their business model.
            </p>

             <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
             9.5 Security Risks
            </h3>
              <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.5.1 Digital assets may be vulnerable to hacking, phishing, or other attacks.
            </p>

                <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.5.2 Private keys, if lost or stolen, may result in permanent loss of assets.
            </p>
                 <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              9.5.3 Smart contracts may be exploited despite security measures.
            </p>

          </div>
        </div>

        {/* Section 10: Indemnification */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            10. INDEMNIFICATION
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              10.1 Users agree to indemnify and hold harmless the Platform from any claims, damages, or expenses arising
              from their use of the Platform.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              10.2 This includes claims related to their content, violation of these Terms, or infringement of
              third-party rights.
            </p>
          </div>
        </div>

        {/* Section 11: Termination */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            11. TERMINATION
          </h2>

          <div className="space-y-4">
            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              11.1 Termination by the Platform
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              11.1.1 The Platform may terminate a user's access to the Platform for any reason, including violation of
              these Terms.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              11.2 Termination by the User
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              11.2.1 Users may terminate their account at any time by contacting the Platform.
            </p>

            <h3
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              11.3 Effect of Termination
            </h3>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              11.3.1 Upon termination, users will lose access to all Platform services.
            </p>
          </div>
        </div>

        {/* Section 12: Governing Law */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            12. GOVERNING LAW
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              12.1 These Terms shall be governed by and construed in accordance with the laws of the State of Delaware.
            </p>
          </div>
        </div>

        {/* Section 13: Dispute Resolution */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            13. DISPUTE RESOLUTION
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              13.1 Any disputes arising from these Terms shall be resolved through binding arbitration in accordance
              with the rules of the American Arbitration Association.
            </p>
          </div>
        </div>

        {/* Section 14: Changes to Terms */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            14. CHANGES TO TERMS
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              14.1 The Platform reserves the right to modify these Terms at any time.
            </p>

            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              14.2 Users will be notified of any changes, and continued use of the Platform constitutes acceptance of
              the modified Terms.
            </p>
          </div>
        </div>

        {/* Section 15: Severability */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            15. SEVERABILITY
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              15.1 If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions
              shall remain in full force and effect.
            </p>
          </div>
        </div>

        {/* Section 16: Entire Agreement */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            16. ENTIRE AGREEMENT
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              16.1 These Terms constitute the entire agreement between the user and the Platform.
            </p>
          </div>
        </div>

        {/* Section 17: Contact Information */}
        <div className="space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "normal",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            17. CONTACT INFORMATION
          </h2>

          <div className="space-y-4">
            <p
              className="text-[#B8B8B8]"
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "normal",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Email: <span className="text-white font-semibold">onlyfoundersxyz@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
