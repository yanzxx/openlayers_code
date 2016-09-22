

/* Map viewer */
var map;
var selectCtrl;
var locationsLayers_ = new Array();
var locationsLayersArr_ = new Array();
var floorplanLayers_ = new Array();
var lineLayer;

var isMobile = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function initMap()
{
	var maxZOOM = 19;
	
	var vecLayer = new OpenLayers.Layer.XYZ("高德矢量", [
                "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x=${x}&y=${y}&z=${z}",
                "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x=${x}&y=${y}&z=${z}",
                "http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x=${x}&y=${y}&z=${z}",
                "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x=${x}&y=${y}&z=${z}"
            ], {
                isBaseLayer: true,
                visibility: true,
                displayInLayerSwitcher: true
            });

	var imgLayer = new OpenLayers.Layer.XYZ("高德卫星", [
                "http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}",
                "http://webst02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}",
                "http://webst03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}",
                "http://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}"
            ], {
                isBaseLayer: true,
                visibility: true,
                displayInLayerSwitcher: true
            });
	
	var wms   = new OpenLayers.Layer.WMS   ("OpenLayers WMS",  "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'});

	map = new OpenLayers.Map("map",{
                projection: "EPSG:900913",
                displayProjection: "EPSG:4326",
                units: 'm',
                layers: [vecLayer, imgLayer,wms],
                numZoomLevels:maxZOOM,
                zoom: maxZOOM
            });
	map.addControl(new OpenLayers.Control.LayerSwitcher());

	
	var x = 116.289328;
	var y = 39.825780;
	
	if (isMobile())
	{
	}
	switch (window.screen.height)
	{
	case 1024:
		y = 39.825880;
		break;
	case 1050:
		y = 39.825870;
		break;
	case 960:
		y = 39.825900;
		break;		
	case 900:
		y = 39.826000;
		break;	
	case 800:
		y = 39.826100;
	case 768:
		y = 39.826180;		
		break;	
	case 720:
		y = 39.826280;		
		break;					
	}

	switch (window.screen.width)
	{
	case 1600:
		x = 116.288870;
		break;
	case 1680:
		x = 116.288900;
		break;
	case 1366:
		x = 116.288500;
		break;	
	case 1360:
		x = 116.288490;
		break;				
	case 1280:
		x = 116.288412;
		break;	
	case 1024:
		x = 116.288000;
		break;					
	}
	
	var loc = new OpenLayers.LonLat(x,y).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    );
	map.setCenter(loc, maxZOOM);

	selectCtrl = new OpenLayers.Control.SelectFeature([], {
		clickout: false,
		onSelect: markerClicked,
		onBeforeSelect: function(feature) {
			return animating_ == 0;
		}, // prevent selecting the floorplan. to avoid unselection, patch OpenLayers.
	});

	map.addControl(selectCtrl);
	selectCtrl.activate();
	lineLayer = new OpenLayers.Layer.Vector("Camera", {
		displayInLayerSwitcher : false,
	});
	lineLayer.div.style.pointerEvents = "none";

	map.addLayer(lineLayer);

	map.events.on({
		"changelayer": function(e) {
			if(e.property == "visibility") {
				if(e.layer.mydata != undefined)
					e.layer.mydata.dataset.visible = e.layer.getVisibility();
				if(e.layer.mydata != undefined &&
					e.layer.mydata.dataset.floorplanLayer != undefined &&
					e.layer == e.layer.mydata.dataset.floorplanLayer)
				{
					e.layer.mydata.dataset.locationsLayer.setVisibility(
						e.layer.getVisibility());
				}
				moveToLocation(current_view_.dataset, current_view_.id, true);
				updateDatasetsMenu();
			}
		}
	});

}

