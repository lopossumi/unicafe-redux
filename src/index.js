import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = ({zero}) => {
  const palautteita = 0

  // if (palautteita === 0) {
  //   return (
  //     <div>
  //       <h2>stataistiikka</h2>
  //       <div>ei yhtään palautetta annettu</div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td></td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td></td>
          </tr>
          <tr>
            <td>huono</td>
            <td></td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td></td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button onClick={zero}>nollaa tilasto</button>
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
    else if (nappi === 'ZERO') {
      store.dispatch({ type: 'ZERO' })
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
          zero={this.klik('ZERO')}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)