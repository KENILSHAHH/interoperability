import React, { useState } from 'react'
import { NFTStorage, File, Blob } from 'nft.storage'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Head from "next/head";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkwOUYwN0M4Yjc2ODBBNDZkN0Q0ZDkwMmUzNjcyRDZmMzc3RTZjNzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTU1NDIwNDkyOCwibmFtZSI6Ik9wZW5EYXRhSGFjayJ9.dSwxOQqrrFNGdaoO39NlcIK4G9fSoRKkgaxBrzrA_eg'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
const nftAbi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getTokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const sourceMinterAbi = [
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "link",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "FailedToWithdrawEth",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			}
		],
		"name": "MessageSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "enum SourceMinter.PayFeesIn",
				"name": "payFeesIn",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "receiving",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenUri",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "withdrawToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const preferenceAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_primaryAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_secondaryAddresses",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "_chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokenPreference",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "secondary",
				"type": "address"
			}
		],
		"name": "getPrimaryAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserPreferences",
		"outputs": [
			{
				"internalType": "address",
				"name": "primaryAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "secondaryAddresses",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenPreference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "primaryAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenPreference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const preferenceAddress = "0x5d23c6bfB54b76511dE38a3c5770306620f35074";
const sourceMinterAddress = "0xD81cf3CbF8B7554208146451A3219c29534D80cA"
const NFTaddress = "0x7B690825bBB3f0a5b8410d4596e12e79c62909C0"
function sendNFTs() {
	const [enteredAddress, setEnteredAddress] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [receiverChain, setReceiverChain] = useState("");
	const [preference, setPreference] = useState([]);
	const [correctAddress, setCorrectAddress] = useState("")
	const [ipfs, setIpfs] = useState("");
    const handleImageChange = (e:any) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]));
    };
    async function storeNft() {
        const r = await fetch(imageSrc);
        const blobImage =await r.blob()
        const nft = {
            blobImage
        }
        const imageFile = new File([ blobImage ], 'nft.png', { type: 'image/png' })
        const metadata = await client.storeBlob(
  blobImage
        );
        console.log(metadata);
		const nftStorageLink = `https://${metadata}.ipfs.nftstorage.link`
		setIpfs(nftStorageLink);
		console.log(nftStorageLink);
		window.alert("Successfully stored on NFT.Storage")
    //    https://bafkreieqpk2qh25xm2ei3z7ia4dxrmzrs3c2hmpw4d3dupy6kzbuv2f3w4.ipfs.nftstorage.link/
    }
	async function mintNft() {
	    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(sourceMinterAddress, sourceMinterAbi, signer);
		const txn = await contract.mint("12532609583862916517", "0xf701D829de7ecD724f674C00fD714936Fa510ce8", 0, correctAddress,ipfs )
		await txn.wait();
		window.alert(`Check the transaction chainlink ccip explorer https://ccip.chain.link/msg/${txn}`)
	}
	async function checkAddress() {
			    const web3Modal = new Web3Modal();
	const connection = await web3Modal.connect();
	const provider = new ethers.providers.Web3Provider(connection);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(preferenceAddress, preferenceAbi, signer);
		const txn = await contract.getPrimaryAddress(enteredAddress);
		const pref = await contract.getUserPreferences(txn);
		console.log(pref);
		setPreference(pref);
		setReceiverChain(pref[2]);
		console.log(txn);
		
		if (txn != enteredAddress) window.alert(`User's Preferred Address is ${txn}`);
		setCorrectAddress(txn);
		
	}
	const handleInputChange = async (e: any) => {
		setEnteredAddress(e.target.value);
		
	}

	async function preferedChain() {
		const preferedchain = preference[2];
		console.log(preferedchain);
	}

    return (
		<div style={{padding:"200px"}}>
			  <Head> <script async src="https://saturn.tech/widget.js"/> </Head>
			<div ><div className="card lg:card-side bg-base-100 shadow-xl">
				<figure > <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" style={{width:"700px"}} >
					{imageSrc =="" ? 
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input onChange={handleImageChange} accept="image/*" id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
						</div>
						: <img src={imageSrc}/> }
              </div> </figure>
  <div className="card-body">
					<h2 className="card-title">Enter the Receiver's Address</h2>
					
					<input onChange={handleInputChange} type="text" placeholder="0x..." className="input input-bordered w-full max-w-xs" />
					<button onClick={checkAddress} className="btn btn-primary">Check if the address is correct</button>
					{correctAddress && <h6>User's Preferred Address is {correctAddress}</h6>}
					{/* <h2 className="card-title">NFT Contract Address</h2>
					<input type="text" placeholder="0x..." className="input input-bordered w-full max-w-xs" /> */}
					
					<div className="card-actions justify-end">
						<button onClick={storeNft} className="btn btn-neutral" > Upload to NFTStorage </button>
						{/* <button className="btn btn-neutral" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}>Don't have an NFT contract already? Create one</button>
						<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Create a NFT contract!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog> */}
						<button  className="btn btn-primary" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}>Send NFT</button>
						<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
								<h3 className="font-bold text-lg">User's prefered chain to recieve NFTs is { receiverChain}</h3>
								<p className="py-4">Do you want to Cross Mint the NFT to user's desired chain?</p>
								<button onClick={mintNft} className="btn btn-neutral" >Yes mint the NFT to the users address </button>
  </div>
  <form method="dialog" className="modal-backdrop">
    
  </form>
</dialog>
    </div>
  </div>
</div></div>
                  
           
          
            
        </div>
  
       
      
  )
}

export default sendNFTs