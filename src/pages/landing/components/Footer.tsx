import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const product = ["features", "pricing"];

const company = ["about", "contact"];

const support = ["privacy", "terms"];

export default function Footer() {
  return (
    <footer className="border-t bg-Blue text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-4">
        <div>
          <div className="w-28">
            <img src="/images/ekazi-white.png" alt="logo" />
          </div>

          <p className="mt-5 text-sm">
            An Online Recruitment Management Platform Designed for Employers,
            Recruiters, Job Seekers and Freelancers.
          </p>

          <div className="mt-6 flex gap-4">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div>
          <h3 className="font-bold">Product</h3>

          <div className="mt-5 space-y-3 text-sm">
            {product.map((item) => (
              <div>
                <Link to={`/#${item}`} key={item} className="capitalize">
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Company</h3>

          <div className="mt-5 space-y-3 text-sm">
            {company.map((item) => (
              <div>
                <Link to={`/${item}`} key={item} className="capitalize">
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Support</h3>

          <div className="mt-5 space-y-3 text-sm">
            {support.map((item) => (
              <div>
                <Link to={`/${item}`} key={item} className="capitalize">
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white py-6 text-center text-sm">
        © {new Date().getFullYear()} ekazi. All rights reserved.
      </div>
    </footer>
  );
}
