import { message } from "antd";


window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) 

window.notify = (text, type) =>{
    switch (type) {
        case 'success':
            message.success(text)
            
            break;
        case 'error':
            message.error(text)
            
            break;
        case 'warning':
            message.warning(text)
            
            break;
        case 'info':
            message.info(text)
            
            break;
    
        default: message.info(text)
            
    }

}