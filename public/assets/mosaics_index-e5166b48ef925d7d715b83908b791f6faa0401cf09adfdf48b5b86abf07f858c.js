$(function(){function o(o){var r=parseInt(o).toString(16);return 1==r.length?"0"+r:r}function r(r){return r=r.split(/[^\d]+/).slice(1,4),"#"+o(r[0])+o(r[1])+o(r[2])}var e=$("#APPDATA").attr("mosaic_id");autosave=function(o,a,t){t.replace(" ",""),"rgba"==t.substring(0,4)&&(t="transparent"),"rgb"==t.substring(0,3)&&(t=r(t)),$.ajax({type:"POST",url:"/mosaics/autosave",data:{mosaic_id:e,time:o,tileId:a,color:t}})},$(".centerer").droppable({drop:function(o,r){"src"!=r.draggable[0].id.substring(0,3)&&(console.log(Date.now()+": Cleared "+r.draggable[0].id+" of "+r.draggable.css("background-color")),r.draggable.css("background-color",""),autosave(Date.now(),r.draggable[0].id,"transparent"))}}),$(".mosaic table").droppable({greedy:!0}),$(".mosaic .block").draggable({helper:"clone",cursor:"move",cursorAt:{top:25,left:25},opacity:.75}).addClass("ui-widget-content").droppable({hoverClass:"glow",drop:function(o,r){"src"==r.draggable[0].id.substring(0,3)?(console.log(Date.now()+": Changed "+$(this)[0].id+" from "+$(this).css("background-color")+" to "+r.draggable.css("background-color")),$(this).css("background-color",r.draggable.css("background-color")),autosave(Date.now(),$(this)[0].id,r.draggable.css("background-color"))):(console.log(Date.now()+": Swapped "+$(this)[0].id+" and "+r.draggable[0].id+" switching "+$(this).css("background-color")+" with "+r.draggable.css("background-color")),autosave(Date.now(),$(this)[0].id,r.draggable.css("background-color")),autosave(Date.now(),r.draggable[0].id,$(this).css("background-color")),temp=$(this).css("background-color"),$(this).css("background-color",r.draggable.css("background-color")),r.draggable.css("background-color",temp))},greedy:!0,tolerance:"pointer"}),$(".selection .block").draggable({helper:"clone",cursor:"move",cursorAt:{top:25,left:25},opacity:.75}).addClass("ui-widget-content"),submit=function(){t!=-1&&(t=-1,$(".block").draggable("disable"),$("#timer").css("cursor","wait"),$("#timer").text("Submitting test..."),$("#timer-bar").progressbar("value",100),$("#timer-bar > div").css("background-color","#fb8"),hide_time=show_time=function(){},clearTimeout(timer),alert("Thanks for submitting your survey. The test is now over. [DEVS: open console for output log]"),$.ajax({type:"GET",url:"/mosaics/"+e}))};var a=1800,t=a,s=Date.now();hide_time=function(){$("#timer").text("Submit"),$("#timer-bar").progressbar("value",100)},show_time=function(){$("#timer").text(Math.floor(t/60)+":"+(t%60<10?"0":"")+t%60),$("#timer-bar").progressbar("value",t/(a/100))};var i=hide_time;$("#timer-bar").progressbar(),$("#timer-bar").hover(function(){(i=show_time)()},function(){(i=hide_time)()}),timer=setTimeout(function o(){t>0?(t=a-Math.floor((Date.now()-s)/1e3),timer=setTimeout(o,1e3),i()):submit()},0)});