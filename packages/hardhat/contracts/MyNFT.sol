// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable {
	// Counter for token IDs
	uint256 private _tokenIdCounter;

	constructor(string memory name, string memory symbol) ERC721(name, symbol) {
		_tokenIdCounter = 0;
	}

	// Mint function to create a new NFT
	function mint(address to) public onlyOwner {
		uint256 tokenId = _tokenIdCounter;
		_safeMint(to, tokenId);

		_tokenIdCounter++;
	}

	function setUri(string memory tokenURI) public onlyOwner {
		_setTokenURI(_tokenIdCounter, tokenURI);
	}

	function getTokenURI(uint256 tokenId) public view returns (string memory) {
		require(_exists(tokenId), "Token does not exist");
		return tokenURI(tokenId);
	}
}
