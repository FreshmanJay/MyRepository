/**
 * Created by Jay-wang on 2018/6/4.
 */
/*1.选取元素*/
//jQuery
var els = $('.el');

//native
var els = document.querySelectorAll('.els')

//shortHand
var $ = function (el) {
    return document.querySelectorAll(el);
}

// querySelectorAll方法返回的是NodeList对象，需转化为数组
myList = Array.prototype.slice.call(myList);

/*2.创建元素*/

//jQuery
var newEl = $('<div/>');

//native
var newEl = document.createElement('div');

/*3.添加事件*/

//jQuery
$('.el').on('event', function () {

});

//native
[].forEach.call(document.querySelectorAll('.el'),function () {
    el.addEventListener('event', function () {

    },false);
})

/*4.get/set属性*/

//jQuery
$('.el').filter(':first').attr('key', 'value');
$('.el').filter(':first').attr('key');

//native
document.querySelector('.el').setAttribute('key','value');
document.querySelector('.el').getAttribute('key');

/*5.添加和移除样式的class*/
//jQuery
$('.el').addClass('class');
$('.el').removeClass('class');
$('.el').toggleClass('class');

//native
document.querySelector('.el').classList.add('class');
document.querySelector('.el').classList.remove('class');
document.querySelector('.el').classList.toggle('class');

/*6.追加元素*/
/*头部追加元素*/
//jQuery
$('.el').appendChild($('<div/>'));

//native
document.querySelector('.el').appendChild(document.createElement('div'));

/*尾部追加元素*/
//jQuery
$('.el').prepend('<div></div>');

//native
var parent = document.querySelector('.el');
parent.insertBefore('<div></div>',parent.childNodes[0]);

/*7.克隆元素*/

//jQuery
var cloneEl = $('.el').clone();

//native
var cloneEL = document.querySelector('.el').cloneNode(true);

/*8.移除元素*/
//jQuery
$('.el').remove();

//native

remove('.el');

function remove(el) {
    var toRemove = document.querySelector(el);
    toRemove.parentNode.removeChild(toRemove);
}

/*9.获取父级元素*/
//jQuery
$('.el').parent();

//native
document.querySelector('.el').parentNode;

/*10.获取上一个/下一个元素*/
//jQuery
$('.el').prev();
$('.el').next();

//native
document.querySelector('.el').previousElementSibling;
document.querySelector('.el').nextElementSibling;

11.XHR and AJAX
//jQuery
$.get('url', function (data) {
    
})
$.post('url', { data: data }, function (data) {

})

//native

//get
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = function (data) {

}
xhr.send();

//post
var xhr = new XMLHttpRequest();

xhr.open('POST', url);
xhr.onreadystatechange = function (data) {

}
xhr.send({data: data});

/*12.清空子元素*/
//jQuery
$('#elementID').empty()

//native
var element = document.getElementById('elementID');
while(element.firstChild) element.removeChild(element.firstChild);

/*13.检查是否有子元素*/
//jQuery
if (!$('#elementID').is(":empty")){}

//native
if (document.getElementById('elementID').hasChildNodes()){}

/*14.$(document).ready*/
document.addEventListener('DOMContentLoaded', function () {

})

/*15.数据储存*/
$('body').data("foo", 52);

element.dataset.user = JSON(user);
element.dataset.score = score;

/*16.动画*/
//jQuery
$foo.animate('slow', { x: '+=10px'});

//native
foo.classList.add('animate');

el.addEventListener("webkitTransitionEnd", transitionEnded);
el.addEventListener("transitionend", transitionEnded);

