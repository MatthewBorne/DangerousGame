

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside


$(document).ready(function(){


    //Get the height and width of the browser
    var windowHeight = $( window ).height();
    var windowWidth = $( window ) .width();

    //Values used to normalize the user's scroll distances with Matt's development distances, 1680 x 1050
    var heightNormalizer = windowHeight / 1050;
    var widthNormalizer  = windowWidth  / 1680;

    //Force the webpage to refresh when the page is resized
    $(window).resize(function(){location.reload();});

    //object which references intro video
    var vidIntroVideo = videojs('vidIntroVideo');


    //Start Intro Video on call
    function playVidintroVideo (event) {
        vidIntroVideo.play();
    }

    //function used to re-enable browser scrolling after a portion that locks site scrolling (e.g. videos that must be watched)
    function giveBackScroll () {
        var body = document.body;
        body.style.overflowY = "visible";
    }


    //When intro video ends, give the user back the ability to scroll
    //We should also give them the ability to scroll if they click on the page
    vidIntroVideo.on('ended', giveBackScroll);

     var sfxSpaceWhoosh = new Audio('./resources/sfx/sfxSpaceWhoosh.ogg');
     var sfxJetSound    = new Audio('./resources/sfx/sfxJetSound.ogg');
     var sfxBoatOnOcean = new Audio('./resources/sfx/sfxBoatOnOcean.ogg');
     var sfxZoomLens    = new Audio('./resources/sfx/sfxZoomLens.ogg');
     var sfxLighter     = new Audio('./resources/sfx/sfxLighter.ogg');
     
     //array containing all lengthy Audio objects
     var longAudioObjects = [sfxJetSound, sfxBoatOnOcean];


    //Play gunshot sound on call
    function playSFXGunShot (event) {
        var sfxGunShot  = new Audio('./resources/sfx/sfxGunShot.mp3');
        sfxGunShot.play();
    }
	
    //Play Woosh sound effect for when globe zoomz in - scene0
	function playSFXSpaceWhoosh (event) {
        sfxSpaceWhoosh.currentTime = 0;
        $(sfxSpaceWhoosh).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}
	
    //Play sound effect for Jet flying over the earth - scene0
	function playSFXJetSound (event) {
		sfxJetSound.currentTime = 0;
        $(sfxJetSound).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}
	

	function playSFXZoomLens (event) {
        sfxZoomLens.currentTime = 0;
        $(sfxZoomLens).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}

    //Play sound effect for lighter lighting the pipe - scene1
    function playSFXLighter (event) {
        sfxLighter.currentTime = 0;
        $(sfxLighter).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
    //Play background audio for boat scene - scene 1
	function playSFXBoatOnOcean (event) {
        sfxBoatOnOcean.currentTime = 0;
        $(sfxBoatOnOcean).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}

    //Fades out all lengthy audio clips
    function stopAllSFX() {
        console.log("stopping audio");
        $(longAudioObjects).stop().animate({volume:0},800,function(){ this.pause() })
    }

    //Plays the intro video on page load
    $(document).ready(function(){ vidIntroVideo.play(); }) 


    // init scrollMagic controller
    var controller = new ScrollMagic();


    //tween to make the globe pin and "zoom in"
    var twnGlobeAppear = TweenMax.to("#imgGlobe", 1, {opacity: 1, transform: "scale(1.5,1.5)", onStart:playSFXSpaceWhoosh});

    //Scene to make the globe pin and "zoom in"
    var scnGlobeAppear = new ScrollScene({triggerElement: "#divTrigGlobe", duration: 1100, triggerHook: 0.0, reverse: true})
    .setTween(twnGlobeAppear)
    .setPin("#divTrigGlobe" ,{pushFollowers: false})
    .addTo(controller);
    scnGlobeAppear.addIndicators();


    //Tweens to make the plane grow and shrink while flying over ocean
    var twnPlaneAppear = new TimelineMax();   
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .05 , {opacity: 1})); 
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.35}));
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .5  , {opacity: 1   }));
    twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.20}));

    //Scene to make the plane grow and shrink while flying over ocean. Plane is pinned while the globe naturally scrolls to simulate plane movement
    var scnPlaneAppear = new ScrollScene({triggerElement: "#divTrigPlane", duration:1000*widthNormalizer, triggerHook: 0.0, reverse: true})
    .setTween(twnPlaneAppear)
    .setPin("#divTrigPlane",  {pushFollowers: false})
    .on("enter", playSFXJetSound)   //Play the Jet Sound Effect
    .on("leave", stopAllSFX)        //Fade out the Jet Sound Effect
    .addTo(controller);
    scnPlaneAppear.addIndicators();


    //Set the scroll distance of the plane in relation to the width of the page.
    $("#divTrigPlane").height(1000*widthNormalizer + "px");


    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var twnYachtAppear = new TimelineMax();   

    twnYachtAppear.add(  [TweenMax.to("#imgPlane",      0.1,   {opacity: 0, onStart:stopAllSFX}),
                            TweenMax.to("#imgGlobeYacht", 0.3,   {opacity: 1}),
                            TweenMax.to("#imgGlobe",      0.1,   {opacity: 1})]);
    twnYachtAppear.add(  [TweenMax.to("#imgGlobeYacht",      1.0,   {transform: "scale(4,4)" })]);
    twnYachtAppear.add(  [TweenMax.to("#imgGlobe",  .1,   {opacity: 0}),            //the ,0 at the end tells the timeline to run this tween and the next at the same time 
                            TweenMax.to("#imgGlobeYacht", .5,   {opacity: 0})]);
    twnYachtAppear.add( TweenMax.to("#imgGlobe",  1.9,   {opacity: 0}));


    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnYachtAppear = new ScrollScene({triggerElement: "#divTrigYacht", duration: 1500*widthNormalizer, triggerHook: 0.0, reverse: true, offset: 100})
    .setTween(twnYachtAppear)
    .addTo(controller);
    scnYachtAppear.addIndicators();


    //Timeline for Scene1 - The Yacht scene
    var twnYachtScene1 = new TimelineMax();   
    twnYachtScene1.add(TweenMax.to("#vidDarkWater",      .3,    {opacity: 1})  ,0);            //the ,0 at the end tells the timeline to run this tween and the next at the same time 
    twnYachtScene1.add(TweenMax.to("#imgYachtScene1",    .3,    {opacity: 1})  ,0);
    twnYachtScene1.add(TweenMax.to("#imgYachtText1",     .8,    {opacity: 1}));
    twnYachtScene1.add( [TweenMax.to("#imgYachtScene1",  .2,    {opacity: 0}),
                         TweenMax.to("#imgYachtText1",   .8,    {opacity: 0}),
                         TweenMax.to("#imgYachtScene2",  .8,    {transform: "translateX(0px)"})]);
    twnYachtScene1.add(TweenMax.to("#imgYachtText2",     .8,    {opacity: 1}));
    twnYachtScene1.add(TweenMax.to("#imgYachtText2",     .8,    {opacity: 0}));
    twnYachtScene1.add(  [TweenMax.to("#imgYachtScene2", .0001, {opacity: 0, onStart:playSFXLighter}),
                          TweenMax.to("#imgYachtScene3", .0001, {opacity: 1})]);
    twnYachtScene1.add(TweenMax.to("#imgYachtText3",     .8,    {opacity: 1}));
    twnYachtScene1.add(TweenMax.to("#imgYachtText3",     .8,    {opacity: 0, delay:.2}));
    twnYachtScene1.add( [TweenMax.to("#imgYachtScene3",  .8,    {transform: "translateX(-" +(windowWidth/3) +"px)"}),
                         TweenMax.to("#imgYachtScene4",  .8,    {transform: "translateX(-" +(windowWidth/3) +"px)"})]);
    twnYachtScene1.add( [TweenMax.to("#imgYachtText4",   .2,    {opacity: 1}),
                         TweenMax.to("#imgYachtScene4",  .2,    {opacity: 1})]);
    twnYachtScene1.add([TweenMax.to("#vidDarkWater",     .4,    {opacity: 0}), 
                         TweenMax.to("#imgYachtScene3",  .001,  {opacity: 0}),
                         TweenMax.to("#imgYachtScene4",  .2,    {opacity: 0}),
                         TweenMax.to("#imgYachtText4",   .6,    {opacity: 0, delay:.8})]);

    var scnYachtScene1 = new ScrollScene({triggerElement: "#divTrigYachtScene1", duration: 10000, triggerHook: 0.0, reverse: true})
    .setTween(twnYachtScene1)
    .setPin("#divTrigYachtScene1", {pushFollowers: false})
    .on("enter", playSFXBoatOnOcean)
    .addTo(controller);
    //scnYachtScene1.addIndicators();



    //Timeline to show gun shots that happen at the end of scene1
    var twnYachtGunShots = new TimelineMax()  
    twnYachtGunShots.add(TweenMax.to("#gunShotFlash", .1, {opacity: 1, onComplete:playSFXGunShot, onStart: stopAllSFX}));
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
    //scnYachtGunShots.addIndicators();
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