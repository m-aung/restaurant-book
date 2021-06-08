import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = ({ match, destination }) => {
    let parentPath;
    if (match.path === '/') {
        parentPath = `/${destination}`;
    } else {
        const arr = match.path.split('/');
        const currPage = arr[arr.length - 1];
        parentPath = arr
            .filter((item) => {
                return item !== currPage;
            })
            .join('/');
    }
    return (
        <Link to={parentPath}>
            {match.path === '/'
                ? `<-- ${destination.charAt(0).toUpperCase() + destination.slice(1)}`
                : '<-- Back'}
        </Link>
    );
};

export default BackButton;