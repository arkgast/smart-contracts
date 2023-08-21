import { useAccount } from './shared'

function App() {

  const [account, connectAccount] = useAccount()

  connectAccount()

  console.log(account)

  return (
    <div>
      <h1>Smart contracts!</h1>
      <button onClick={connectAccount}>Signer!</button>
    </div>
  )
}

export default App
