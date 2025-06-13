import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/blogs" className="text-2xl font-bold">My Blog</Link>
        <nav className="space-x-4">
          <Link to="/blogs" className="hover:underline">Blogs</Link>
          <Link to="/publish" className="hover:underline">Publish</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;