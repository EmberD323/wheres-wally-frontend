import { Link} from "react-router-dom";

function NavBar() {
        return (
            <div className="navBar">
                <div className="routes">
                    <Link to="homepage">Play Game</Link>
                    <Link to="scorepage">Score Board</Link>
                </div>
            </div>
        )
}

export default NavBar;