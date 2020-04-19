import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    render(){
        return(
    <div>
        테스트 입니다.
    </div>

        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)