'use strict';
let mainObj = document.getElementById('firstMain');
let arrObj = [];
$(function () {
    function Image(value) {
        this.image_url = value.image_url;
        this.keyword = value.keyword;
        this.title = value.title;
        this.description = value.description;
        arrObj.push(this);
    }
    $.ajax('./data/page-1.json').then(data => {
        // console.log(data);
        data.forEach((item) => {
            let newImage = new Image(item);
            newImage.render();
        });
    });
    let newArray = [];
    Image.prototype.render = function () {
        if (!(newArray.includes(this.keyword))) {
            newArray.push(this.keyword);
            $('select').append(`
            <option>${this.keyword}</option>
        `);
        }
        let imageCopy = $('.photo-class').clone();
        imageCopy.removeClass('photo-class');
        imageCopy.find('h2').text(this.title);
        imageCopy.find('img').attr('src', this.image_url);
        imageCopy.find('p').text(this.description);
        $('main').append(imageCopy);
    };
    $('select').on('change', function (event) {
        $('div').hide();
        $('#firstMain').html('<div class="photo-class" id="photo-template"><h2></h2><img src="" alt=""><p></p></div>');
        let selectValue = event.target.value;
        $.ajax('./data/page-1.json').then(data => {
            data.forEach((item) => {
                if (item.keyword === selectValue) {
                    console.log(item);
                    let newI = new Image(item);
                    newI.render();
                }
            });
        });
    });
});