// ==UserScript==
// @name         Tumblr Mutual Icon Changer
// @namespace    http://tampermonkey.net/
// @version      2024-08-25
// @description  Changes the mutual icon on tumblr
// @author       You
// @match        https://www.tumblr.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tumblr.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

const icon_dict = {'hug': 'https://raw.githubusercontent.com/Nick-Nonya/tumblrmutualhugsvg/main/hugg.svg',
                   'dog': 'https://raw.githubusercontent.com/Nick-Nonya/tumblrmutualhugsvg/main/dogs.png'
                  }
let chosen_icon = 'hug';

const set_to_hug_icon = GM_registerMenuCommand("Set mutual icon to hug", function(event) {
    chosen_icon = 'hug';
    mutualIconReplace()
}, {
    accessKey: "h",
    autoClose: true
});

const set_to_dog_icon = GM_registerMenuCommand("Set mutual icon to dog", function(event) {
    chosen_icon = 'dog';
    mutualIconReplace()
}, {
    accessKey: "d",
    autoClose: true
});

function mutualIconReplace(e = null) {
    // alert("start");
    let icon_svg_holder = document.getElementById("managed-icon__profile-double") || null;

    if (icon_svg_holder == null) {
        setTimeout(() => mutualIconReplace(), 100)
    } else {
        // alert("yippie");
        //rescale the viewbox of the svg to make the icon more visible
        icon_svg_holder.viewBox.baseVal.width=18;
        icon_svg_holder.viewBox.baseVal.height=20;

        icon_svg_holder.innerHTML = `<image href="${icon_dict[chosen_icon]}" y="0" height="20" width="18" x="2"/>`;
    }
}

window.addEventListener('load', function() {
    mutualIconReplace();
}, false);
