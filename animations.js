

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside


$(document).ready(function(){

    var windowHeight = $( window ).height();
    var windowWidth = $( window ) .width();
    var heightNormalizer = windowHeight / 1050;
    var widthNormalizer =  windowWidth / 1680;

    $(window).resize(function(){location.reload();});

    //object which references intro video
    var vidIntroVideo = videojs('vidIntroVideo');


    //Start Intro Video on call
    function playVidintroVideo (event) {
        vidIntroVideo.play();
    }

    function giveBackScroll () {
        var body = document.body;
        body.style.overflowY = "visible";
    }


     vidIntroVideo.on('ended', giveBackScroll);

    //Play gunshot sound on call
    function playSFXGunShot (event) {
        var sfxGunShot = new Audio('./resources/sfx/sfxGunShot.mp3');
        sfxGunShot.play();
    }

    $(document).ready(function(){ vidIntroVideo.play(); }) 

    var controller = new ScrollMagic();                // init scrollMagic controller


/*
    //Intro Video Fade in/out and pin code
    var twnIntroVideoEnter = new TimelineMax();   

    twnIntroVideoEnter.add(TweenMax.to("#vidIntroVideo", 0.7, {opacity: 1}));  //tween to make the video fade in.  Takes up 70% of the scroll duration
    twnIntroVideoEnter.add(TweenMax.to("#vidIntroVideo", 0.3, {opacity: 0}));  //tween to make the video face out. Takes up 30% of the scroll duration

    var scnIntroVideoEnter = new ScrollScene({triggerElement: "#divTrigIntroVideo", duration: 2000, triggerHook: 0.0, reverse: true})  // build scene and add pin logic
    .setPin("#divTrigIntroVideo", {pushFollowers: false})
    .setTween(twnIntroVideoEnter)
    .addTo(controller);
    //scnIntroVideoEnter.addIndicators();                  //uncomment this line to See Debug Triggers

    //scnIntroVideoEnter.on("start", playVidintroVideo);     // add a listener to start the intro video when the user scrolls to video
*/


    var twnGlobeAppear = TweenMax.to("#imgGlobe", 1, {opacity: 1, scale: 1.5});

    var scnGlobeAppear = new ScrollScene({triggerElement: "#divTrigGlobe", duration: 1100, triggerHook: 0.0, reverse: true})
    .setTween(twnGlobeAppear)
    .setPin("#divTrigGlobe", {pushFollowers: false})
    .addTo(controller);
    //scnGlobeAppear.addIndicators();


    var twnPlaneAppear = new TimelineMax();   
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .05 , {opacity: 1   })); 
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.35}));
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .5  , {opacity: 1   }));
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.20}));

    var scnPlaneAppear = new ScrollScene({triggerElement: "#divTrigPlane", duration: 1000*widthNormalizer, triggerHook: 0.0, reverse: true})
    .setTween(twnPlaneAppear)
    .setPin("#divTrigPlane",  {pushFollowers: false})
    .addTo(controller);
    //scnPlaneAppear.addIndicators();

    //Set the scroll distance of the plane in relation to the width of the page.
    document.getElementById("divTrigPlane").style.height = 1000*widthNormalizer + "px";
    

    var twnYachtAppear = new TimelineMax();   
    twnYachtAppear.add(TweenMax.to("#imgPlane", .05,  {opacity: 0})); 
    twnYachtAppear.add(TweenMax.to("#imgYacht", .225, {opacity: 1}));

    var scnYachtAppear = new ScrollScene({triggerElement: "#divTrigYacht", duration: 500*widthNormalizer, triggerHook: 0.0, reverse: true})
    .setTween(twnYachtAppear)
    .setPin("#divTrigYacht",  {pushFollowers: false})
    .addTo(controller);
    //scnYachtAppear.addIndicators();


    var twnEndGlobeScene = new TimelineMax();   
    twnEndGlobeScene.add(TweenMax.to("#imgGlobe", 1,  {opacity: 0}) ,0);            //the ,0 at the end tells the timeline to run this tween and the next at the same time 
    twnEndGlobeScene.add(TweenMax.to("#imgYacht", 1, {opacity: 0})  ,0);

    var scnEndGlobeScene = new ScrollScene({triggerElement: "#divTrigEndGlobeScene", duration: 400, triggerHook: 0.0, reverse: true})
    .setTween(twnEndGlobeScene)
    .addTo(controller);
    scnEndGlobeScene.addIndicators();



    var twnYachtScene1 = new TimelineMax();   
    twnYachtScene1.add(TweenMax.to("#vidDarkWater",   .3, {opacity: 1})  ,0);            //the ,0 at the end tells the timeline to run this tween and the next at the same time 
    twnYachtScene1.add(TweenMax.to("#imgYachtScene1", .3, {opacity: 1})  ,0);
    twnYachtScene1.add(TweenMax.to("#imgYachtText1",  .2, {opacity: 1}));
    twnYachtScene1.add(TweenMax.to("#imgYachtScene1", .2, {opacity: 0}),2);
    twnYachtScene1.add(TweenMax.to("#imgYachtText1",  .2, {opacity: 0}),2);
    twnYachtScene1.add(TweenMax.to("#imgYachtScene2", .8, {transform: "translateX(0px)"}),2);
    twnYachtScene1.add(TweenMax.to("#imgYachtText2", .8, {opacity: 1}));
    twnYachtScene1.add(TweenMax.to("#imgYachtText2", .8, {opacity: 0}));
    twnYachtScene1.add(TweenMax.to("#imgYachtScene2", .0001, {opacity: 0}) ,3);
    twnYachtScene1.add(TweenMax.to("#imgYachtScene3", .0001, {opacity: 1}) ,3);
    twnYachtScene1.add(TweenMax.to("#imgYachtText3", .2, {opacity: 1}));
    twnYachtScene1.add(TweenMax.to("#imgYachtText3", .2, {opacity: 0}));
    twnYachtScene1.add(TweenMax.to("#imgYachtScene3", .8, {transform: "translateX(-600px)"}));
    twnYachtScene1.add(TweenMax.to("#imgYachtText4", .2, {opacity: 1}));
    twnYachtScene1.add(TweenMax.to("#imgYachtText4", .2, {opacity: 0}));
    twnYachtScene1.add(TweenMax.to("#vidDarkWater",   .4, {opacity: 0})  ,6);  
    twnYachtScene1.add(TweenMax.to("#imgYachtScene3", .2, {opacity: 0})  ,6);

    var scnYachtScene1 = new ScrollScene({triggerElement: "#divTrigYachtScene1", duration: 3000, triggerHook: 0.0, reverse: true})
    .setTween(twnYachtScene1)
    .setPin("#divTrigYachtScene1", {pushFollowers: false})
    .addTo(controller);
    scnYachtScene1.addIndicators();




    var twnYachtGunShots = new TimelineMax()  
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 1, onComplete:playSFXGunShot}));
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 0})); 
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .4, {opacity: 0}));
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 1, onComplete:playSFXGunShot}));
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 0})); 
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .4, {opacity: 0}));
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 1, onComplete:playSFXGunShot}));
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 0})); 
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .4, {opacity: 0}));   

    var scnYachtGunShots = new ScrollScene({triggerElement: "#divTrigYachtGunShots", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnYachtGunShots)
    .setPin("#divTrigYachtGunShots", {pushFollowers: false})
    .addTo(controller);
    scnYachtGunShots.addIndicators();
    //scnYachtGunShots.on("start", playSFXGunShot);


/*
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