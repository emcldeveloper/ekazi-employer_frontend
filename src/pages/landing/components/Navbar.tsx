import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const links = ["Features", "Pricing", "FAQ"];

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl ">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="w-20">
          <img src="/images/logo.png" alt="logo" />
        </div>

        <nav className="hidden gap-10 md:flex">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-Blue"
          >
            Login
          </Button>

          <Button
            onClick={() => navigate("/register")}
            className=" bg-Blue hover:bg-blue-600"
          >
            Get Started
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {links.map((item) => (
              <a key={item}>{item}</a>
            ))}

            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-muted-foreground hover:text-Blue"
            >
              Login
            </Button>

            <Button onClick={() => navigate("/register")} className="bg-Blue">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
