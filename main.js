

//  Удаление рекламы хостинга (*можно удалить)
$('[rel="nofollow"]').parent().hide();
$('.cbalink').hide();



// Прелоадер
window.onload=function(){    
  //  Удаление рекламы хостинга (*можно удалить)
  
  
  $('[rel="nofollow"]').parent().hide();
  $('.cbalink').hide();
}



// Значения для таймеров в миллисекундах 
const label_bt  = window.location + '___bt'; // ключ по которому бдет хранится значение времени в localStorage
const begintimer = 64900;  //Начальное значение таймера (часы) в миллесекундах
const START_TIMER_COUNTER = 200; // 0.2 секунды Начальное значение интервала для счетчика (счетчик убывает со случайным интервалом между начальным значение и конечным)
const END_TIMER_COUNTER = 1600; // 1.6 секунды Конечное значение интервала для счетчика (счетчик убывает со случайным интервалом между начальным значение и конечным)
const START_TIMER_COMMENTS = 3000; // 3 секунды Начальное значение интервала для добавления комментов (комменты добавляются со случайным интервалом между начальным значение и конечным)
const END_TIMER_COMMENTS = 25000; // 25 секунд Конечное значение интервала для добавления комментов (комменты добавляются со случайным интервалом между начальным значение и конечным)
const DELAY_ADD_COMMENTS = 5000; // 5 секунд Задержка перед добавлением первого комментария
const INTERVAL_CAROUSEL = 2000; // 2 секунды Интервал перелистывания изображений
const FADE_DURATION_MODAL = 200; // 0.2 секунды Длительность затухания модального окна (poopup)
const INTERVAL_UPDATE_TIME_COMMETS = 5000;
const COUNT = 472; //Начальное общее количество 
var count = COUNT;
var initCount = COUNT;
var diffRem = -2; //Начальное значение смещения шкалы (необходжимо для быстрого уменьшения вначале и замедления в конце) 




function postChanged() {
    const text = $('#post_field').text();
    if (text) {
        $('.ph_content').text('')
    } else {
        $('.ph_content').text('Ваш комментарий...')
    }
}

var num_comments = 0;

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}


function addComment(params) {   
    params.timer = Date.now();

    params.text = TEXTS[(TEXTS.length -1) - num_comments] || DEFAULT_TEXT;
    
    
    var str='<div id="post164090831_34" class="_post post wcomments_post post--with-likes" data-post-id="164090831_34" post_view_hash="b10606087de5aa8396"><div class="_post_content"><a target="_blank" class="post_image" href="'+params.link+'"><img src="'+params.avatar+'" data-post-id="164090831_34" class="post_img"></a><div class="post_content"><div class="wcomments_post_content"><div class="post_author"><a target="_blank" class="author" href="'+params.link+'" data-from-id="164090831" data-post-id="164090831_34" data-post-click-type="post_owner_link">'+params.name+'</a><span class="explain"><span class="wall_fixed_label"> запись закреплена</span></span></div><div class="post_info"><div class="wall_text"><div id="wpt164090831_34" class="wall_post_cont _wall_post_cont"><div class="wall_post_text zoom_text">'+params.text+'</div></div></div><div class="wcomments_post_footer clear_fix"><div class="post_date"><span class="rel_date rel_date_needs_update" abs_time="'+params.time+'" time="'+params.timer+'">'+params.time+'</span></div><div class="like_wrap _like_wall164090831_34  lite"><div class="like_cont "></div></div</div></div></div></div></div>';
    
    
    $('#wcomments_posts').prepend(str);

    num_comments++;
    $('#num_comments').replaceWith('<span id="num_comments">' + num_comments + '</span>');
}



var countAddedComment = 0;

function addNewComment() {
    if (countAddedComment < newComments.length) {
        newComments[countAddedComment].time = 'сейчас';
        addComment(newComments[countAddedComment]);
        countAddedComment++;
    } else {
        countAddedComment = 0;
    }
    setTimeout(addNewComment, randomInteger(START_TIMER_COMMENTS, END_TIMER_COMMENTS));
}



$(document).ready(function () {
    $("a.scrollto").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 800);
        return false;
    });
	
	 for (var i = comments.length - 1; i >= 0; i--) {
        addComment(comments[i]);
    }
    setTimeout(addNewComment, DELAY_ADD_COMMENTS);
});

