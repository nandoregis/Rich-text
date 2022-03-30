window.onload = function() {
    buttons();
   
    // Função de evento de imprementação de tags
    function buttons() {
        let btn = document.querySelectorAll('.btn-edit');
        let select = document.querySelector('#tam-text');
        let modalImg = document.querySelector('.modal-get-image');
        let show = false;
        let btnSalve = document.getElementById('btnSalvarHtml');

        textField.document.designMode = 'on';

        for(let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', ()=> {
                let cmd = btn[i].getAttribute('data-cmd');

                if(cmd ==='insertImage' || cmd === 'createLink') {

                    if(cmd === 'insertImage') {
                        modalImg.style.display = 'block';

                    }else {
                        let url = prompt("Insira uma url: ","");
                        textField.document.execCommand(cmd, false, url);

                        let link = textField.document.querySelectorAll('a');
                        link.forEach(item => {
                            item.target = '__blank';
                            item.addEventListener('mouseover', ()=> {
                                textField.document.designMode = 'off';
                            });

                            item.addEventListener('mouseout', ()=> {
                                textField.document.designMode = 'on';
                            });
                        });

                    }

                }else {
                    textField.document.execCommand(cmd,false,null);
                }

                if(cmd === 'showCode') {
                    const textBody = textField.document.querySelector('body');
                    if(show) {
                        btn[i].style.background = 'transparent';
                        textBody.innerHTML = textBody.textContent;
                        show = false;

                    }else {
                        btn[i].style.background = 'rgb(228, 226, 226)';
                        textBody.textContent = textBody.innerHTML;
                        show = true;
                    }
                }

            });
        }


        select.addEventListener('click', ()=> {
             let cmd = select.getAttribute('data-cmd');
             let val = select.value;
     
             textField.document.execCommand(cmd, false, val);
     
        });

        // Botão para salver o html
        btnSalve.addEventListener('click', ()=> {
            let doc = textField.document.querySelector('body').innerHTML;
            console.log(doc);
            
        });
            
    }

    getUrlImage();
    btnInsertImg();

    // function para inserir imagem no rich-text
    function btnInsertImg() {
        const btn = document.getElementById('btn-getUrlImg');
        let setUrl = document.querySelector('.setUrl');
        let cmd =  'insertImage';
        let modalImg = document.querySelector('.modal-get-image');


        textField.document.designMode = 'on';

        btn.addEventListener('click', ()=> {
            let url = setUrl.value;
            textField.document.execCommand(cmd,false, url);

            modalImg.style.display = 'none';

            let images = textField.document.querySelectorAll('img');
            images.forEach(item => {
                item.style.width = '400px';
            });
        });
    }
    
    // function para pegar o diretorio da imagem escolhida
    function getUrlImage() {
        let img = document.querySelectorAll('.group-image img');
        let setUrl = document.querySelector('.setUrl');

        for(let i = 0; i < img.length; i++) {

            img[i].addEventListener('click', ()=> {
                let url = img[i].getAttribute('src');
                setUrl.value = url;
                img.forEach(item => {
                    item.style.border = '3px solid transparent';
                });

                img[i].style.border= '3px solid green';
            });
        };
   
    }


}; // window.onload <---