// src/App.js
import Content from './components/Content';
import ThemeSwitcher  from './components/ThemeSwitcher';
function App() {
 return (
 <div style={{ textAlign: 'center' }}>
 <ThemeSwitcher />
 <Content />
 </div>
 );
}
export default App;