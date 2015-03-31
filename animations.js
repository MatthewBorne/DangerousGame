

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside
$(document).ready(function(){

    var debug = false;
    var location = 65000;

    //Get the height and width of the browser
    var windowHeight = $( window ).height();
    var windowWidth  = $( window ).width();

    //Values used to normalize the user's scroll distances with Matt's development distances, 1680 x 1050
    var heightNormalizer = windowHeight / 1050;
    var widthNormalizer  = windowWidth  / 1680;



    function pageScroll() {
        if(document.body.style.overflowY != "hidden") {
            window.scrollBy(0,2);
        }
    }

    function jumpScroll(loc) {
        window.scrollTo(0,loc);
        stopAllSFX();
    }

    window.onkeyup = function(e) {
        jumpScroll(location)
    }

    //Takes every element in the html with class center and adds a spacer div immediately before it in order to center the element
    $('.center').each(
        function(index){
            $(this).load(function() {
                var spacer = $('<div> Spacer </div>');
                spacer.css("height", (windowHeight - $(this).height()) / 2);

                $(this).before(spacer);
                //$(this).css("height",windowHeight/2 - $(this).naturalHeight/2);
            });
        }
    );


    window.setInterval(pageScroll, 1);


    //Force the webpage to refresh when the page is resized
    $(window).resize(function(){window.location.reload();});

    //object which references intro video
    var vidIntroVideo = videojs('vidIntroVideo');


    //Start Intro Video on call
    function playVidintroVideo (event) {
        vidIntroVideo.play();
    }

    //object which references the video of main character falling off yacht
    var vidWaterVideo = videojs('vidWaterVideo');

    //Start falling into water video
    function playVidWaterVideo (event) {
        vidWaterVideo.play();
        $(window).scrollTop($('#vidWaterVideo').offset().top + 50);
        //jumpScroll($('#vidWaterVideo').scrollTop());
    }

    $('html').click(function() {
        giveBackScroll();
    });

    preventScroll();

    //function used to prevent page scrolling
    function preventScroll () {
        if(!debug)
        {
            var body = document.body;
            body.style.overflowY = "hidden";
        }
    }

    //function used to re-enable browser scrolling after a portion that locks site scrolling (e.g. videos that must be watched)
    function giveBackScroll () {
        var body = document.body;
        body.style.overflowY = "visible";
    }


    //When videos end, give the user back the ability to scroll
    //We should also give them the ability to scroll if they click on the page
    vidIntroVideo.on('ended', giveBackScroll);
    vidWaterVideo.on('ended', giveBackScroll);

    var sfxGunShot     = new Audio('./resources/sfx/sfxGunShot.mp3');
    var sfxSpaceWhoosh = new Audio('./resources/sfx/sfxSpaceWhoosh.ogg');
    var sfxJetSound    = new Audio('./resources/sfx/sfxJetSound.ogg');
    var sfxBoatOnOcean = new Audio('./resources/sfx/sfxBoatOnOcean.ogg');
    var sfxZoomLens    = new Audio('./resources/sfx/sfxZoomLens.ogg');
    var sfxLighter     = new Audio('./resources/sfx/sfxLighter.ogg');
	var sfxForestNoise = new Audio('./resources/sfx/sfxForestNoise.mp3');
	var sfxSlowFootsteps = new Audio('./resources/sfx/sfxSlowFootsteps.mp3');
	var sfxPouringADrink = new Audio('./resources/sfx/sfxPouringADrink.mp3');
	var sfxCreakingGate = new Audio('./resources/sfx/sfxCreakingGate.mp3');
	var sfxSilverwareSounds = new Audio('./resources/sfx/sfxSilverwareSounds.mp3');
	var sfxDoorKnocker = new Audio('./resources/sfx/sfxDoorKnocker.mp3');
	var sfxDoorOpening = new Audio('./resources/sfx/sfxDoorOpening.mp3');
	var sfxGunClick = new Audio('./resources/sfx/sfxGunClick.mp3');
	var sfxFoghorn = new Audio('./resources/sfx/sfxFoghorn.mp3');
	var sfxLargeSplash = new Audio('./resources/sfx/sfxLargeSplash.mp3');
	var sfxFastFootsteps = new Audio('./resources/sfx/sfxFastFootsteps.mp3');
	
	

     
     //array containing all lengthy Audio objects
    var longAudioObjects = [sfxJetSound, sfxBoatOnOcean, sfxLighter];


    //Play gunshot sound on call
    function playSFXGunShot (event) {
        var sfxGunShot     = new Audio('./resources/sfx/sfxGunShot.mp3');
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
	
	//Play sound effect for a lens zooming
	function playSFXZoomLens (event) {
        sfxZoomLens.currentTime = 0;
        $(sfxZoomLens).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}

    //Play sound effect for lighter lighting the pipe - scene1
    function playSFXLighter (event) {
        sfxLighter.currentTime = 0;
        $(sfxLighter).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for footsteps in the forest
	function playSFXSlowFootsteps (event) {
        sfxSlowFootsteps.currentTime = 0;
        $(sfxSlowFootsteps).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for jungle/forest noises
	function playSFXForestNoise (event) {
        sfxForestNoise.currentTime = 0;
        $(sfxForestNoise).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for silverware/plate noises
	function playSFXSilverwareSounds (event) {
        sfxSilverwareSounds.currentTime = 0;
        $(sfxSilverwareSounds).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXDoorKnocker (event) {
        sfxDoorKnocker.currentTime = 0;
        $(sfxDoorKnocker).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXFoghorn (event) {
        sfxFoghorn.currentTime = 0;
        $(sfxFoghorn).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXPouringADrink (event) {
        sfxPouringADrink.currentTime = 0;
        $(sfxPouringADrink).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXLargeSplash (event) {
        sfxLargeSplash.currentTime = 0;
        $(sfxLargeSplash).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
    //Play background audio for boat scene - scene 1
	function playSFXBoatOnOcean (event) {
        sfxBoatOnOcean.currentTime = 0;
        $(sfxBoatOnOcean).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}
	
	//Play background audio for boat scene - scene 1
	function playSFXFastFootsteps (event) {
        sfxFastFootsteps.currentTime = 0;
        $(sfxFastFootsteps).each(function(){this.play(); $(this).animate({volume:1},1000)});
	}

    //Fades out all lengthy audio clips
    function stopAllSFX() {
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


    var widthNormalizerPlane;

    //Tweens to make the plane grow and shrink while flying over ocean
    var twnPlaneAppear = new TimelineMax();

    //Scene to make the plane grow and shrink while flying over ocean. Plane is pinned while the globe naturally scrolls to simulate plane movement
    var scnPlaneAppear


    //Because we are doing calculations with imgGlobe height, we must wait until the image is loaded before pulling the height and doing maths
    $('#imgGlobe').load(function() {
        widthNormalizerPlane = $('#imgGlobe').height()/1.8;

        //Set the scroll distance of the plane in relation to the width of the page.
        $("#divTrigPlane").css("height", widthNormalizerPlane + "px");

        console.log(widthNormalizerPlane);

        twnPlaneAppear = new TimelineMax();   

        twnPlaneAppear.add(TweenMax.to("#imgPlane", .05 , {opacity: 1   })); 
        twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.35}));
        twnPlaneAppear.add(TweenMax.to("#imgPlane", .5  , {opacity: 1   }));
        twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.20}));

        console.log(widthNormalizerPlane);

        //Scene to make the plane grow and shrink while flying over ocean. Plane is pinned while the globe naturally scrolls to simulate plane movement
        scnPlaneAppear = new ScrollScene({triggerElement: "#divTrigPlane", duration:widthNormalizerPlane, triggerHook: 0.0, reverse: true})
        .setTween(twnPlaneAppear)
        .setPin("#divTrigPlane",  {pushFollowers: false})
        .on("enter", playSFXJetSound)   //Play the Jet Sound Effect
        .on("leave", stopAllSFX)        //Fade out the Jet Sound Effect
        .addTo(controller);
        scnPlaneAppear.addIndicators();
    });


    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var twnYachtAppear = new TimelineMax();   

    twnYachtAppear.add(  [TweenMax.to("#imgPlane",      0.1,   {opacity: 0, onStart:stopAllSFX}),
                            TweenMax.to("#imgGlobeYacht", 0.3,   {opacity: 1}),
                            TweenMax.to("#imgGlobe",      0.1,   {opacity: 1})]);
    twnYachtAppear.add( TweenMax.to("#imgPlane",      0.0001,   {opacity: 0, transform: "translateX(-2000px)"}));
    twnYachtAppear.add(  [TweenMax.to("#imgGlobeYacht",      1.0,   {transform: "scale(4,4)" })]);
    twnYachtAppear.add(  [TweenMax.to("#imgGlobe",  .1,   {opacity: 0}),            //the ,0 at the end tells the timeline to run this tween and the next at the same time 
                            TweenMax.to("#imgGlobeYacht", .5,   {opacity: 0})]);
    twnYachtAppear.add( TweenMax.to("#imgGlobe",  1.9,   {opacity: 0}));


    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnYachtAppear = new ScrollScene({triggerElement: "#divTrigYacht", duration: 1500*widthNormalizer, triggerHook: 0.0, reverse: true, offset: 100})
    .setTween(twnYachtAppear)
    .addTo(controller);
    scnYachtAppear.addIndicators();


    //Timeline for the majority of Scene1 - The Yacht scene
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
    twnYachtScene1.add( [TweenMax.to("#vidDarkWater",     .4,    {opacity: 0}), 
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


    //Tween to play the "What was that" text after the gunshots
    var twnWaterScene = new TimelineMax();
    twnWaterScene.add(TweenMax.to("#imgWaterText1", .75,  {opacity: 1}));
    twnWaterScene.add(TweenMax.to("#imgWaterText1", .25, {opacity: 0}));

    var scnWaterScene = new ScrollScene({triggerElement: "#divTrigWaterScene", duration:1000, triggerHook: 0.0, reverse:true})
    .setTween(twnWaterScene)
    .setPin("#divPinWaterText1" , {pushFollowers: false})
    .addTo(controller);
    scnWaterScene.addIndicators();


    //Tween to fade in and play the video in which main character falls into water
    var twnVidWaterVideo = new TimelineMax();
    twnVidWaterVideo.add(TweenMax.to("#vidWaterVideo", .00001, {opacity: 1, onStart:playVidWaterVideo, onComplete:playSFXLargeSplash}));
    twnVidWaterVideo.add(TweenMax.to("#vidWaterVideo", .00001,   {opacity: 1, onStart:preventScroll}));
    twnVidWaterVideo.add(TweenMax.to("#vidWaterVideo", .9998, {opacity: 0}));

    var scnVidWaterVideo = new ScrollScene({triggerElement: "#divTrigWaterVideo", duration:300, triggerHook: 0.0, reverse:true})
    .setTween(twnVidWaterVideo)
    .setPin("#vidWaterVideo" , {pushFollowers: false})
    .addTo(controller);
    scnVidWaterVideo.addIndicators();


    $('#imgFootprints').css("transform","translateY(-" + ($('#imgFootprints').height() - windowHeight - 100) + "px)");

    var twnAfterWaterVideo = new TimelineMax();
    twnAfterWaterVideo.add(TweenMax.to("#imgFootprints", .1, {opacity: 1, onStart:playSFXForestNoise, onComplete:playSFXSlowFootsteps}));
    twnAfterWaterVideo.add(TweenMax.to("#imgFootprints", .9, {transform: "translateY(0px)"}));
    twnAfterWaterVideo.add(TweenMax.to("#imgFootprints", .1, {opacity: 0}));

    var scnAfterWaterVideo = new ScrollScene({triggerElement: "#divTrigFootPrints", duration:4000, triggerHook: 0, reverse:true})
    .setTween(twnAfterWaterVideo)
    .setPin("#divTrigFootPrints", {pushFollowers: false})
    .addTo(controller);
    scnAfterWaterVideo.addIndicators();



    var twnJungleRunning = new TimelineMax();
    twnJungleRunning.add(TweenMax.to("#imgJungleRunning", .1, {opacity: 1, onComplete:playSFXFastFootsteps}));
    twnJungleRunning.add(TweenMax.to("#imgJungleRunning", .1, {opacity: 1}));
    twnJungleRunning.add(TweenMax.to("#imgJungleRunning", .1, {opacity: 0, onComplete:playSFXGunShot}));

    var scnJungleRunning = new ScrollScene({triggerElement: "#divTrigJungleRunning", duration:2000, triggerHook: 0, reverse:true})
    .setTween(twnJungleRunning)
    .setPin("#divTrigJungleRunning", {pushFollowers: false})
    .addTo(controller);
    scnJungleRunning.addIndicators();


    var twnWaterTextTwo = new TimelineMax();
    twnWaterTextTwo.add(TweenMax.to("#imgWaterText2", .1, {opacity: 1}));
    twnWaterTextTwo.add(TweenMax.to("#imgWaterText2", .1, {opacity: 1}));
    twnWaterTextTwo.add(TweenMax.to("#imgWaterText2", .1, {opacity: 0}));

    var scnWaterTextTwo = new ScrollScene({triggerElement: "#divTrigWaterText2", duration:1000, triggerHook: 0, reverse:true})
    .setTween(twnWaterTextTwo)
    .setPin("#divTrigWaterText2", {pushFollowers: false})
    .addTo(controller);
    scnWaterTextTwo.addIndicators();



    var twnWildCastleAppears = new TimelineMax();
    twnWildCastleAppears.add(TweenMax.to("#imgZaroffCastle", .1, {opacity: 1, transform: "translateY(0px)"}));
    twnWildCastleAppears.add(TweenMax.to("#imgZaroffCastle", .1, {opacity: 1}));
    twnWildCastleAppears.add(TweenMax.to("#imgZaroffCastle", .1, {opacity: 0}));

    var scnWildCastleAppears = new ScrollScene({triggerElement: "#divTrigZaroffCastle", duration:1000, triggerHook: 0, reverse:true})
    .setTween(twnWildCastleAppears)
    .setPin("#divTrigZaroffCastle", {pushFollowers: false})
    .addTo(controller);
    scnWildCastleAppears.addIndicators();



    //Getthe height of the imgGateHand image so we can translate it accordingly
    var handHeight = $("#imgGateHand").height();

    //Scene 3 gates open
    var twnGatesOpen = new TimelineMax();

    //Fade images into view (castle, gates, and hand images)
    twnGatesOpen.add(  [TweenMax.to("#imgCastleBackground",  2.5, {opacity: 1}),
                        TweenMax.to("#imgGateHand",  2.5, {opacity: 1}),
                        TweenMax.to("#imgGateLeft",  2.5, {opacity: 1}),  
                        TweenMax.to("#imgGateRight", 2.5, {opacity: 1})  ]);

    //Animate the hand opening the gates
    twnGatesOpen.add(TweenMax.to("#imgGateHand",     2, {transform: "translateY(-"+ handHeight/5 +"px)"}));
    twnGatesOpen.add(  [TweenMax.to("#imgGateHand",  4, {transform: "translateY(-"+ handHeight/4 +"px)"}),
                        TweenMax.to("#imgGateLeft",  5, {rotationY:50,  transformOrigin:"26%"}),   //tween to make the gate rotate in Z
                        TweenMax.to("#imgGateRight", 5, {rotationY:-50, transformOrigin:"74%"})  ]);

    //Fade the images out of view
    twnGatesOpen.add(  [TweenMax.to("#imgCastleBackground",  2.5, {opacity: 0}),
                        TweenMax.to("#imgGateHand",  2.5, {opacity: 0}),
                        TweenMax.to("#imgGateLeft",  2.5, {opacity: 0}),  
                        TweenMax.to("#imgGateRight", 2.5, {opacity: 0})  ]);

    //Scene in which the gates to Zaroff's castle are opened (in scene3)
    var scnGatesOpen = new ScrollScene({triggerElement: "#divTrigGate", duration: 1400, triggerHook: 0.0, reverse: true, onComplete:playSFXCreakingGate})
    .setTween(twnGatesOpen)
    .setPin("#divTrigGate")
    .addTo(controller);
    scnGatesOpen.addIndicators();                  //uncomment this line to See Debug Triggers




    //Scene 3 knock on door - gargoyles
    //Door opens with yellow flash, Zaroff points gun at you, then offers a handshake
    var twnGargoyles = new TimelineMax();

    twnGargoyles.add(TweenMax.to("#imgGargoyle1", .5, {opacity: 1, onComplete:playSFXDoorKnocker}));

    twnGargoyles.add(   [TweenMax.to("#imgGargoyle1", .5, {opacity: 0}),
                         TweenMax.to("#imgGargoyle2", .5, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgGargoyle2", .5, {opacity: 0}),
                         TweenMax.to("#imgGargoyle3", .5, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgGargoyle3", .5, {opacity: 0}),
                         TweenMax.to("#imgGargoyle2", .5, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgGargoyle2", .5, {opacity: 0}),
                         TweenMax.to("#imgGargoyle3", .5, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgGargoyle3", .5, {opacity: 0}),
                         TweenMax.to("#imgGargoyle2", .5, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgGargoyle2", .2, {opacity: 0}),
                         TweenMax.to("#imgYellowGunshot", .2, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgYellowGunshot", .2, {opacity: 0}),
                         TweenMax.to("#imgGunPoint", .2, {opacity: 1})]);

    twnGargoyles.add(TweenMax.to("#imgGunPoint", .9, {opacity: 1, onComplete:playSFXGunClick}));

    twnGargoyles.add(   [TweenMax.to("#imgGunPoint", .4, {opacity: 0}),
                         TweenMax.to("#imgYellowGunshot", .4, {opacity: 1})]);

    twnGargoyles.add(   [TweenMax.to("#imgYellowGunshot", .2, {opacity: 0}),
                         TweenMax.to("#imgHandShake", .2, {opacity: 1})]);

    twnGargoyles.add(TweenMax.to("#imgHandShake", .9, {opacity: 1}));
    twnGargoyles.add(TweenMax.to("#imgHandShake", .2, {opacity: 0}));

    twnGargoyles.add(TweenMax.to("#imgDinnerText1", 2, {opacity: 1}));

    twnGargoyles.add(   [TweenMax.to("#imgDinnerText1", 1, {opacity: 0}),
                         TweenMax.to("#imgDinnerText2", 1, {opacity: 1})]);

    twnGargoyles.add(TweenMax.to("#imgDinnerText2", 2.5, {opacity: 1}));

    twnGargoyles.add(TweenMax.to("#imgDinnerText2", .5, {opacity: 0}));

    var scnGargoyles = new ScrollScene({triggerElement: "#divTrigGargoyles", duration: 5000, triggerHook: 0.0, reverse: true})
    .setTween(twnGargoyles)
    .setPin("#divTrigGargoyles")
    .addTo(controller);
    scnGargoyles.addIndicators();                  //uncomment this line to See Debug Triggers




    var twnPanZaroffAtTable = new TimelineMax();
    //twnPanZaroffAtTable.add(TweenMax.to("#imgRainsfordPersp2", .1, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgRainsfordPersp2", .9, {opacity: 1, transform: "translateY(0px)"}));
    
    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText3", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText3", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText3", 2, {opacity: 0}));

    //Fade out image of zaroff at table, fade in closeup of zaroff
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgRainsfordPersp2", .4, {opacity: 0}),
                         TweenMax.to("#imgZTightShot", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText4", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText4", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText4", 2, {opacity: 0}));


    //Fade out closeup image, fade in image of zaroff's hand at table
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZTightShot", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffHand", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText5", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText5", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText5", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText6", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText6", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText6", 2, {opacity: 0}));

    //Fade out image of zaroff's hand at table, fade in wine image
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffHand", .4, {opacity: 0}),
                         TweenMax.to("#imgWine1", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText7", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText7", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText7", 2, {opacity: 0}));

    //Fade out focused zaroff wine image, fade in unfocused image
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWine1", .4, {opacity: 0}),
                         TweenMax.to("#imgWine2", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(TweenMax.to("#imgWinePouring1", 2, {opacity: 1, onComplete:playSFXPouringADrink}));

    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWinePouring1", .4, {opacity: 0}),
                         TweenMax.to("#imgWinePouring2", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWinePouring2", .4, {opacity: 0}),
                         TweenMax.to("#imgWinePouring3", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWinePouring3", .4, {opacity: 0}),
                         TweenMax.to("#imgWinePouring4", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWinePouring4", .4, {opacity: 0}),
                         TweenMax.to("#imgWinePouring5", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWinePouring5", .4, {opacity: 0}),
                         TweenMax.to("#imgWinePouring6", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText8", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText8", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText8", 2, {opacity: 0}));


    //Fade out unfocused wine image, fade in picture of zaroff's side
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWine2", .4, {opacity: 0}),
                                TweenMax.to("#imgWinePouring6", .4, {opacity: 0, onComplete:playSFXPouringADrink}),
                         TweenMax.to("#imgZaroffSide", .4, {opacity: 1})]);
   

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText9", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText9", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText9", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText10", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText10", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText10", 2, {opacity: 0}));

    //Fade out
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffSide", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffHandsFolded", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText11", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText11", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText11", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText12", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText12", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText12", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffHandsFolded", .4, {opacity: 0}),
                         TweenMax.to("#imgCreepySmileNOEYES", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText13", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText13", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText13", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgCreepySmileNOEYES", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffCloseUp", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText14", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText14", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText14", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText15", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText15", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText15", 2, {opacity: 0}));

    //Fade out
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffCloseUp", .4, {opacity: 0}),
                         TweenMax.to("#imgRainsfordHand1", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(TweenMax.to("#imgRainsfordHand1", 2, {opacity: 1}));

    //Fade out
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgRainsfordHand1", .4, {opacity: 0}),
                         TweenMax.to("#imgRainsfordHand2", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText16", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText16", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText16", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgRainsfordHand2", .4, {opacity: 0}),
                         TweenMax.to("#imgRainsfordPersp1", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText17", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText17", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText17", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText18", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText18", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText18", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgRainsfordPersp1", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffEvilLook", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText19", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText19", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText19", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffEvilLook", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffGesture", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText20", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText20", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText20", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffGesture", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffBack", .4, {opacity: 1, transform: "translateY(0px)"})]);

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffBack", .4, {opacity: 0}),
                         TweenMax.to("#imgWindowCliffsLightsOn", .4, {opacity: 1})]);

    twnPanZaroffAtTable.add(TweenMax.to("#imgWindowCliffsLightsOn", 1, {opacity: 1, transform: "scale(1.5,1.5)"}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWindowCliffsLightsOn", .4, {opacity: 0}),
                         TweenMax.to("#imgWindowCliffsLargeView", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText21", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText21", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText21", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText22", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText22", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText22", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgWindowCliffsLargeView", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffWindow", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText23", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText23", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText23", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText24", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText24", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText24", 2, {opacity: 0}));


    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffWindow", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffWindow2", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText25", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText25", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText25", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText26", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText26", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText26", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffWindow2", .4, {opacity: 0}),
                         TweenMax.to("#imgCreepy", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText27", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText27", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText27", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText28", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText28", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText28", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgCreepy", .4, {opacity: 0}),
                         TweenMax.to("#imgStraight", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText29", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText29", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText29", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgStraight", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffBack", .4, {opacity: 1, transform: "translateY(0px)"})]);

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText30", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText30", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText30", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText31", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText31", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText31", 2, {opacity: 0}));

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffBack", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffLAMPOFF", .4, {opacity: 1, transform: "translateY(0px)"})]);

    twnPanZaroffAtTable.add(TweenMax.to("#imgZaroffLAMPOFF", 2, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgZaroffLAMPOFF", 2, {opacity: 0}));


   

    var scnPanZaroffAtTable = new ScrollScene({triggerElement: "#divTrigDinner", duration:30000, triggerHook: 0, reverse:true})
    .setTween(twnPanZaroffAtTable)
    .setPin("#divTrigDinner", {pushFollowers: false})
    .addTo(controller);
    scnPanZaroffAtTable.addIndicators();


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