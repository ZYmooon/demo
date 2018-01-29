var btn = document.querySelector('#btn-modal');
    modal = document.querySelector('#modal-1');
    modalCt = document.querySelector('#modal-1 .modal-ct');
    close = document.querySelector('#modal-1 .close');

btn.addEventListener('click', function(){
    modal.classList.add('open')
});
close.addEventListener('click', function(){
    modal.classList.remove('open')
});

modal.addEventListener('click', function(){
    modal.classList.remove('open')
});

modalCt.addEventListener('click', function(e){
    e.stopPropagation()
});