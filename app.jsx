'use strict';

function App() {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    if(localStorage.getItem('best_time') == null){
        localStorage.setItem('best_time', '')
    }

    let countRef = React.useRef(null)

    const [state, setState] = React.useState({
        completed: false,
        incorrect: false,
        response: "",
        current_index: 0,
        best_time: localStorage.getItem('best_time'),
        started: false,
        new_record: false
    })

    const [times, setTimes] = React.useState([])

    const [elapsedTime, setElapsedTime] = React.useState(0)


    function inputKey(event) {

        if(event.key === letters[state.current_index]) {
            setState({
                ...state,
                incorrect: false,
                current_index: state.current_index + 1,
                response: "",
                started: true,
            });

            if(letters[state.current_index] === 'a') {
                run()
            }

            setTimes([...times, {letter: letters[state.current_index], current_time: elapsedTime}])


        } else {
            setState({
                ...state,
                incorrect: true
            });
        }
        if(state.current_index === 25) {
            if(state.best_time === "" || state.best_time > elapsedTime) {
                localStorage.setItem('best_time', elapsedTime.toString())
                setState({
                    ...state,
                    completed: true,
                    best_time: elapsedTime,
                    new_record: true
                })
            } else {
                setState({
                    ...state,
                    completed: true,
                })  
            }
            clearInterval(countRef.current)
        }
    }

    const run = () => {
        const startTime = Date.now() - elapsedTime;
        
        countRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime)
        })
    }

    function stop() {
        clearInterval(countRef.current)
        setTimes([])
        console.log(times)
        
        setElapsedTime(0)
        setState({
            ...state,
            current_index: 0,
            completed: false,
            started: false,
            new_record: false
        })
    }
    
    return(
            <div className="app">
            {state.started ? 
                <div className="times-table">
                    <table>
                        {times.map(function(timing) {
                            return(
                                <tr>
                                    <td>{timing.letter}</td>
                                    <td>{("0" + Math.floor(timing.current_time/60000)).slice(-2)} : {("0" + Math.floor(timing.current_time/1000)).slice(-2)} : {("00" + Math.floor(timing.current_time%1000)).slice(-3)}</td>
                                </tr>
                            
                            )
                        })}
                    </table>
                    
                </div>
                :
                <div className="intro-text">
                    <h1>Alphabet Soup</h1>
                </div>
            }
            
            <div className="game-information">
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
            
            {state.completed ?
                <div>
                    {state.new_record ? 
                    <p className="new-record">New Record!</p>
                    :
                    <div></div>
                    }
                    
                    <button className="btn btn-secondary" onClick={stop}>Restart</button>
                </div>
                :
                <div></div>
            }

            {state.best_time === '' ?
                <div>
                    <p>Best Time - Complete a run</p>
                </div>
                :
                <div>
                    <p>Best Time - {("0" + Math.floor(state.best_time/60000)).slice(-2)} : {("0" + Math.floor(state.best_time/1000)).slice(-2)} : {("00" + state.best_time%1000).slice(-3)}</p>
                </div>
            }
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#app-root'))