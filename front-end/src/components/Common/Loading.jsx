import React from 'react';
import { HashLoader } from 'react-spinners';
import './common.css';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="flex-center">
                <HashLoader />
            </div>
        );
    }
}