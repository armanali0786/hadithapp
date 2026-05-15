import Button from "../../components/Button";
import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaSkype,
  FaLinkedin,
} from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <footer id="footer" className="">
          <section className="bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="bg-gray-200 text-primary-foreground p-20 shadow-md">
                <h2 className="text-xl font-bold">10+ Islamic apps</h2>
                <p>Bringing people closer to Allah</p>
                <a href="#" className="text-accent hover:underline">
                  Check out all apps &gt;
                </a>
              </div>
              <div className="bg-[#009153] text-white p-20 shadow-md">
                <h2 className="text-xl text-blue-800 font-bold">Sadaqah Jariyah</h2>
                <p className="text-white">Help Us Reach Muslims Worldwide</p>
                <a href="#" className="text-accent hover:underline">
                  Donate &gt;
                </a>
              </div>
              <div className="bg-[#55433b] text-white p-20 shadow-md">
                <h2 className="text-xl text-blue-500 font-bold">Volunteer</h2>
                <p className="text-white">Got Skills & Want To Use For The Ummah?</p>
                <a href="#" className="text-accent hover:underline">
                  Get Involved &gt;
                </a>
              </div>
              <div className="bg-zinc-200 text-zinc-800 p-20 shadow-md">
                <h2 className="text-xl font-bold">What's New?</h2>
                <p>Beautiful Quran Quotes About Life</p>
                <a href="#" className="text-accent hover:underline">
                  Check out &gt;
                </a>
              </div>
            </div>
          </section>

        <div className="bg-[#383e42] footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h5 className="text-2xl font-bold">QADRI JAME MASJID FOUNDATION</h5>
                <p>
                  Parsauni Khas, Gopalganj, Bihar
                  <br />
                  India <br />
                  <br />
                  <strong>Phone:</strong> +91 731 9977 276
                  <br />
                  <strong>Email:</strong> armanali.shaikh77@gmail.com
                  <br />
                </p>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Resources</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i> <a href="#">Home</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Blogs</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Help & Support</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Volunteer</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Contact us</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Social Networks</h4>
                <div className="social-links">
                  <a href="#" className="tsocial-linkswitter">
                    <FaTwitter className="ml-2" />
                  </a>
                  <a href="#" className="facebook">
                    <FaFacebook className="ml-2" />
                  </a>
                  <a href="#" className="instagram">
                    <FaInstagram className="ml-2" />
                  </a>
                  <a href="#" className="google-plus">
                    <FaSkype className="ml-2" />
                  </a>
                  <a href="#" className="linkedin">
                    <FaLinkedin className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-bottom clearfix">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Hadith</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by  Arman Ali
          </div>
        </div>
      </footer>
    </>
  );
}
