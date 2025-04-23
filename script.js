const apiKey = '479d45286c35507fd8d2767ccd0758d3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const traducoes = {
    "clear sky": "Céu Limpo",
    "few clouds": "Poucas Nuvens",
    "scattered clouds": "Nuvens Dispersas",
    "broken clouds": "Nuvens Quebradas",
    "overcast clouds": "Nublado",
    "shower rain": "Pancadas de Chuva",
    "rain": "Chuva",
    "thunderstorm": "Chuva com Trovoadas",
    "snow": "Neve",
    "mist": "Névoa",
    "light rain": "Chuva Leve"
};

const iconeLocal = {
    "clear sky": "assets/Ameno.png",
    "few clouds": "assets/Ameno.png",
    "scattered clouds": "assets/Calor.png",
    "broken clouds": "assets/Nublado.png",
    "overcast clouds": "assets/Nublado.png",
    "shower rain": "assets/Chuva.png",
    "rain": "assets/Chuva.png",
    "thunderstorm": "assets/Chuva trovoada.png",
    "snow": "assets/Frio.png",
    "mist": "assets/Frio.png",
    "light rain": "assets/Chuva.png"
};

function traduzirCondicao(condicao) {
    return traducoes[condicao] || condicao;
}

function fetchData(city) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.classList.add('loading');
    
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })
        .then(data => {
            const cityElement = document.getElementById('city');
            cityElement.textContent = city;
            cityElement.classList.add('bounce');
            
            document.getElementById('temp').textContent = data.main.temp.toFixed(1);
            document.getElementById('condition').textContent = traduzirCondicao(data.weather[0].description);
            document.getElementById('humidity').textContent = data.main.humidity;
            document.getElementById('windspeed').textContent = data.wind.speed;
            
            const icone = iconeLocal[data.weather[0].description] || "assets/Fogo.png";
            document.getElementById('icon').src = icone;

            setTimeout(() => cityElement.classList.remove('bounce'), 500);
        })
        .catch(error => alert(error.message))
        .finally(() => {
            setTimeout(() => weatherDiv.classList.remove('loading'), 500);
        });
}

document.querySelector('.button').addEventListener('click', () => {
    const button = document.querySelector('.button');
    button.classList.add('shake');
    
    setTimeout(() => button.classList.remove('shake'), 500);
    
    const city = document.querySelector('.search').value.trim();
    if (city) {
        fetchData(city);
    } else {
        alert('Digite o nome de uma cidade!');
    }
});

    fetchData('Sao Paulo');

document.head.insertAdjacentHTML('beforeend', `
<style>
    .loading {
        opacity: 0.5;
        transition: opacity 0.5s ease-in-out;
    }
    .bounce {
        animation: bounce 0.5s ease-in-out;
    }
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
    }
    @keyframes shake {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        50% {
            transform: translateX(5px);
        }
        75% {
            transform: translateX(-5px);
        }
    }
</style>
`);