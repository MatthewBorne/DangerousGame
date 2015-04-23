

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside
$(document).ready(function(){

    //setting debug to true allows debug functions such as page jump on button press.
    var debug = false;
    //location to which the debug page jump goes to
    var location = 103000;

    //Get the height and width of the browser
    var windowHeight = $( window ).height();
    var windowWidth  = $( window ).width();

    //Values used to normalize the user's scroll distances with Matt's development distances, 1680 x 1050
    var heightNormalizer = windowHeight / 1050;
    var widthNormalizer  = windowWidth  / 1680;

    var imageHeight = (windowWidth / 16) * 9; 

    //Sets the height of the fixed black bars at the top and bottom of the web page.
    $("#topBorder").css("height", (windowHeight - imageHeight) / 2);
    $("#bottomBorder").css("height", (windowHeight - imageHeight) / 2);

    //function to scroll the page down slightly
    function pageScroll() {
        if(document.body.style.overflowY != "hidden") {
            window.scrollBy(0,2);
        }
    }

    //Scrolls the browser window to the accepted parameter location
    function jumpScroll(loc) {
        window.scrollTo(0,loc);
        stopAllSFX();
    }

    //Debug function to allow us to skip down the page if we press a button
    window.onkeyup = function(e) {
        if(debug){
        jumpScroll(location);
        }
        else {
            //window.open("./Chapter1HTML.html", "Most Dangerous Game", "fullscreen=yes");
        }
    }

    //Takes every element in the html with class center and adds a spacer div immediately before it in order to center the element
    $('.centerVertically').each(
        function(index){
            $(this).load(function() {
                var spacer = $('<div> Spacer </div>');
                spacer.css("height", (windowHeight - $(this).height()) / 2);

                if(windowHeight > $(this).height())
                {
                    $(this).before(spacer);
                }
            });
        }
    );

    //Takes every element in the html with class "center" and adds a spacer div immediately before it in order to center the elements below
    $('.centerDiv').each(
        function(index){
            $(this).css("height", (windowHeight - imageHeight) / 2);
        }
    );

    $('.pageHeight').each(
        function(index){
            $(this).css("height", windowHeight);
        }
    );


    //uncomment the below line to enable autoscroll
    //window.setInterval(pageScroll, 1);


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
        $(window).scrollTop($('#videoWaterVidCenterer').offset().top + 15);
        $("#vidWaterVideo").css("opacity",1);
        //jumpScroll($('#vidWaterVideo').scrollTop(
    }

    function vidWaterVidDissapear() {
        $("#vidWaterVideo").css("opacity",0);
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
    vidWaterVideo.on('ended', vidWaterVidDissapear);

    var sfxGunShot     = new Audio('./resources/sfx/sfxGunShot.mp3');
    var sfxSpaceWhoosh = new Audio('./resources/sfx/sfxSpaceWhoosh.ogg');
    var sfxJetSound    = new Audio('./resources/sfx/sfxJetSound.ogg');
    var sfxBoatOnOcean = new Audio('./resources/sfx/sfxBoatOnOcean.ogg');
    var sfxZoomLens    = new Audio('./resources/sfx/sfxZoomLens.ogg');
    var sfxLighter     = new Audio('./resources/sfx/sfxLighter.ogg');
	var sfxForestNoise = new Audio('./resources/sfx/sfxForestNoise.mp3');
	var sfxSlowFootsteps = new Audio('./resources/sfx/sfxSlowFootsteps.mp3');
	var sfxFillingGlass = new Audio('./resources/sfx/sfxFillingGlass.mp3');
	var sfxCreakingGate = new Audio('./resources/sfx/sfxCreakingGate.mp3');
	var sfxSilverwareSounds = new Audio('./resources/sfx/sfxSilverwareSounds.mp3');
	var sfxDoorKnocker = new Audio('./resources/sfx/sfxDoorKnocker.mp3');
	var sfxDoorOpening = new Audio('./resources/sfx/sfxDoorOpening.mp3');
	var sfxGunClick = new Audio('./resources/sfx/sfxGunClick.mp3');
	var sfxFoghorn = new Audio('./resources/sfx/sfxFoghorn.mp3');
	var sfxLargeSplash = new Audio('./resources/sfx/sfxLargeSplash.mp3');
	var sfxFastFootsteps = new Audio('./resources/sfx/sfxFastFootsteps.mp3');
	var sfxHeavyDoorKnocker = new Audio('./resources/sfx/sfxHeavyDoorKnocker.ogg');
	var bgmInTheCastle = new Audio('./resources/sfx/bgmInTheCastle.mp3');
	var bgmNearShore = new Audio('./resources/sfx/bgmNearShore.mp3');
	var bgmFarFromShore = new Audio('./resources/sfx/bgmFarFromShore.mp3');
	//comment to test things; please delete
	
	bgmFarFromShore.loop = true;
	bgmNearShore.loop = true;
	bgmInTheCastle.loop = true;
	//Is that right?

     
     //array containing all lengthy Audio objects
    var longAudioObjects = [sfxJetSound, sfxBoatOnOcean, sfxLighter, sfxForestNoise, sfxSlowFootsteps, sfxFastFootsteps, bgmFarFromShore, bgmInTheCastle, bgmNearShore];
	
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
	
	//Play sound effect for squeaking gate
    function playSFXSqueakingGate (event) {
        sfxSqueakingGate.currentTime = 0;
        $(sfxSqueakingGate).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for footsteps in the forest
	function playSFXSlowFootsteps (event) {
        sfxSlowFootsteps.currentTime = 0;
        $(sfxSlowFootsteps).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for forest sound near the beach
	function playBGMNearShore (event) {
        bgmNearShore.currentTime = 0;
        $(bgmNearShore).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for forest sound away from beach
	function playBGMFarFromShore (event) {
        bgmFarFromShore.currentTime = 0;
        $(bgmFarFromShore).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for ambient castle sound
	function playBGMInTheCastle (event) {
        bgmInTheCastle.currentTime = 0;
        $(bgmInTheCastle).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for jungle/forest noises
	function playSFXForestNoise (event) {
        sfxForestNoise.currentTime = 0;
        $(sfxForestNoise).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }

    //play sound effect of gate creaking open
    function playSFXCreakingGate (event) {
        sfxCreakingGate.currentTime = 0;
        $(sfxCreakingGate).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for silverware/plate noises
	function playSFXSilverwareSounds (event) {
        sfxSilverwareSounds.currentTime = 0;
        $(sfxSilverwareSounds).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXHeavyDoorKnocker (event) {
        sfxHeavyDoorKnocker.currentTime = 0;
        $(sfxHeavyDoorKnocker).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }

    //Play sound effect of gun clicking
    function playSFXGunClick (event) {
        sfxGunClick.currentTime = 0;
        $(sfxGunClick).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXFoghorn (event) {
        sfxFoghorn.currentTime = 0;
        $(sfxFoghorn).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXFillingGlass (event) {
        sfxFillingGlass.currentTime = 0;
        $(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
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
    //scnGlobeAppear.addIndicators();


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

        twnPlaneAppear = new TimelineMax();   

        twnPlaneAppear.add(TweenMax.to("#imgPlane", .05 , {opacity: 1   })); 
        twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.35}));
        twnPlaneAppear.add(TweenMax.to("#imgPlane", .5  , {opacity: 1   }));
        twnPlaneAppear.add(TweenMax.to("#imgPlane", .225, {scale:   0.20}));

        //Scene to make the plane grow and shrink while flying over ocean. Plane is pinned while the globe naturally scrolls to simulate plane movement
        scnPlaneAppear = new ScrollScene({triggerElement: "#divTrigPlane", duration:widthNormalizerPlane, triggerHook: 0.0, reverse: true})
        .setTween(twnPlaneAppear)
        .setPin("#divTrigPlane",  {pushFollowers: false})
        .on("enter", playSFXJetSound)   //Play the Jet Sound Effect
        .on("leave", stopAllSFX)        //Fade out the Jet Sound Effect
        .addTo(controller);
        //scnPlaneAppear.addIndicators();
    });


    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var twnYachtAppear = new TimelineMax();   

    twnYachtAppear.add(  [TweenMax.to("#imgPlane",      0.1,   {opacity: 0, onStart:stopAllSFX}),
                            TweenMax.to("#imgGlobeYacht", 0.3,   {opacity: 1}),
                            TweenMax.to("#imgGlobe",      0.1,   {opacity: 1})]);
    twnYachtAppear.add( TweenMax.to("#imgPlane",      0.0001,   {opacity: 0, transform: "translateX(-2000px)"}));
    twnYachtAppear.add(  [TweenMax.to("#imgGlobeYacht",      1.0,   {transform: "scale(3.3,3.3)" })]);
    twnYachtAppear.add(  [TweenMax.to("#imgGlobe",  .1,   {opacity: 0}),            //the ,0 at the end tells the timeline to run this tween and the next at the same time 
                            TweenMax.to("#imgGlobeYacht", .5,   {opacity: 0})]);
    twnYachtAppear.add( TweenMax.to("#imgGlobe",  1.9,   {opacity: 0}));


    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnYachtAppear = new ScrollScene({triggerElement: "#divTrigYacht", duration: 1500*widthNormalizer, triggerHook: 0.0, reverse: true, offset: 100})
    .setTween(twnYachtAppear)
    .addTo(controller);
    //scnYachtAppear.addIndicators();


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
    twnWaterScene.add( [TweenMax.to("#vidDarkWaterAgain",   .5,   {opacity: 1}),
                        TweenMax.to("#imgYachtScene1Again", .5,   {opacity: 1})]);
    twnWaterScene.add(TweenMax.to("#imgWaterText1", .75,  {opacity: 1}));
    twnWaterScene.add(TweenMax.to("#imgWaterText1", .25,  {opacity: 0}));
    twnWaterScene.add([TweenMax.to("#imgYachtScene1Again", .5,   {opacity: 0}),
                        TweenMax.to("#imgYachtScene5", .5,   {opacity: 1})]);
    twnWaterScene.add([TweenMax.to("#imgYachtScene5", .5,   {opacity: 0}),
                        TweenMax.to("#imgYachtScene6",    .5,   {opacity: 1})]);
    twnWaterScene.add([TweenMax.to("#imgYachtScene6",     .5,   {opacity: 0}),
                        TweenMax.to("#vidDarkWaterAgain", .5,   {opacity: 0}),
                        TweenMax.to("#imgYachtScene7",    .5,   {opacity: 1}),
                        TweenMax.to("#imgYachtScene7_bg", .5,   {opacity: 1})]);
    twnWaterScene.add( TweenMax.to("#imgYachtScene7_bg",  1,   {transform: "scale(2,2)"}));
    twnWaterScene.add([TweenMax.to("#imgYachtScene7",    .5,   {opacity: 0}),
                        TweenMax.to("#imgYachtScene7_bg", .5,   {opacity: 0})]);

    var scnWaterScene = new ScrollScene({triggerElement: "#divTrigYachtFallTransition", duration:5000, triggerHook: 0.0, reverse:true})
    .setTween(twnWaterScene)
    .setPin("#divTrigYachtFallTransition" , {pushFollowers: false})
    .addTo(controller);
    //scnWaterScene.addIndicators();


    //Tween to fade in and play the video in which main character falls into water
    var twnVidWaterVideo = new TimelineMax();
    twnVidWaterVideo.add(TweenMax.to("#vidWaterVideo", .00001, {onReverseComplete:vidWaterVidDissapear, onStart:playVidWaterVideo, onComplete:playSFXLargeSplash}));
    twnVidWaterVideo.add(TweenMax.to("#vidWaterVideo", .00001, {onStart:preventScroll}));
    twnVidWaterVideo.add(TweenMax.to("#vidWaterVideo", .9998,  {opacity: 0}));

    var scnVidWaterVideo = new ScrollScene({triggerElement: "#divTrigWaterVideo", duration:300, triggerHook: 0.0, reverse:true})
    .setTween(twnVidWaterVideo)
    .setPin("#vidWaterVideo" , {pushFollowers: false})
    .addTo(controller);
    //scnVidWaterVideo.addIndicators();


    $("#imgFootprints").load(function() {
        $('#imgFootprints').css("transform","translateY(-" + ($('#imgFootprints').height() - windowHeight - 100) + "px)");
    });

    var twnAfterWaterVideo = new TimelineMax();
    twnAfterWaterVideo.add(TweenMax.to("#imgFootprints", .1, {opacity: 1, onStart:playBGMNearShore, onComplete:playSFXSlowFootsteps}));
    twnAfterWaterVideo.add(TweenMax.to("#imgFootprints", .9, {transform: "translateY(0px)"}));
    twnAfterWaterVideo.add(TweenMax.to("#imgFootprints", .1, {opacity: 0}));

    var scnAfterWaterVideo = new ScrollScene({triggerElement: "#divTrigFootPrints", duration:4000, triggerHook: 0, reverse:true})
    .setTween(twnAfterWaterVideo)
    .setPin("#divTrigFootPrints", {pushFollowers: false})
	.on("leave", stopAllSFX) 
    .addTo(controller);
    //scnAfterWaterVideo.addIndicators();



    var twnJungleRunning = new TimelineMax();
    twnJungleRunning.add(TweenMax.to("#imgJungleRunning", .1, {opacity: 1, onStart:playBGMFarFromShore, onComplete:playSFXFastFootsteps}));
    twnJungleRunning.add(TweenMax.to("#imgJungleRunning", .1, {opacity: 1}));
    twnJungleRunning.add(TweenMax.to("#imgJungleRunning", .1, {opacity: 0, onComplete:playSFXGunShot, onStart: stopAllSFX}));

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
    //scnWaterTextTwo.addIndicators();



    var twnWildCastleAppears = new TimelineMax();
    twnWildCastleAppears.add(TweenMax.to("#imgZaroffCastle", .1, {opacity: 1, transform: "translateY(0px)", onComplete:playBGMFarFromShore}));
    twnWildCastleAppears.add(TweenMax.to("#imgZaroffCastle", .1, {opacity: 1}));
    twnWildCastleAppears.add(TweenMax.to("#imgZaroffCastle", .1, {opacity: 0}));

    var scnWildCastleAppears = new ScrollScene({triggerElement: "#divTrigZaroffCastle", duration:1000, triggerHook: 0, reverse:true})
    .setTween(twnWildCastleAppears)
    .setPin("#divTrigZaroffCastle", {pushFollowers: false})
    .addTo(controller);
    //scnWildCastleAppears.addIndicators();



    //Get the height of the imgGateHand image so we can translate it accordingly
    //This code must be ran after the imgGateHand image loads so we can get the image's height
    var handHeight
    $("#imgGateHand").load(function() {
        handHeight = $("#imgGateHand").height();
        console.log(handHeight)

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
        var scnGatesOpen = new ScrollScene({triggerElement: "#divTrigGate", duration: 1400, triggerHook: 0.0, reverse: true, onComplete:playSFXSqueakingGate})
        .setTween(twnGatesOpen)
        .setPin("#divTrigGate")
        .addTo(controller);
        //scnGatesOpen.addIndicators();                  //uncomment this line to See Debug Triggers
    });





    //Scene 3 knock on door - gargoyles
    //Door opens with yellow flash, Zaroff points gun at you, then offers a handshake
    var twnGargoyles = new TimelineMax();

    twnGargoyles.add(TweenMax.to("#imgGargoyle1", .5, {opacity: 1, onComplete:playSFXHeavyDoorKnocker}));

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
                         TweenMax.to("#imgGunPoint2", .4, {opacity: 1})]);
						 
	/*twnGargoyles.add([TweenMax.to("#imgGunPoint2", .4, {opacity: 0}),
                         TweenMax.to("#imgYellowGunshot", .4, {opacity: 1})]);*/
						 
	twnGargoyles.add(TweenMax.to("#imgEasyIvanText", 2, {opacity: 1}));
	twnGargoyles.add(TweenMax.to("#imgEasyIvanText", 2, {opacity: 0}));
	
	

    twnGargoyles.add(   [TweenMax.to("#imgGunPoint2", .2, {opacity: 0}),
                         TweenMax.to("#imgHandShake", .2, {opacity: 1})]);

    twnGargoyles.add(TweenMax.to("#imgHandShake", .9, {opacity: 1}));

    twnGargoyles.add(TweenMax.to("#imgDinnerText1", 2, {opacity: 1}));

    twnGargoyles.add(   [TweenMax.to("#imgDinnerText1", 1, {opacity: 0}),
                         TweenMax.to("#imgDinnerText2", 1, {opacity: 1})]);

    twnGargoyles.add(TweenMax.to("#imgDinnerText2", 2.5, {opacity: 1}));

    twnGargoyles.add(TweenMax.to("#imgDinnerText2", .5, {opacity: 0}));

    twnGargoyles.add(TweenMax.to("#imgHandShake", .2, {opacity: 0}));

    var scnGargoyles = new ScrollScene({triggerElement: "#divTrigGargoyles", duration: 5000, triggerHook: 0.0, reverse: true})
    .setTween(twnGargoyles)
    .setPin("#divTrigGargoyles")
    .addTo(controller);
    //scnGargoyles.addIndicators();                  //uncomment this line to See Debug Triggers
});