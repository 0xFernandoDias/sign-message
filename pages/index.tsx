import { ConnectWallet, useSDK } from "@thirdweb-dev/react"
import type { NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
	const [address, setAddress] = useState<string>()
	const [signature, setSignature] = useState<string>()
	const sdk = useSDK()
	const message = "Please sign this message to prove you own this address"

	async function signMessage() {
		const sign = await sdk?.wallet.sign(message)

		if (!sign) {
			alert("Failed to sign message")
			throw new Error("Failed to sign message")
		}

		setSignature(sign)
	}

	async function recoverAddress() {
		if (!signature) return

		const addr = sdk?.wallet.recoverAddress(message, signature)

		if (!addr) {
			alert("No address")
			throw new Error("No address")
		}

		setAddress(addr)
	}

	return (
		<div
			style={{
				maxWidth: "200px",
				gap: "14px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<ConnectWallet />
			<button type="button" onClick={signMessage}>
				Sign message
			</button>
			<p>Signature: {signature}</p>
			<br />
			<button type="button" onClick={recoverAddress}>
				Recover address
			</button>
			<p>Address: {address}</p>
		</div>
	)
}

export default Home
