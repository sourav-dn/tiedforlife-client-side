import logo from "../../../assets/logo.png";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import {
    Footer, FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";

const CustomFooter = () => {
    return (
        <Footer container className="bg-pink-200 text-gray-700 py-10 mt-5">
            <div className="w-10/12 mx-auto px-6">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <FooterBrand
                            src={logo}
                            alt="Logo"
                            name="Tied4Life"
                            className="w-20 h-20"
                        />
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-200">
                            Connecting hearts with trust and reliability. Your perfect match
                            starts here!
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle className="text-pink-700" title="about" />
                            <FooterLinkGroup col>
                                <FooterLink className="hover:text-pink-500" href="/bioData">BioData</FooterLink>
                                <FooterLink className="hover:text-pink-500" href="/aboutUs">About Us</FooterLink>
                                <FooterLink className="hover:text-pink-500" href="/contactUs">Contact Us</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle className="text-pink-700" title="Follow us" />
                            <FooterLinkGroup col>
                                <FooterLink className="hover:text-pink-500" href="#">Github</FooterLink>
                                <FooterLink className="hover:text-pink-500" href="#">Discord</FooterLink>
                                <FooterLink className="hover:text-pink-500" href="#">Youtube</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle className="text-pink-700" title="Legal" />
                            <FooterLinkGroup col>
                                <FooterLink className="hover:text-pink-500" href="#">Privacy Policy</FooterLink>
                                <FooterLink className="hover:text-pink-500" href="#">Terms &amp; Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="/" by="Tied4Life™" year={2025} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon className="hover:text-pink-500" href="https://facebook.com" icon={BsFacebook} />
                        <FooterIcon className="hover:text-pink-500" href="https://instagram.com" icon={BsInstagram} />
                        <FooterIcon className="hover:text-pink-500" href="https://x.com" icon={BsTwitter} />
                        <FooterIcon className="hover:text-pink-500" href="https://github.com" icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default CustomFooter;