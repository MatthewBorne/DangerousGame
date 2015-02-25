
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


    //Intro Video Code
    var twnIntroVideoEnter = TweenMax.to("#vidIntroVideo", 0.5, {opacity: 1});  //tween to make the video larger on scroll

    var scnIntroVideoEnter = new ScrollScene({triggerElement: "#divTrgIntroVideoEnter", duration: 2000, triggerHook: 0.0, reverse: true})  // build scene and add pin logic
    .setPin("#vidIntroVideo")
    .setTween(twnIntroVideoEnter)
    .addTo(controller);
    //scnIntroVideoEnter.addIndicators();                  //uncomment this line to See Debug Triggers

    scnIntroVideoEnter.on("start", playVidintroVideo);     // add a listener to start the intro video when the user scrolls to video


    var twnIntroVideoExit = TweenMax.to("#vidIntroVideo", 0.5, {opacity: 0});  //tween to make the video larger on scroll

    var scnIntroVideoExit = new ScrollScene({triggerElement: "#divTrgIntroVideoExit", duration: 2000, triggerHook: 0.0, reverse: true})  // build scene and add pin logic
    .setPin("#vidIntroVideo")
    .setTween(twnIntroVideoExit)
    .addTo(controller);
    scnIntroVideoExit.addIndicators();




    //Scene 1 Globe
    var twnGlobeScale = TweenMax.to("#divImgGlobe", 5, {opacity: 1, scale: 1.5});    //tween to make the image larger on scroll

    var scnGlobeScale = new ScrollScene({triggerElement: "#divTrigGlobeScene", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnGlobeScale)
    .setPin("#divImgGlobe")
    .addTo(controller);
    //scnGlobeScale.addIndicators();                  //uncomment this line to See Debug Triggers


/*
    //Scene 1 Plane
    var twnPlaneAppear = TweenMax.to("#imgPlane", 5, {opacity: 1}); 

    var scnPlaneAppear = new ScrollScene({triggerElement: "#divTrigGlobeScene", duration: 1000, triggerHook: 0.0, reverse: true})
    .setTween(twnPlaneAppear)
    .setPin("#imgPlane")
    .addTo(controller);
    scnPlaneAppear.addIndicators();
*/

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