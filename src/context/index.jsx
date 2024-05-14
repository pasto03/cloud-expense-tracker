import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const emptyFormData = {
        type: "expense",
        category: "",
        amount: 0,
        description: ""
    };

    console.log(emptyFormData);
    const [formData, setFormData] = useState(emptyFormData);

    const [value, setValue] = useState('expense');
    const [category, setCategory] = useState("");
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [allTransactions, setAllTransactions] = useState([]);
    const [user, setUser] = useState(null);

    function handleFormSubmit(currentFormData) {
        console.log(currentFormData);

        if (!currentFormData.description || !currentFormData.amount || !currentFormData.category) return;
        setAllTransactions([
            ...allTransactions,
            { ...currentFormData, id: Date.now() },
        ])
    }

    console.log(allTransactions);

    return <GlobalContext.Provider
        value={{
            formData,
            emptyFormData,
            setFormData,
            totalExpense,
            setTotalExpense,
            totalIncome,
            setTotalIncome,
            value,
            setValue,
            category, 
            setCategory,
            allTransactions,
            setAllTransactions,
            user,
            setUser,
            handleFormSubmit
        }}
    >{children}</GlobalContext.Provider>
}