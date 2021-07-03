import {useState} from "react" 
import Articles from "./Articles"
import Pagination from "./Pagination"
// importing themprovider and globalstyle for theme changing:
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${props => props.theme.mode === 'dark' ? '#111' : '#EEE'};
  color: ${props => props.theme.mode === 'dark' ? '#EEE' : '#111'};
}
`
function App() {
  const [theme, setTheme] = useState({mode: 'light'})


  return (
    <ThemeProvider theme={theme}>
      <>
      <GlobalStyle setTheme={setTheme}/>
      <div className="App">

        <Articles />
        <button onClick={e=>setTheme(theme.mode === 'dark' ? {mode:'light'} : {mode:'dark'})}>
          {theme.mode === 'dark' ? 'Light Them' : 'Dark Theme'}</button>
      </div>
      </>
    </ThemeProvider>
  )
}

export default App;
