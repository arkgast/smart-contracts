import { ethers } from 'ethers';
import { useAccount, useContract } from './shared'

function App() {
  const [account, connectAccount] = useAccount()
  const [contract] = useContract('SimpleStorage', account)

  connectAccount()

  async function setMessage(contract: ethers.Contract) {
    await contract.setMessage('Hello world');
    console.log('setMessage done!')
  }

  async function getMessage(contract: ethers.Contract) {
    try {
      console.log(await contract.getMessage())
    } catch (error) {
      console.log(error)
    }
  }

  function eventListener(contract: ethers.Contract) {
    if (!contract) return

    console.log('Listening...')
    contract.on("MessageChanged", console.log)
  }

  return (
    <div>
      <h1>Smart contracts!</h1>
      <button onClick={connectAccount}>Signer!</button>
      <button onClick={() => setMessage(contract)}>Set message</button>
      <button onClick={() => getMessage(contract)}>Get Message</button>

      <button onClick={() => eventListener(contract)}>Subscribe to listener</button>
    </div>
  )
}

export default App
