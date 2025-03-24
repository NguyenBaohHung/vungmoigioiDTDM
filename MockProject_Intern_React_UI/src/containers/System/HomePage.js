import { Navigate } from "react-router-dom";


const HomePage = () => {
    let linkToRedirect = '/home';
    return (
        <Navigate to={linkToRedirect} />
    );
}


export default HomePage;