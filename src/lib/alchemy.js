 // Github: https://github.com/alchemyplatform/alchemy-sdk-js
 import { Network, Alchemy } from "alchemy-sdk";

 const settings = {
   apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
   network: Network.BASE_SEPOLIA,
 };
 export const alchemy = new Alchemy(settings);
 
 export async function checkEditionOwnership(walletAddress, contractAddress, editionIds) {
   const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
     contractAddresses: [contractAddress],
   });
 
   const ownedEditions = nfts.ownedNfts.filter(nft => 
     editionIds.includes(nft.tokenId)
   );
 
   const transfers = await alchemy.core.getAssetTransfers({
     fromBlock: "0x0",
     toAddress: walletAddress,
     contractAddresses: [contractAddress],
     category: ["erc721", "erc1155"],
   });
 
   const earnedEditions = ownedEditions.filter(nft => {
     const transfer = transfers.transfers.find(t => t.tokenId === nft.tokenId);
     return transfer && transfer.from === "0x0000000000000000000000000000000000000000";
   });
 
   const collectedEditions = ownedEditions.filter(nft => 
     !earnedEditions.some(earned => earned.tokenId === nft.tokenId)
   );
 
   return {
     earned: await Promise.all(earnedEditions.map(async nft => {
       const metadata = await alchemy.nft.getNftMetadata(contractAddress, nft.tokenId);
       return {
         tokenId: nft.tokenId,
         name: metadata.title,
         description: metadata.description,
         image: metadata.media[0]?.gateway || metadata.rawMetadata?.image,
         attributes: metadata.rawMetadata?.attributes || [],
         external_url: metadata.rawMetadata?.external_url,
         animation_url: metadata.rawMetadata?.animation_url,
         background_color: metadata.rawMetadata?.background_color
       };
     })),
     collected: await Promise.all(collectedEditions.map(async nft => {
       const metadata = await alchemy.nft.getNftMetadata(contractAddress, nft.tokenId);
       return {
         tokenId: nft.tokenId,
         name: metadata.title,
         description: metadata.description,
         image: metadata.media[0]?.gateway || metadata.rawMetadata?.image,
         attributes: metadata.rawMetadata?.attributes || [],
         external_url: metadata.rawMetadata?.external_url,
         animation_url: metadata.rawMetadata?.animation_url,
         background_color: metadata.rawMetadata?.background_color
       };
     }))
   };
 }