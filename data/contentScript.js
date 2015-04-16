/* Singing Stallman – Firefox Add-On
Copyright (C) 2014 Myles V. Barros

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

let audio;
let audioEnded = function() {
    audio.currentTime = 0;
}

self.port.on("update", function(track) {
    if (audio != void(0)) {
        audio.pause();
    }
    audio = new Audio(track);
    audio.onended = audioEnded;
});

self.port.on("toggleAudio", function() {
    if (audio != void(0)) {
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
            audio.currentTime = 0;
        }
    }
});
