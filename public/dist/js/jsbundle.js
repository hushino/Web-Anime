const path=require("path"),express=require("express"),bodyParser=require("body-parser"),ejs=require("ejs").__express,app=express();require("express-helpers")(app),app.set("views","./views"),app.set("view engine","ejs"),app.engine(".ejs",ejs),app.locals.rmWhitespace=!0;const episodes=require("./routes/episodes"),series=require("./routes/series");app.use(bodyParser.json({limit:"50mb"})),app.use(bodyParser.urlencoded({extended:!1})),app.use(express.static(path.join(__dirname,"public"))),app.use("/series",series),app.use("/",episodes),app.use("/episodes",episodes),app.use("/show",episodes),app.use("/anime",series),app.use("/episodes",series),app.use(function(e,s,p){var r=new Error("404: Not Found "+e.originalUrl);r.status=404,p(r)}),module.exports=app;
let gulp=require("gulp"),cleanCSS=require("gulp-clean-css");var pump=require("pump"),htmlmin=require("gulp-htmlmin"),concat=require("gulp-concat"),uglifyes=require("uglify-es"),composer=require("gulp-uglify/composer"),minify=composer(uglifyes);gulp.task("default",()=>console.log("Nos vemos en otro viiidiiio chabalines")),gulp.task("minify-css",()=>gulp.src("public/css/*.css").pipe(cleanCSS({level:{1:{specialComments:0}}})).pipe(concat("bundle-css.css")).pipe(gulp.dest("public/dist/css"))),gulp.task("compress",()=>{pump([gulp.src(["./*.js","controllers/*.js","models/*.js","routes/*.js","helpers/*.js"]),minify(),concat("jsbundle.js"),gulp.dest("public/dist/js")])}),gulp.task("minify-html",()=>gulp.src(["views/*.ejs","views/layouts/*.ejs"]).pipe(htmlmin({collapseWhitespace:!0,collapseInlineTagWhitespace:!0,removeComments:!0,removeRedundantAttributes:!0,useShortDoctype:!0,html5:!0})).pipe(concat("bundle-html.html")).pipe(gulp.dest("public/dist/html")));
const mongoose=require("mongoose"),chalk=require("chalk"),log=console.log,error=chalk.bold.red;require("dotenv").config({path:"variables.env"}),mongoose.Promise=global.Promise;let mongodbUri=mongoose.connect("mongodb://hushino:123@ds161742.mlab.com:61742/anime",{useMongoClient:!0,poolSize:3,reconnectTries:240,reconnectInterval:900,autoReconnect:!0,noDelay:!0,loggerLevel:"error"});const db=mongoose.connection;db.on("error",console.error.bind(console,"MongoDB connection error:")),db.once("open",function(){log(chalk.hex("#FFEB3B")("Te conectaste a la base de datos sin errores 👏 "),chalk.greenBright("😁"))}),process.on("unhandledRejection",(e,o)=>{console.log("Unhandled Rejection at: Promise",o,"reason:",e)});const appp=require("./app");appp.set("port",process.env.PORT||9e3);const server=appp.listen(appp.get("port"),()=>{log(chalk.underline.hex("#DEADED")("Server is listening music on port:"),chalk.hex("#4CAF50")(`🌏  PORT → ${server.address().port} 🎶`))});
const Episode=require("../models/episodes"),Serie=require("../models/series");module.exports={index:async(e,s,i)=>{const d=await Episode.find({}).sort({createdAt:-1}).limit(9);s.render("index",{episode:d})},newEpisode:async(e,s,i)=>{const d=await Serie.findById(e.body.anime),o=e.body;delete o.anime;const a=new Episode(o);a.anime=d,await a.save(),d.episodes.push(a),await d.save(),s.json(a)},getEpisode:async(e,s,i)=>{const d=await Episode.findOne({slug:e.params.slug});if(!d)return i();s.render("show",{episode:d})},replaceEpisode:async(e,s,i)=>{const{episodeId:d}=e.params,o=e.body;await Episode.findByIdAndUpdate(d,o);s.json({success:!0})},updateEpisode:async(e,s,i)=>{const{episodeId:d}=e.params,o=e.body;await Episode.findByIdAndUpdate(d,o);s.json({success:!0})},deleteEpisode:async(e,s,i)=>{const{episodeId:d}=e.params,o=await Episode.findById(d);if(!o)return s.status(404).json({error:"Episode no existe"});const a=o.anime,n=await Serie.findById(a);await o.remove(),console.log("anime",n),n.episodes.pull(o),console.log("anime",n),await n.save(),s.json({success:!0})}};
const Serie=require("../models/series"),Episode=require("../models/episodes");module.exports={index:async(e,s,i)=>{const a=await Serie.find({}).sort({createdAt:-1}).limit(9);s.render("series",{serie:a})},newSerie:async(e,s,i)=>{const a=new Serie(e.body),r=await a.save();s.json(r)},getSerie:async(e,s,i)=>{const a=await Serie.findOne({slug:e.params.slug}).populate({path:"episodes",select:"slug -_id",options:{sort:{createdAt:-1},limit:9}});if(!a)return i();s.render("anime",{serie:a})},replaceSerie:async(e,s,i)=>{const{serieId:a}=e.params,r=e.body;await Serie.findByIdAndUpdate(a,r);s.json({success:!0})},updateSerie:async(e,s,i)=>{const{serieId:a}=e.params,r=e.body;await Serie.findByIdAndUpdate(a,r);s.json({success:!0})},getSerieEpisodes:async(e,s,i)=>{const{serieId:a}=e.params,r=await Serie.findById(a).populate("episodes");s.json(r.episodes)},newSerieEpisode:async(e,s,i)=>{const{serieId:a}=e.params,r=new Episode(e.body),d=await Serie.findById(a);r.anime=d,await r.save(),d.episodes.push(r),await d.save(),s.json(r)}};
const mongoose=require("mongoose"),Schema=mongoose.Schema,slug=require("slugs"),episodeSchema=new Schema({title:{type:String},slug:String,serieTitle:String,chapterTitle:String,chapter:Number,server:String,serverTwo:String,imageCap:String,anime:{type:Schema.Types.ObjectId,ref:"serie"}},{timestamps:{}});episodeSchema.pre("save",async function(e){if(!this.isModified("title"))return void e();this.slug=slug(this.title);const s=new RegExp(`^(${this.slug})((-[0-9]*$)?)$`,"i"),i=await this.constructor.find({slug:s});i.length&&(this.slug=`${this.slug}-${i.length+1}`),e()});const Episode=mongoose.model("episode",episodeSchema);module.exports=Episode;
const mongoose=require("mongoose"),Schema=mongoose.Schema,slug=require("slugs"),serieSchema=new Schema({title:{type:String},slug:String,cover:String,backgroundimage:String,frontimage:String,synopsis:String,estate:String,type:String,tags:[String],episodes:[{type:Schema.Types.ObjectId,ref:"episode"}]},{timestamps:{}});serieSchema.pre("save",async function(e){if(!this.isModified("title"))return void e();this.slug=slug(this.title);const t=new RegExp(`^(${this.slug})((-[0-9]*$)?)$`,"i"),s=await this.constructor.find({slug:t});s.length&&(this.slug=`${this.slug}-${s.length+1}`),e()}),serieSchema.statics.getTagsList=function(){return this.aggregate([{$unwind:"$tags"},{$group:{_id:"$tags",count:{$sum:1}}},{$sort:{count:-1}}])};const Serie=mongoose.model("serie",serieSchema);module.exports=Serie;
const router=require("express-promise-router")(),EpisodesController=require("../controllers/episodes");router.route("/").get(EpisodesController.index).post(EpisodesController.newEpisode),router.route("/:slug").get(EpisodesController.getEpisode).put(EpisodesController.replaceEpisode).patch(EpisodesController.updateEpisode).delete(EpisodesController.deleteEpisode),module.exports=router;
const express=require("express"),router=require("express-promise-router")(),SeriesController=require("../controllers/series");router.route("/").get(SeriesController.index).post(SeriesController.newSerie),router.route("/:slug").get(SeriesController.getSerie).put(SeriesController.replaceSerie).patch(SeriesController.updateSerie),router.route("/:serieId/episodes").get(SeriesController.getSerieEpisodes).post(SeriesController.newSerieEpisode),module.exports=router;
const Joi=require("joi");module.exports={validateParam:(a,e)=>(r,o,i)=>{const s=Joi.validate({param:r.params[e]},a);if(s.error)return o.status(400).json(s.error);r.value||(r.value={}),r.value.params||(r.value.params={}),r.value.params[e]=s.value.param,i()},validateBody:a=>(e,r,o)=>{const i=Joi.validate(e.body,a);if(i.error)return r.status(400).json(i.error);e.value||(e.value={}),e.value.body||(e.value.body={}),e.value.body=i.value,o()},schemas:{serieSchema:Joi.object().keys({title:Joi.string().optional(),synopsis:Joi.string().optional()}),idSchema:Joi.object().keys({param:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()})}};