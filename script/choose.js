const level = ["普通", "罕见", "稀有", "史诗", "传奇", "神话", "究极", "超级", "唯一"];
const levelColor = [
    "rgb(126, 239, 109)",
    "rgb(255, 231, 93)",
    "rgb(77, 82, 227)",
    "rgb(133, 31, 222)",
    "rgb(222, 31, 31)",
    "rgb(31, 219, 222)",
    "rgb(255, 43, 117)",
    "rgb(43, 255, 163)",
    "rgb(85, 85, 85)",
];
// 本地存储实现
function saveGameDataLocally(gameData) {
    try {
        localStorage.setItem('antGameData', JSON.stringify(gameData));
        console.log('游戏数据已保存');
        return true;
    } catch (e) {
        console.error('保存失败:', e);
        return false;
    }
}

function loadGameDataLocally() {
    try {
        const data = localStorage.getItem('antGameData');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('加载失败:', e);
        return null;
    }
}
function chooseAntBag(levelMax, onclick, bagId){
    const bag = document.getElementById(bagId);
    const userJson = loadGameDataLocally();
    // 使用fetch加载JSON文件
    let ants = {};
    fetch('ants_data.json')
        .then(response => response.json())
        .then(data => {
            ants = data;
            renderBagContents(ants, userJson, bagId, levelMax, onclick);
        })
        .catch(error => console.error('Error loading ants data:', error));
}
function renderBagContents(ants, userJson, bag, levelMax, onclick) {
    var bagString = "";
    var bagString = "<p>";
    var num = 0;
    for(var j = 0; j < levelMax; j++){
        for(var i = 0; i < Object.keys(ants.ants).length; i++){
            if(userJson.hasAnts[i][j] > 0){
                if(userJson.hasAnts[i][j] == 1){
                    const antType = Object.keys(ants.ants)[i];
                    const antLevel = level[j];
                    if(ants.ants[antType] && ants.ants[antType][antLevel] && ants.ants[antType][antLevel].image) {
                        bagString += `<button onclick="${onclick}(${i}, ${j})"><img src="${ants.ants[antType][antLevel].image}" alt="${antType} ${antLevel}"  width="50" height="50"></button>`;
                    }
                    num++;
                }
                else{
                    const antType = Object.keys(ants.ants)[i];
                    const antLevel = level[j];
                    if(ants.ants[antType] && ants.ants[antType][antLevel] && ants.ants[antType][antLevel].image) {
                        bagString += `<button onclick="${onclick}(${i}, ${j})"><img src="${ants.ants[antType][antLevel].image}" alt="${antType} ${antLevel}"  width="50" height="50"></button>x${userJson.hasAnts[i][j]}`;
                    }
                    num += 2;
                }
            }
            if(num && num % 20 == 0) bagString += '<br>';
        }
    }
    console.log(bagString);
    bagString += "</p>";
    document.getElementById(bag).innerHTML = bagString;
}
