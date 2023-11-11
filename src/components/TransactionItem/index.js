// Write your code here
const TransactionItem = props => {
  const {transactionList, deletfn} = props
  const {id, Title, Amount, Type} = transactionList
  const deletebtn = () => {
    deletfn(id)
  }
  return (
    <div>
      <h1>History</h1>
      <div className="transaction">
        <p>Title</p>
        <p>Amount</p>
        <p>Type</p>
      </div>
      <li>
        <p>{Title}</p>
        <p>Rs {Amount}</p>
        <p>{Type}</p>
        <button type="button" onClick={deletebtn} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </li>
    </div>
  )
}
export default TransactionItem
