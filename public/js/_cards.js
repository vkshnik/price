class CardPrice {
    constructor(color, id, name, param, ei, cost, section, types) {
        this.color = color;
        this.id = id;
        this.name = name;
        this.param = param;
        this.ei = ei;
        this.cost = cost;
        this.section = section;
        this.types = types;
        this._card = document.createElement('div');
        this._card_info = document.createElement('div');
        this._card.style.backgroundColor = color;

        this._card.innerHTML = this.name + `
        <button
         title='открыть'
        style = "color:white; 
        background-Color: ${this.color}; 
        text-align: center; 
        width: 30px; 
        border: 0px"
        ><img src = '/open.svg' 
        class='open_card' 
        draggable = false>
        </button>

        <button 
         title='удалить'
        style = "color:white; 
        background-Color: ${this.color}; 
        text-align: center; 
        width: 30px; 
        border: 0px" 
        class='delete_card'> 
        &#x2715
        </button>
        
        `
            ;

        /*CARD STYLE*/
        // this._card.draggable = true;
        this._card.classList.add('cardPrice2');
        this._card.id = id;
        /*TASK CARD STYLE*/
        this._card_info.classList.add('card_info');

        //this._card_info.style.display = 'none';
        this._card_info.innerHTML = `
            <h3><input id='name_${this.id}' value='${this.name }'> </h3>
            <div class="task">
            <div>Параметр</div><div><input id='param_${this.id}' value='${this.param}'></div>
            <div>Ед. изм.</div><div> <input id='ei_${this.id}' value='${this.ei}'></div>
            <div>Количество</div><div><input class ='class_${id}' id='value_${this.id}' type='text'  ></div>
            <div>Стоимость ед.(руб.)</div><div><input class ='class_${id}' id = 'cost_${this.id}' type='text'  ></div>
            <div>Стоимость всего (руб.)</div><div><input class ='class_${id}' id = 'price_${this.id}' type='text' disabled ></div>
            <div>Нормативные трудозатраты (раб.дни)</div><div><input class ='class_${id}' id = 'trud1_${this.id}' type='text' disabled ></div>
            <div>Директивные трудозатраты (раб.дни)</div><div><input class ='class_${id}' id = 'trud2_${this.id}' type='text' disabled ></div>
            </div>
           
            <div class="btnTask">
            <button class="btnapply" >применить</button>
            <button class="btnclose_" onclick="_close()">закрыть</button>
            </div>
       `;
        this._card_info.id = id;
        this._card.appendChild(this._card_info);
        this._card.addEventListener('input', this.calc.bind(this))
    }
    calc(e) {
        if (this.types == 'podryad') {
            if (e !== undefined && this._card.parentElement.className == 'topodryad') {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let y = x * this.cost;
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = y;
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = 0;
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = 0;
            }
        }

        else if (this.types == 'kos') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'КОС (полный комплекс)') { type = 1 }
                else if (this.name == 'Решетки') { type = 0.085 }
                else if (this.name == 'Песколовки') { type = 0.055 }
                else if (this.name == 'Биология') { type = 0.313 }
                else if (this.name == 'Воздуходувки') { type = 0.022 }
                else if (this.name == 'Иловая НС') { type = 0.075 }
                else if (this.name == 'НС техводы') { type = 0.017 }
                else if (this.name == 'Аэроб.стабилизация') { type = 0.015 }
                else if (this.name == 'Мехобезвоживание') { type = 0.085 }
                else if (this.name == 'Доочистка на фильтрах') { type = 0.065 }
                else if (this.name == 'Глубокая доочистка') { type = 0.065 }
                else if (this.name == 'Обеззараживание') { type = 0.04 }
                else if (this.name == 'КНС') { type = 0.035 }
                else if (this.name == 'АБК(КОС)') { type = 0.034 }
                else if (this.name == 'Мастерская(КОС)') { type = 0.029 }
                else if (this.name == 'Реагентная(КОС)') { type = 0.029 }
                else if (this.name == 'Лаборатория(КОС)') { type = 0.024 }
                else if (this.name == 'АСУТП(КОС)') { type = 0.029 }
                else if (this.name == 'Внутриплощ. инжсети(КОС)') { type = 0.048 }

                let stage = 1;
                let y = 0;
                let infra = 1.2;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                if (x < 1000) { y = (7.702 * x) + 18957 }
                else if (x >= 1000 && x < 5000) { y = (4.9138 * x) + 21745 }
                else if (x >= 5000 && x < 10000) { y = (1.3328 * x) + 39650 }
                else if (x >= 10000 && x < 50000) { y = (0.6374 * x) + 46929 }
                else if (x >= 50000 && x < 250000) { y = (0.3074 * x) + 63795 }
                else if (x >= 250000) { y = (0.2237 * x) + 85964 }


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }

        else if (this.types == 'vos') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'ВОС (полный комплекс)') { type = 1 }
                else if (this.name == 'Станция водоочистки') { type = 0.445 }
                else if (this.name == 'Станция очистки промывных вод') { type = 0.073 }
                else if (this.name == 'Сгущение осадка') { type = 0.160 }
                else if (this.name == 'НС 2подъема') { type = 0.100 }
                else if (this.name == 'РЧВ') { type = 0.054 }
                else if (this.name == 'АБК(ВОС)') { type = 0.034 }
                else if (this.name == 'Мастерская(ВОС)') { type = 0.029 }
                else if (this.name == 'Реагентная(ВОС)') { type = 0.029 }
                else if (this.name == 'Лаборатория(ВОС)') { type = 0.024 }
                else if (this.name == 'АСУТП(ВОС)') { type = 0.023 }
                else if (this.name == 'Внутриплощ. инжсети(ВОС)') { type = 0.028 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                if (x < 1000) { y = (5.112 * x) + 3150 }
                else if (x >= 1000 && x < 5000) { y = (1.362 * x) + 6900 }
                else if (x >= 5000 && x < 10000) { y = (1.2934 * x) + 7243.2 }
                else if (x >= 10000 && x < 30000) { y = (0.7061 * x) + 13127 }
                else if (x >= 30000 && x < 40000) { y = (0.6434 * x) + 14995 }
                else if (x >= 40000 && x < 100000) { y = (0.5446 * x) + 18997 }
                else if (x >= 100000) { y = (0.5446 * x) + 18997 }


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*для берегового водовыпуска*/
        else if (this.types == 'out2') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Береговой водовыпуск') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };

                y = (0.0012 * x) + 275.7

                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*для рассеивающего водовыпуска*/
        else if (this.types == 'out1') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Рассеивающий водовыпуск') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };

                if (x < 30000) { y = 1556 }
                else if (x >= 30000) { y = 2166.2 }

                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*ковшовый водозабор */
        else if (this.types == 'vzu1') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Ковшовый водозабор') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                if (x < 1000) { y = (6.282 * x) + 77 }
                else if (x >= 1000 && x < 5000) { y = (0.4813 * x) + 5877.8 }
                else if (x >= 5000 && x < 20000) { y = (0.1878 * x) + 7346 }
                else if (x >= 20000 && x < 30000) { y = (0.1092 * x) + 8918 }
                else if (x >= 30000 && x < 90000) { y = (0.0564 * x) + 10504 }
                else if (x >= 90000 && x < 100000) { y = (0.0458 * x) + 11455 }
                else if (x >= 100000) { y = (0.0458 * x) + 11455 }


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*затопленный водозабор */
        else if (this.types == 'vzu2') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Затопленный водозабор') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                if (x < 1000) { y = (6.318 * x) + 78 }
                else if (x >= 1000 && x < 5000) { y = (0.3923 * x) + 6003.8 }
                else if (x >= 5000 && x < 20000) { y = (0.0782 * x) + 7574.5 }
                else if (x >= 20000 && x < 30000) { y = (0.0509 * x) + 8121 }
                else if (x >= 30000 && x < 90000) { y = (0.0325 * x) + 8672 }
                else if (x >= 90000 && x < 100000) { y = (0.0275 * x) + 9127 }
                else if (x >= 100000) { y = (0.0275 * x) + 9127 }


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*береговой водозабор */
        else if (this.types == 'vzu3') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Береговой водозабор') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                if (x < 1000) { y = (1.116 * x) + 13 }
                else if (x >= 1000 && x < 5000) { y = (0.084 * x) + 1045 }
                else if (x >= 5000 && x < 20000) { y = (0.0316 * x) + 1307.5 }
                else if (x >= 20000 && x < 30000) { y = (0.0184 * x) + 1571 }
                else if (x >= 30000 && x < 90000) { y = (0.0096 * x) + 1836.1 }
                else if (x >= 90000 && x < 100000) { y = (0.0091 * x) + 1878 }
                else if (x >= 100000) { y = (0.0091 * x) + 1878 }


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*подземный водозабор */
        else if (this.types == 'vzu4') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Подземный водозабор') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                if (x < 1000) { y = (0.762 * x) + 183 }
                else if (x >= 1000 && x < 5000) { y = (0.3468 * x) + 598.25 }
                else if (x >= 5000 && x < 20000) { y = (0.2113 * x) + 1292 }
                else if (x >= 20000 && x < 30000) { y = (0.1571 * x) + 2368 }
                else if (x >= 30000 && x < 90000) { y = (0.0943 * x) + 4253.6 }
                else if (x >= 90000 && x < 100000) { y = (0.00944 * x) + 4240 }
                else if (x >= 100000) { y = (0.00944 * x) + 4240 }


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }

        /*водовод до 1000м3/час */
        else if (this.types == 'voda1') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Водовод до 1000м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 1814.2 + 109.121 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*водовод до 5000м3/час */
        else if (this.types == 'voda2') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Водовод до 5000м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 3168.5 + 287.028 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*водовод до 10000м3/час */
        else if (this.types == 'voda3') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Водовод до 10000м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };

                y = 3924.1 + 391.268 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*камера переключений до 2000 м3/час */
        else if (this.types == 'voda4') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Камера переключений до 2000 м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 148.1 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }

        /*камера переключений до 5000 м3/час */
        else if (this.types == 'voda5') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Камера переключений до 5000 м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 219.9 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*Коллектор до 500 м3/час */
        else if (this.types == 'voda6') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Коллектор до 500 м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 2815.7 + 283.016 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*Коллектор до 3000 м3/час */
        else if (this.types == 'voda7') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Коллектор до 3000 м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 6030.7 + 618.301 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
        /*Коллектор до 10000 м3/час */
        else if (this.types == 'voda8') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Коллектор до 10000 м3/час') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 8188.2 + 952.739 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }

        /*Дюкер */
        else if (this.types == 'voda9') {
            if (e !== undefined && this._card.parentElement.className == 'tootr' ||
                e !== undefined && this._card.parentElement.className == 'toproject' ||
                e !== undefined && this._card.parentElement.className == 'tosoprovoj' ||
                e !== undefined && this._card.parentElement.className == 'tord'
            ) {
                let x = Number(document.getElementById(`value_${e.target.parentElement.parentElement.parentElement.id}`).value);
                let type = 1;
                if (this.name == 'Дюкер') { type = 1 }


                let stage = 1;
                let y = 0;
                let infra = 1;
                if (this._card.parentElement.className == 'tootr') { stage = 0.07 }
                else if (this._card.parentElement.className == 'toproject') { stage = 0.4 }
                else if (this._card.parentElement.className == 'tosoprovoj') { stage = 0.1 }
                else if (this._card.parentElement.className == 'tord') { stage = 0.5 };


                y = 369.7 + 5.84 * x


                let z1 = ((y / 1.1) * 0.4006) / (130 / 21);
                let z2 = ((y / 1.3) * 0.6944) / (15);
                document.getElementById(`price_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(y * infra * stage * type);
                document.getElementById(`trud1_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z1 * infra * stage * type);
                document.getElementById(`trud2_${e.target.parentElement.parentElement.parentElement.id}`).value = Math.floor(z2 * infra * stage * type);
            }
        }
    }

}