function addFloorPlanLayer(dataset)
{
	var obscure_scaling_factor = 1.5;
	var res = dataset.map_res * obscure_scaling_factor;

	var xoffset =                    dataset.map_origin[0]/dataset.map_res;
	var yoffset = -dataset.size[1] - dataset.map_origin[1]/dataset.map_res;

	var context = {
		getUrl : function(){
			return dataset.map;
		},
		getXO : function(){
			return xoffset * res / map.getResolution();
		},
		getYO : function(){
			return yoffset * res / map.getResolution();
		},
		getW : function(){
			return dataset.size[0] * res / map.getResolution();
		},
		getH : function(){
			return dataset.size[1] * res / map.getResolution();
		},
		getR : function(){
			return dataset.map_angle;
		},
	};

	// Example for external graphic overlay:
	//   http://gis.ibbeck.de/ginfo/apps/OLExamples/OL27/examples/ExternalGraphicOverlay/ExternalGraphicOverlay.asp
	var floorplan_template = {
		externalGraphic: "${getUrl}",
		graphicXOffset : "${getXO}",
		graphicYOffset : "${getYO}",
		graphicWidth   : "${getW}",
		graphicHeight  : "${getH}",
		rotation       : "${getR}",
		pointerEvents  : "none",
	};
//自定义图层样式
	var oStyleMap = new OpenLayers.Style(floorplan_template, {context: context});

	var vectorLayer = new OpenLayers.Layer.Vector(dataset.title/*, {
		rendererOptions: { zIndexing: true }
	}*/);
	vectorLayer.styleMap = oStyleMap;
	vectorLayer.setVisibility(dataset.visible);

	map.addLayer(vectorLayer);
	floorplanLayers_[dataset.name] = vectorLayer;

	var newPoint = new OpenLayers.Geometry.Point(
		dataset.location[0], dataset.location[1]);

	var pointFeature = new OpenLayers.Feature.Vector(newPoint);
	pointFeature.geometry.bounds = new OpenLayers.Bounds(
		dataset.location[0]-1000, dataset.location[1]-1000,
		dataset.location[0]+1000, dataset.location[1]+1000);

	vectorLayer.addFeatures([pointFeature]);
	vectorLayer.setOpacity(1);
	vectorLayer.mydata = { dataset: dataset };

	dataset.mapFeature = pointFeature;
	dataset.floorplanLayer = vectorLayer;

	updateUI(dataset);
}

function addLocationsLayer(dataset)
{
	var layer_step = /* broken: dataset.layer_step ||*/ 1;
	// Create placemarks / features
	var features = new Array();
	for(var i = 0; i < dataset.info_struct.world_loc.length; i += layer_step) {
		// Create the placemark and store index and dataset for later
		feature = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point(dataset.info_struct.world_loc[i].x + WORLD_OFFSET_X,
											dataset.info_struct.world_loc[i].y + WORLD_OFFSET_Y));
		//feature.attributes.zIndex = dataset.z_index*2 + 2 /* 0 is map image (?) */;

		feature.mydata = {
			id: i,
			dataset: dataset
		};

		// Add to array with all placemarks on this layer
		features.push(feature);
	}

	// Create context for hiding locations based on zoom level
	var context = {
		getDisplay : function(feature){
			var r = map.getResolution();
			var step = Math.ceil(r*feature.mydata.dataset.res_factor);
			return feature.mydata.id % step ? "none" : "yes";
		}
	};

	var locations_template = {
		display: "${getDisplay}",
	};

	// Style definition for normal and selected placemarks
	var myStyles = new OpenLayers.StyleMap({
		"default": new OpenLayers.Style({
			pointRadius: 6,
			fillColor: dataset.color !== undefined ? dataset.color : "#5AA7D4",
			strokeColor: dataset.color_outline !== undefined ? dataset.color_outline : "#0F3750",
			strokeWidth: 2,
			graphicZIndex: 0,
			display: "${getDisplay}",
		}, { context: context } ),
		"select": new OpenLayers.Style({
			pointRadius: 10,
			fillColor: "#EE732C",
			strokeColor: "#444342",
			strokeWidth: 2,
			graphicZIndex: 1,
			display: "yes",
		})
	});

	// Create a vector layer that uses the style definition
	var vectorLayer = new OpenLayers.Layer.Vector( dataset.title, {
		styleMap: myStyles,
		rendererOptions: {zIndexing: true},
		displayInLayerSwitcher : true,
	});

	// Add placemarks to vector layer and add vector layer to map
	vectorLayer.addFeatures(features);
	vectorLayer.setVisibility(dataset.visible);

	vectorLayer.mydata = { dataset: dataset };

	// Add to map
	map.addLayer(vectorLayer);

	map.layers.sort(function(a,b) {
		if(a == b)
			return 0;
		else if(a.isBaseLayer && !b.isBaseLayer)
			return -1;
		else if(!a.isBaseLayer && b.isBaseLayer)
			return 1;
		else if(a.isBaseLayer && b.isBaseLayer)
			return 0; // workish?
			else if(a.mydata == undefined)
				return 1;
			else if(b.mydata == undefined)
				return -1;
			return a.mydata.dataset.id - b.mydata.dataset.id;
	});

	locationsLayers_[dataset.name] = vectorLayer;
	locationsLayersArr_.push(vectorLayer);

	dataset.locationsLayer = vectorLayer;
	dataset.mapViewFeatures = features;

	selectCtrl.setLayer(locationsLayersArr_);
}

