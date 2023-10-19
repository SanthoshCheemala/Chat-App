import axios from "axios";
import { useState } from "react";
function LoginFrom(){
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');
    const [error,seterror] = useState('');
    async function handlesubmit(e){
        e.preventDefault();
        const authObject = { 'Project-ID':"34b2eb52-7c8c-4774-99bd-cc7c3ab135e5",'User-Name':username,'User-Secret':password}
        try{
           await axios.get('https://api.chatengine.io/chats',{headers:authObject});
           localStorage.setItem('username',username)
           localStorage.setItem("password",password)
            window.location.reload();

        } catch (error){
            seterror('Oops,incorrect credentials')
        }
    }
    return (
        <div className="wrapper">
            <div className="form">
            <h1 className="tit">Chat Application</h1>
            <form onSubmit={handlesubmit}>
                <input type="text" value={username} className="input" placeholder="username" onChange={(e)=>setusername(e.target.value)} required />
                <input type="password" placeholder="password" onChange={(e)=>setpassword(e.target.value)} className="input" />
                <div align="center">
                <button type="submit" className="button">
                    <span>start Chatting</span>
                </button>
                </div>
                <h2 className="error">
                    {error}
                </h2>
            </form>
            </div>
        </div>
    )
}

export default LoginFrom;