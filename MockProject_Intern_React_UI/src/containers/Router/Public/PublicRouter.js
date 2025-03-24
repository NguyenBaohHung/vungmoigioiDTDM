import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { pathPublic } from '../../../utils';

const SystemPublic = (props) => {
    return (
        <React.Fragment>
            <Routes>
                <Route path={pathPublic.HOME} element={props.children[0]} />
                <Route path={pathPublic.FAVOURITE} element={props.children[1]} />
                <Route path={pathPublic.NEWS} element={props.children[2]} />
                <Route path={pathPublic.PRODUCT} element={props.children[3]} />
                <Route path={pathPublic.DETAIL_PRODUCT} element={props.children[4]} />
                <Route path={pathPublic.DETAIL_NEWS} element={props.children[5]} />
                <Route path={pathPublic.UTILITIES} element={props.children[6]} />
                <Route path="*" element={
                    <Alert variant="dark" className="mt-10" style={{ height: '100vh', padding: '100px 50px' }}>
                        <Alert.Heading>Oh snap! You got an error</Alert.Heading>
                        <p>
                            You don't have permission to access this route
                        </p>
                    </Alert>
                } />
            </Routes>
        </React.Fragment>
    )
}

export default SystemPublic;