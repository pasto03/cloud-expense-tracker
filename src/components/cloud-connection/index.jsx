import { Button, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { FaDiscord, FaGoogle } from "react-icons/fa";


export default function CloudConnection({ user, transactions }) {
    const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const { setAllTransactions } = useContext(GlobalContext);

    const [buttonText, setButtonText] = useState('Save');
    const [isSaving, setIsSaving] = useState(false);
    const [restoreDelay, setRestoreDelay] = useState(false);

    const discordAuth = () => {
        if (user) return;
        window.open(`$/api/auth/discord`, "_self");
    };

    const googleAuth = () => {
        if (user) return;
        window.open(`$/api/auth/google`, "_self");
    };

    // save transactions
    async function saveData({ provider }) {
        try {
            if (!user) {
                console.log("Please log in before saving data.");
                return;
            }
            setIsSaving(true);
            const url = `/api/users/transactions`;
            const body = { provider: provider, userId: user.userId, transactions: [...transactions] };

            fetch(
                url,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).finally(() => {
                setButtonText('Saved!');
                setIsSaving(false);
                setRestoreDelay(true);
            });

            console.log("Saved to cloud.");

        } catch (error) {
            console.log(error);
        }
    }

    // load transactions
    async function loadData({ provider }) {
        try {
            if (!user) {
                console.log("Please log in before saving data.");
                return;
            }
            const body = { provider: provider, userId: user.userId };

            const res = await fetch(
                `/api/users/transaction`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await res.json();
            console.log("Data loaded: " + data);
            setAllTransactions([...data]);
            console.log("Data loaded from cloud.");

        } catch (error) {
            console.log(error);
        }
    }

    /* 
        1. when user is not logged in and there are records in webpage, let user save to cloud;
        2. else, let user load from cloud
    */
    const operation = (transactions.length > 0) ? "save" : "load";
    const nextCallback = operation === "save" ? saveData : loadData;

    useEffect(() => {
        if (restoreDelay) {
            setTimeout(() => { setButtonText("Save") }, 700);
            setRestoreDelay(false);
        } else {
            setButtonText(operation === "save" ? "Save" : "Load");
        }
    }, [operation, isSaving]);

    console.log(`Button state: ${isSaving} || ${restoreDelay}`);

    return <div>
        {/* <Button bg={"blue.400"} color={"black"} ml={"4"} px={"4"} onClick={() => { discordAuth(); nextCallback({ provider: "discord" }); }}>
            <FaDiscord size={"24"} />
            <Text ml={"2"}>{buttonText}</Text>
        </Button> */}
        <Button
            bg={"green.300"} color={"black"} ml={"4"} px={"8"}
            isLoading={isSaving}
            loadingText='Saving'
            onClick={() => { googleAuth(); nextCallback({ provider: "google" }); }}
        >
            <FaGoogle size={"20"} />
            <Text ml={"2"}>{buttonText}</Text>
        </Button>
    </div>;
}