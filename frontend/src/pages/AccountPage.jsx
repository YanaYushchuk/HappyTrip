import { useContext, useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import user from "../../../backend/src/models/user.js";

export default function AccountPage() {
    const {isSignedIn, signIn, userId, user } = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) { 
    subpage = 'profile';
}

    console.log(subpage);

    function linkClasses(type = null) {
        let classes = 'py-2 px-6 bg-gray-200 rounded-full';
        if (type === subpage || (subpage === underfined && type === 'profile')) {
            classes = 'py-2 px-6 bg-primary rounded-full';
        }
        return classes
    }
    return (
        <div>
            <nav className="w-full justify-center flex mt-8 gap-4">
                <Link className={linkClasses('profile')} to={'/account'}>Профіль</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>Мої бронювання</Link>
            </nav>
            <div>
                <p>
                    <form> {isSignedIn &&
                        <Button onClick={signOut} variant="contained" sx={{ borderRadius: "25px", width: "100%" }}>Log out</Button>
                    }
                        <div className="text-center py-2 text-gray-500"></div>
                    </form>
                </p>
            </div>
        </div>
    );
}



