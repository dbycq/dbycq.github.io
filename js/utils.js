let supabaseClient = null; // 正确的变量名
function getClient(){
    if (!supabaseClient) {
        const supabaseUrl = 'https://gidktxcpudzdaqwtkeqq.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZGt0eGNwdWR6ZGFxd3RrZXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MzA5MTMsImV4cCI6MjA3NzAwNjkxM30.gvlcZgz7N0nM4-TzW1s58AxBoXXJeL15x7UIugGgjr8';
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
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
    console.log(scriptPath);
    script.src = scriptPath;
    document.head.appendChild(script);
});
