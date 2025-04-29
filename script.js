let portfolio = {};
let cashBalance = 10000;
let tradeHistory = [];

function simulateTrade(e) {
  e.preventDefault();
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const shares = parseInt(document.getElementById('shares').value);
  const type = document.getElementById('tradeType').value;
  const price = Math.random() * 100 + 50; // Simulated price

  const cost = shares * price;

  if (type === "BUY" && cashBalance >= cost) {
    portfolio[ticker] = (portfolio[ticker] || 0) + shares;
    cashBalance -= cost;
  } else if (type === "SELL" && portfolio[ticker] >= shares) {
    portfolio[ticker] -= shares;
    cashBalance += cost;
  }

  tradeHistory.push({ type, ticker, shares, price, date: new Date().toLocaleString() });
  updatePortfolioOutput();
  updateTradeHistory();
}

function updatePortfolioOutput() {
  const output = document.getElementById("portfolioOutput");
  output.innerHTML = "<pre>" + JSON.stringify({ cashBalance, portfolio }, null, 2) + "</pre>";
}

function updateTradeHistory() {
  const output = document.getElementById("tradeHistory");
  output.innerHTML = tradeHistory.map(t => 
    \`\${t.date}: \${t.type} \${t.shares} \${t.ticker} at \$\${t.price.toFixed(2)}\`
  ).join("<br>");
}

function fetchPrices() {
  alert("Price fetch simulation in demo mode.");
}
