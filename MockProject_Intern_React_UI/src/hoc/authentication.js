import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
    // redirectPath này sẽ chuyển hướng người dùng nếu người dùng chưa đăng nhâp 
    // (state.user.isLoggedIn === false)
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    // Ở đây, locationHelper.getRedirectQueryParam(ownProps) được sử dụng để lấy giá trị từ 
    // truy vấn redirect, và nếu không có giá trị, nó sẽ sử dụng '/' làm giá trị mặc định. 
    // Điều này giúp xác định đường dẫn mà người dùng sẽ được chuyển hướng đến sau khi đăng nhập, 
    allowRedirectBack: false
});

