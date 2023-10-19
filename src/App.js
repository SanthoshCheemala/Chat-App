import './App.css';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginFrom from './components/LoginForm';
function App() {

  if(!localStorage.getItem('username')) return <LoginFrom />
  return (
    <div className="App">
      <ChatEngine 
        height="100vh"
        projectID="34b2eb52-7c8c-4774-99bd-cc7c3ab135e5"
        userName={
          localStorage.getItem('username')
        }
        userSecret={
          localStorage.getItem('password')
        }
        renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>}
      />
    </div>
  );
}

export default App;
