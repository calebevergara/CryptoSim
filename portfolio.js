document.addEventListener("DOMContentLoaded", async () => {
    const portfolioDataContainer = document.getElementById('portfolioData');

    // Example portfolio data. Replace with your actual portfolio data fetching logic.
    const portfolio = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', amount: 0.5 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'eth', amount: 10 },
        { id: 'ripple', name: 'Ripple', symbol: 'xrp', amount: 2000 },
    ];

    const fetchCryptoData = async (ids) => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids: ids.join(','),
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            return [];
        }
    };

    const createPortfolioElement = (crypto, portfolioItem) => {
        const container = document.createElement('div');
        container.classList.add('crypto');

        const title = document.createElement('h3');
        title.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()})`;
        container.appendChild(title);

        const amount = document.createElement('p');
        amount.textContent = `Amount: ${portfolioItem.amount}`;
        container.appendChild(amount);

        const value = document.createElement('p');
        value.textContent = `Value: $${(crypto.current_price * portfolioItem.amount).toLocaleString()}`;
        container.appendChild(value);

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        // Create the chart
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: Array(crypto.sparkline_in_7d.price.length).fill(''),
                datasets: [{
                    label: `${crypto.name} Price`,
                    data: crypto.sparkline_in_7d.price,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false // Hide x-axis labels
                    }
                }
            }
        });

        return container;
    };

    const renderPortfolioData = async () => {
        const ids = portfolio.map(item => item.id);
        const data = await fetchCryptoData(ids);
        portfolioDataContainer.innerHTML = ''; // Clear existing data
        if (data.length === 0) {
            portfolioDataContainer.textContent = 'No data available';
            return;
        }
        data.forEach(crypto => {
            const portfolioItem = portfolio.find(item => item.id === crypto.id);
            const portfolioElement = createPortfolioElement(crypto, portfolioItem);
            portfolioDataContainer.appendChild(portfolioElement);
        });
    };

    renderPortfolioData();
});
