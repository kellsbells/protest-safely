let theMap;

// export function showMap(lat, lng) {
//     mapElem = document.getElementById('map');
//     const position = { lat, lng };
//     theMap = new google.maps.Map(mapElem, {
//         center: position,
//         zoom: 12
//     });
//     // window.markers = window.markers || [];
//     // const marker = new google.maps.Marker({ map, position });
//     renderMarkers();
// }

// export function showDefaultMap() {
//     showMap(29.7392358, -104.990251);
// }

export function geolocate() {
    if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
    }
    renderMarkers();
}

export function onGeolocateSuccess(coordinates) {
    hideGeolocateButton();
    const { latitude, longitude } = coordinates.coords;
    showMap(latitude, longitude);
}

export function onGeolocateError(error) {    
    hideGeolocateButton();
    canGeolocate = false;

    if (error.code === 1) {
        console.log('User declined geolocation');
    } else if (error.code === 2) {
        console.log('Geolocation position unavailable');
    } else if (error.code === 3) {
        console.log('Timeout determining geolocation');
    }
}

export function hideGeolocateButton() {
    geolocationHeader.remove();
}

export function renderMarkers () {
    console.log('inrenderMarkers');
    
    return firebase.database().ref('/events/').once('value').then(function (data) {

        let events = Object.values(data.val());
        console.log('last event: ', events[events.length-1]);

        var icons = {
            protest: {
                peaceful: './images/protest-peaceful-icon.png',
                intensifying: './images/protest-intensifying-icon.png',
                dangerous: './images/protest-dangerous-icon.png'
            },
            police: {
                peaceful: './images/police-peaceful-icon.png',
                intensifying: './images/police-intensifying-icon.png',
                dangerous: './images/police-dangerous-icon.png'
            },
            aid: {
                icon: './images/aid-icon.png'
            }
        };


        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let iconPath;

            switch (events[i].type) {
                case 'protest':
                    const demoLevel = events[i].formValues.demolevel
                    iconPath = icons[events[i].type][demoLevel];
                    break;
                case 'police':
                    const policeLevel = events[i].formValues.policelevel
                    iconPath = icons[events[i].type][policeLevel];
                    break;
                case 'aid':
                    iconPath = icons.aid.icon;
            }

            var image = {
                url: iconPath,
                size: new google.maps.Size(30, 30),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 30)
            };
                    
            var marker = new google.maps.Marker({
                position: { lat: event.lat, lng: event.long },
                map: theMap,
                icon: image,
                zIndex: 2,
            });
        }
    });
}

export function closeModal(){
    addModal.classList.remove('show')
    addModal.classList.add('hide');

    setTimeout(function () { renderMarkers(); }, 3000);

    addInitial.classList.remove('show');
    addInitial.classList.add('hide');
    addProtestForm.classList.remove('show');
    addProtestForm.classList.add('hide');
    addPoliceForm.classList.remove('show');
    addPoliceForm.classList.add('hide');
    addAidForm.classList.remove('show');
    addAidForm.classList.add('hide');
}

export function openAddForm(event){
    event.stopPropagation();
    addModal.classList.remove('hide')
    addModal.classList.add('show');
    addInitial.classList.add('show');
    addInitial.classList.remove('hide');
}

export function openAddProtest(event){
    event.stopPropagation();
    addInitial.classList.add('hide');
    addInitial.classList.remove('show');
    addProtestForm.classList.remove('hide');
    addProtestForm.classList.add('show');
}

export function openAddPolice(event) {
    event.stopPropagation();
    addInitial.classList.add('hide');
    addInitial.classList.remove('show');
    addPoliceForm.classList.remove('hide');
    addPoliceForm.classList.add('show');
}

export function openAddAid(event) {
    event.stopPropagation();
    addInitial.classList.add('hide');
    addInitial.classList.remove('show');
    addAidForm.classList.remove('hide');
    addAidForm.classList.add('show');
}

export function submitProtestEvent(event) {
    event.preventDefault();
    var demolevel = document.querySelector('input[name="demolevel"]:checked').value;
    navigator.geolocation.getCurrentPosition(function (coordinates) {
        const { latitude, longitude } = coordinates.coords;
        writeNewEvent('protest', latitude, longitude, {
            demolevel: demolevel,
        });
    }, onGeolocateError);
    closeModal();
}

export function submitPoliceEvent(event){
    event.preventDefault();
    console.log('in submitPoliceEvent');
    var policelevel = document.querySelector('input[name="policelevel"]:checked').value;
    console.log('policelevel: ', policelevel);
    navigator.geolocation.getCurrentPosition(function (coordinates) {
        const { latitude, longitude } = coordinates.coords;
        writeNewEvent('police', latitude, longitude, {
            policelevel: policelevel,
        });
    }, onGeolocateError);
    closeModal();
}

export function submitAidEvent(event) {
    event.preventDefault();
    console.log('in submitProtestEvent');
    var water = document.querySelector('input[name="water"]').checked;
    var food = document.querySelector('input[name="food"]').checked;
    var medical = document.querySelector('input[name="medical"]').checked;

    navigator.geolocation.getCurrentPosition(function(coordinates){
        const { latitude, longitude } = coordinates.coords;
        writeNewEvent('aid', latitude, longitude, {
            water: water,
            food: food,
            medical: medical
        });
    }, onGeolocateError);
    closeModal();
}


export function writeNewEvent(type, lat, long, formValues) {
    var postData = {
        type: type,
        lat: lat,
        long: long,
        formValues: formValues,
        date: new Date()
    };
    var newPostKey = firebase.database().ref().child('events').push().key;
    var updates = {};
    updates['/events/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}

let geolocateAvailable;
let geolocateButton;
let geolocationHeader;
let geolocateDecline;
let addButton;
let addModal;
let addProtest;
let addProtestForm;
let addPolice;
let addPoliceForm;
let addAid;
let addAidForm;

// let database;
let canGeolocate = true;

export function initApp () {
    console.log('initing app');
    geolocateAvailable = window.navigator && window.navigator.geolocation;
    geolocationHeader = document.getElementById('geolocation-header');
    geolocateButton = document.getElementById('geolocation-button');
    geolocateDecline = document.getElementById('geolocation-decline');
    geolocateButton.disabled = true
    addButton = document.getElementById('actions-add');
    addModal = document.getElementById('add-modal');
    addInitial = document.querySelector('.add-initial');
    addProtest = document.getElementById('add-protest');
    addPolice = document.getElementById('add-police');
    addAid = document.getElementById('add-aid');
    addProtestForm = document.querySelector('.add-protest-form');
    addPoliceForm = document.querySelector('.add-police-form');
    addAidForm = document.querySelector('.add-aid-form');

    showDefaultMap();

    if (geolocateAvailable) {
        geolocateButton.disabled = false;

        geolocateButton.addEventListener('click', geolocate);
        geolocateDecline.addEventListener('click', hideGeolocateButton);

        addButton.addEventListener('click', openAddForm);
        addProtest.addEventListener('click', openAddProtest);
        addPolice.addEventListener('click', openAddPolice);
        addAid.addEventListener('click', openAddAid);
    }
}
