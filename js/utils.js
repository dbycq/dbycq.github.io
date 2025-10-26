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
    cosnt args = {};
    for (const [k, v] of new URLSearchParams(window.location.search).entries()){
        args[k] = v;
    }
    return key ? args[key] : args;
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    let scriptPath = currentPath.replace(/\.html$/, '.js');
    if (!scriptPath.endsWith(".js")) scriptPath += ".js";
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
