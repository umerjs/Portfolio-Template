import PillNav from './reactbits/PillNav';
import { navLinks, personalInfo } from '../data/data';

const LOGO_SVG = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>",
  "<circle cx='20' cy='20' r='18' fill='none' stroke='%235be8ff' stroke-opacity='0.35' stroke-width='1.5'/>",
  `<text x='20' y='25.5' font-family='monospace' font-size='13' font-weight='700' fill='%235be8ff' text-anchor='middle'>${personalInfo.initials}</text>`,
  '</svg>',
].join('');

const items = navLinks.map(l => ({ label: l.label, href: `#${l.id}` }));

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-[1000] flex justify-center px-4 md:px-0 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md md:max-w-none md:w-auto">
        <PillNav
          logo={LOGO_SVG}
          logoAlt={personalInfo.brand}
          logoHref="#home"
          items={items}
          baseColor="#0d1724"
          pillColor="#5be8ff"
          pillTextColor="#04121a"
          hoveredPillTextColor="#5be8ff"
          initialLoadAnimation
        />
      </div>
    </div>
  );
}
