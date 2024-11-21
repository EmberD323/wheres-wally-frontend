import { Link} from "react-router-dom";

function NavBar() {
        return (
            <div className="navBar">
                    <Link to="homepage">Play Game</Link>
                    <h1>Wheres Wally?</h1>
                    <Link to="scorepage">Score Board</Link>
            </div>
        )
}

export default NavBar;