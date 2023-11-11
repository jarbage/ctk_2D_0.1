var row, col, type, sID;

var xPosition, yPosition;

var polygonNode, polygonGroup;

export default class tower_ui{
    

    
    constructor(svgNode){
        this.svgNode = svgNode;
        buildArray(svgNode);

    }
}



function buildArray(svgNode){
    for(let i in svgNode.children){
        polygonGroup = svgNode.children[i];
        polygonNode = $(polygonGroup).innerHTML;
        console.log(polygonGroup);
        console.log(polygonNode);
        
        if($(polygonNode).attr('tile-type') == null){break;}

        polygonNode.addEventListener('click', function(){
            setSelectedClass(this);
            setSelectedTileInfo(this);
        });

    }
}

function setSelectedClass(polygonNode){
    $('#'+sID).toggleClass('selected');
    $(polygonNode).toggleClass('selected');

}

function setSelectedTileInfo(polygonNode){
    row = $(polygonNode).attr('row');
    col = $(polygonNode).attr('column');
    type = $(polygonNode).attr('tile-type');
    sID = $(polygonNode).attr('id');
    xPosition = $(polygonNode).attr('yPosition');
    yPosition = $(polygonNode).attr('xPosition');
}

function towerSelected(towerID){
    let towerNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    

    towerNode.setAttributeNS(null, 'id' , ''+sID+'+'+$(towerID).attr('id') +'');

    towerNode.setAttributeNS(null, 'x', '2.5');
    towerNode.setAttributeNS(null, 'y', '-10');

    towerNode.setAttributeNS(null, 'width', '20');
    towerNode.setAttributeNS(null, 'height', '20');

    towerNode.setAttributeNS(null, 'stroke-width', '1px');
    towerNode.setAttributeNS(null, 'stroke', '#000');
    towerNode.setAttributeNS(null, 'fill', '#fcee9e');

    towerNode.setAttributeNS(null, 'transform', 'translate('+yPosition+' '+xPosition+')');
    

    $('[row="'+row+'"][column="'+col+'"]').append(towerNode);

    setMidPoint(towerNode);

}

function setMidPoint(towerNode){
    let x = $(towerNode).attr('x');
    let y = $(towerNode).attr('y');

    console.log(xPosition);


}

$('.tower_button').on('click', function(){
    towerSelected($(this));
})



