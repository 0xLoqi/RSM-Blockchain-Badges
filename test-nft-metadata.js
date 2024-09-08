import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.VITE_ALCHEMY_API_KEY,
  network: Network.BASE_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const contractAddress = "0x959cf5441d19dfc7a497aaa455b1ccbd430274db";
const tokenId = "1"; // Test with each of your token IDs: "1", "2", "3"

async function testGetNftMetadata() {
  try {
    console.log(`Fetching metadata for NFT: ${contractAddress}/${tokenId}`);
    const response = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    console.log("NFT Metadata:");
    console.log(JSON.stringify(response, null, 2));

    // Check specific fields
    console.log("\nSpecific fields:");
    console.log("Title:", response.title);
    console.log("Name:", response.name);
    console.log("Description:", response.description);
    console.log("Image URL:", response.media[0]?.gateway || response.rawMetadata?.image);

    // Check transfer history
    console.log("\nFetching transfer history...");
    const transfers = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      contractAddresses: [contractAddress],
      category: ["erc721", "erc1155"],
      tokenId: tokenId,
    });
    console.log("Transfer history:");
    console.log(JSON.stringify(transfers, null, 2));

    // Check if it's earned (minted directly)
    const isEarned = transfers.transfers[0]?.from === "0x0000000000000000000000000000000000000000";
    console.log("\nIs Earned:", isEarned);

  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
  }
}

testGetNftMetadata();
