

export default function TransactionOptions({ transactionType, onChange }) {
    const ExpenseOptions = (
        <>
            <option value={"daily"} onChange={onChange}>Daily</option>
            <option value={"housing"} onChange={onChange}>Housing</option>
            <option value={"transport"} onChange={onChange}>Transport</option>
            <option value={"healthcare"} onChange={onChange}>Healthcare</option>
            <option value={"education"} onChange={onChange}>Education</option>
            <option value={"entertainment"} onChange={onChange}>Entertainment</option>
            <option value={"others"} onChange={onChange}>Others</option>
        </>

    )
    const IncomeOptions = (
        <>
            <option value={"wage"} onChange={onChange}>Wage</option>
            <option value={"bonus"} onChange={onChange}>Bonus</option>
            <option value={"investement"} onChange={onChange}>Investment</option>
            <option value={"part-time"} onChange={onChange}>Part-Time</option>
            <option value={"others"} onChange={onChange}>Others</option>
        </>

    )

    return transactionType === "income" ? IncomeOptions : ExpenseOptions;
}