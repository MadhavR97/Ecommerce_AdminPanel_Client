import { createContext } from "react";

const context = createContext();

export const ContextProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications((prev) => [
            { id: Date.now(), message, read: false },
            ...prev
        ]);
    };

    const markAllRead = ()=>{
        
    }
}

return (
    <context.Provider value={{}}>
        {children}
    </context.Provider>
)
