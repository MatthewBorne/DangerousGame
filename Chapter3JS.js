

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

    var contentWidth = windowWidth - (leftRightBorderWidth * 2);

    //Sets the height of the fixed black bars at the top and bottom of the web page.
    $("#topBorder").css("height", (windowHeight - imageHeight) / 2);
    $("#bottomBorder").css("height", (windowHeight - imageHeight) / 2);
    $("#leftBorder").css("width",  leftRightBorderWidth);
    $("#rightBorder").css("width", leftRightBorderWidth);
    $("#chapter3Content").css("width", contentWidth);

    console.log("window width: " + windowWidth);
    console.log("leftRightBorderWidth: " + leftRightBorderWidth);
    console.log("content Width: " + contentWidth);

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

	var bgmForestDrums = new Audio('./resources/sfx/bgmForestDrums.ogg');
    var sfxDogHowling = new Audio('./resources/sfx/sfxDogHowling.ogg');
	var sfxDiggingInDirt = new Audio('./resources/sfx/sfxDiggingInDirt.wav');
	var sfxFallingInDirt = new Audio('./resources/sfx/sfxFallingInDirt.mp3');
	var sfxManScreaming = new Audio('./resources/sfx/sfxManScreaming.ogg');
	
    bgmForestDrums.loop = true;

     
     //array containing all lengthy Audio objects
    var longAudioObjects = [];

    playbgmForestDrums();
	

	function playbgmForestDrums () {
        bgmForestDrums.currentTime = 0;
        bgmForestDrums.volume = 0.1;
        bgmForestDrums.play();
        //$(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }

    function playsfxDogHowling () {
        sfxDogHowling.currentTime = 0;
        //bgmForestDrums.volume = 0.2;
        sfxDogHowling.play();
        //$(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
	function playsfxDiggingInDirt () {
        sfxDiggingInDirt.currentTime = 0;
        //bgmForestDrums.volume = 0.2;
        sfxDiggingInDirt.play();
        //$(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
		function playsfxFallingInDirt () {
        sfxFallingInDirt.currentTime = 0;
        //bgmForestDrums.volume = 0.2;
        sfxFallingInDirt.play();
        //$(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
		function playsfxManScreaming () {
        sfxManScreaming.currentTime = 0;
        //bgmForestDrums.volume = 0.2;
        sfxManScreaming.play();
        //$(sfxFillingGlass).each(function(){this.play(); $(this).animate({volume:1},1000)});
    }
	
    //Fades out all lengthy audio clips
    function stopAllSFX() {
        $(longAudioObjects).stop().animate({volume:0},800,function(){ this.pause() })
    }


    // init scrollMagic controller
    var controller = new ScrollMagic();


    var twnHeadStart = new TimelineMax();

    twnHeadStart.add(TweenMax.to("#imgHeadStart", .05 , {opacity: 0})); 

    var scnHeadStart = new ScrollScene({triggerElement: "#divTrigHeadStart", duration: 1000, triggerHook: 0.0, reverse: true})
    .setTween(twnHeadStart)
    .setPin("#divTrigHeadStart", {pushFollowers: false})
    .addTo(controller);
    //scnHeadStart.addIndicators();



    //When in into running video ends, give back scrolling to the user
    var vidDogsRunning = videojs('vidDogsRunning');
    //vidRunning1.on('ended', giveBackScroll);



    //Code to play Running Video 2
    var vidRunning1 = videojs('vidRunningVideo1');
    //vidRunning2.on('ended', giveBackScroll);

    function playRunning1Vid() {
        vidRunning1.play();
        $(window).scrollTop($('#videoRunning1VidCenterer').offset().top + 15);
    }


    var twnRunning1 = new TimelineMax();

    twnRunning1.add(TweenMax.to("#vidRunningVideo1", .05 , {opacity: 1, onStart:playRunning1Vid })); 
    twnRunning1.add(TweenMax.to("#vidRunningVideo1", .05 , {opacity: 0})); 

    var scnRunning1 = new ScrollScene({triggerElement: "#divTrigRunning1", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning1)
    .setPin("#divTrigRunning1", {pushFollowers: false})
    .addTo(controller);
    //scnRunning1.addIndicators();




    function playDogsVid() {
        vidDogsRunning.play();
        $(window).scrollTop($('#videoDogsVidCenterer').offset().top + 15);
    }

    var twnDogsRunning = new TimelineMax();

    twnDogsRunning.add(TweenMax.to("#vidDogsRunning", .05 , {opacity: 1, onStart:playDogsVid })); 
    twnDogsRunning.add(TweenMax.to("#vidDogsRunning", .05 , {opacity: 0})); 

    var scnDogsRunning = new ScrollScene({triggerElement: "#divTrigDogsRunning", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnDogsRunning)
    .setPin("#divTrigDogsRunning", {pushFollowers: false})
    .addTo(controller);
    //scnDogsRunning.addIndicators();



    var twnInTree = new TimelineMax();

    twnInTree.add(TweenMax.to("#imgClimbingTree", .05 , {opacity: 1})); 
    twnInTree.add(TweenMax.to("#imgClimbingTree", .05 , {opacity: 0})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_1", .05 , {opacity: 1}),
                    TweenMax.to( "#imgInTree_2", .05 , {opacity: 1})]); 
    twnInTree.add(TweenMax.to("#imgInTree_DogsLow", .0000001 , {opacity:1})); 
    twnInTree.add(TweenMax.to("#imgInTree_DogsLow", .15 , {opacity:1, transform: "translateX(1000px)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_DogsLow", .000001 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_DogsMid", .000001 , {opacity: 1})]);
    twnInTree.add(TweenMax.to("#imgInTree_DogsMid", .15 , {opacity:1, transform: "translateX(-1000px)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_DogsMid", .000001 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_DogsHigh", .000001 , {opacity: 1})]); 
    twnInTree.add(TweenMax.to("#imgInTree_DogsHigh", .15 , {opacity:1, transform: "translateX(1000px)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_3", .15 , {opacity: 1}),
                    TweenMax.to( "#imgInTree_DogsHigh", .000001 , {opacity: 0})]); 
    twnInTree.add(TweenMax.to( "#imghuntdarktreeText1", .05 , {opacity: 1})); 
    twnInTree.add(TweenMax.to( "#imghuntdarktreeText1", .15 , {opacity: 1})); 
    twnInTree.add(TweenMax.to( "#imghuntdarktreeText1", .05 , {opacity: 0})); 


    twnInTree.add(TweenMax.to("#imgInTree_3", .15 , {opacity:1,  transform: "scale(1.3,1.3)"})); 
    twnInTree.add([ TweenMax.to( "#imgInTree_3", .15 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_1", .000001 , {opacity: 0}),
                    TweenMax.to( "#imgInTree_2", .000001 , {opacity: 0})]); 

    var scnInTree = new ScrollScene({triggerElement: "#divTrigInTree", duration: 8000, triggerHook: 0.0, reverse: true})
    .setTween(twnInTree)
    .setPin("#divTrigInTree", {pushFollowers: false})
    .addTo(controller);
    //scnInTree.addIndicators();


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

    var scnRunning2 = new ScrollScene({triggerElement: "#divTrigRunning2", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning2)
    .setPin("#divTrigRunning2", {pushFollowers: false})
    .addTo(controller);
    //scnRunning2.addIndicators();



    //Code to play Running Video 3
    var vidRunning3 = videojs('vidRunningVideo3');

    function playRunning3Vid() {
        vidRunning3.play();
        $(window).scrollTop($('#videoRunning3VidCenterer').offset().top + 15);
    }


    var twnRunning3 = new TimelineMax();

    twnRunning3.add(TweenMax.to("#vidRunningVideo3", .05 , {opacity: 1, onStart:playRunning3Vid })); 
    twnRunning3.add(TweenMax.to("#vidRunningVideo3", .05 , {opacity: 0})); 

    var scnRunning3 = new ScrollScene({triggerElement: "#divTrigRunning3", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning3)
    .setPin("#divTrigRunning3", {pushFollowers: false})
    .addTo(controller);
    //scnRunning3.addIndicators();




    var twnQuicksand = new TimelineMax();

    twnQuicksand.add(TweenMax.to( "#imgQuicksand1", .05 , {opacity: 1, onStart:playsfxFallingInDirt})); 
    twnQuicksand.add(TweenMax.to( "#imgQuicksand1", .1 , {opacity: 1})); 
    twnQuicksand.add([ TweenMax.to( "#imgQuicksand1", .05 , {opacity: 0}),
                    TweenMax.to( "#imgQuicksand2", .05 , {opacity: 1})]); 
    twnQuicksand.add(TweenMax.to( "#imgQuicksand2", .1 , {opacity: 1}));
    twnQuicksand.add([ TweenMax.to( "#imgQuicksand2", .05 , {opacity: 0}),
                    TweenMax.to( "#imgQuicksand3", .05 , {opacity: 1})]);
    twnQuicksand.add(TweenMax.to("#imgQuicksand4", .15 , {opacity:1, transform: "translateY(0px)"}));  
    twnQuicksand.add(TweenMax.to( "#imghuntredoText1", .05 , {opacity: 1})); 
    twnQuicksand.add(TweenMax.to( "#imghuntredoText1", .15 , {opacity: 1})); 
    twnQuicksand.add(TweenMax.to( "#imghuntredoText1", .05 , {opacity: 0})); 
    twnQuicksand.add(TweenMax.to( "#imgDirtFlying", .05 , {opacity: 1, onStart:playsfxDiggingInDirt})); 
    twnQuicksand.add(TweenMax.to( "#imgDirtFlying", .15 , {opacity: 1})); 
    twnQuicksand.add([TweenMax.to( "#imgQuicksand3", .00001 , {opacity: 0}),
                    TweenMax.to( "#imgQuicksand4", .00001 , {opacity: 0}),
                    TweenMax.to( "#imgDirtFlying", .05 , {opacity: 0})]); 


    var scnQuicksand = new ScrollScene({triggerElement: "#divTrigQuicksand", duration: 4000, triggerHook: 0.0, reverse: true})
    .setTween(twnQuicksand)
    .setPin("#divTrigQuicksand", {pushFollowers: false})
    .addTo(controller);
    //scnQuicksand.addIndicators();





    //Code to play Running Video 4
    var vidRunning4 = videojs('vidRunningVideo4');

    function playRunning4Vid() {
        vidRunning4.play();
        $(window).scrollTop($('#videoRunning4VidCenterer').offset().top + 15);
    }


    var twnRunning4 = new TimelineMax();

    twnRunning4.add(TweenMax.to("#vidRunningVideo4", .05 , {opacity: 1, onStart:playRunning4Vid })); 
    twnRunning4.add(TweenMax.to("#vidRunningVideo4", .05 , {opacity: 0, onComplete:playsfxDogHowling})); 

    var scnRunning4 = new ScrollScene({triggerElement: "#divTrigRunning4", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning4)
    .setPin("#divTrigRunning4", {pushFollowers: false})
    .addTo(controller);
    //scnRunning4.addIndicators();



    var twnKnifeScene = new TimelineMax();

    twnKnifeScene.add(TweenMax.to( "#imghuntredoText3", .05 , {opacity: 1})); 
    twnKnifeScene.add(TweenMax.to( "#imghuntredoText3", .1 , {opacity: 1})); 
    twnKnifeScene.add( TweenMax.to( "#imghuntredoText3", .05 , {opacity: 0})); 
    twnKnifeScene.add(TweenMax.to( "#imgKnife1", .05 , {opacity: 1})); 
    twnKnifeScene.add(TweenMax.to( "#imgKnife1", .1 , {opacity: 1})); 
    twnKnifeScene.add( [TweenMax.to( "#imgKnife1", .05 , {opacity: 0}),
                        TweenMax.to( "#imgKnife2", .05 , {opacity: 1})]); 
    twnKnifeScene.add(TweenMax.to( "#imghuntredoText2", .05 , {opacity: 1})); 
    twnKnifeScene.add(TweenMax.to( "#imghuntredoText2", .1 , {opacity: 1})); 
    twnKnifeScene.add( TweenMax.to( "#imghuntredoText2", .05 , {opacity: 0})); 
    twnKnifeScene.add( TweenMax.to( "#imgKnife2", .05 , {opacity: 0})); 
    



    var scnKnifeScene = new ScrollScene({triggerElement: "#divTrigKnifeScene", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnKnifeScene)
    .setPin("#divTrigKnifeScene", {pushFollowers: false})
    .addTo(controller);
    //scnKnifeScene.addIndicators();



    //Code to play Running Video 5
    var vidRunning5 = videojs('vidRunningVideo5');

    function playRunning5Vid() {
        vidRunning5.play();
        $(window).scrollTop($('#videoRunning5VidCenterer').offset().top + 15);
    }


    var twnRunning5 = new TimelineMax();

    twnRunning5.add(TweenMax.to("#vidRunningVideo5", .05 , {opacity: 1, onStart:playRunning5Vid })); 
    twnRunning5.add(TweenMax.to("#vidRunningVideo5", .05 , {opacity: 0})); 


    var scnRunning5 = new ScrollScene({triggerElement: "#divTrigRunning5", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning5)
    .setPin("#divTrigRunning5", {pushFollowers: false})
    .addTo(controller);
    //scnRunning5.addIndicators();





    var twnKnifeTrap = new TimelineMax();

    twnKnifeTrap.add(TweenMax.to( "#imgKnifeTrap", .00001 , {opacity: 1})); 
    twnKnifeTrap.add(TweenMax.to( "#imgKnifeTrap", .1 , {transform: "translateX(-"+ contentWidth*2 + "px)"})); 
    twnKnifeTrap.add(TweenMax.to( "#imgKnifeTrap", .05 , {opacity: 0})); 

    twnKnifeTrap.add(TweenMax.to( "#imghuntredoText4", .05 , {opacity: 1})); 
    twnKnifeTrap.add(TweenMax.to( "#imghuntredoText4", .1 , {opacity: 1})); 
    twnKnifeTrap.add( TweenMax.to( "#imghuntredoText4", .05 , {opacity: 0})); 
    //twnKnifeTrap.add(TweenMax.to( "#imghuntredoText3", .1 , {opacity: 1})); 
    //twnKnifeTrap.add( TweenMax.to( "#imghuntredoText3", .05 , {opacity: 0})); 
    

    var scnKnifeTrap = new ScrollScene({triggerElement: "#divTrigKnifeTrap", duration: 6000, triggerHook: 0.0, reverse: true, onComplete: playsfxManScreaming})
    .setTween(twnKnifeTrap)
    .setPin("#divTrigKnifeTrap", {pushFollowers: false})
    .addTo(controller);
    //scnKnifeTrap.addIndicators();

    $("#imgKnifeTrap").css({transform: 'translateX(' + contentWidth * 1.56  + 'px)'})




    //Code to play Running Video 6
    var vidRunning6 = videojs('vidRunningVideo6');

    function playRunning6Vid() {
        vidRunning6.play();
        $(window).scrollTop($('#videoRunning6VidCenterer').offset().top + 15);
    }


    var twnRunning6 = new TimelineMax();

    twnRunning6.add(TweenMax.to("#vidRunningVideo6", .05 , {opacity: 1, onStart:playRunning6Vid })); 
    twnRunning6.add(TweenMax.to("#vidRunningVideo6", .05 , {opacity: 0})); 


    var scnRunning6 = new ScrollScene({triggerElement: "#divTrigRunning6", duration: 2000, triggerHook: 0.0, reverse: true})
    .setTween(twnRunning6)
    .setPin("#divTrigRunning6", {pushFollowers: false})
    .addTo(controller);
    //scnRunning6.addIndicators();




    var twnFinale = new TimelineMax();

   /* twnFinale.add(TweenMax.to( "#imgCliff", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgCliff", .1 , {transform: "translateY(0px)"})); 
    twnFinale.add(TweenMax.to( "#imgCliff", .05 , {opacity: 0})); */

    twnFinale.add([ TweenMax.to( "#imgEnd1", .00001 , {opacity: 1}), 
                    TweenMax.to( "#imgEnd1", .1 , {transform: "translateY(0px)"})]);

    twnFinale.add([ TweenMax.to( "#imgEnd1", .1 , {opacity: 0}), 
                    TweenMax.to( "#imgEnd2_1", .1 , {opacity: 1}),
                    TweenMax.to( "#imgEnd2_2", .1 , {opacity: 1}),
                    TweenMax.to( "#imgEnd2_3", .1 , {opacity: 1})]);

    twnFinale.add([ TweenMax.to( "#imgEnd2_2", .1 , {transform: "translateX(1500px)"}),
                    TweenMax.to( "#imgEnd2_3", .1 , {transform: "translateX(1500px)"})]);

    twnFinale.add([ TweenMax.to( "#imgEnd2_1", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd2_2", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd2_3", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd3", .1 , {opacity: 1})]);

    twnFinale.add([ TweenMax.to( "#imgEnd3", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd4", .1 , {opacity: 1})]);

    twnFinale.add([ TweenMax.to( "#imgEnd4", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd5_1", .1 , {opacity: 1})]);

    twnFinale.add( TweenMax.to( "#imgEnd5_2", .1 , {opacity:1}));

    twnFinale.add([ TweenMax.to( "#imgEnd5_1", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd6", .1 , {opacity: 1})]);

    twnFinale.add(TweenMax.to( "#imgEndingText1", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgEndingText1", .1 , {})); 
    twnFinale.add(TweenMax.to( "#imgEndingText1", .05 , {opacity: 0})); 

    twnFinale.add([ TweenMax.to( "#imgEnd6", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd5_2", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd7-9", .1 , {opacity: 1})]);

    twnFinale.add(TweenMax.to( "#imgEndingText2", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgEndingText2", .1 , {})); 
    twnFinale.add(TweenMax.to( "#imgEndingText2", .05 , {opacity: 0})); 

    twnFinale.add([ TweenMax.to( "#imgEnd7-9", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd10", .1 , {opacity: 1}),]);

    twnFinale.add(TweenMax.to( "#imgEndingText3", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgEndingText3", .1 , {})); 
    twnFinale.add(TweenMax.to( "#imgEndingText3", .05 , {opacity: 0})); 

    twnFinale.add([ TweenMax.to( "#imgEnd10", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd7-9", .1 , {opacity: 1})]);

    twnFinale.add(TweenMax.to( "#imgEndingText4", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgEndingText4", .1 , {})); 
    twnFinale.add(TweenMax.to( "#imgEndingText4", .05 , {opacity: 0})); 

    twnFinale.add([ TweenMax.to( "#imgEnd7-9", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEnd11", .1 , {opacity: 1})]);

    twnFinale.add(TweenMax.to( "#imgEndingText5", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgEndingText5", .1 , {})); 
    twnFinale.add(TweenMax.to( "#imgEndingText5", .05 , {opacity: 0})); 

    twnFinale.add(TweenMax.to( "#imgEnd11", .1 , {opacity: 0}));

    twnFinale.add(TweenMax.to( "#imgEnd11", .3 , {opacity: 0}));

    twnFinale.add(TweenMax.to( "#imgEyesClosed", .1 , {opacity: 1}));

    twnFinale.add([ TweenMax.to( "#imgEyesClosed", .1 , {opacity: 0}),
                    TweenMax.to( "#imgEyesOpen", .1 , {opacity: 1})]);

    twnFinale.add(TweenMax.to( "#imgEndingText6", .00001 , {opacity: 1})); 
    twnFinale.add(TweenMax.to( "#imgEndingText6", .1 , {})); 
    twnFinale.add(TweenMax.to( "#imgEndingText6", .05 , {opacity: 0}));

    twnFinale.add(TweenMax.to( "#imgEyesOpen", .1 , {opacity: 0}));

    twnFinale.add(TweenMax.to( "#imgEyesOpen", .1 , {}));

    twnFinale.add(TweenMax.to( "#imgLogo", .1 , {opacity:1}));


    var scnFinale = new ScrollScene({triggerElement: "#divTrigFinale", duration: 15000, triggerHook: 0.0, reverse: true})
    .setTween(twnFinale)
    .setPin("#divTrigFinale", {pushFollowers: false})
    .addTo(controller);
    //scnFinale.addIndicators();

    //$("#imgKnifeTrap").css({transform: 'translateX(' + contentWidth * 1.56  + 'px)'})


    

});