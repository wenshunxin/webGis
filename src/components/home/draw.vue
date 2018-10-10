<template lang="html">
    <div class="">
        <div id="map"></div>
    </div>
</template>

<script>
import 'ol/ol.css'
import {Map, View,Attribution,control} from 'ol';
import {transform, toLonLat,fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import {LineString, Point, Polygon} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {XYZ, Vector as VectorSource} from 'ol/source';
// import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw';
import {Icon, Style,Stroke,Circle,Fill,Text} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
import {defaults as defaultControls, FullScreen,ScaleLine,Navigation,MousePosition} from 'ol/control';
import Draw,{ createRegularPolygon, createBox } from 'ol/interaction/Draw';
export default {
    data(){
        return{
            map:"",
            draw:"",
            source:new VectorSource({wrapX: false})
        }
    },
    mounted(){
        this.mapinit();
    },
    methods:{
        mapinit(){
            this.map = new Map({
                controls: defaultControls().extend([
                  new FullScreen()
                ]),
                layers: [
                    new TileLayer({
                        source: new XYZ({
                              url: "http://www.google.cn/maps/vt?lyrs=t@189&gl=cn&x={x}&y={y}&z={z}"
                        })
                    }),
                    new TileLayer({
                        source: new XYZ({
                              url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                        })
                    }),
                    new VectorLayer({
                        source: this.source,
                        style: new Style({
                            fill: new Fill({
                                color: 'rgba(255, 255, 255, .9)'
                            }),
                            stroke: new Stroke({
                                color: 'red',
                                width: 2
                            }),
                            image: new Icon({
                               imgSize: [30, 40],    // 及图标大小
                               src: 'https://saasapi.dituhui.com/saas/baseData/point/getPointStylePic?blur=6-s'
                           }),
                           text:new Text({
                               textAlign: "center",
                               text: "文字描述",
                               fill: new Fill({color: "red"}),
                               offsetY: 10,
                           })
                        })
                    })
                ],
                target: 'map',
                view: new View({
                    center : [116.4072154982,39.9047253699],
                    zoom: 9,
                    projection:"EPSG:4326"
                })
            });
            // this.map.addControl(new ScaleLine());
            this.map.removeLayer(this.map.getLayers().arrary_)
            // this.map.addControl(new MousePosition());//鼠标导航，包括平移放大缩小，触摸事件等
            this.handleDraw();
            console.log(this.map.getLayers())
        },
        // 框选
        handleDraw(){
            this.draw = new Draw({
                source:this.source,
                type: "Circle",
                geometryFunction: new createBox()
            });
            this.map.addInteraction(this.draw);
            this.draw.on("drawend",(evt)=>{
                this.map.removeInteraction(this.draw);
                console.log(evt)
            })
        }
    }
}
</script>

<style lang="css">
</style>
