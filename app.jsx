'use strict';

function App() {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    const [state, setState] = React.useState({
        completed: false,
        response: "",
    })

    function inputKey(event) {
        if(event.key === 'Enter' && state.completed === false) {
            setState({
                ...state,
                completed: true
            })
        } else if (event.key === 'Enter' && state.completed === true) {
            setState({
                ...state,
                completed: false
            })
        }
    }

    function updateResponse(event) {
        setState({
            ...state,
            response: event.target.value
        });
    }

    return(
        <div>
            <div className={state.completed ? "finished" : ""}>
                <h1>Swift Type</h1>
            </div>
            <div className="game_information">
                <input type="text" autoFocus={true} onKeyDown={inputKey} onChange={updateResponse} value={state.response} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#app-root'))