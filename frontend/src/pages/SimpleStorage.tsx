import { useAccount, useContract } from '../shared'
import { Button } from 'rsuite'
import { Contract } from 'ethers'

export function SimpleStorage() {
  const [account, connectAccount] = useAccount()
  const [contract] = useContract('SimpleStorage', account)

  connectAccount()

  async function setMessage(contract: Contract) {
    await contract.setMessage('Hello world');
    console.log('setMessage done!')
  }

  async function getMessage(contract: Contract) {
    try {
      console.log(await contract.getMessage())
    } catch (error) {
      console.log(error)
    }
  }

  function eventListener(contract: Contract) {
    if (!contract) return

    console.log('Listening...')
    contract.on("MessageChanged", console.log)
  }

  return (
    <div>
      <h1>Smart contracts!</h1>
      <Button onClick={connectAccount}>Signer!</Button>
      <Button onClick={() => setMessage(contract)}>Set message</Button>
      <Button onClick={() => getMessage(contract)}>Get Message</Button>
      <Button onClick={() => eventListener(contract)}>Subscribe to listener</Button>
    </div>
  )
}
