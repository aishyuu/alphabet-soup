'use strict';

function App() {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    const [state, setState] = React.useState({
        
    })

    function inputKey() {
        
    }

    return(
        <div>
            <div>
                <h1>Swift Type</h1>
            </div>
            <div className="game_information">
                <input autoFocus={true} onKeyDown />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#app-root'))