// Intialize the variable
let index = 0;
let rotation;
let angle = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songpic = document.getElementById('songpic');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Rait Zara si", filepath: "songs/1.mp3", coverPath: "covers/1.jpeg", durationTime: "04:51" },
    { songName: "Perfect", filepath: "songs/2.mp3", coverPath: "covers/2.jpeg", durationTime: "04:23" },
    { songName: "What is love", filepath: "songs/3.mp3", coverPath: "covers/3.jpeg", durationTime: "03:28" },
    { songName: "Mashup", filepath: "songs/4.mp3", coverPath: "covers/4.jpg", durationTime: "03:50" },
    { songName: "Ban gayi zindagi", filepath: "songs/5.mp3", coverPath: "covers/5.jpeg", durationTime: "03:10" },
    { songName: "Bhala", filepath: "songs/6.mp3", coverPath: "covers/6.jpeg", durationTime: "05:55" },
    { songName: "At my worst", filepath: "songs/7.mp3", coverPath: "covers/7.jpeg", durationTime: "02:48" },
    { songName: "Dynamite", filepath: "songs/8.mp3", coverPath: "covers/8.jpeg", durationTime: "03:17" },
    { songName: "Darasal", filepath: "songs/9.mp3", coverPath: "covers/9.jpeg", durationTime: "04:33" },
    { songName: "Jaanein bachayenge", filepath: "songs/10.mp3", coverPath: "covers/10.jpeg", durationTime: "06:27" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
    element.getElementsByClassName('timestamp')[0].innerHTML = songs[i].durationTime;
    // document.getElementsByClassName('timestamp')[index].innerText = songs[index].durationTime;
})
//audioElement.play();


function rotating() {
    rotation = setInterval(() => {
        angle = angle + 2;
        songpic.style.transform = `rotate(${angle}deg)`;
    }, 100);
}

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[index].songName;
        // masterPlay.classList.remove('fa-play');
        // masterPlay.classList.add('fa-pause');
        masterPlay.src = "images/pause.png";
        document.getElementsByClassName('songItemPlay')[index].src = "images/pause.png"
        rotating();
        // console.log(angle);
        // songpic.style.transform = `rotate(${angle}deg)`;
        // Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        //     element = document.getElementsByClassName('songitem')[index];
        //     element.classList.remove('fa-play');
        //     element.classList.add('fa-pause');
        // })
        // gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.src = "images/play.png";
        makeAllPlays();
        clearInterval(rotating);
        songpic.style.transform = `rotate(0deg)`;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.add('fa-play');
            element.classList.remove('fa-pause');
        })
        // gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Upadate seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    var s = parseInt(audioElement.currentTime % 60);
    var m = parseInt((audioElement.currentTime / 60) % 60);
    s = String(s).padStart(2, '0');
    m = String(m).padStart(2, '0');
    document.getElementById('current').innerHTML = `${m}:${s}`;

    if (progress === 100) {
        next();
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration
        / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
       element.src = "images/play.png"
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        index = parseInt(e.target.id);

        if (audioElement.played || audioElement.currentTime != 0) {
            console.log("chalna chahiye tha");
            
            makeAllPlays();
        
            masterSongName.innerText = songs[index].songName;
            e.target.src = "images/pause.png";
            audioElement.src = `songs/${index + 1}.mp3`;
            songpic.src = songs[index].coverPath;
            document.getElementById('length').innerHTML = songs[index].durationTime;
            audioElement.currentTime = 0;
            audioElement.play();
            // gif.style.opacity = 1;
            masterPlay.src = "images/pause.png";
        }
        else if (audioElement.paused || audioElement.currentTime <= 0) {
            console.log("ruk jana chahiye tha");
            audioElement.pause();
            masterPlay.src = "images/play.png";
            e.target.src = "images/play.png";
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                element.classList.add('fa-play');
                element.classList.remove('fa-pause');
            })
        }
        else {
            console.log("kuchh dikkat h")
        }
    })
})

document.getElementById('next').addEventListener('click', next);

document.getElementById('previous').addEventListener('click', previous);

function next() {
    if (index >= 9) {
        index = 0;
    } else {
        index += 1;
    }
    audioElement.src = `songs/${index + 1}.mp3`;
    masterSongName.innerText = songs[index].songName;
    songpic.src = songs[index].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = "images/play.png";
    });
    document.getElementsByClassName('songItemPlay')[index].src = "images/pause.png";
    document.getElementById('length').innerHTML = songs[index].durationTime;
    masterPlay.src = "images/pause.png";
}

function previous() {
    if (index <= 0) {
        index = 9;
    } else {
        index -= 1;
    }
    audioElement.src = `songs/${index + 1}.mp3`;
    songpic.src = songs[index].coverPath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = "images/play.png";
    });
    document.getElementsByClassName('songItemPlay')[index].src = "images/pause.png";
    document.getElementById('length').innerHTML = songs[index].durationTime;
    masterPlay.src = "images/pause.png";
}