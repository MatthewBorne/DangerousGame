

//Note to other Programmers: Do not pin and tween the same object at the same time!!!
//                           Pin the containing div, and tween the object inside
$(document).ready(function(){

    //setting debug to true allows debug functions such as page jump on button press.
    var debug = false;
    //location to which the debug page jump goes to
    var location = 103000;

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
    $("#chapter3Content").css("width", windowWidth - (leftRightBorderWidth * 2));

    console.log("window width: " + windowWidth);
    console.log("leftRightBorderWidth: " + leftRightBorderWidth);
    console.log("content Width: " + (windowWidth - (leftRightBorderWidth * 2)));

    //Since the page starts with a video, prevent scroll at the start
    //preventScroll();

    //When in into running video ends, give back scrolling to the user
    var vidRunning1 = videojs('vidRunningVideo1');
    vidRunning1.on('ended', giveBackScroll);


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

    //Debug function to allow us to skip down the page if we press a button
    window.onkeyup = function(e) {
        if(debug){
        jumpScroll(location);
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


    $('html').click(function() {
        giveBackScroll();
    });

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

    var twnClimbingTree = new TimelineMax();

    twnClimbingTree.add(TweenMax.to("#imgClimbingTree", .05 , {opacity: 1, transform: "translateY(0px)" })); 
    twnClimbingTree.add(TweenMax.to("#imgClimbingTree", .05 , {opacity: 0})); 

    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnClimbingTree = new ScrollScene({triggerElement: "#divTrigTreeClimb", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnClimbingTree)
    .setPin("#divTrigTreeClimb", {pushFollowers: false})
    .addTo(controller);
    //scnClimbingTree.addIndicators();



    //When in into running video ends, give back scrolling to the user
    var vidDogsRunning = videojs('vidDogsRunning');
    //vidRunning1.on('ended', giveBackScroll);

    function playDogsVid() {
        vidDogsRunning.play();
        $(window).scrollTop($('#videoDogsVidCenterer').offset().top + 15);
    }


    var twnDogsRunning = new TimelineMax();

    twnDogsRunning.add(TweenMax.to("#vidDogsRunning", .05 , {opacity: 1, onStart:playDogsVid })); 
    twnDogsRunning.add(TweenMax.to("#vidDogsRunning", .05 , {opacity: 0})); 

    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnDogsRunning = new ScrollScene({triggerElement: "#divTrigDogsRunning", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnDogsRunning)
    .setPin("#divTrigDogsRunning", {pushFollowers: false})
    .addTo(controller);
    scnDogsRunning.addIndicators();



    var twnInTree = new TimelineMax();

    twnInTree.add([ TweenMax.to( "#imgInTree_1", .05 , {opacity: 1}),
                    TweenMax.to( "#imgInTree_2", .05 , {opacity: 1})]); 
    twnInTree.add(TweenMax.to("#imgInTree_DogsLow", .0000001 , {opacity:1})); 
    twnInTree.add(TweenMax.to("#imgInTree_DogsLow", .15 , {opacity:1, transform: "translateX(2000px)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_DogsLow", .000001 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_DogsMid", .000001 , {opacity: 1})]);
    twnInTree.add(TweenMax.to("#imgInTree_DogsMid", .15 , {opacity:1, transform: "translateX(-2000px)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_DogsMid", .000001 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_DogsHigh", .000001 , {opacity: 1})]); 
    twnInTree.add(TweenMax.to("#imgInTree_DogsHigh", .15 , {opacity:1, transform: "translateX(2000px)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_3", .15 , {opacity: 1}),
                    TweenMax.to( "#imgInTree_DogsHigh", .000001 , {opacity: 0})]); 
    twnInTree.add(TweenMax.to("#imgInTree_3", .15 , {opacity:1,  transform: "scale(1.3,1.3)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_3", .15 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_1", .000001 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_2", .000001 , {opacity: 0})]); 

    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnInTree = new ScrollScene({triggerElement: "#divTrigInTree", duration: 8000, triggerHook: 0.0, reverse: true})
    .setTween(twnInTree)
    .setPin("#divTrigInTree", {pushFollowers: false})
    .addTo(controller);
    scnInTree.addIndicators();


    //Code to play Running Video 2
    var vidRunning2 = videojs('vidRunningVideo2');
    //vidRunning2.on('ended', giveBackScroll);

    function playRunning2Vid() {
        vidRunning2.play();
        $(window).scrollTop($('#videoRunning2VidCenterer').offset().top + 15);
    }


    var twnRunning2 = new TimelineMax();

    twnRunning2.add(TweenMax.to("#vidRunningVideo2", .05 , {opacity: 1, onStart:playRunning2Vid })); 
    twnRunning2.add(TweenMax.to("#vidRunningVideo2", .05 , {opacity: 0})); 

    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnRunning2 = new ScrollScene({triggerElement: "#divTrigRunning2", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning2)
    .setPin("#divTrigRunning2", {pushFollowers: false})
    .addTo(controller);
    scnRunning2.addIndicators();



    //Code to play Running Video 3
    var vidRunning3 = videojs('vidRunningVideo3');

    function playRunning3Vid() {
        vidRunning3.play();
        $(window).scrollTop($('#videoRunning3VidCenterer').offset().top + 15);
    }


    var twnRunning3 = new TimelineMax();

    twnRunning3.add(TweenMax.to("#vidRunningVideo3", .05 , {opacity: 1, onStart:playRunning3Vid })); 
    twnRunning3.add(TweenMax.to("#vidRunningVideo3", .05 , {opacity: 0})); 

    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnRunning3 = new ScrollScene({triggerElement: "#divTrigRunning3", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning3)
    .setPin("#divTrigRunning3", {pushFollowers: false})
    .addTo(controller);
    scnRunning3.addIndicators();




    var twnQuicksand = new TimelineMax();

    twnQuicksand.add(TweenMax.to( "#imgQuicksand1", .05 , {opacity: 1})); 
    twnQuicksand.add(TweenMax.to( "#imgQuicksand1", .1 , {opacity: 1})); 
    twnQuicksand.add([ TweenMax.to( "#imgQuicksand1", .05 , {opacity: 0}),
                    TweenMax.to( "#imgQuicksand2", .05 , {opacity: 1})]); 
    twnQuicksand.add(TweenMax.to( "#imgQuicksand2", .1 , {opacity: 1}));
    twnQuicksand.add([ TweenMax.to( "#imgQuicksand2", .05 , {opacity: 0}),
                    TweenMax.to( "#imgQuicksand3", .05 , {opacity: 1})]); 

    //Timeline which makes the plane dissapear, the globe switches with a globe image containing a yacht, and the new globe zooms into the yacht
    var scnQuicksand = new ScrollScene({triggerElement: "#divTrigQuicksand", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnQuicksand)
    .setPin("#divTrigQuicksand", {pushFollowers: false})
    .addTo(controller);
    scnQuicksand.addIndicators();



    

});