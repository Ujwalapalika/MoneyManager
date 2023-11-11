import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    historyList: [],
  }

  addTitle = event => {
    this.setState({Title: event.target.value})
  }

  addAmount = event => {
    this.setState({Amount: event.target.value})
  }

  selectTransactionType = event => {
    this.setState({Type: event.target.value})
  }

  deletfn = id => {
    const {historyList, income, expenses, balance} = this.state
    const filterhistorList = historyList.filter(
      transactions => transactions.id !== id,
    )
    this.setState({historyList: filterhistorList})
    const newList = historyList.filter(tran => tran.id === id)
    console.log(newList)
    if (newList[0].Type === 'INCOME') {
      this.setState({
        income: Number(income) - Number(newList[0].Amount),
        balance: Number(balance) - Number(newList[0].Amount),
      })
    } else {
      this.setState({
        expenses: Number(expenses) - Number(newList[0].Amount),
        balance: Number(balance) + Number(newList[0].Amount),
      })
      console.log(newList[0].Amount)
    }
  }

  addTransaction = event => {
    event.preventDefault()
    const {
      historyList,
      Title,
      Amount,
      Type,
      income,
      expenses,
      balance,
    } = this.state
    const newTransaction = {
      Title,
      Amount,
      Type,
      id: uuidv4(),
    }
    this.setState({historyList: [...historyList, newTransaction]})
    if (Type === 'INCOME') {
      this.setState({
        income: Number(income) + Number(Amount),
        balance: Number(balance) + Number(Amount),
      })
    } else {
      this.setState({expenses: Number(expenses) + Number(Amount)})
      this.setState({balance: Number(income) - Number(expenses)})
    }
    this.setState({Title: ''})
    this.setState({Amount: ''})
    this.setState({Type: transactionTypeOptions[0].optionId})
  }

  render() {
    const {balance, income, expenses, historyList} = this.state
    const {Title, Amount, Type} = historyList
    return (
      <div>
        <div className="welcomeCard">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails balance={balance} income={income} expense={expenses} />
        </div>
        <form onSubmit={this.addTransaction}>
          <h1>Add Transaction</h1>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            onChange={this.addTitle}
            value={Title}
          />
          <label htmlFor="amount">AMOUNT</label>
          <input
            type="text"
            id="amount"
            onChange={this.addAmount}
            value={Amount}
          />
          <label htmlFor="type">Type</label>
          <select id="type" onChange={this.selectTransactionType} value={Type}>
            <option htmlFor="type" value={transactionTypeOptions[0].optionId}>
              Income
            </option>
            <option htmlFor="type" value={transactionTypeOptions[1].optionId}>
              Expenses
            </option>
          </select>
          <button type="submit">Add</button>
        </form>
        {historyList.length > 0 ? (
          <ul>
            {historyList.map(historyitem => (
              <TransactionItem
                key={historyitem.id}
                transactionList={historyitem}
                deletfn={this.deletfn}
              />
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }
}
export default MoneyManager
// Write your code here
