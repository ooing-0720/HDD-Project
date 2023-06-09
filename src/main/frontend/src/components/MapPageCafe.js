import React, {useEffect} from "react";
import './MapCafe.css';
import './Map.css'
/*global kakao*/

const {kakao} =window;

function MapPageCafe(){
    let markers = [];
    let ps;
    let infowindow;
    let map;
    useEffect(() => {

        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5529284, 126.9211407),
            level: 5,
        };

        map = new window.kakao.maps.Map(container, options);
        map.setMaxLevel(5); //지도 확대 정도 제한
        //map.setDraggable(false); //지도 drag 불가능

        // 장소 검색 객체를 생성합니다
        ps = new window.kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        infowindow = new window.kakao.maps.InfoWindow({
            zIndex: 1,
            disableAutoPan: true //자동으로 지도 이동하는거 막기
        });

    })
// 키워드로 장소를 검색

    const searchPlaces = ()=>{
        let keyword = '홍대' + document.getElementById('keyword').value;
        if (keyword == '홍대') {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB);
    }

// 키워드 검색 완료 시 호출되는 콜백함수
    const placesSearchCB = (data, status, pagination)=> {
        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다

            displayPagination(pagination);


        } else if (status === kakao.maps.services.Status.ZERO_RESULT ) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR ) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    const displayPlaces = (places)=>{
        let listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다

        removeAllChildNods(listEl);


        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for ( let i=0; i<places.length; i++ ) {
            // 마커를 생성하고 지도에 표시합니다
            let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
            let marker = addMarker(placePosition, i);
            let itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, title) {

                kakao.maps.event.addListener(marker, 'click', function(mouseEvent) {
                    displayInfowindow(marker, title);
                });

                itemEl.onclick =  function () {
                    displayInfowindow(marker, title);
                };


            })(marker, places[i].place_name);


            fragment.appendChild(itemEl);

        }


        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        //map.setBounds(bounds);
    }


    function getListItem(index, places) {
        let el = document.createElement('li'),
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

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    const addMarker = (position, idx,title) => {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    const removeMarker = () => {
        for ( let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    const displayPagination = (pagination) => {
        let paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            let el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    const displayInfowindow = (marker, title) => {
        let content = '<div style="padding:3px;z-index:1; font-size:11px;">' + title + '<button type = "submit" style="font-size:10px"> 추가하기 </button></div>';
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    const removeAllChildNods = (el) => {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

    return(
        <div>
            <header>
                <div className="top_banner">
                    <li>
                        <a href="/">ㅎㄷㄷ</a>
                    </li>
                </div>
                <nav className="navbar">
                    <div className="menu">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/map">지도</a></li>
                            <li><a href="promotion.html">홍보</a></li>
                            <li><a href="/">구인</a>
                                <ul className="submenu">
                                    <li><a href="projectrecruit.html">프로젝트 구인</a></li>
                                    <li><a href="roomrecruit.html">룸메이트 구인</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="keyword_wrap">
                <div className="select">
                  <a className="food" href="/map">맛집</a>
                  <a className="cafe" href="/mapcafe">카페</a>
                </div>
                <div id="map" style={{width:"550px",height:"400px"}}></div>

                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>
                            <input type="text" id="keyword" size="15" />
                            <button onClick={searchPlaces}>검색</button>
                        </div>
                    </div>
                    <hr></hr>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </div>
    );
}
export default MapPageCafe