

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside
$(document).ready(function(){

    jumpScroll(0);

    //Get the height and width of the browser
    var windowHeight = $( window ).height();
    var windowWidth  = $( window ).width();

    //Values used to normalize the user's scroll distances with Matt's development distances, 1680 x 1050
    var heightNormalizer = windowHeight / 1050;
    var widthNormalizer  = windowWidth  / 1680;

    var imageHeight = (windowWidth / 16) * 9; 
    var imageWidth  = (windowHeight / 9) * 16; 

    var leftRightBorderWidth = Math.max(0, ((windowWidth - imageWidth) / 2));

    //Sets the height of the fixed black bars at the top and bottom of the web page.
    $("#topBorder").css("height", (windowHeight - imageHeight) / 2);
    $("#bottomBorder").css("height", (windowHeight - imageHeight) / 2);
    $("#leftBorder").css("width",  leftRightBorderWidth);
    $("#rightBorder").css("width", leftRightBorderWidth);
    $("#chapter2Content").css("width", windowWidth - (leftRightBorderWidth * 2));

    console.log("window width: " + windowWidth);
    console.log("leftRightBorderWidth: " + leftRightBorderWidth);
    console.log("content Width: " + (windowWidth - (leftRightBorderWidth * 2)));

    //function to scroll the page down slightly
    function pageScroll() {
        if(document.body.style.overflowY != "hidden") {
            window.scrollBy(0,2);
        }
    }

    //Scrolls the browser window to the accepted parameter location
    function jumpScroll(loc) {
        window.scrollTo(0,loc);
        $(document).scrollTop(loc);
        stopAllSFX();
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
    $(window).resize(function(){jumpScroll(0); window.location.reload();});


    $('html').click(function() {
        giveBackScroll();
    });

    //function used to prevent page scrolling
    function preventScroll () {
        var body = document.body;
        body.style.overflowY = "hidden";
    }

    //function used to re-enable browser scrolling after a portion that locks site scrolling (e.g. videos that must be watched)
    function giveBackScroll () {
        var body = document.body;
        body.style.overflowY = "visible";
    }

    var sfxGunShot     = new Audio('./resources/sfx/sfxGunShot.mp3');
	var sfxFillingGlass = new Audio('./resources/sfx/sfxFillingGlass.mp3');
	var sfxSilverwareSounds = new Audio('./resources/sfx/sfxSilverwareSounds.mp3');
	var bgmInTheCastle = new Audio('./resources/sfx/bgmInTheCastle.mp3');
	var bgmNearShore = new Audio('./resources/sfx/bgmNearShore.mp3');
	var bgmFarFromShore = new Audio('./resources/sfx/bgmFarFromShore.mp3');
	//comment to test things; please delete
	
	bgmFarFromShore.loop = true;
	bgmNearShore.loop = true;
	bgmInTheCastle.loop = true;
	//Is that right?

     
     //array containing all lengthy Audio objects
    var longAudioObjects = [bgmFarFromShore, bgmInTheCastle, bgmNearShore];
	
    //Play gunshot sound on call
    function playSFXGunShot (event) {
        var sfxGunShot     = new Audio('./resources/sfx/sfxGunShot.mp3');
        sfxGunShot.play();
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
	
	
	//Play sound effect for silverware/plate noises
	function playSFXSilverwareSounds (event) {
        sfxSilverwareSounds.currentTime = 0;
        $(sfxSilverwareSounds).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	

    //Play sound effect of gun clicking
    function playSFXGunClick (event) {
        sfxGunClick.currentTime = 0;
        $(sfxGunClick).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	//Play sound effect for knocking on the door
	function playSFXFillingGlass (event) {
        sfxFillingGlass.currentTime = 0;
        $(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	

    //Fades out all lengthy audio clips
    function stopAllSFX() {
        $(longAudioObjects).stop().animate({volume:0},800,function(){ this.pause() })
    }


    // init scrollMagic controller
    var controller = new ScrollMagic();


    var twnPanZaroffAtTable = new TimelineMax();
    //twnPanZaroffAtTable.add(TweenMax.to("#imgRainsfordPersp2", .1, {opacity: 1}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgRainsfordPersp2", .9, {opacity: 1, transform: "translateY(0px)"}));
    
    //Text fade in, sit still, and fade out
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText3", 2, {opacity: 1, onStart: stopAllSFX}));
    twnPanZaroffAtTable.add(TweenMax.to("#imgDinnerText3", 2, {opacity: 1, onStart: playBGMInTheCastle}));
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

    twnPanZaroffAtTable.add(TweenMax.to("#imgWinePouring1", 2, {opacity: 1, onComplete:playSFXFillingGlass}));

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
                                TweenMax.to("#imgWinePouring6", .4, {opacity: 0}),
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
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffGesture", 4, {opacity: 0}),
                         TweenMax.to("#imgZaroffBack", 4, {opacity: 1, transform: "translateY(0px)"})]);

    //Fade out 
    twnPanZaroffAtTable.add(   [TweenMax.to("#imgZaroffBack", .8, {opacity: 0}),
                         TweenMax.to("#imgWindowCliffsLightsOn", .8, {opacity: 1})]);

    twnPanZaroffAtTable.add(TweenMax.to("#imgWindowCliffsLightsOn", 6, {opacity: 1, transform: "scale(1.5,1.5)"}));

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


    var scnPanZaroffAtTable = new ScrollScene({triggerElement: "#divTrigDinner", duration:50000, triggerHook: 0, reverse:true})
    .setTween(twnPanZaroffAtTable)
    .setPin("#divTrigDinner", {pushFollowers: false})
    .addTo(controller);
    //scnPanZaroffAtTable.addIndicators();




    var twnZaroffRoom = new TimelineMax();

    twnZaroffRoom.add(TweenMax.to("#imgZaroffRoom1", .9, {opacity: 1}));

    //Text fade in, sit still, and fade out
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText1", 2, {opacity: 1}));
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText1", 2, {opacity: 1}));
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText1", 2, {opacity: 0}));

    twnZaroffRoom.add(TweenMax.to("#imgZaroffRoom2", .4, {opacity: 1}));

    //Text fade in, sit still, and fade out
    twnZaroffRoom.add( [TweenMax.to("#imgBeforeHuntText2_yes", 2, {opacity: 1}),
                      TweenMax.to("#imgBeforeHuntText3_no", 2, {opacity: 1}),
                      TweenMax.to("#imgZaroffRoom1", 2, {opacity: 0})]);
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText2_yes", 2, {opacity: 1}));
    twnZaroffRoom.add( [TweenMax.to("#imgBeforeHuntText2_yes", 2, {opacity: 0}),
                      TweenMax.to("#imgBeforeHuntText3_no", 2, {opacity: 0})]);

    twnZaroffRoom.add([TweenMax.to("#imgZaroffRoom2", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom3", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText4", 2, {opacity: 1}));
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText4", 2, {opacity: 1}));
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText4", 2, {opacity: 0}));

    twnZaroffRoom.add([TweenMax.to("#imgZaroffRoom3", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom4", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText5", 2, {opacity: 1}));
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText5", 2, {opacity: 1}));
    twnZaroffRoom.add(TweenMax.to("#imgBeforeHuntText5", 2, {opacity: 0}));

    twnZaroffRoom.add(TweenMax.to("#imgZaroffRoom4", .4, {opacity: 0}));


    var scnZaroffRoom = new ScrollScene({triggerElement: "#divTrigZaroffRoom", duration:15000, triggerHook: 0, reverse:true})
    .setTween(twnZaroffRoom)
    .setPin("#divTrigZaroffRoom", {pushFollowers: false})
    .addTo(controller);
    //scnZaroffRoom.addIndicators();

    $('#imgBeforeHuntText2_yes').click( function() {
        jumpToNextPage();
    });

    $('#imgBeforeHuntText3_no').click( function() {
        jumpScroll($(document).scrollTop() + 3400);
    });

    function jumpToNextPage() {
        window.location.href = './Chapter3HTML.html';
    }


    var twnZaroffRoomNo = new TimelineMax();

    twnZaroffRoomNo.add([TweenMax.to("#imgZaroffRoom4", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom6", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText6", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText6", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText6", 2, {opacity: 0}));

    twnZaroffRoomNo.add([TweenMax.to("#imgZaroffRoom6", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom5", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText7", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText7", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText7", 2, {opacity: 0}));

    twnZaroffRoomNo.add([TweenMax.to("#imgZaroffRoom5", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom7", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText8", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText8", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText8", 2, {opacity: 0}));

    twnZaroffRoomNo.add([TweenMax.to("#imgZaroffRoom7", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom5", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText9", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText9", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText9", 2, {opacity: 0}));

    twnZaroffRoomNo.add([TweenMax.to("#imgZaroffRoom5", .4, {opacity: 0}),
                         TweenMax.to("#imgZaroffRoom8", .4, {opacity: 1})]);

    //Text fade in, sit still, and fade out
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText10", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText10", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText10", 2, {opacity: 0}));

    //Text fade in, sit still, and fade out
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText11", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText11", 2, {opacity: 1}));
    twnZaroffRoomNo.add(TweenMax.to("#imgBeforeHuntText11", 2, {opacity: 0}));

    twnZaroffRoomNo.add(TweenMax.to("#imgZaroffRoom8", .4, {opacity: 0}));


    var scnZaroffRoomNo = new ScrollScene({triggerElement: "#divTrigZaroffRoomNo", duration:15000, triggerHook: 0, reverse:true})
    .setTween(twnZaroffRoomNo)
    .setPin("#divTrigZaroffRoomNo", {pushFollowers: false})
    .addTo(controller);
    //scnZaroffRoomNo.addIndicators();


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