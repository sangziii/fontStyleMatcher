(function() {
  'use strict';

  var koText = "언덕 이제 지나가는 부끄러운 이웃 쓸쓸함과 당신은 불러 버리었습니다.별 아이들의 부끄러운 한 까닭입니다.<br><br>아름다운 이네들은 파란 지나고 라이너 책상을 노루, 계십니다.풀이 별 것은 이런 강아지, 내일 멀듯이, 언덕 있습니다.릴케 어머니, 쉬이 하나에 부끄러운 것은 봄이 추억과 있습니다.";
  var enText = "The fox jumped over the lazy dog, the scoundrel. <br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  var clipboard = new Clipboard('.clipboardButton');


  getAllGoogleFonts();

  changeLang.addEventListener('click', langChange);
  simulateFout.addEventListener('change', fout);
  downloadFont.addEventListener('change', download);
  useColours.addEventListener('change', colour);
  uploadFont.addEventListener('change', upload);
  uploadFontBtn.addEventListener('click', uploadBtn);
  document.addEventListener('dragover', function(event) { event.preventDefault(); });
  document.addEventListener('dragenter', dragEnter);
  document.addEventListener('dragleave', dragLeave);
  document.addEventListener('drop', drop);
  download();

  fallback.style.fontFamily = fallbackOutput.style.fontFamily = fallbackName.value;
  webfont.style.fontFamily = webfontOutput.style.fontFamily = webfontName.value;
  fallback.style.fontSize = fallbackOutput.style.fontSize = '16px';
  webfont.style.fontSize = webfontOutput.style.fontSize = '16px';
  fallback.style.lineHeight = fallbackOutput.style.lineHeight = '1.6';
  webfont.style.lineHeight = webfontOutput.style.lineHeight = '1.6';
  updateClipboardButtons();

  fallbackName.addEventListener('input', updateFontFamily);
  webfontName.addEventListener('input', updateFontFamily);

  fallbackSize.addEventListener('input', updateFontSize);
  webfontSize.addEventListener('input', updateFontSize);

  fallbackLineHeight.addEventListener('input', updateLineHeight);
  webfontLineHeight.addEventListener('input', updateLineHeight);

  fallbackSpacing.addEventListener('input', updateFontSpacing);
  webfontSpacing.addEventListener('input', updateFontSpacing);

  fallbackWordSpacing.addEventListener('input', updateFontWordSpacing);
  webfontWordSpacing.addEventListener('input', updateFontWordSpacing);

  fallbackWeight.addEventListener('input', updateFontWeight);
  webfontWeight.addEventListener('input', updateFontWeight);

  webfontOutput.addEventListener('blur', changeText);
  webfontOutput.addEventListener('focus', clearText);


  clipboard.on('success', function(e) {
    var span = e.trigger.querySelector('span')
    span.textContent = 'Copied!';
    setTimeout(function() {
      span.textContent = 'Copy CSS to clipboard';
    }, 1000);
  });

  clipboard.on('error', function(e) {
    var span = e.trigger.querySelector('span')
    span.textContent = 'Error copying :(';
    setTimeout(function() {
      span.textContent = 'Copy CSS to clipboard';
    }, 1000);
  });

  function clearText() {
    fallbackOutput.style.height = this.offsetHeight + 'px';
    fallbackOutput.innerHTML = "";
  }

  function changeText() {
    fallbackOutput.style.height = 'auto';
    fallbackOutput.innerHTML = this.innerHTML;
  }

  function updateFontSize(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('font-size', which, value);
    updateStyle('font-size', which + 'Output', value);
    document.getElementById(which + 'SizeDisplay').textContent = value;
  }

  function updateLineHeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('line-height', which, value);
    updateStyle('line-height', which + 'Output', value);
    document.getElementById(which + 'LineHeightDisplay').textContent = value;
  }

  function updateFontSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('letter-spacing', which, value);
    updateStyle('letter-spacing', which + 'Output', value);
    document.getElementById(which + 'SpacingDisplay').textContent = value;
  }

  function updateFontWordSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('word-spacing', which, value);
    updateStyle('word-spacing', which + 'Output', value);
    document.getElementById(which + 'WordSpacingDisplay').textContent = value;
  }

  function updateFontFamily(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-family', which, value);
    updateStyle('font-family', which + 'Output', value);

    if (which === 'webfont') {
      download();
    }
  }

  function updateFontWeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-weight', which, value);
    updateStyle('font-weight', which + 'Output', value);
    document.getElementById(which + 'WeightDisplay').textContent = value;
  }

  function updateStyle(name, element, value) {
    document.getElementById(element).style[name] = value;
    updateClipboardButtons();
  }

  function updateClipboardButtons() {
    var fallbackCss = fallbackOutput.style.cssText.split('; ').join('\n');
    var webfontCss = webfontOutput.style.cssText.split('; ').join('\n');
    document
        .getElementById('fallbackClipboardButton')
        .setAttribute('data-clipboard-text', fallbackCss);
    document
        .getElementById('webfontClipboardButton')
        .setAttribute('data-clipboard-text', webfontCss);
  }

  function fout(event) {
    if (!event.target.checked) {
      clearTimeout(window.__timeout1);
      clearTimeout(window.__timeout2);
      clearTimeout(window.__timeout3);
      fallbackOutput.style.visibility = 'visible';
      webfontOutput.style.visibility = 'visible';
    } else {
      startFout();
    }
  }

  function startFout() {
    fallbackOutput.style.visibility = 'hidden';
    webfontOutput.style.visibility = 'hidden';

    window.__timeout1 = setTimeout(function() {
      fallbackOutput.style.visibility = 'visible';

      window.__timeout2 = setTimeout(function() {
        fallbackOutput.style.visibility = 'hidden';
        webfontOutput.style.visibility = 'visible';
        window.__timeout3 = setTimeout(startFout, 1000);
      }, 500);
    }, 100)
  }

  function download() {
    var shouldDownload = downloadFont.checked;

    if (!shouldDownload)
      return;

    var url = 'https://fonts.googleapis.com/css?family=' + webfontName.value.trim() +
        ':300,300i,400,400i,700,700i,900,900i';

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  function langChange(){
    fallbackOutput.innerHTML = webfontOutput.innerHTML = (this.checked) ? enText : koText;
  }

  function colour() {
    var shouldColour = useColours.checked;
    webfontOutput.style.color = shouldColour ? 'red' : 'black';
  }

  function getAllGoogleFonts() {
    var request = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDlKEelhtNrGnHkVXvEsXf1ulJ85V4PjLU';
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        var names = data.items;
        var options = '';
        for (var i = 0; i < names.length; i++) {
          options += '<option value="'+ names[i].family +'"/>';
        }
        document.getElementById('families').innerHTML = options;
      }
    };
    request.send();
  }

  var currentObjectURL = '';

  function upload() {
    var file = uploadFont.files[0];
    if (!file) return;
    processFile(file);
  }

  function processFile(file) {
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
    }

    var cssName = JSON.stringify(file.name);
    var style = document.createElement('style');

    webfontName.value = file.name;
    currentObjectURL = URL.createObjectURL(file);
    style.textContent = `
      @font-face {
        font-family: ${cssName};
        src: url(${JSON.stringify(currentObjectURL)});
      }
    `;

    document.head.appendChild(style);
    updateStyle('font-family', 'webfont', cssName);
    updateStyle('font-family', 'webfont' + 'Output', cssName);
  }

  function uploadBtn(event) {
    event.preventDefault();
    uploadFont.click();
  }

  var supportedExtensions = uploadFont.accept.split(',');
  // lol drag & drop is still horrible
  var enterCount = 0;

  function dragEnter() {
    enterCount++;
    dropAlert.style.opacity = 1;
  }

  function dragLeave() {
    enterCount--;

    if (!enterCount) {
      dropAlert.style.opacity = 0;
    }
  }

  function drop(event) {
    event.preventDefault();
    enterCount = 0;
    dropAlert.style.opacity = 0;

    var file = event.dataTransfer.files[0];
    if (!file) return;

    var fileSupported = supportedExtensions.some(function(ext) {
      return file.name.endsWith(ext);
    });

    if (!fileSupported) return;
    processFile(file);
  }
})();
