const BLOCKSCOUT_API_URL = 'https://base.blockscout.com/api/v2';

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

export async function fetchBadgeTransfers(contractAddress, page = 1, offset = 100) {
  const url = `${BLOCKSCOUT_API_URL}/tokens/${contractAddress}/transfers?page=${page}&offset=${offset}`;
  const data = await fetchWithRetry(url);
  return data.items || [];
}

export function processBadgeOwnership(transfers, userAddress) {
  const badgeOwnership = {};

  transfers.forEach(transfer => {
    const tokenId = transfer.token_id;
    if (!badgeOwnership[tokenId]) {
      badgeOwnership[tokenId] = { everOwned: false, currentlyOwned: false };
    }

    const toAddress = typeof transfer.to === 'string' ? transfer.to.toLowerCase() : transfer.to;
    const fromAddress = typeof transfer.from === 'string' ? transfer.from.toLowerCase() : transfer.from;
    const userAddressLower = userAddress.toLowerCase();

    if (toAddress === userAddressLower) {
      badgeOwnership[tokenId].everOwned = true;
      badgeOwnership[tokenId].currentlyOwned = true;
    } else if (fromAddress === userAddressLower) {
      badgeOwnership[tokenId].currentlyOwned = false;
    }
  });

  return badgeOwnership;
}
