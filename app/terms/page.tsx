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
          </div>
        </div>
      </div>
    </div>
  )
}
