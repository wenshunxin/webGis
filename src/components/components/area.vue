<template lang="html">
  <div :id="id" style="height:100%;"></div>
</template>

<script>
import Bus from "@/assets/js/Bus";
import 'ol/ol.css'
import {Map, View,Collection} from 'ol';
import Observable from 'ol/Observable';
import {transform, toLonLat,get,fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import {LineString, Point, Polygon,MultiPolygon} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer,Image} from 'ol/layer';
import {XYZ, Vector as VectorSource,ImageWMS} from 'ol/source';
import {Select,Modify}from 'ol/interaction';
import Draw, { createRegularPolygon, createBox } from 'ol/interaction/Draw';
import {Icon, Style,Stroke,Circle,Fill,Text} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import {click, pointerMove, altKeyOnly,shiftKeyOnly,singleClick} from 'ol/events/condition';
import {defaults as defaultControls, FullScreen,ZoomSlider} from 'ol/control';
export default {
  props: {
    id: String
  },
  data(){
      return {
          map:""
      }
  },
  mounted(){
    this.mapInit();
    Bus.$on("handleClick",(data)=>{
        if(data.label){
            this.handleMapLayerShowHide(data.label)
        }else{
            this.handleDraw(data.draw)
        }
    })
  },
  methods: {
    mapInit() {
      this.map=new Map({
        layers: [
            new TileLayer({
                source: new XYZ({
                    url:'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
                }),
                label:"街道地图",
                visible: true,
            }),
            new TileLayer({
                source: new XYZ({
                    url:'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
                }),
                label:"卫星地图",
                visible: false,
            })
        ],
        target: 'map',
        view: new View({
          center : [12956550.735955793, 4852353.280339378],//116.4072154982,39.9047253699
          zoom: 10,
          projection:"EPSG:3857",//3857
          maxZoom: 18,
          minZoom: 4
        })
      });
    },

    // 图层显示隐藏
    handleMapLayerShowHide(label){
        this.map.getLayers().array_.forEach(item=>{
            if(item.values_.label == label){
                item.setVisible(true);
            }else{
                item.setVisible(false);
            }
        })
    },
    // 绘画 点线面
    handleDraw(drawOptions){
        var features = new Collection();
        var featureOverlay = new VectorLayer({
            source: new VectorSource({
                features: features,
                wrapX: false
            }),
            style: new Style({
                fill: new Fill({
                    color: drawOptions.fillColor,
                }),
                stroke: new Stroke({
                    color: drawOptions.strokeColor,
                    width:2,
                    size: 4,
                    strokeDashstyle:"dashdot"
                }),
                image: new Icon({
                   imgSize: [30, 40],    // 及图标大小
                   src: 'https://saasapi.dituhui.com/saas/baseData/point/getPointStylePic?blur=6-s'
               }),
               zIndex:drawOptions.zIndex
            })
        });
            var draw,listener,output;
            var modify = new Modify({
                features: features,
                deleteCondition: function(event) {
                    return shiftKeyOnly(event) &&
                        singleClick(event);
                }
            });
            this.map.addLayer(featureOverlay);
            this.map.addInteraction(modify);
            draw = new Draw({
                features: features,
                type: drawOptions.type,
            });
            this.map.addInteraction(draw);

            draw.on('drawstart', function (evt){
                // console.log(evt)
                listener = evt.feature.getGeometry().on('change', function (evt) {
                    var geom = evt.target;

                    if (geom.getArea() > 10000) {
                        output = (Math.round(geom.getArea()/1000000*100)/100) + ' ' + 'km<sup>2</sup>';
                    } else {
                        output = (Math.round(geom.getArea()*100)/100) + ' ' + 'm<sup>2</sup>';
                    }
                    console.log(output);
                })
            })
            draw.on("drawend",(evt)=>{
                // console.log(new Observable)
                // Observable.unByKey(listener);

                this.map.removeInteraction(draw);
                this.$store.state.menuWidth ="300px";
                this.$router.push("/home/point")
            });
            modify.on("modifyend",(evt)=>{
                console.log(evt)
            })
    }
  }
}
</script>

<style lang="css">
</style>
