import { Avatar, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import Summary from "../summary";
import ExpenseView from "../expense-view";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import CloudConnection from "../cloud-connection";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineUser } from "react-icons/ai";


export default function Main() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { emptyFormData, setFormData, totalExpense, setTotalExpense,
        totalIncome, setTotalIncome, allTransactions, user, setUser } =
        useContext(GlobalContext);

    useEffect(() => {
        let income = 0;
        let expense = 0;

        allTransactions.forEach(item => {
            item.type === 'income'
                ? income = income + parseFloat(item.amount)
                : expense = expense + parseFloat(item.amount)
        })

        setTotalExpense(expense);
        setTotalIncome(income);
    }, [allTransactions]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = 'You have unsaved changes, are you sure you want to leave?';
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const getUser = async () => {
        try {
            const url = `/api/auth/status`;
            const res = await fetch(url, { 
                credentials: "include",
            });
            try {
                const user = await res.json();
                setUser(user);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function fetchTest() {
        try {
            const url = `/`;
            const res = await fetch(url);
            try {
                const data = await res.json();
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // load transactions
    const getData = async () => {
        try {

        } catch (error) {

        }
    };

    useEffect(() => {
        fetchTest();
        getUser();
    }, []);

    // comment in production
    console.log(user);

    return (
        <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
            <Flex alignItems={"center"} justifyContent={"space-between"} mt={"8"} mb={"4"}>
                <Heading
                    color={"blue.400"}
                    display={["none", "block", "block", "block", "block"]}
                >
                    Expense Tracker
                </Heading>
                <Flex alignItems={"center"}>
                    <CloudConnection user={user} transactions={allTransactions} />
                    <Button
                        onClick={() => { onOpen(); setFormData(emptyFormData); }}
                        bg={"blue.300"} color={"black"} ml={"4"}>
                        Add New Transaction
                    </Button>
                    <Avatar
                        size={"md"} mx={"4"} bg={"blue.200"}
                        cursor={"pointer"} onClick={() => { console.log("Avatar is clicked") }}
                        name={user ? user.username || user.displayName : ""}
                        icon={<AiOutlineUser fontSize='1.5rem' />}
                    />
                </Flex>
            </Flex>
            <Summary totalExpense={totalExpense} totalIncome={totalIncome} isOpen={isOpen} onClose={onClose} />

            <Flex
                w={"full"}
                alignItems={"flex-start"}
                justifyContent={"space-evenly"}
                flexDirection={["column", "column", "column", "row", "row"]}
            >
                <ExpenseView data={allTransactions.filter(item => item.type === "expense")} type={"expense"} />
                <ExpenseView data={allTransactions.filter(item => item.type === "income")} type={"income"} />
            </Flex>
            {/* <Heading size={"md"} mb={"4"} mt={"8"} color={"red.400"}>
                This is a prototype. All transaction data will not be saved.
            </Heading> */}

        </Flex>
    );
}
