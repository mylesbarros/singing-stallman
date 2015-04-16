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

var self = require("sdk/self");
var prefs = require("sdk/simple-prefs").prefs;
var pageWorker = require("sdk/page-worker");
var buttons = require("sdk/ui/button/action");

function constructPageContent() {
    return {
      contentScriptFile: self.data.url("contentScript.js"),
      contentURL: self.data.url("blank.html")
    }
}

let track;
let audioPlayer = pageWorker.Page(constructPageContent());
function onPrefChange() {
    track = prefs.trackPrefs + ".ogg";
    audioPlayer.port.emit("update", track);
};
require("sdk/simple-prefs").on("trackPrefs", onPrefChange);
onPrefChange();

function handleClick(state) {
   audioPlayer.port.emit("toggleAudio"); 
}

var button = buttons.ActionButton({
    id: "singing-stallman",
    label: "Singing Stallman",
    icon: {
        "16": "./ss_icon16.png",
        "32": "./ss_icon32.png",
        "64": "./ss_icon64.png"
    },
    onClick: handleClick
});
