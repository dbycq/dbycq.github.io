class identity{
    constructor(){
        this.page = [];
        this.page[0] = [
            {"type": "text", "text": "大兵蚁传奇", "other": 'class="title"'},
            {"type": "text", "text": "awdaw", "other": 'class="title"'}
        ];
    }
    
    redraw(app, page_id){
        if (!this.page[page_id]) {
            console.error(`页面 ${page_id} 不存在`);
            return;
        }
        
        var html = "";
        for(var item of this.page[page_id]){
            if(item.type == "text"){
                html += `<p ${item.other}>${item.text}</p>`
            }
        }
        app.innerHTML = html
    }
    #page = [];
}

let dbycq = new identity();
