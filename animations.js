
$(document).ready(function(){

    //object which references intro video
    var vidIntroVideo = videojs('vidIntroVideo');

    //Start Intro Video on call
    function playVidintroVideo (event) {
        vidIntroVideo.play();
    }

    //Play gunshot sound on call
    function playSFXGunShot (event) {
        var sfxGunShot = new Audio('./resources/sfx/sfxGunShot.mp3');
        sfxGunShot.play();
    }


    var controller = new ScrollMagic();                // init scrollMagic controller


    //Intro Video Code
    var twnIntroVideo = TweenMax.to("#divTrgIntroVideo", 0.5, {scale: 2.0});  //tween to make the video larger on scroll

    var scnIntroVideo = new ScrollScene({triggerElement: "#divTrgIntroVideo", duration: 2000, triggerHook: 0.0, reverse: true})  // build scene and add pin logic
    .setPin("#divTrgIntroVideo")
    .setTween(twnIntroVideo)
    .addTo(controller);
    //scnIntroVideo.addIndicators();                  //uncomment this line to See Debug Triggers

    scnIntroVideo.on("start", playVidintroVideo);     // add a listener to start the intro video when the user scrolls to video




    //Scene 1 Globe
    var twnGlobeScale = TweenMax.to("#divTrigGlobe", 5, {scale: 1.0});    //tween to make the image larger on scroll

    var scnGunPoint = new ScrollScene({triggerElement: "#divTrigGlobe", duration: 700, triggerHook: .0, reverse: true})
    .setTween(twnGlobeScale)
    .setPin("#divTrigGlobe")
    .addTo(controller);
    //scnGunPoint.addIndicators();                  //uncomment this line to See Debug Triggers



    /*
    //Gun Point Image Code
    var twnGunPoint = TweenMax.to("#divTrigGunPoint", 5, {transform: "translateX(1500px)", scale: 1.8});    //tween to make the image larger on scroll

    var scnGunPoint = new ScrollScene({triggerElement: "#divTrigGunPoint", duration: 700, triggerHook: .2, reverse: true})
    .setTween(twnGunPoint)
    .setPin("#divTrigGunPoint")
    .addTo(controller);
    //scnGunPoint.addIndicators();                  //uncomment this line to See Debug Triggers

    scnGunPoint.on("start", playSFXGunShot);
    */

});