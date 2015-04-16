var self = require("sdk/self");
var pageWorker = require("sdk/page-worker");
var buttons = require("sdk/ui/button/action");

var button = buttons.ActionButton({
    id: "singing-stallman",
    label: "Singing Stallman",
    icon: {
        "16": "./gnu_rev_16.png",
        "32": "./gnu_rev_32.png",
        "64": "./gnu_rev_64.png"
    },
    onClick: handleClick
});

var pageContent = {
    contentScript: "var audio = new Audio('fss.ogg'); audio.play()",
    contentURL: self.data.url("blank.html")
}

var audioPlayer;

function handleClick(state) {
    if (audioPlayer != undefined) {
        audioPlayer.destroy();
    }
    
    audioPlayer = pageWorker.Page(pageContent);
}
