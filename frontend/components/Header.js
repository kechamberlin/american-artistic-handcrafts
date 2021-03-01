import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">American Artistic Handcrafts</Link>
      </div>
      <div className="sub-bar">
        <p>| Search Bar Placeholder |</p>
      </div>
      <Nav />
    </header>
  );
}
