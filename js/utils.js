let supabaseClient = null;
function getClient(){
    if (!supabaseClient) {
        const supabaseUrl = 'https://gidktxcpudzdaqwtkeqq.supabase.co';
        const supabaseKey = 'MAzju123';
        supabaseCilent = supabase.createClient(supabaseUrl, supabaseKey);
    }
    return supabaseClient;
}
function getArgs(key) {
    const args = {};
    for (const [k, v] of new URLSearchParams(window.location.search).entries()){
        args[k] = v;
    }
    return key ? args[key] : args;
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    // 提取文件名（如从 "/wiki.html" 中获取 "wiki"）
    const fileName = currentPath.replace(/\.html$/, '').split('/').pop();
    // 生成 js 文件夹下的路径（如 "js/wiki.js"）
    let scriptPath = `js/${fileName}.js`;
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
