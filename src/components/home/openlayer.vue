<template lang="html">
    <div class="wrap">
        <div  id="map"></div>
        <el-button @click="handleShowHide">显示/隐藏</el-button>
        <Select :searchList="options" @selectFunc="getChangeSelect" :style="style"></Select>
    </div>

</template>

<script>
import Select from "../components/select";

// import Bus from "@/assets/js/Bus.js";
import 'ol/ol.css'
import {Map, View,Attribution} from 'ol';
import {transform, toLonLat,fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import {LineString, Point, Polygon} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {XYZ, Vector as VectorSource} from 'ol/source';
import {Draw ,createRegularPolygon,defaults as defaultInteractions, Modify, Sselect,DragBox}from 'ol/interaction';
import {Icon, Style,Stroke,Circle,Fill,Text} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
import {defaults as defaultControls, FullScreen} from 'ol/control';
// import Select from 'ol/interaction/Select.js';
import {platformModifierKeyOnly} from 'ol/events/condition';
export default {
    data(){
        return {
            isLayer:true,
            layer:"",
            dragBox:"",
            map:"",
            draw:"",
            source :new VectorSource({wrapX: false}),
            options: [{
              value: 'Point',
              label: '点'
            }, {
              value: 'LineString',
              label: '线'
            }, {
              value: 'Polygon',
              label: '多边形'
            }, {
              value: 'Circle',
              label: '圆'
            }],
          coordinates:[
                {
                    id:2,
                    array:[[115.86064567398125,40.1299450964625],[116.00829840896836,40.1299450964625]]
                },
                {
                    id:1,
                    array:[[117.39680614984, 40.233089086201], [117.3600565732, 40.242113456225], [117.34874458404, 40.250260274602],
                         [117.34302344712, 40.283707567814], [117.30241786584, 40.284010303013], [117.30089945595, 40.298823482743],
                         [117.29495791414, 40.307241631948], [117.28090327938, 40.31483263219], [117.27787165052, 40.331469477361],
                         [117.28158063671, 40.338247525913], [117.26875571365, 40.343837920124], [117.24821332321, 40.376802733207],
                         [117.23311626435, 40.375365915021], [117.23011329982, 40.381697774551], [117.22184575331, 40.383995827578],
                         [117.21027968492, 40.379304161599], [117.18913489167, 40.383847635371], [117.16955596667, 40.377573094897],
                         [117.16201098872, 40.379609944384], [117.15156389182, 40.374358469115], [117.1461431628, 40.367421131629],
                         [117.12300485064, 40.359558075585], [117.11864440401, 40.358974561797], [117.11380102691, 40.364149005012],
                         [117.10453631204, 40.365747471036], [117.07808699163, 40.347405333082], [117.06520517495, 40.342543682533],
                         [117.05951109694, 40.349081054111], [117.04244565157, 40.35250818155], [117.0250699279, 40.340493098635],
                         [117.02117101934, 40.333168625588], [117.01588753438, 40.331656255311], [117.01173132175, 40.32337571318],
                         [117.01591420209, 40.312498282132], [117.00799784424, 40.305823430052], [117.00636157925, 40.296778788538],
                         [116.9970503394, 40.296137984976], [116.99575758984, 40.292616557636], [116.97796493669, 40.288167135931],
                         [116.97696786259, 40.282481020224], [116.97075825127, 40.28108093448], [116.95848391237, 40.267707809995],
                         [116.95715258101, 40.263327709699], [116.98168044494, 40.25377572019], [116.96338018644, 40.238052279683],
                         [116.95795687613, 40.242937187356], [116.94329751003, 40.238005833847], [116.93175719996, 40.233136537486],
                         [116.92430219371, 40.224967956262], [116.93485016275, 40.210980369693], [116.94526901764, 40.19855812205],
                         [116.94603449564, 40.19354561168], [116.94951752277, 40.188098708124], [116.95882736017, 40.177581436424],
                         [116.97897749255, 40.176575285822], [116.97881329629, 40.154560252512], [116.97587001134, 40.146838503303],
                         [116.98371154588, 40.133455992809], [116.97593603278, 40.124828346814], [116.98315680573, 40.100140533332],
                         [116.97155622343, 40.086210562194], [116.99084261053, 40.081393909686], [116.98663839805, 40.06927009966],
                         [116.96955722573, 40.068076860016], [116.96884211824, 40.057480462171], [116.97636631342, 40.054371684127],
                         [116.9795686888, 40.047516077888], [116.98518115869, 40.044388313572], [116.99304702223, 40.045029326691],
                         [117.00085160401, 40.042331508548], [117.00745407085, 40.038313328591], [117.03161208113, 40.040467631252],
                         [117.04575150493, 40.055833869462], [117.06992028353, 40.067915618111], [117.08846730729, 40.070826442849],
                         [117.09595404341, 40.076218017715], [117.11977736834, 40.07863161916], [117.1425959885, 40.070345862074],
                         [117.16234951106, 40.075084806785], [117.16799658016, 40.082010788788], [117.18330740326, 40.078432633031],
                         [117.19158959317, 40.091180779552], [117.21946331827, 40.102793872514], [117.23085386426, 40.100744473507],
                         [117.2308084102, 40.104832177913], [117.2565631512, 40.125816298924], [117.26463610295, 40.118734529522],
                         [117.2720390385, 40.117442160668], [117.28248965384, 40.119346336362], [117.29631227787, 40.128663778615],
                         [117.30298578394, 40.127129306082], [117.31838231488, 40.145192295628], [117.35175120566, 40.14858516025],
                         [117.3647252165, 40.166701558473], [117.36002676882, 40.179323942797], [117.37183376251, 40.184576516774],
                         [117.39959624353, 40.184618207342], [117.41343867583, 40.191765541398], [117.41039919172, 40.194936098147],
                         [117.39584874998, 40.193328689781], [117.3867886771, 40.198351231932], [117.38715826407, 40.205987067737],
                         [117.39482310976, 40.20909112999], [117.39525305779, 40.212222926017], [117.38556017544, 40.214479099127],
                         [117.38481402713, 40.223681632946], [117.3994912696, 40.227137227499], [117.39680614984, 40.233089086201]]
                }
            ],
          select:"",
          modify:""
        }
    },
    components: {
        Select
    },
    computed:{
        style(){
            return {
                position:"absolute",
                top:"30px",
                right:"30px",
                url:"http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}"
            }
        }
    },
    mounted(){
        this.mapInit();
    },
    methods:{
        mapInit(){
            let that = this;
            this.getplygon();
            this.getpoint();
            this.getline();
            // 卫星图
            // http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}
            // 高德地图
            //http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}
            //谷歌地图
            //http://ditu.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0
            this.map = new Map({
                controls: defaultControls().extend([
                  new FullScreen()
                ]),
                layers: [
                    new TileLayer({
                        source: new XYZ({
                              url: "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}",
                              layers: 'basic',
                              isBaseLayer: true,
                        }),
                        // visible: false,
                    }),
                    new TileLayer({
                        source: new XYZ({
                              url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}",

                        }),
                         visible: false,
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
                               // textBaseline: baseline,
                               // font: ,
                               text: "文字描述",
                               fill: new Fill({color: "red"}),
                               // stroke: new Stroke({color: outlineColor, width: outlineWidth}),
                               // offsetX: offsetX,
                               offsetY: 10,
                               // placement: placement,
                               // maxAngle: maxAngle,
                               // overflow: overflow,
                               // rotation: rotation
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
            let _this = this;
            // _this.map.on("click",function(e){
            //     console.log(e)
            // });
            // this.layer = this.map.getLayers().array_[1];

            // this.map.getView().on("change:resolution",function(e){
            //     // console.log(_this.map.getView().getZoom());
            // });
                _this.select = new Sselect();
                _this.map.addInteraction(_this.select);
                _this.modify = new Modify({
                   features: _this.select.getFeatures()
                });
               _this.map.addInteraction(_this.modify);
               _this.select.setActive(true);//激活选择要素控件
               _this.modify.setActive(true);//激活修改要素控件
               _this.modify.on("modifyend",(evt)=>{
                   console.log(evt)
               })
               _this.select.on("select",(evt)=>{
                   // console.log(_this.select.getFeatures())
                   // console.log(evt.target.getFeatures());
                   // console.log(evt.target.getFeatures().getLength())
               })
            // })
            var selectedFeatures = _this.select.getFeatures();
            // console.log(selectedFeatures)
              // a DragBox interaction used to select features by drawing boxes
            this.dragBox = new DragBox({
                condition: platformModifierKeyOnly
            });
            this.map.addInteraction(this.dragBox);
            this.dragBox.on('boxend', function() {
                console.log(_this.dragBox)
                var extent = _this.dragBox.getGeometry().getExtent();
                _this.source.forEachFeatureIntersectingExtent(extent, function(feature) {
                  selectedFeatures.push(feature);
                });
            });
            this.dragBox.on('boxstart', function() {
                selectedFeatures.clear();
            });

              // clear selection when drawing a new box and when clicking on the map
              // dragBox.on('boxstart', function() {
              //   selectedFeatures.clear();
              // });

            //  this.map.removeLayer(this.map.getLayers().array_[1])

            // this.map.getView().on("change:resolution",function(e){
            //     if(parseInt(this.map.getView().getZoom())<=4){
            //         alert("是否还需要显示");
            //         this.layer.setVisible( false);
            //     }else{
            //         this.layer.setVisible(true);
            //     }
            // }.bind(this));


        },
        getplygon(){
            for(var j=0;j<this.coordinates.length;j++){
                console.log(this.coordinates[j])
                var coordinatesPolygon = new Array();
                    //循环遍历将经纬度转到"EPSG:4326"投影坐标系下
                for (var i = 0; i < this.coordinates[j].array.length; i++) {
                    var pointTransform = fromLonLat([this.coordinates[j].array[i][0], this.coordinates[j].array[i][1]], "EPSG:4326");
                    coordinatesPolygon.push(pointTransform);
                }
                // console.log(coordinatesPolygon)
                //多边形此处注意一定要是[坐标数组]
                var plygon = new Polygon([coordinatesPolygon])
                //多边形要素类
                var feature =new Feature({
                    geometry: plygon,
                    name:"面要素",
                    id:this.coordinates[j].id
                });
                this.source.addFeature(feature);
            }

        },
        getpoint(){
            let pointArray = [
                {
                    id:1,
                    name:"网点1",
                    point:[116.4072154982,39.9047253699]
                },
                {
                    id:2,
                    name:"网点2",
                    point:[116.4072154982,39.4049253699]
                }
            ];
            for(let i =0;i<pointArray.length;i++){
                var poit = new Point(pointArray[i].point)
                //多边形要素类
                var feature =new Feature({
                    geometry: poit,
                    name:"点要素",
                    id:pointArray[i].id
                });

                feature.setStyle(new Style({
                    image: new Icon({
                       imgSize: [30, 40],    // 及图标大小
                       src: 'https://saasapi.dituhui.com/saas/baseData/point/getPointStylePic?blur=6-s'
                    }),
                    text:new Text({
                        textAlign: "center",
                        // textBaseline: baseline,
                        // font: ,
                        text: pointArray[i].name,
                        fill: new Fill({color: "red"}),
                        // stroke: new Stroke({color: outlineColor, width: outlineWidth}),
                        // offsetX: offsetX,
                        offsetY: 10,
                    })
                 }));
                this.source.addFeature(feature);
            }
        },

        getline(){
            // var LineString = new LineString([[116.4072154982,39.9047253699],[117.4072154982,39.2047253699]])
            // 多边形要素类
            var feature =new Feature({
                geometry: new LineString([[116.4072154982,39.9047253699],[117.4072154982,39.2047253699]]),
                name:"线要素"
            });
            this.source.addFeature(feature);
        },
        mapClick(type){
            this.draw = new Draw({
                source: this.source,
                type: type,
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    //划线的时候的图样
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    // image: new Circle({
                    //     radius: 5,
                    //     stroke: new Stroke({
                    //         color: 'rgba(0, 0, 0, 0.7)'
                    //     }),
                    //     fill: new Fill({
                    //         color: 'rgba(255, 255, 255, 0.2)'
                    //     })
                    // }),
                   //  image: new Icon({
                   //     imgSize: [30, 40],    // 及图标大小
                   //     src: 'https://saasapi.dituhui.com/saas/baseData/point/getPointStylePic?blur=6-s'
                   // }),
                })
            });
            this.map.addInteraction(this.draw);
        },
        getChangeSelect(value){
            this.map.removeInteraction(this.draw)
            // console.log(value)
            this.mapClick(value)
        },
        handleShowHide(){
            // this.isLayer = !this.isLayer;
            this.layer.setVisible( this.isLayer = !this.isLayer);
        }
    }
}
</script>

<style lang="css">
    #map{
        width:100%;
        height:100%;
    }
    .wrap{
        position:relative;
        height: 100%;
    }
    .olControlLoadingPanel
        {
                background-color: Transparent;
                position: relative;
                width: 66px;
                height: 66px;
                top: 50%;
                left: 50%;
                background-position: center;
                background-repeat: no-repeat;
                display: inline;
        }
</style>
