document.write("<script type='text/javascript' src='/src/Map.js'><"+"/script>");  

categorysel = document.createElement("div");
categorysel.className = "categorywrap";
document.body.appendChild(categorysel);

var currclick='';

var placelist=[
    {ko:"학교 건물",code: "KW"},
    { ko: "편의점",  code: "CS2" },
    { ko: "음식점",  code: "FD6" },
    { ko: "카페",  code: "CE7" },
    { ko: "은행",  code: "BK9" },
    { ko: "병원",  code: "HP8" },
    { ko: "약국",  code: "PM9" }
];

categorysel.addEventListener('click', function (e) {
    if(currclick==e.target.id){
        currclick='';
        removeMarker()
        updatecode("");
    }else{
        currclick=e.target.id;
        updatecode(e.target.id);
    }
});


for(var i=0;i<placelist.length;i++){
    var btn=document.createElement("button");
    btn.type="button";
    btn.innerText=placelist[i].ko;
    btn.id=placelist[i].code;
    if(currclick==placelist[i].code){
        btn.className="btn on";
    }
    else{
        btn.className="btn";
    }
    
    categorysel.appendChild(btn);
}

