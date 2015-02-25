

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside


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

    $(document).ready(function(){ vidIntroVideo.play(); }) 

    var controller = new ScrollMagic();                // init scrollMagic controller


    //Intro Video Fade in/out and pin code
    var twnIntroVideoEnter = new TimelineMax();   

    twnIntroVideoEnter.add(TweenMax.to("#vidIntroVideo", 0.7, {opacity: 1}));  //tween to make the video fade in.  Takes up 70% of the scroll duration
    twnIntroVideoEnter.add(TweenMax.to("#vidIntroVideo", 0.3, {opacity: 0}));  //tween to make the video face out. Takes up 30% of the scroll duration

    var scnIntroVideoEnter = new ScrollScene({triggerElement: "#divTrigIntroVideo", duration: 4000, triggerHook: 0.0, reverse: true})  // build scene and add pin logic
    .setPin("#divTrigIntroVideo", {pushFollowers: false})
    .setTween(twnIntroVideoEnter)
    .addTo(controller);
    //scnIntroVideoEnter.addIndicators();                  //uncomment this line to See Debug Triggers

    scnIntroVideoEnter.on("start", playVidintroVideo);     // add a listener to start the intro video when the user scrolls to video



    var twnGlobeAppear = TweenMax.to("#imgGlobe", 1, {opacity: 1, scale: 1.5});

    var scnGlobeAppear = new ScrollScene({triggerElement: "#divTrigGlobe", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnGlobeAppear)
    .setPin("#divTrigGlobe", {pushFollowers: false})
    .addTo(controller);
    scnGlobeAppear.addIndicators();


/*
    //Scene 1 Plane
    var twnPlaneAppear = TweenMax.to("#imgPlane", 5, {opacity: 1}); 

    var scnPlaneAppear = new ScrollScene({triggerElement: "#divTrigGlobeScene", duration: 1000, triggerHook: 0.0, reverse: true})
    .setTween(twnPlaneAppear)
    .setPin("#imgPlane")
    .addTo(controller);
    scnPlaneAppear.addIndicators();


    //Scene 3 Gate Left
    var twnGateLeftOpen = TweenMax.to("#imgGateLeft", 5, {rotationY:50, transformOrigin:"26%"});    //tween to make the gate rotate in Z

    var scnGateLeftOpen = new ScrollScene({triggerElement: "#divTrigGate", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnGateLeftOpen)
    .addTo(controller);
    //scnGateLeftOpen.addIndicators();                  //uncomment this line to See Debug Triggers


    //Scene 3 Gate Right
    var twnGateRightOpen = TweenMax.to("#imgGateRight", 5, {rotationY:-50, transformOrigin:"74%"});    //tween to make the gate rotate in Z  

    var scnGateOpen = new ScrollScene({triggerElement: "#divTrigGate", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnGateRightOpen)
    .setPin("#divTrigGate")
    .addTo(controller);
    //scnGateRightOpen.addIndicators();                  //uncomment this line to See Debug Triggers

*/

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