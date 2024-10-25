// script.js
document.addEventListener("DOMContentLoaded", function() {
    const cases = [
        {
            score: "1405 / 10000",
            points: "+14 очков",
            title: "Все или ничего",
            imageUrl: "photo3.jpg",
            link: "case_def.html?dropType=1",
            price: "19 грн" 
        },
        {
            score: "5103 / 10000",
            points: "+6 очков",
            title: "Зверя нет сильней китайца",
            imageUrl: "https://gameguru.ru/media/cache/b8/4e/b84e8ae61c4e3eb73d04f10312897550.jpg",
            link: "case_def.html?dropType=2", 
            price: "39 грн" 
        },
        {
            score: "9782 / 10000",
            points: "+99 очков",
            title: "Серега пират(талант)",
            imageUrl: "https://e.snmc.io/i/600/s/af235eaf9d17c3f703027c1140cc3c92/10053487/%D1%81%D0%B5%D1%80%D1%91%D0%B3%D0%B0-%D0%BF%D0%B8%D1%80%D0%B0%D1%82-serega-pirat-%D1%82%D0%BF-%D0%BD%D0%B0-%D0%B0%D0%BC%D0%B5-cover-art.jpg", // Replace with your image URL
            link: "case_def.html?dropType=3", 
            price: "198 грн" 
        },
        {
            score: "4514 / 10000",
            points: "+35 очков",
            title: "Токсичный кейс",
            imageUrl: "toxic.png", 
            link: "case_def.html?dropType=4", 
            price: "69 грн" 
        },
        {
            score: "8630 / 10000",
            points: "+162 очков",
            title: "collector's cache 2",
            imageUrl: "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c2/Cosmetic_icon_Collector%27s_Cache_II_2019.png/revision/latest?cb=20190713211735", // Replace with your image URL
            link: "case_def.html?dropType=5", 
            price: "70 грн"
        },
    ];

    const casePanel = document.getElementById('case-panel');

    cases.forEach(caseItem => {
        const caseDiv = document.createElement('div');
        caseDiv.className = 'case-item';
        caseDiv.innerHTML = `
            <img src="${caseItem.imageUrl}" alt="${caseItem.title}">
            <div class="case-info">
                <div class="case-score">
                    <span class="points">${caseItem.points}</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(parseInt(caseItem.score) / 10000) * 100}%;"></div>
                    </div>
                    <span class="score">${caseItem.score}</span>
                </div>
                <div class="case-title">${caseItem.title}</div>
                <div class="case-price">
                    <span>Цена: ${caseItem.price}</span>
                    <a href="${caseItem.link}" target="_blank">
                        <button>Показать</button>
                    </a>
                </div>
            </div>
        `;
        casePanel.appendChild(caseDiv);
    });
});
