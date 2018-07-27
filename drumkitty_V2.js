(function () {
    
    'use strict';
    
    /* global window document */

  var keys = document.getElementsByClassName("keydiv"),
      // Audioelemente aus HTML
      clapSound = document.getElementById("clap"),
      hihatSound = document.getElementById("hihat"),
      kickSound = document.getElementById("kick"),
      openhatSound = document.getElementById("openhat"),
      boomSound = document.getElementById("boom"),
      rideSound = document.getElementById("ride"),
      snareSound = document.getElementById("snare"),
      tomSound = document.getElementById("tom"),
      tinkSound = document.getElementById("tink"),
      // Buttons
      btnRecord = document.getElementById("btnRecord"),
      btnStop = document.getElementById("btnStop"),
      btnDelete = document.getElementById("btnDelete"),
      recordDiv = document.getElementById("recordDiv"),
      recordings = document.getElementsByClassName("recordings"),
      cnt = 0,
      timeTotal = 0,
      rec = false,
      startT = 0,
      soundfile = [],
      playlist = [],
      j = 0;

  // Event bei Tastendruck/-klick: Sound spielen
      // Attribut von aktiviertem ('evt.target') Element abgefragt (data*)
    function playSoundMaster(soundObject) {
      console.log(soundObject.currentTime);
        soundObject.currentTime = 0;
        soundObject.pause();
        soundObject.play();
    }
  function playSound(evt) {
    // .currentTarget für auslösendes Element; .target für konkret geklicktes Element!
    switch(evt.currentTarget.getAttribute('data-action')) {
      case 'clap':
        playSoundMaster(clapSound);
        break;
      case 'hihat':
        playSoundMaster(hihatSound);
        break;
      case 'kick':
        playSoundMaster(kickSound);
        break;
      case 'openhat':
        playSoundMaster(openhatSound);
        break;
      case 'boom':
        playSoundMaster(boomSound);
        break;
      case 'ride':
        playSoundMaster(rideSound);
        break;
      case 'snare':
        playSoundMaster(snareSound);
        break;
      case 'tom':
        playSoundMaster(tomSound);
        break;
      case 'tink':
        playSoundMaster(tinkSound);
        break;
    }
  }
  // Event bei Keypress: Sound spielen
  function playSoundByKey(evt) {
      var d;
    switch(evt.key) {
      case "1":
        keys[0].className = "keydiv onKeyPress";
        playSoundMaster(clapSound);
        break;
      case "2":
        keys[1].className = "keydiv onKeyPress";
        playSoundMaster(hihatSound);
        break;
      case "3":
        keys[2].className = "keydiv onKeyPress";
        playSoundMaster(kickSound);
        break;
      case "4":
        keys[3].className = "keydiv onKeyPress";
        playSoundMaster(openhatSound);
        break;
      case "5":
        keys[4].className = "keydiv onKeyPress";
        playSoundMaster(boomSound);
        break;
      case "6":
        keys[5].className = "keydiv onKeyPress";
        playSoundMaster(rideSound);
        break;
      case "7":
        keys[6].className = "keydiv onKeyPress";
        playSoundMaster(snareSound);
        break;
      case "8":
        keys[7].className = "keydiv onKeyPress";
        playSoundMaster(tomSound);
        break;
      case "9":
        keys[8].className = "keydiv onKeyPress";
        playSoundMaster(tinkSound);
        break;
    } 
      if(rec) {
          d = new Date();
          startT = startT === 0 ? d.getTime() : startT;
          d = d.getTime() - startT;
          soundfile.push([evt.key, d]);
      } 
  }
  // Event bei Keyup: Hover-Style wieder zurücksetzen
  function resetStyle(evt) {
    switch(evt.key) {
      case "1":
        keys[0].className = "keydiv";
        break;
      case "2":
        keys[1].className = "keydiv";
        break;
      case "3":
        keys[2].className = "keydiv";
        break;
      case "4":
        keys[3].className = "keydiv";
        break;
      case "5":
        keys[4].className = "keydiv";
        break;
      case "6":
        keys[5].className = "keydiv";
        break;
      case "7":
        keys[6].className = "keydiv";
        break;
      case "8":
        keys[7].className = "keydiv";
        break;
      case "9":
        keys[8].className = "keydiv";
        break;
    }
  }
  // Recording-Start
  function record() {
      rec = true;
  }
  
  // Files abspielen
  function fileZugriff(evt) {
    // Playlist-Index aus data-Attribut von <li>-Element auslesen
    var id = parseInt(evt.currentTarget.getAttribute('data'), 10),
        key,
        count = 0;
    // Abspielen starten
    window.setTimeout(play, playlist[id][0][1]);

    // Abspielen der Sounds
    function play() {
      // Tasten
        key = playlist[id][count][0]; 
        switch(key) {
            case "1":
                playSoundMaster(clapSound);
                break;
            case "2":
                playSoundMaster(hihatSound);
                break;
            case "3":
                playSoundMaster(kickSound);
                break;
            case "4":
                playSoundMaster(openhatSound);
                break;
            case "5":
                playSoundMaster(boomSound);
                break;
            case "6":
                playSoundMaster(rideSound);
                break;
            case "7":
                playSoundMaster(snareSound);
                break;
            case "8":
                playSoundMaster(tomSound);
                break;
            case "9":
                playSoundMaster(tinkSound);
                break;
              } 
        // Zeit-Index bei play() durchlaufen
        if (count < playlist[id].length - 1) {
            count += 1;
            // Zeit dazwischen
            // console.log(playlist[id][count][1]);
            timeTotal += playlist[id][count][1];
            // console.log(timeTotal+);
            console.log(window.setTimeout(play, playlist[id][count][1]));
            window.setTimeout(play, playlist[id][count][1]);
        }            
    }
  }
  // Neue Files in Liste erstellen
  function showRecordings() {
     // Click auf Button zählen
     cnt += 1;
     // Dateinamen in Liste erstellen
     var liElement = document.createElement("li");
     var text = document.createTextNode("Recording " + cnt);
     liElement.appendChild(text);
     liElement.addEventListener('click', fileZugriff);
     recordings[0].appendChild(liElement);
     // aktuellen Playlist-Index in data-Attribut von <li>-Element speichern
     var file = recordings[0].getElementsByTagName("li")[j];
     file.setAttribute("data", j);
     j = j + 1;
     // Div Container einblenden
     recordDiv.classList.add("recordDiv-active");
  }
  // when Stop-Button is clicked
    function stopRecord() {
        if (rec) {
        rec = false;
        playlist.push(soundfile);
        soundfile = [];
        startT = 0;
        // File-Übersicht in HTML generieren
        showRecordings();
        }
    }   
  // when Delete-Button is clicked
  function deleteRecord() {
        var liElement = document.getElementsByTagName("li");
        var liTotal = liElement.length;
        recordings[0].removeChild(liElement[liTotal - 1]);
        for (var i = 0; i < playlist.length; i++) {
          playlist.pop();
        }
        if (liTotal === 1) {
          // Variablen zurücksetzen
          cnt = 0;
          j = 0;
          // Div Container ausblenden
          recordDiv.classList.remove("recordDiv-active");
          window.console.log(playlist);
        }
    }
  // EventListener für Klick auf Keys
  for (var i = 0; i < keys.length; i++) {
    // nur playSound, weil kein zusätzliches Element übergeben wird
    keys[i].addEventListener("click", playSound );
  }
  // EventListener für Keypress
  document.addEventListener("keypress", playSoundByKey );
  // EventListener für Keyup
  document.addEventListener("keyup", resetStyle );
  // EventListener für Buttons
  btnRecord.addEventListener("click", record);
  btnStop.addEventListener("click", stopRecord);
  btnDelete.addEventListener("click", deleteRecord);
    
})();
