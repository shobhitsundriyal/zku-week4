import detectEthereumProvider from "@metamask/detect-provider"
import { Strategy, ZkIdentity } from "@zk-kit/identity"
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols"
import { providers, Contract, utils } from "ethers"
import Greeter from "artifacts/contracts/Greeters.sol/Greeters.json"
import Head from "next/head"
import React, { useEffect } from "react"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

import styles from "../styles/Home.module.css"

export default function Home() {
    const [logs, setLogs] = React.useState("Connect your wallet and greet!")

    const [greeterEvents, setGreeterEvents] = React.useState("Listening for new greetings...")

    const filter = {
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    topics: [utils.id("NewGreeting(bytes32)")],
  };

    const checkEvents = async() => {
      const provider = new providers.JsonRpcProvider("http://localhost:8545")
      const greeterContract = new Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", Greeter.abi, provider)

      console.log("CHECK EVENTS TRIGGERED")
      greeterContract.on(filter, (greeting: string) => {
          console.log(utils.parseBytes32String(greeting))
          setGreeterEvents(utils.parseBytes32String(greeting))
        })
    // const provider = (await detectEthereumProvider()) as any;
    //     await provider.request({ method: "eth_requestAccounts" });
    //     const ethersProvider = new providers.Web3Provider(
    //       provider as ExternalProvider
    //     );
    //     ethersProvider.on(filter, (log, event) => {
    //       console.log(`log: ${utils.toUtf8String(log.data)}`);
    //       setGreeterEvents(utils.toUtf8String(log.data));
    //     });
    }

    useEffect(() => {
      async function checkEventsCaller(){
        //   setInterval(async ()=> await checkEvents(), 1000)
      }
    
    //   checkEventsCaller()
    }, [])
    


    async function greet() {
        checkEvents()
        setLogs("Creating your Semaphore identity...")

        const provider = (await detectEthereumProvider()) as any

        await provider.request({ method: "eth_requestAccounts" })

        const ethersProvider = new providers.Web3Provider(provider)
        const signer = ethersProvider.getSigner()
        const message = await signer.signMessage("Sign this message to create your identity!")

        const identity = new ZkIdentity(Strategy.MESSAGE, message)
        const identityCommitment = identity.genIdentityCommitment()
        const identityCommitments = await (await fetch("./identityCommitments.json")).json()

        const merkleProof = generateMerkleProof(20, BigInt(0), identityCommitments, identityCommitment)

        setLogs("Creating your Semaphore proof...")

        const greeting = "Hello world"

        const witness = Semaphore.genWitness(
            identity.getTrapdoor(),
            identity.getNullifier(),
            merkleProof,
            merkleProof.root,
            greeting
        )

        const { proof, publicSignals } = await Semaphore.genProof(witness, "./semaphore.wasm", "./semaphore_final.zkey")
        const solidityProof = Semaphore.packToSolidityProof(proof)

        const response = await fetch("/api/greet", {
            method: "POST",
            body: JSON.stringify({
                greeting,
                nullifierHash: publicSignals.nullifierHash,
                solidityProof: solidityProof
            })
        })

        if (response.status === 500) {
            const errorMessage = await response.text()

            setLogs(errorMessage)
        } else {
            setLogs("Your anonymous greeting is onchain :)")
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Greetings</title>
                <meta name="description" content="A simple Next.js/Hardhat privacy application with Semaphore." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Greetings</h1>

                <p className={styles.description}>A simple Next.js/Hardhat privacy application with Semaphore.</p>

                <div className={styles.logs}>{logs}</div>

                <div onClick={() => greet()} className={styles.button}>
                    Greet
                </div>
                
            </main>
            <button onClick={checkEvents} className='border-2 p-2'>click</button>
            <textarea id="message" readOnly value={greeterEvents} className="block p-2.5 w-full text-sm rounded-sm bg-black text-white" placeholder="Listening for new greetings..."></textarea>
        </div>
    )
}
