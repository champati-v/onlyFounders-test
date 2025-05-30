import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/onlyFounder_logo.svg"
                alt="OnlyFounder Logo"
                width={160}
                height={60}
                className="rounded-md"
              />
              <a
                    href="https://www.producthunt.com/posts/onlyfounders?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-onlyfounders"
                    target="_blank" rel="noopener noreferrer" 
                  >
                    <Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=947289&theme=dark&t=1743218613734"
                      alt="OnlyFounders - Permissionless&#0032;Fundraising&#0032;for&#0032;Early&#0045;stage&#0032;founders&#0032;in&#0032;Web3 | Product Hunt"
                      width={180}
                      height={54}
                      className=""
                    />
                  </a>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered Web3 fundraising platform connecting <br /> innovative
              blockchain projects with global investors.
            </p>
            <div className="flex space-x-4 items-center">
              <Link
                href="https://x.com/onlyfoundersxyz"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/x.svg"
                  alt="twitter"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">Twitter/X</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/foundershubnetwork"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/linkedin.svg"
                  alt="linkedin"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://discord.com/channels/975793425775464468/983032348935340033"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/Discord.svg"
                  alt="discord"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">Discord</span>
              </Link>
              <Link
                href="https://discord.gg/xyKaHgyz5w"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/telegram.svg"
                  alt="Telegram"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link
                href="https://linktr.ee/foundershub.network"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/Linktree.svg"
                  alt="linktree"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">Linktree</span>
              </Link>
              <Link
                href="mailto:moe@foundershub.network"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/mail.svg"
                  alt="mail"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">Mail</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 flex items-start space-x-24">
            <div>
              <ul className="space-y-2">
              <li>
                  <Link
                    href="https://www.onlyfounders.xyz/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="text-gray-400 hover:text-white"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/network"
                    className="text-gray-400 hover:text-white"
                  >
                    Network
                  </Link>
                </li>
                <li>
                  <Link href="/quests" className="text-gray-400 hover:text-white">
                    Quests
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://only-founder.gitbook.io/only-founder-docs"
                    className="text-gray-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="https://www.onlyfounders.xyz/blogs" target="_blank"
                    rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="https://docsend.com/v/pggxy/onlyfounders_pitchdeck" target="_blank"
                    rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    PitchDeck
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-400 hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-gray-400 hover:text-white">
                  Network
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} OnlyFounders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
