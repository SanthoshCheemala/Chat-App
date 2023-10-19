import { useState } from "react";
import { sendMessage, isTyping } from 'react-chat-engine';
import { SendOutlined,PictureOutlined } from "@ant-design/icons";
function MessageForm(props) {
    const [value, setValue] = useState(''); // Changed setvalue to setValue
    const { chatId, creds } = props; // Destructure props
    function handleSubmit(event) {
        event.preventDefault();
        const text = value.trim();
        if (text.length > 0) {
            sendMessage(creds, chatId, { text });
            setValue('');
        }
    }
    function handleChange(e) {
        const m = e.target.value;
        setValue(m); // Use setValue to update the state
        isTyping(creds, chatId); // Pass creds as the first argument
    }
    function handleUpload(e){
        sendMessage(creds,chatId,{ files: e.target.files,text:''})
    }
    return (
        <div className="">
            <form action="" onSubmit={handleSubmit} className="message-form">
                <input 
                    className="message-input"
                    placeholder="Send a message..."
                    value={value}
                    onChange={handleChange}
                />
                <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                    <input type="file"
                        multiple={false}
                        id="upload-button"
                        style={{display:'none'}}
                        onChange={handleUpload}
                    />
                </span>
                </label>
                <button type="submit" className="send-button">
                    <SendOutlined className="send-icon" />
                </button>
            </form>
        </div>
    )
}

export default MessageForm;
