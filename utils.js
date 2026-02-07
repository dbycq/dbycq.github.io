function getArgs(key){
    const args = {};
    for(const [k, v] of new URLSearchParams(window.location.search).entries()){
        args[k] = v;
    }
    return key ? args[key] : args;
}
document.addEventListener("DOMContentLoaded", function(){
    const currentPath = window.location.pathname;
    let scriptPath = currentPath.replace(/\.html$/, ".js");
    if(!scriptPath.endsWith(".js")) scriptPath += ".js";
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
})
