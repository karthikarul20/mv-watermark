angular.module('plunker')
    .directive('mvWatermark', function ($document, $timeout, $window) {
        return {
            restrict: 'A',
            scope: {
                dragOptions: '=mvWatermark',
                reset: '=resetWaterMark',
                enable: '=enableWaterMark',
            },
            link: function (scope, wbElem, attr) {

                if(scope.enable){
                    var startX, startY, x = 0,
                    y = 0,
                    show, start, stop, drag;
                    var parentHeight=0, wbHeight=0, wtHeight=0, viewportHeight=0;
                    var wtElem;


                    console.log(scope);
                    // Obtain drag options
                    if (scope.dragOptions) {
                        start = scope.dragOptions.start;
                        drag = scope.dragOptions.drag;
                        stop = scope.dragOptions.stop;
                        show = scope.dragOptions.show;
                    }

                    scope.$watch("reset", function() {
                        console.log("reset");
                        buildWaterMark();
                    });

                    angular.element(wbElem).parent().css({
                        position: "relative"
                    });
                    angular.element(wbElem).addClass("watermark-bottom watermark");
                    wtElem = angular.element("<div class='watermark-top watermark'></div>").insertBefore(wbElem);
                    buildWaterMark();

                    function buildWaterMark() {
                        var viewportHeightPercentage=30;
                        parentHeight = angular.element(wbElem).parent().height();
                        viewportHeight=(parentHeight*viewportHeightPercentage)/100;
                        console.log(parentHeight);
                        console.log(scope);
                        wbHeight = (parentHeight/2)-(viewportHeight/2);
                        wtHeight =  wbHeight;
                        wbElem.css({
                            height: wbHeight + 'px'
                        });

                        wtElem.css({
                            height: wtHeight + 'px'
                        });
                    }

                    // Bind mousedown event
                    wbElem.on('mousedown', function (e) {
                        e.preventDefault();
                        startX = e.clientX - wbElem[0].offsetLeft;
                        startY = e.clientY - wbElem[0].offsetTop;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                        if (start) start(e, wbElem);
                    });

                    // Handle drag event
                    function mousemove(e) {
                        y = e.clientY - startY;
                        // x = e.clientX - startX; // dont move on x-axis
                        setPosition();
                        if (drag) drag(e, wbElem);
                    }

                    // Unbind drag events
                    function mouseup(e) {
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                        if (stop) stop(e, wbElem);
                    }

                    // Move element, within container if provided
                    function setPosition() {
                        var wbHeight = parentHeight - y;
                        var wtHeight = parentHeight - wbHeight - viewportHeight;

                        
                        if(wbHeight>0 && wtHeight>0){
                            wbElem.css({
                                height: wbHeight + 'px',
                            });
                            
                            wtElem.css({
                                height: wtHeight + 'px',
                            });
                        }
                        else{
                            // console.log("View Port Limit exceeded");
                        }                    
                    }

                    angular.element($window).bind('resize', function () {
                        buildWaterMark();
                    });

                }
                else{
                    wbElem.css({
                        display: "none"
                    });

                }
                



            }
        };
    });
