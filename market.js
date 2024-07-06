document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = 'CG-FHStL9Tr4ek74ww5h88Brrwm'; // This API key is not required for CoinGecko API
    const marketDataContainer = document.getElementById('marketData');

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids: 'bitcoin,ethereum,ripple', // Include more as needed
                    sparkline: true // To get the sparkline data for charts
                }
            });
            console.log('Fetched data:', response.data); // Debugging line
            return response.data;
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            return [];
        }
    };

    const createCryptoElement = (crypto) => {
        const container = document.createElement('div');
        container.classList.add('crypto');

        const title = document.createElement('h3');
        title.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()})`;
        container.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `Price: $${crypto.current_price.toLocaleString()}`;
        container.appendChild(price);

        const change = document.createElement('p');
        change.textContent = `Change: ${crypto.price_change_percentage_24h.toFixed(2)}%`;
        container.appendChild(change);

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

    const renderMarketData = async () => {
        const data = await fetchCryptoData();
        marketDataContainer.innerHTML = ''; // Clear existing data
        if (data.length === 0) {
            marketDataContainer.textContent = 'No data available';
            return;
        }
        data.forEach(crypto => {
            const cryptoElement = createCryptoElement(crypto);
            marketDataContainer.appendChild(cryptoElement);
        });
    };

    renderMarketData();
});
