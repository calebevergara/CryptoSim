document.addEventListener('DOMContentLoaded', () => {
    const marketDataContainer = document.getElementById('marketData');
    const tradeForm = document.getElementById('tradeForm');
    const tradeList = document.getElementById('tradeList');

    // Sample market data. Replace this with real data fetching from your API.
    const marketData = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 30000, change: 3 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2000, change: 2 },
        { id: 'ripple', name: 'Ripple', symbol: 'XRP', price: 0.5, change: 5 },
    ];

    const portfolio = [];

    const renderMarketData = () => {
        marketDataContainer.innerHTML = '';
        marketData.forEach(crypto => {
            const cryptoElement = document.createElement('div');
            cryptoElement.classList.add('crypto');
            cryptoElement.innerHTML = `
                <h3>${crypto.name} (${crypto.symbol})</h3>
                <p>Price: $${crypto.price.toLocaleString()}</p>
                <p>Change: ${crypto.change}%</p>
            `;
            marketDataContainer.appendChild(cryptoElement);
        });
    };

    const renderTrades = () => {
        tradeList.innerHTML = '';
        portfolio.forEach(trade => {
            const tradeElement = document.createElement('li');
            tradeElement.textContent = `Traded ${trade.amount} of ${trade.symbol.toUpperCase()} at $${trade.price.toLocaleString()} each`;
            tradeList.appendChild(tradeElement);
        });
    };

    const handleTrade = (e) => {
        e.preventDefault();
        const cryptoInput = document.getElementById('cryptoInput').value.trim().toLowerCase();
        const amountInput = parseFloat(document.getElementById('amountInput').value.trim());

        const crypto = marketData.find(c => c.symbol.toLowerCase() === cryptoInput);
        if (!crypto) {
            alert('Cryptocurrency not found in market data.');
            return;
        }

        const trade = {
            symbol: crypto.symbol,
            amount: amountInput,
            price: crypto.price
        };

        portfolio.push(trade);
        renderTrades();
        tradeForm.reset();
    };

    tradeForm.addEventListener('submit', handleTrade);

    renderMarketData();
});
