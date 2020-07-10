$(document).ready(function(){
    let btn = $('#btn')
    let text_input = $('#search')

    btn.click(function(){
        $('.results').empty()
        let text_input_value = text_input.val()
        var info = $("#start-div")
        if(text_input_value !== ''){
            startConnect(text_input_value);
            info.css.display = ("none")
        }else {
            alert("REQUIRED");
        }
    })
})
$("#search").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#btn").click();
  }
});

function startConnect(str){
    let api_key = '608XWZCB7ZGW';
    let api_limit = 40;
    let api_str = str;
    let api_url = 'https://api.tenor.com/v1/search?q='+api_str+'&key='+api_key+'&limit='+api_limit;
    let http = new XMLHttpRequest();
    http.open('GET', api_url);
    http.responseType = 'json'
    http.send();
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            let api_results = http.response.results;
            let api_results_length = api_results.length
            if(api_results_length > 0){
                getDataFromAPI(api_results, api_str);
            }else {
                let errText = $(document.createElement('p'))
                errText.css("font-size", "100px");
                errText.css("color", "#3FC1C9");
                errText[0].innerHTML = 'NOT FOUND'
                errText.appendTo('.results')
            }
            
        }
    };
}

function getDataFromAPI(results, alt){
    let result_div = $('.results');
    results.forEach(function(result) {
        let result_url = result.media[0].gif.url;
        let image = $(document.createElement('img'))
        image.attr('src', result_url)
        image.attr('alt', alt)
        image.attr('class', 'image')
        image.appendTo(result_div)
        image.click(function(){
          window.open(result.media[0].gif.url)
        });
    });

}