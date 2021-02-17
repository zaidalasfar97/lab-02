'use strict';
let arrObj = [];
let titleArr = [];
let firstMain = document.getElementById('firstMain');
let selectKeyword = document.getElementById('selectKeyword');
$(function () {
    // Image constructor
    function Image(value) {
        this.image_url = value.image_url;
        this.keyword = value.keyword;
        this.title = value.title;
        this.description = value.description;
        arrObj.push(this);
    }
    page_1(); // default page ................................
    // button 1 (page 1) .......................................
    $('#page1').click(() => { // firstPage click
        $('#page2').removeClass('choose');
        $('#page1').addClass('choose');
        page_1();
    });
    // button 2 (page 2) .............................................
    $('#page2').click(() => {
        $('#page1').removeClass('choose');
        $('#page2').addClass('choose');
        firstMain.textContent = '';
        selectKeyword.textContent = '';
        arrObj = [];
        titleArr = [];
        $.ajax('./data/page-2.json').then(data => {
            data.forEach((item) => {
                let newImage = new Image(item);
                let renderedObj = newImage.render();
                $('#firstMain').append(renderedObj);
            });
        });
        let newArray = [];
        Image.prototype.render = function () {
            if (!(newArray.includes(this.keyword))) {
                newArray.push(this.keyword);
                $('#selectKeyword').append(`
              <option>${this.keyword}</option>
          `);
            }
            let template = $('#template-img').html();
            // use Mustache to render new html by merging the template with the object
            let newObj = Mustache.render(template, this);
            return newObj;
        };
        // display Img depend on keyword
        $('#selectKeyword').on('change', function (event) {
            $('div').hide();
            let selectValue = event.target.value;
            arrObj.forEach((item) => {
                if (item.keyword === selectValue) {
                    let newI = new Image(item);
                    let renderedObj = newI.render();
                    $('#firstMain').append(renderedObj);
                    arrObj.pop(item);
                }
            });
        });
    });
    // sort part ......................................................................
    $('#sortElemnt').on('change', function (event) {
        if ($('#page1').hasClass('choose')) { // if the page2 display
            $('div').hide();
            let selectValue = event.target.value;
            if (selectValue === 'title') {
                $.ajax('./data/page-1.json').then(data => {
                    data.sort((a, b) => {
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {
                            console.log(a.title.toUpperCase());
                            return -1;
                        }
                        else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                            console.log(a.title.toUpperCase());
                            return 1;
                        }
                        else return 0;
                    });
                    data.forEach((item) => {
                        let newImage = new Image(item);
                        let renderedObj = newImage.render();
                        $('#firstMain').append(renderedObj);
                        arrObj.pop(item);
                    });
                });
            } else if (selectValue === 'Horns') {
                $.ajax('./data/page-1.json').then(data => {
                    data.sort((a, b) => {
                        if (a.horns < b.horns) {
                            console.log(a.horns);
                            return -1;
                        }
                        else if (a.horns > b.horns) {
                            return 1;
                        }
                        else return 0;
                    });
                    data.forEach((item) => {
                        let newImage = new Image(item);
                        let renderedObj = newImage.render();
                        $('#firstMain').append(renderedObj);
                        arrObj.pop(item);
                    });
                });
            }
        } else if ($('#page2').hasClass('choose')) { // if the page2 display
            $('div').hide();
            let selectValue = event.target.value;
            if (selectValue === 'title') {
                $.ajax('./data/page-2.json').then(data => {
                    data.sort((a, b) => {
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {
                            console.log(a.title.toUpperCase());
                            return -1;
                        }
                        else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                            console.log(a.title.toUpperCase());
                            return 1;
                        }
                        else return 0;
                    });
                    data.forEach((item) => {
                        let newImage = new Image(item);
                        let renderedObj = newImage.render();
                        $('#firstMain').append(renderedObj);
                        arrObj.pop(item);
                    });
                });
            } else if (selectValue === 'Horns') {
                $.ajax('./data/page-2.json').then(data => {
                    data.sort((a, b) => {
                        if (a.horns < b.horns) {
                            console.log(a.horns);
                            return -1;
                        }
                        else if (a.horns > b.horns) {
                            return 1;
                        }
                        else return 0;
                    });
                    data.forEach((item) => {
                        let newImage = new Image(item);
                        let renderedObj = newImage.render();
                        $('#firstMain').append(renderedObj);
                        arrObj.pop(item);
                    });
                });
            }
        } else { // if default page display
            $('div').hide();
            let selectValue = event.target.value;
            if (selectValue === 'title') {
                $.ajax('./data/page-1.json').then(data => {
                    data.sort((a, b) => {
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {
                            console.log(a.title.toUpperCase());
                            return -1;
                        }
                        else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                            console.log(a.title.toUpperCase());
                            return 1;
                        }
                        else return 0;
                    });
                    data.forEach((item) => {
                        let newImage = new Image(item);
                        let renderedObj = newImage.render();
                        $('#firstMain').append(renderedObj);
                        arrObj.pop(item);
                    });
                });
            } else if (selectValue === 'Horns') {
                $.ajax('./data/page-1.json').then(data => {
                    data.sort((a, b) => {
                        if (a.horns < b.horns) {
                            console.log(a.horns);
                            return -1;
                        }
                        else if (a.horns > b.horns) {
                            return 1;
                        }
                        else return 0;
                    });
                    data.forEach((item) => {
                        let newImage = new Image(item);
                        let renderedObj = newImage.render();
                        $('#firstMain').append(renderedObj);
                        arrObj.pop(item);
                    });
                });
            }
        }
    });
    function page_1() { // page1 .........................................
        firstMain.textContent = '';
        selectKeyword.textContent = '';
        arrObj = [];
        titleArr = [];
        titleArr.sort((a, b) => {
            if (a.toUpperCase() < b.toUpperCase()) {
                return 1;
            }
            else if (a.toUpperCase() > b.toUpperCase()) return -1;
            else return 0;
        });
        $.ajax('./data/page-1.json').then(data => {
            data.forEach((item) => {
                let newImage = new Image(item);
                let renderedObj = newImage.render();
                $('#firstMain').append(renderedObj);
            });
        });
        let newArray = [];
        Image.prototype.render = function () {
            if (!(newArray.includes(this.keyword))) {
                newArray.push(this.keyword);
                $('#selectKeyword').append(`
            <option>${this.keyword}</option>
        `);
            }
            let template = $('#template-img').html();
            // use Mustache to render new html by merging the template with the object
            let newObj = Mustache.render(template, this);
            return newObj;
        };
        $('#selectKeyword').on('change', function (event) {
            $('div').hide();
            let selectValue = event.target.value;
            let arr0 = [];
            arrObj.forEach((item) => {
                arr0.push(item);
                if (item.keyword === selectValue) {
                    let newI = new Image(item);
                    let renderedObj = newI.render();
                    $('#firstMain').append(renderedObj);
                    arrObj.pop(item);
                }
            });
        });
    }
});