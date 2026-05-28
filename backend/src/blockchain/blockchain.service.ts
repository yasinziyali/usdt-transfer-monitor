import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private usdtContract: ethers.Contract;

  private usdtAddress =
    '0xdAC17F958D2ee523a2206206994597C13D831ec7';

  private abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
  ];

  constructor(private firebaseService: FirebaseService) {

    // Ethereum mainnet provider (Alchemy üzerinden bağlanıyor)
    this.provider = new ethers.JsonRpcProvider(
      process.env.ALCHEMY_RPC_URL!
    );

    // USDT contract instance (ERC-20 Transfer event dinleniyor)
    this.usdtContract = new ethers.Contract(
        this.usdtAddress,
        this.abi,
        this.provider
    );
    // Service başlar başlamaz event listener başlatılır
    this.listenTransfers();
    this.testConnection();
  }

  // Node'un Ethereum ağına başarılı bağlandığını doğrular
  async testConnection() {
    const blockNumber = await this.provider.getBlockNumber();

    console.log('Connected to Ethereum mainnet successfully.');
    console.log('Latest block number:', blockNumber);
  }
  
  // USDT Transfer event listener (real-time blockchain monitoring)

  listenTransfers() {
    this.usdtContract.on(
      "Transfer",
      async (from, to, value, event) => {
      // Transfer edilen value USDT decimals (6) ile gösterilir
      const amount = Number(ethers.formatUnits(value, 6));

      // Transaction hash fallback (event farklı formatlarda gelebilir)
      const txHash = event?.log?.transactionHash || event?.transactionHash;
      
      const token = this.firebaseService.getToken();

      console.log("USDT Transfer detected:", {
        from,
        to,
        amount
      });

      // Sadece 100.000 USDT ve üzeri işlemler filtrelenir
      if (amount >= 100000) {
        console.log("Large USDT transfer detected:", {
          sender: from,
          receiver: to,
          amount,
          txHash
        });

      await this.firebaseService.sendLargeTransfer({
        token,
        sender: from,
        receiver: to,
        amount,
        txHash
      });
      }

      } 
    );
  }
}

