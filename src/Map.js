//지도를 띄울 div생성
var mapwrap=document.createElement("div");
mapwrap.id="map";
document.body.appendChild(mapwrap);

 // 지도를 표시할 div
var mapOption = {
        center: new kakao.maps.LatLng(37.6207, 127.058), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapwrap, mapOption);



//마커& 인포 윈도우
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var markers = [], //마커를 담을 배열
currCategory = ''; //현재 선택된 카테고리

// 장소 검색 객체 생성
var ps = new kakao.maps.services.Places(map);

// 카테고리 검색을 요청하는 함수입니다
function searchPlaces() {
    if (!currCategory) {
        return;
    }

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    switch(currCategory){
        case "CS2":
        case "FD6":
        case "CE7":
        case "BK9":
        case "HP8":
        case "PM9":
        case "":
            ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true});
            break;
        case "KW" :
            kwplace();
    }
}

//학교건물
var kwpositions = [

    {   //화도
        latlng: new kakao.maps.LatLng(37.620507, 127.059466)
    // 여기에 직접 추가 하는게 어떨까 
    // var el = document.createElement('li'),
    // itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
    //             '<div class="info">' +
    //             '   <h5>' + places.place_name + '</h5>';

    // if (places.road_address_name) {
    //     itemStr += '    <span>' + places.road_address_name + '</span>' +
    //                 '   <span class="jibun gray">' +  places.address_name  + '</span>';
    // } else {
    //     itemStr += '    <span>' +  places.address_name  + '</span>';
    // }

    //   itemStr += '  <span class="tel">' + places.phone  + '</span>' +
    //             '</div>';
    },
    {   //비마
        latlng: new kakao.maps.LatLng(37.619640, 127.059890)
    },
    {   //새빛
        latlng: new kakao.maps.LatLng(37.619865, 127.060931)
    },
    {   //문화
        latlng: new kakao.maps.LatLng(37.619883, 127.057685)
    },
    {   //옥의
        latlng: new kakao.maps.LatLng(37.618872, 127.059187)
    },
    {   //한울
        latlng: new kakao.maps.LatLng(37.620839, 127.057020)
    },
    {   //누리
        latlng: new kakao.maps.LatLng(37.620435, 127.054894)
    },
    {   //참빛
        latlng: new kakao.maps.LatLng(37.619227, 127.060960)
    },
    {   //80기념관(도서관)
        latlng: new kakao.maps.LatLng(37.620084, 127.058764)
    },
    {   //복지관
        latlng: new kakao.maps.LatLng(37.619427, 127.058333)
    },
    {   //기숙사
        latlng: new kakao.maps.LatLng(37.621446, 127.056245)
    }
];

function kwplace(){
    for(var i=0;i<kwpositions.length;i++){
        var maker = addMarker(kwpositions[i].latlng);
    }
}


// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

    } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요

    }
}

// 지도에 마커를 표출하는 함수입니다
function displayPlaces(places) {
    menuEl = document.getElementById('sidebar-wrapper');
    listStr = '';
    var listEl = document.getElementById('placesList');

    listEl.innerHTML = '';
    for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x));
            itemEl = getListItem(i, places[i]);
            // // 마커와 검색결과 항목을 클릭 했을 때
            // // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
            // kakao.maps.event.addListener(marker, 'click', function() {
            //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name+'</div>');
            //     infowindow.open(map, marker);
            // });
        listEl.appendChild(itemEl);
    }
}

function addMarker(position) {
    var marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }
    markers = [];
}

function updatecode(category){
   currCategory=category;
   searchPlaces();
}


function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>';
    }

      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}
