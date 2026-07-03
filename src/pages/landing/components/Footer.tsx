import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const product = ["Features", "Pricing", "Dashboard", "Analytics"];

const company = ["About", "Blog", "Careers", "Contact"];

const support = ["Help Center", "Privacy", "Terms", "FAQ"];

export default function Footer() {
  return (
    <footer className="border-t bg-Blue text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-4">
        <div>
          <div className="w-28">
            <img src="/images/ekazi-white.png" alt="logo" />
          </div>

          <p className="mt-5">
            Modern recruitment software for employers, recruiters and hiring
            teams.
          </p>

          <div className="mt-6 flex gap-4">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div>
          <h3 className="font-bold">Product</h3>

          <div className="mt-5 space-y-3">
            {product.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Company</h3>

          <div className="mt-5 space-y-3">
            {company.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Support</h3>

          <div className="mt-5 space-y-3">
            {support.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white py-6 text-center text-sm">
        © {new Date().getFullYear()} eKazi. All rights reserved.
      </div>
    </footer>
  );
}
