    /*function random(min,max) {
 return min + Math.floor(Math.random()*(max-min))
 }
 function randomColor(){
 var dict = '0123456789abcdef';
 var str = '';
 for (var i = 0; i < 6; i++){
 str += dict[random(0,16)]
 }
 var color = str;
 return '#'+color;
 }
 console.log(randomColor(6));*/


/*var arr = [4,2,3];
 arr.shift(100);
 console.log(arr);*/

/*var arr1 = [1,2,3];
 var arr2 = [11,12,13];
 arr1.shift(100);
 arr2.splice(0,1);
 console.log(arr1);
 console.log(arr2);*/


/*
 var arr1 = [1,2,3];
 var arr2 = [11,12,13];
 arr1.unshift(100);
 arr2.splice(0,-1, 100);
 console.log(arr1);
 console.log(arr2);
 */

/*
 var arr1 = [1,2,3,100];
 var arr2 = [11,12,13,100];
 arr1.pop();
 arr2.splice(3,1);
 console.log(arr1);
 console.log(arr2);
 */

/*
 function squareArr(arr){
 arr.forEach(function(element,index,arr){
 arr[index] = element*element;
 })
 return arr;
 }
 var arr = [2, 4, 6];
 squareArr(arr);
 console.log(arr);// [4, 16, 36]
 */
function getChIntv(dateStr) {
 var targetDate = new Date(dateStr);
 var curDate = new Date();
 var offset = Math.abs(targetDate - curDate);
 var totalSeconds = Math.floor(offset / 1000);

 var second = totalSeconds % 60;
 var totalMinutes = Math.floor(offset / 1000 / 60);
 var minutes = totalMinutes % 60;
 var totalHours = Math.floor(totalMinutes / 60);
 var hours = totalHours % 24;
 var totalDays = Math.floor(totalHours / 24);
 return '生而为人' + totalDays + '天' + hours + '小时' + minutes + '分钟' + second + '秒';
}
console.log(getChIntv('2016-09-18'));