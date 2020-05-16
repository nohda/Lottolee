import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './containers/homepage';
import {makeLottoList} from './actions/lotto'
class App extends React.Component{
    render(){
        console.log('App');
        makeLottoList();
        return(
            <Homepage></Homepage>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)