$('.header__burger').click(function() {
    $('.poopup-header').toggleClass('active');
})
$('.poopup-header__close').click(function() {
    $('.poopup-header').toggleClass('active');
})


$('.cards__buy-btn').click(function () {
    $('.poopup__balance').text($(this).prev().prev().prev().text());
    $('.poopup__price').text($(this).prev().text());
    $('.poopup img').attr('src', $(this).parent().prev().children().attr('src'));
    $('.poopup__input-block form').attr('action', $(this).prev().prev().text());
    $('.poopup').toggleClass('active');
})

$('.poopup__close').click(function () {
    $('.poopup').toggleClass('active');
})
$('.poopup__dark-zone').click(function () {
    $('.poopup').toggleClass('active');
})

var countCard = 300;
if (getCookie('quantity') > 0) {
    $('.main__quantity-slide').css('left', '-' + (100 - (getCookie('quantity') * 100 / 1000)) + '%');
    $('.main__quantity-title span').text(getCookie('quantity'));
    $('.main__quantity-number:nth-child(1)').text(getCookie('quantity'));
} else {
    $('.main__quantity-slide').css('left', '-' + (100 - (countCard * 100 / 1000)) + '%');
    $('.main__quantity-title span').text(countCard);
    $('.main__quantity-number:nth-child(1)').text(countCard);
}


max = 5;
min = 1;
if (getCookie('quantity') > 0) {
    var cookieCard = getCookie('quantity');
    (function loop() {
        var rand = Math.round(Math.random() * (max - min)) + min;
        setTimeout(function () {
            cookieCard--;
            if(cookieCard < 40) {
                $('.main__quantity-number:nth-child(1)').css('color', '#000')
            } else {
                $('.main__quantity-number:nth-child(1)').css('color', '#fff')
            }
            if(cookieCard == 0) {
                cookieCard = cookieCard+100;
            }
            setCookie('quantity', cookieCard, { expires: 1800 });
            $('.main__quantity-slide').css('left', '-' + (100 - (cookieCard * 100 / 1000)) + '%');
            $('.main__quantity-title span').text(cookieCard);
            $('.main__quantity-number:nth-child(1)').text(cookieCard);
            loop();
        }, rand + '000');
    }());
} else {
    (function loop() {
        
        
        
        var rand = Math.round(Math.random() * (max - min)) + min;
        setTimeout(function () {
            countCard--;
            if(countCard < 40) {
                $('.main__quantity-number:nth-child(1)').css('color', '#000')
            } else {
                $('.main__quantity-number:nth-child(1)').css('color', '#fff')
            }
            if(countCard == 0) {
                countCard = countCard+100;
            }
            setCookie('quantity', countCard, { expires: 1800 });
            $('.main__quantity-slide').css('left', '-' + (100 - (countCard * 100 / 1000)) + '%');
            $('.main__quantity-title span').text(countCard);
            $('.main__quantity-number:nth-child(1)').text(countCard);
            loop();
        }, rand + '000');
    }());
}


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

function setCookie(name, value, props) {
    props = props || {}
    var exp = props.expires
    if (typeof exp == "number" && exp) {
        var d = new Date()
        d.setTime(d.getTime() + exp * 1000)
        exp = props.expires = d
    }
    if (exp && exp.toUTCString) { props.expires = exp.toUTCString() }
    value = encodeURIComponent(value)
    var updatedCookie = name + "=" + value
    for (var propName in props) {
        updatedCookie += "; " + propName
        var propValue = props[propName]
        if (propValue !== true) { updatedCookie += "=" + propValue }
    }
    document.cookie = updatedCookie
}

if (getCookie('timer') == null) {
var upgradeTime = 161341;
} else {
var upgradeTime = getCookie('timer');    
}
var seconds = upgradeTime;
function timer() {
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
     $('.main__offer-action-time').html('<span>'+pad(hours)+'</span>:<span>'+pad(minutes)+'</span>:<span>'+pad(remainingSeconds)+'</span>');
  if (getCookie('timer') == null) {
    seconds--;
    setCookie('timer', 161341, { expires: 1800 });
  } else {
    seconds--;
    setCookie('timer', seconds, { expires: 1800 });
  }
}
var countdownTimer = setInterval('timer()', 1000);

$(document).ready(function($){
    $('#form-sub').find('input[name="phone"]').mask('+7 (000) 000 00 00')
}) 






