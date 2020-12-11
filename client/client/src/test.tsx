import {MovieServices} from "./services/index"
// MovieServices.addMovie({
//     name:"我和春天又有个约会",
//     types:"[喜剧,感动]",
//     areas:"[中国香港,中国台湾]", 
//     timeLog:30, 
//     isHot:"false", 
//     isClassic:"true"
// }).then((data: any)=>{
//     console.log(data);
// });

// MovieServices.deleteMovie(611).then(data=>{
//     console.log(data.data)
// });


// MovieServices.deleteMovie(612).then(data=>{
//     console.log(data.data)
// });

// MovieServices.updataMovie(606,{name:"我和春天有两个约会",poster:"beautiful.png"}).then(data=>{
//     console.log(data.data);
// });


// MovieServices.findMovieById(606).then(data=>{
//     console.log(data.data);
// });
// MovieServices.findMovieById(612).then(data=>{
//     console.log(data.data);
// });

MovieServices.findMovieBySearch({key:"我", page:1, size:10}).then(data=>{
    console.log(data.data);
});