function markerClicked(evt)
{
	// Move GL viewpoint
	moveToLocation(evt.mydata.dataset, evt.mydata.id, false /* don't force */);
	OpenLayers.Event.stop(evt);
}

function updateUI(dataset)
{
	document.getElementById("iXPos").value = dataset.mapFeature.geometry.x;
	document.getElementById("iYPos").value = dataset.mapFeature.geometry.y;
	document.getElementById("iAngle").value = dataset.map_angle;
	//dataset.floorplanLayer.drawFeature(dataset.mapFeature);
	dataset.floorplanLayer.redraw();
}

function posChanged()
{
	var dataset = datasets_[document.getElementById("iIndex").value];
	dataset.mapFeature.geometry.x = parseFloat(document.getElementById("iXPos").value);
	dataset.mapFeature.geometry.y = parseFloat(document.getElementById("iYPos").value);
	dataset.map_angle = parseFloat(document.getElementById("iAngle").value);
	//dataset.floorplanLayer.drawFeature(dataset.mapFeature);
	dataset.floorplanLayer.redraw();
}

function changeLon(delta)
{
	var dataset = datasets_[document.getElementById("iIndex").value];
	dataset.mapFeature.geometry.x += parseFloat(delta);
	updateUI(dataset);
}

function changeLat(delta)
{
	var dataset = datasets_[document.getElementById("iIndex").value];
	dataset.mapFeature.geometry.y += parseFloat(delta);
	updateUI(dataset);
}

function changeAng(delta)
{
	var dataset = datasets_[document.getElementById("iIndex").value];
	dataset.map_angle += parseFloat(delta);
	updateUI(dataset);
}

function drawFOV(dataset, id)
{
	var len = 10;
	var fov_2 = fov / 180 * Math.PI /2;

	var dir = lon / 180 * Math.PI;

	var dx1 = len * Math.cos(dir + fov_2);
	var dy1 = len * Math.sin(dir + fov_2);
	var dx2 = len * Math.cos(dir - fov_2);
	var dy2 = len * Math.sin(dir - fov_2);

//	var x = dataset.info_struct.world_loc[id].x + WORLD_OFFSET_X;
//	var y = dataset.info_struct.world_loc[id].y + WORLD_OFFSET_Y;
	var x = camera.position.x + WORLD_OFFSET_X;
	var y = camera.position.y + WORLD_OFFSET_Y;

	var points = new Array(
		new OpenLayers.Geometry.Point(x+dx1, y+dy1),
		new OpenLayers.Geometry.Point(x, y),
		new OpenLayers.Geometry.Point(x+dx2, y+dy2));

	var line = new OpenLayers.Geometry.LineString(points);
	var style = {
		strokeColor : '#ff2020',
		strokeOpacity : 0.8,
		strokeWidth : 5,
	};

	var lineFeature = new OpenLayers.Feature.Vector(line, null, style);

	lineLayer.removeAllFeatures();
	lineLayer.addFeatures([ lineFeature ]);
	lineLayer.setZIndex(999);   // prevents clicks to lower layers! -> div.style.pointerEvents
}
