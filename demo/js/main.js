var onloadFunction = function () {

    /* some configs */
    var svgHeight = 600;
    var svgWidth  = 800;
    var svgBorder = 50;

    var mh  = new meshHolder();
    var svg = new svgBuilder(mh, svgHeight, svgWidth);
    var selectStartNodeId  = 'startNode';
    var selectTargetNodeId = 'targetNode';
    var bfs = new breadthFirstSearch(mh, svg, selectStartNodeId, selectTargetNodeId);

    var searchAlgorithm = bfs;

    /* https://www.gps-coordinates.net/ */
    var augsburg     = mh.addNode('Augsburg',     10.897789999999986, 48.37054490000000);
    var berlin       = mh.addNode('Berlin',       13.404953999999975, 52.52000659999999);
    var bonn         = mh.addNode('Bonn',          7.098206800000071, 50.73743000000000);
    var braunschweig = mh.addNode('Braunschweig', 10.526769599999966, 52.26887360000000);
    var bremen       = mh.addNode('Bremen',        8.801693600000021, 53.07929619999999);
    var dresden      = mh.addNode('Dresden',      13.737262099999953, 51.05040880000001);
    var frankfurt    = mh.addNode('Frankfurt',     8.682126700000026, 50.11092209999999);
    var hamburg      = mh.addNode('Hamburg',       9.993681899999956, 53.55108460000000);
    var kiel         = mh.addNode('Kiel',         10.122765100000038, 54.32329270000000);
    var koeln        = mh.addNode('Köln',          6.960278600000038, 50.93753100000000);
    var leipzig      = mh.addNode('Leipzig',      12.373074699999961, 51.33969550000000);
    var magdeburg    = mh.addNode('Magdeburg',    11.627623699999958, 52.12053330000000);
    var muenchen     = mh.addNode('München',      11.581980499999986, 48.13512530000000);
    var potsdam      = mh.addNode('Potsdam',      13.064472900000055, 52.39056890000000);
    var rostock      = mh.addNode('Rostock',      12.099146600000040, 54.09244060000000);
    var stuttgart    = mh.addNode('Stuttgart',     9.182932100000016, 48.77584590000000);

    mh.addConnection(dresden, leipzig, 120);
    mh.addConnection(dresden, muenchen, 459);
    mh.addConnection(dresden, stuttgart, 507);
    mh.addConnection(dresden, berlin, 193);
    mh.addConnection(leipzig, berlin, 190);
    mh.addConnection(leipzig, magdeburg, 127);
    mh.addConnection(leipzig, frankfurt, 391);
    mh.addConnection(leipzig, koeln, 505);
    mh.addConnection(berlin, rostock, 234);
    mh.addConnection(berlin, braunschweig, 235);
    mh.addConnection(berlin, potsdam, 35);
    mh.addConnection(magdeburg, braunschweig, 99);
    mh.addConnection(magdeburg, rostock, 298);
    mh.addConnection(braunschweig, hamburg, 185);
    mh.addConnection(braunschweig, augsburg, 588);
    mh.addConnection(braunschweig, koeln, 363);
    mh.addConnection(rostock, hamburg, 184);
    mh.addConnection(rostock, kiel, 202);
    mh.addConnection(hamburg, bremen, 126);
    mh.addConnection(hamburg, kiel, 88);
    mh.addConnection(hamburg, potsdam, 288);
    mh.addConnection(bremen, frankfurt, 442);
    mh.addConnection(bremen, koeln, 321);
    mh.addConnection(bremen, augsburg, 722);
    mh.addConnection(bremen, kiel, 207);
    mh.addConnection(muenchen, augsburg, 80);
    mh.addConnection(augsburg, stuttgart, 164);
    mh.addConnection(stuttgart, frankfurt, 210);
    mh.addConnection(frankfurt, bonn, 173);
    mh.addConnection(bonn, koeln, 34);

    /* analyse nodes (do this after adding all nodes and the mesh connections */
    mh.analyseNodes(svgWidth, svgHeight, svgBorder);

    var startNode  = muenchen;
    var targetNode = rostock;

    mh.addSelectOptions(selectStartNodeId, startNode,   function () { searchAlgorithm.calculateTreeAndRedraw(); });
    mh.addSelectOptions(selectTargetNodeId, targetNode, function () { searchAlgorithm.calculateTreeAndRedraw(); });

    searchAlgorithm.calculateTreeAndRedraw(true);
};

document.addEventListener('DOMContentLoaded', onloadFunction, false);
