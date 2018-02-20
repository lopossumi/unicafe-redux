import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = ({myStore}) => {
  const state = myStore.getState()
  const total = Object.values(state).reduce((a,b)=>a+b)
  const average = ((state.good-state.bad)/total).toFixed(2)
  const positive = Math.round(state.good/total*100,2)
  if (total === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive+'%'}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={()=>myStore.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div>
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    if (nappi === 'GOOD') {
      store.dispatch({ type: 'GOOD' })
    }
    else if (nappi === 'BAD') {
      store.dispatch({ type: 'BAD' })
    }
    else if (nappi === 'OK') {
      store.dispatch({ type: 'OK' })
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka 
          myStore={store}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)