import { Navigate } from 'react-router-dom';
import { pathPublic } from '../../utils/index';

const Authentication = ({ location, isAuthenticated, children }) => {
    var arrPublicPath = Object.keys(pathPublic).map((key) => pathPublic[key]);

    if (arrPublicPath.includes(location.pathname)) {
        return <>{children[1]}</>;
    }

    if (!isAuthenticated) {
        return <Navigate to='login' />;
    }

    return <>{children[0]}</>;
};

export default Authentication;
