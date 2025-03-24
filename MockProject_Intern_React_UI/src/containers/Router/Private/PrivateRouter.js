import React from 'react';
// import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { Route, Routes } from 'react-router-dom';
// import _ from 'lodash';

const SystemPrivate = (props) => {
    // const userInfoProps = useSelector(state => state.user.userInfo);
    // const isLoggedInProps = useSelector(state => state.user.isLoggedIn);
    return (
        <React.Fragment>
            <Routes>
                <Route path="*" element={
                    <Alert variant="dark" className="mt-10" style={{ height: '100vh', padding: '100px 50px' }}>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            You don't have permission to access this route
                        </p>
                    </Alert>
                } />
            </Routes>
        </React.Fragment>
    )
}

export default SystemPrivate;