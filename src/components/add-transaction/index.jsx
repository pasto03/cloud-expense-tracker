import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Input, RadioGroup, Radio, ModalFooter, Button, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import TransactionOptions from "./options";

export default function TransactionForm({ onClose, isOpen }) {

    const { formData, setFormData, value, setValue, category, setCategory, handleFormSubmit } = useContext(GlobalContext);

    function handleFormChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleFormSubmit(formData);
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Enter Description</FormLabel>
                        <Input
                            placeholder="Enter Transaction Description"
                            name="description"
                            type="text"
                            onChange={handleFormChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Enter Amount</FormLabel>
                        <Input
                            placeholder="Enter Transaction Amount"
                            name="amount"
                            type="number"
                            onChange={handleFormChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <Select 
                        onChange={(event) => {
                            setCategory(event.target.value);
                            handleFormChange(event);
                        }}
                        name="category"
                        placeholder={`Select ${value === "income" ? "Income" : "Expense"} Type`}>
                            <TransactionOptions transactionType={value} onChange={handleFormChange} />
                        </Select>
                    </FormControl>
                    <RadioGroup mt="5" value={value} onChange={setValue}>
                        <Radio
                            checked={formData.type === "income"}
                            value="income" colorScheme="blue" name="type" onChange={handleFormChange}
                            >Income</Radio>
                        <Radio
                            checked={formData.type === "expense"}
                            value="expense" colorScheme="red" name="type" onChange={handleFormChange}>Expense</Radio>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button mr={"4"} onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} type="submit">Add</Button>
                </ModalFooter>
            </ModalContent>
        </form>
    </Modal>
}