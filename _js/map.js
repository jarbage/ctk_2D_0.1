import ctk_Terrain from './ctk_Terrain.js'

export default class Map{

    constructor(svgNode, viewboxWidth, viewboxHeight, canvasWidth, canvasHeight){
        this.svgNode = svgNode;
        //this.viewboxWidth = viewboxWidth;
        //this.viewboxHeight = viewboxHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        var polygonNodeArray = new Array();

        this.mapBuilt = this.mapBuilder(svgNode, canvasWidth, canvasHeight, polygonNodeArray);
        
    }

    mapBuilder(svgNode, canvasWidth, canvasHeight, polygonNodeArray){

        //TO-DO ||Figure out how many tiles needed to send to the tileBuilder()
        let amountofTiles = ((canvasWidth / 50) * (canvasHeight / 31.5));
        
        this.tilebuilder(svgNode, amountofTiles, canvasWidth, canvasHeight, polygonNodeArray);

    }
    

    tilebuilder(svgNode, amountofTiles, canvasWidth, canvasHeight, polygonNodeArray){

        var hexXInc = 0;
        var hexYInc = 0;
        var rowInc = 0;
        var columnInc = 0;

        var offsetBoolean = false;
        polygonNodeArray = polygonNodeArray;
        
        
        for(let i = 0; i< amountofTiles; i++){
            
            let polygonGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')

            //Create a new svg Element for each Tile in the space
            let polygonNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

            //Preliminary Setup || Adds Classes and IDs
            polygonNode.setAttributeNS(null, 'id' , 'hexTile' + i + '');
            polygonNode.setAttributeNS(null, 'class', 'hexTile');

            polygonGroup.setAttributeNS(null, 'id' , 'hexTile' + i + '');

            //Preliminary Setup || Adds Abitrary Styling
            polygonNode.setAttributeNS(null, 'fill', '#498c40');
            polygonNode.setAttributeNS(null, 'stroke', '#000');
            polygonNode.setAttributeNS(null, 'stroke-width', '2px');




            //--------------------------------------------------------------------------------//
            //-----To Alter || There is a better solution...----------------------------------//
            polygonNode.setAttributeNS(null, 'points', "0,-21.5 25,-21.5 37.5,0 25,21.5 0,21.5 -12.5,0");
            polygonNode.setAttributeNS(null, 'transform', 'translate('+ hexXInc + ' ' + hexYInc + ')');


            polygonNode.setAttributeNS(null, 'xPosition', ''+(hexXInc)+'');
            polygonNode.setAttributeNS(null, 'yPosition', ''+(hexYInc)+'');

            polygonGroup.setAttributeNS(null, 'xPosition', ''+(hexXInc)+'');
            polygonGroup.setAttributeNS(null, 'yPosition', ''+(hexYInc)+'');

            
            //----Adds Name Space for Referencing Columns and Rows Later
            polygonNode.setAttributeNS(null, 'column', ''+ columnInc +'');
            polygonNode.setAttributeNS(null, 'row', ''+ rowInc +'');

            polygonGroup.setAttributeNS(null, 'column', ''+ columnInc +'');
            polygonGroup.setAttributeNS(null, 'row', ''+ rowInc +'');

            polygonNode.setAttributeNS(null, 'tile-type', 'default');

            polygonGroup.setAttributeNS(null, 'tile-type', 'default');


            //
            if(hexXInc < canvasWidth){
                hexXInc += 75; //Width of the mid section length (25) * 3
                columnInc++;  //Column Incrementor 
            }
            if(hexXInc >= canvasWidth && offsetBoolean == false){
                columnInc = 0.5;
                rowInc += 0.5;
                hexXInc = 37.5; //--(25*0.5) + 25
                hexYInc += 21.5;//--lol idk
                offsetBoolean = true;//--
            }
            if(hexXInc >= canvasWidth && offsetBoolean == true){
                columnInc = 0;
                rowInc += 0.5;
                hexXInc = 0;
                hexYInc += 21.5;

                offsetBoolean = false;
            }
            //----End Section that Needs to be Altered--//
            //----------------------------------------------//


            this.addOnClick(polygonNode);

            polygonGroup.appendChild(polygonNode);

            polygonNodeArray[i] = polygonNode;



            //Appends them to the HTML Element
            svgNode.appendChild(polygonGroup);   
        }
        new ctk_Terrain(svgNode, polygonNodeArray);
    }
    

    addOnClick(polygonNode){
        polygonNode.addEventListener('click', function(){
            let polygonID = polygonNode.getAttributeNS(null, 'id');
            let polygonRow = polygonNode.getAttributeNS(null, 'row');
            let polygonColumn = polygonNode.getAttributeNS(null, 'column');
            
            //$('#input_register').html(`<span> ID: ${polygonID.substring(7, 12)}</span><span> | Row: ${polygonRow}</span><span> | Column: ${polygonColumn}</span>`);
            //$('.selected').toggleClass('selected');
            //$('#'+polygonID).toggleClass('selected');
        });
    }
}