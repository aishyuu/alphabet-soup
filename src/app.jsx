'use strict';

function App() {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    const countRef = React.useRef(null)

    const [state, setState] = React.useState({
        completed: false,
        incorrect: false,
        response: "",
        current_index: 0,
        time_running: false
    })

    const [elapsedTime, setElapsedTime] = React.useState(0)


    function inputKey(event) {

        if(event.key === letters[state.current_index]) {
            setState({
                ...state,
                incorrect: false,
                current_index: state.current_index + 1,
                response: "",
            });

            if(letters[state.current_index] === 'a') {
                run()
            }

        } else {
            setState({
                ...state,
                incorrect: true
            });
        }
        if(state.current_index === 25) {
            setState({
                ...state,
                completed: true
            })
            clearInterval(countRef.current)
        }
    }

    const run = () => {
        const startTime = Date.now() - elapsedTime;
        countRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime)
        })
    }
    
    return(
        <div>
            <div className={state.completed ? "finished" : ""}>
                <h1>Alphabet Soup</h1>
            </div>
            <div className="game_information">
                {state.completed ? 
                    <h1>Completed</h1>
                    : 
                    <h1 className={state.incorrect ? "incorrect" : ""}>{letters[state.current_index]}</h1>
                }
                <input type="text" autoFocus={true} onKeyDown={inputKey} value={state.response} />
            </div>
            <div className="timer">
                <h2>{("0" + Math.floor(elapsedTime/60000)).slice(-2)} : {("0" + Math.floor(elapsedTime/1000)).slice(-2)} : {("00" + elapsedTime%1000).slice(-3)}</h2>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#app-root'))