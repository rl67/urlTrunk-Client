import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>urlTagd | Organizing Your Bookmarks</h1>
            <div className="links">
                <Link to="/api/tagList" style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '20px',
                    padding: '10px'
                }}>Tag Lists</Link>
            </div>
        </nav>
    );
}

export default Navbar;