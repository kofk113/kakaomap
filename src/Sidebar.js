

var sidewrap=document.createElement("div");
sidewrap.className="sidebar-wrapper";
document.body.appendChild(sidewrap);

var placesList = document.createElement("ul");
placesList.id = "placesList";
sidewrap.appendChild(placesList);

var ps = new kakao.maps.services.Places(map);
