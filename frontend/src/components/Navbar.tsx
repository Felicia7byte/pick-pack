import logo from "../assets/logo.png"

function Navbar() {
    const navbar = [
        {name: "HOME", href: "#home"},
        {name: "PRODUCT", href: "#product"},
        {name: "CONTACT", href: "#contact"},
    ]

  return (
    <div className="nav">
        <div className="logo">
            <img src={logo} alt="" />
            <h1>Pick Pack</h1>
        </div>

        <div className="links">
            {navbar.map((nav) => (
                <a key={nav.name} href={nav.href}>{nav.name}</a>
            ))}
        </div>
    </div>
  );
};

export default Navbar;