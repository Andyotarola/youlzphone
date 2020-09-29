setTimeout(function(){
    var productImage = document.querySelector('#product__image')

    const openPhotoSwipe = function(){
        var pswpElement = document.querySelectorAll('.pswp')[0];

        var items = [
            {
                src: productImage.src,
                w: 964,
                h: 1024
            }
        ];

        var options = {     
            history: false,
            focus: false,

            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };

        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init()
    }

    productImage.addEventListener('click', function(){
        openPhotoSwipe()
    })

},500)