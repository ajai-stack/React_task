import React from 'react'
import { useState, useEffect } from 'react'


const myExpense = localStorage.getItem('expense')
    ? JSON.parse(localStorage.getItem('expense'))
    : []


export const Main = () => {

    const [expense, setExpense] = useState(myExpense);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleName = (e) => {
        setName(e.target.value)
        //console.log('Name',e.target.value)
    }
    const handleAmount = (e) => {
        setAmount(e.target.value)
        //console.log('Amount',e.target.value)
    }

    //Add method
    const handleSubmit = (e) => {
        e.preventDefault()

        if (amount > 0) {
            const expenses = { name, amount }

            setExpense([...expense, expenses]);

            setName('')
            setAmount('')

        } else {
            alert('invalid expense amount')
        }
    }

    //Delete method
    const handleRemove = () => {
        setExpense([])
    }

    useEffect(() => {
        localStorage.setItem('expense', JSON.stringify(expense))
    }, [expense])


    return (

        <div className='main'>
            <div className='group'>
                <b>Total Expense:</b> ${''}
                {
                    expense.reduce((previousValue, currentValue) => {
                        return (previousValue += parseInt(currentValue.amount))
                    }, 0)
                }
                <div class="input-group mb-3" style={{ width: "400px" }}>
                    <input type="text" class="form-control" placeholder="Expense Name " value={name} onChange={handleName} aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3" style={{ width: "400px" }}>
                    <input type="number" class="form-control" placeholder="Expense Amount" value={amount} onChange={handleAmount} aria-describedby="basic-addon1" />
                </div>
                <button class="btn btn-primary" onClick={handleSubmit} >Add</button>&nbsp;&nbsp;&nbsp;
                <button class="btn btn-danger" onClick={handleRemove}>Delete</button>

            </div>

            {/* transaction details */}
            <div className='details'>
                <h1>Transaction Details</h1>
                {
                    expense.map((item, index) => (
                        <p>{index + 1}. {item.name} - ${item.amount}-<b>Add</b> </p>
                    ))
                }

            </div>

        </div>
    )
}
