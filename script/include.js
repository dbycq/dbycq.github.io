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
