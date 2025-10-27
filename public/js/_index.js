

function createTab() {
    let l = '';
    if (localStorage.key(0) == 0) {
        return alert('Создайте проект')
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('.kp')) {
            l += `<div class ="pag"><input type="checkbox" class = "chooseFile" id = "${localStorage.key(i)}" value = "${localStorage.key(i)}" >
        <label class ="pag2" title= "${localStorage.key(i)}" for="${localStorage.key(i)}">${localStorage.key(i)}</label>
        <input type="button" class = "btnclose" onclick = "closeFile()"  value="&#x2715" ></div>`
        }
    }

    return l;
}

function recentTab() {
    let l = '';
    if (localStorage.key(0) == 0) {
        return alert('Создайте проект')
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('.kp')) {
            l += `<a class ="pag1">
        <label  for="${localStorage.key(i)}">${localStorage.key(i)}</label>
        </a><br>`
        }
    }

    return l;
}

function download(data, filename, type) {
    let file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        a.pathname;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    }
}

function createFile() {
    let fn;
    let name;
    let author;
    let data;
    let data1;
    document.getElementsByClassName('modal1')[0].style.display = 'block';
    document.getElementById('btnProject').onclick = () => {

        name = document.getElementById('nameProject').value;
        author = document.getElementById('author').value;

        fn = name + '.kp';

        if (fn == '.kp' || author == '') {
            return alert('Заполните все поля');
        }
        else {
            data = {
                name: name,
                author: author,
                profit: 30,
                tax: 20,
                matrix: [],
            };

            localStorage.setItem(fn, JSON.stringify(data));
            //let ls = localStorage.getItem(fn);
            //download(ls, fn);

            let w = createTab();
            if (w !== undefined) {
                document.getElementById('tabs').innerHTML = w
            };

            let tabs = document.querySelectorAll('input[type="checkbox"][class="chooseFile"]');
            for (key in tabs) {
                if (tabs[key].id === fn)
                    tabs[key].checked = true;
            };

            sessionStorage.setItem('tabs', JSON.stringify(fn));

            document.getElementsByClassName('modal1')[0].style.display = 'none';

            data = JSON.parse(localStorage.getItem(fn));

            document.getElementById('_nameProject').innerHTML = data.name;
            document.getElementById('_author').innerHTML = data.author;


        }
        window.location.reload();
    }
};

function changeTab() {
    let tabs = document.querySelectorAll('input[type="checkbox"][class="chooseFile"]');


    for (key in tabs) {
        if (tabs[key].id === JSON.parse(sessionStorage.getItem('tabs'))) {
            tabs[key].checked = true;


        }
        else tabs[key].checked = false;
    }


    document.addEventListener('click', (e) => {
        if (e.target.className === "chooseFile") {
            for (key in tabs) {
                if (tabs[key].id === e.target.id) {
                    tabs[key].checked = true;
                }
                else tabs[key].checked = false;
            }
            sessionStorage.setItem('tabs', JSON.stringify(e.target.id));

            let data;
            if (!data) {
                window.location.reload();
            }
            data = JSON.parse(localStorage.getItem(e.target.id));
            let a = sessionStorage.getItem('tabs');


        }
    })


}

function saveLocalFile() {
    let filename = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
    let data = localStorage.getItem(filename);
    download(data, filename)
}

function openLocalFile() {

    document.getElementById('777').addEventListener('change', () => {

        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == document.getElementById('777').files[0].name ||
                !document.getElementById('777').files[0].name) {
                alert("Файл уже открыт");
                window.location.reload();
            }
        }

        let reader = new FileReader();
        reader.readAsText(document.getElementById('777').files[0]);
        reader.onload = () => {
            if (reader.result.includes("stadia")) {
                localStorage.setItem(document.getElementById('777').files[0].name, reader.result)
            }
            else {
                alert("Файл поврежден");
                return
            }
        }
        window.location.reload();
    })
}



function closeFile() {
    let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
    localStorage.removeItem(fn);
    sessionStorage.clear();
    window.location.reload();
}

function look(x) {
    return new Intl.NumberFormat('ru', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(x)
}

function relook(formattedNumber, locale = 'ru') {
    // Удаляем символы валюты и процентов
    const cleaned = formattedNumber
        .replace(/[^\d.,-]/g, '')
        .replace(/,/g, '.'); // Замена разделителя тысяч на точку

    // Преобразуем в число
    const number = parseFloat(cleaned);

    // Проверка на NaN
    if (isNaN(number)) {
        throw new Error('Некорректно отформатированное число');
    }

    return number;
}

function fill() {
    let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
    let data = JSON.parse(localStorage.getItem(fn));
    let sum_section1 = 0;
    let sum_section2 = 0;
    let sum_section3 = 0;
    let sum_section4 = 0;
    let sum_section5 = 0;
    let sum_section6 = 0;
    let j1 = 0;
    let j2 = 0;
    let j3 = 0;
    let j4 = 0;
    let j5 = 0;

    /*Наименование проекта */
    document.getElementById("tbl_header_name").innerHTML = document.getElementById("_nameProject").value;

    /*Суммирование и итог по секции 1 */
    document.getElementById("tbl_body_summary_section1").innerHTML = look(sum_section1);
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section1') {

            document.getElementById("tbl_body_data_section1").innerHTML += `
                <tr>
                <td class="tbl_body" >1.${j1 + 1}</td>
                <td class="tbl_body" >${data.matrix[i].name}</td>
                <td class="tbl_body" >${data.matrix[i].ei}</td>
                <td class="tbl_body" >${data.matrix[i].value}</td>
                <td class="tbl_body" >${data.matrix[i].cost}</td>
                <td class="tbl_body" >${look(data.matrix[i].price)}</td>
                </tr>`
            sum_section1 += Number(data.matrix[i].price);

            document.getElementById("tbl_body_summary_section1").innerHTML = look(sum_section1);
            j1++;
        }

    }
    /*Суммирование и итог по секции 2 */
    document.getElementById("tbl_body_summary_section2").innerHTML = look(sum_section2);

    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section2') {
            document.getElementById("tbl_body_data_section2").innerHTML += `
                <tr>
                <td class="tbl_body" >2.${j2 + 1}</td>
                <td class="tbl_body" >${data.matrix[i].name}</td>
                <td class="tbl_body" >${data.matrix[i].ei}</td>
                <td class="tbl_body" >${data.matrix[i].value}</td>
                <td class="tbl_body" >${data.matrix[i].cost}</td>
                <td class="tbl_body" >${look(data.matrix[i].price)}</td>
                </tr>`
            sum_section2 += Number(data.matrix[i].price);

            document.getElementById("tbl_body_summary_section2").innerHTML = look(sum_section2);
            j2++;
        }

    }

    /*Суммирование и итог по секции 3 */
    document.getElementById("tbl_body_summary_section3").innerHTML = look(sum_section3);
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section3') {

            document.getElementById("tbl_body_data_section3").innerHTML += `
                <tr>
                <td class="tbl_body" >3.${j3 + 1}</td>
                <td class="tbl_body" >${data.matrix[i].name}</td>
                <td class="tbl_body" >${data.matrix[i].ei}</td>
                <td class="tbl_body" >${data.matrix[i].value}</td>
                <td class="tbl_body" >${data.matrix[i].cost}</td>
                <td class="tbl_body" >${look(data.matrix[i].price)}</td>
                </tr>`
            sum_section3 += Number(data.matrix[i].price);

            document.getElementById("tbl_body_summary_section3").innerHTML = look(sum_section3);
            j3++;
        }

    }
    /*Суммирование и итог по секции 4 */
    document.getElementById("tbl_body_summary_section4").innerHTML = look(sum_section4);
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section4') {

            document.getElementById("tbl_body_data_section4").innerHTML += `
                <tr>
                <td class="tbl_body" >4.${j4 + 1}</td>
                <td class="tbl_body" >${data.matrix[i].name}</td>
                <td class="tbl_body" >${data.matrix[i].ei}</td>
                <td class="tbl_body" >${data.matrix[i].value}</td>
                <td class="tbl_body" >${data.matrix[i].cost}</td>
                <td class="tbl_body" >${look(data.matrix[i].price)}</td>
                </tr>`
            sum_section4 += Number(data.matrix[i].price);

            document.getElementById("tbl_body_summary_section4").innerHTML = look(sum_section4);
            j4++;
        }

    }
    /*Суммирование и итог по секции 5 */
    document.getElementById("tbl_body_summary_section5").innerHTML = look(sum_section5);
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section5') {

            document.getElementById("tbl_body_data_section5").innerHTML += `
                <tr>
                <td class="tbl_body" >5.${j5 + 1}</td>
                <td class="tbl_body" >${data.matrix[i].name}</td>
                <td class="tbl_body" >${data.matrix[i].ei}</td>
                <td class="tbl_body" >${data.matrix[i].value}</td>
                <td class="tbl_body" >${data.matrix[i].cost}</td>
                <td class="tbl_body" >${look(data.matrix[i].price)}</td>
                </tr>`
            sum_section5 += Number(data.matrix[i].price);

            document.getElementById("tbl_body_summary_section5").innerHTML = look(sum_section5);
            j5++;
        }

    }

    /*Суммирование и итог по секции 6 */
    document.getElementById("tbl_body_summary_section6").innerHTML = look(sum_section6);
    let arr = document.querySelectorAll(".tbl_body_summary");
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {

        sum += Number(relook(arr[i].textContent));
    }
    document.getElementById("tbl_body_summary_section6").innerHTML = look(sum)


    /*Прибыль */
    let profit = Number(data.profit);
    let sumProfit = sum * (1 + (profit / 100));
    document.getElementById("tbl_body_summary_value_section7").innerHTML = profit + '%'
    document.getElementById("tbl_body_summary_section7").innerHTML = look(sum * profit / 100);
    document.getElementById("tbl_body_summary_section8").innerHTML = look(sumProfit);

    /*Налоги */
    let tax = Number(data.tax);
    let sumTax = sumProfit * (1 + (tax / 100))
    document.getElementById("tbl_body_summary_value_section9").innerHTML = tax + '%'
    document.getElementById("tbl_body_summary_section9").innerHTML = look(sumProfit * tax / 100);
    document.getElementById("tbl_body_summary_section10").innerHTML = look(sumTax);
    document.getElementById("result_price").innerHTML = look(sumTax) + ' тыс.руб.';
};

function fill_trud() {
    let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
    let data = JSON.parse(localStorage.getItem(fn));
    let arr_otr = [];
    let arr_pd = [];
    let arr_soprovoj = [];
    let arr_rd = [];


    let otr_data = '';
    let otr_data_sum = 0;
    let pd_data = '';
    let pd_data_sum = 0;
    let soprovoj_data = '';
    let soprovoj_data_sum = 0;
    let rd_data = '';
    let rd_data_sum = 0;

    let arr_otr_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let arr_pd_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let arr_soprovoj_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let arr_rd_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let sum = '';
    let sum2 = 0;


    let arr_otr_kos = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_kos = [1.0, 3.0, 8.0, 13.0, 5.0, 5.0, 5.0, 5.0, 3.0, 20.0, 7.0, 5.0, 9.0, 5.0, 1.0, 5.0];
    let arr_soprovoj_kos = [1.0, 3.0, 8.0, 13.0, 5.0, 5.0, 5.0, 5.0, 3.0, 20.0, 7.0, 5.0, 9.0, 5.0, 1.0, 5.0];
    let arr_rd_kos = [0.0, 4.0, 10.0, 18.0, 6.0, 6.0, 6.0, 6.0, 4.0, 25.0, 8.0, 0.0, 0.0, 0.0, 0.0, 7.0];



    let arr_otr_vos = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_vos = [1.0, 3.0, 10.0, 16.0, 5.0, 5.0, 3.0, 3.0, 3.0, 24.0, 7.0, 5.0, 8.0, 1.0, 1.0, 5.0];
    let arr_soprovoj_vos = [1.0, 3.0, 10.0, 16.0, 5.0, 5.0, 3.0, 3.0, 3.0, 24.0, 7.0, 5.0, 8.0, 1.0, 1.0, 5.0];
    let arr_rd_vos = [0.0, 4.0, 11.0, 21.0, 7.0, 6.0, 4.0, 4.0, 4.0, 24.0, 8.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    let arr_otr_vzu123 = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_vzu123 = [2.0, 3.0, 71.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 9.0, 1.0, 1.0, 5.0];
    let arr_soprovoj_vzu123 = [2.0, 3.0, 71.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 9.0, 1.0, 1.0, 5.0];
    let arr_rd_vzu123 = [0.0, 3.0, 90.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    let arr_otr_vzu4 = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_vzu4 = [1.0, 3.0, 10.0, 22.0, 4.0, 4.0, 0.0, 3.0, 0.0, 26.0, 4.0, 7.0, 7.0, 1.0, 1.0, 5.0];
    let arr_soprovoj_vzu4 = [1.0, 3.0, 10.0, 22.0, 4.0, 4.0, 0.0, 3.0, 0.0, 26.0, 4.0, 7.0, 7.0, 1.0, 1.0, 5.0];
    let arr_rd_vzu4 = [0.0, 4.0, 12.0, 26.0, 5.0, 5.0, 0.0, 4.0, 0.0, 32.0, 5.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    let arr_otr_out = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_out = [2.0, 3.0, 69.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 9.0, 9.5, 1.0, 1.0, 5.0];
    let arr_soprovoj_out = [2.0, 3.0, 69.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 9.0, 9.5, 1.0, 1.0, 5.0];
    let arr_rd_out = [0.0, 4.0, 74.0, 15.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    let arr_otr_voda678 = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_voda678 = [2.0, 3.0, 21.0, 0.0, 0.0, 50.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 9.0, 1.0, 1.0, 5.0];
    let arr_soprovoj_voda678 = [2.0, 3.0, 21.0, 11.0, 50.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 9.0, 1.0, 1.0, 5.0];
    let arr_rd_voda678 = [0.0, 4.0, 40.0, 0.0, 0.0, 49.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    let arr_otr_voda123 = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_voda123 = [2.0, 3.0, 21.0, 0.0, 50.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 9.0, 1.0, 1.0, 5.0];
    let arr_soprovoj_voda123 = [2.0, 3.0, 21.0, 0.0, 50.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 9.0, 1.0, 1.0, 5.0];
    let arr_rd_voda123 = [0.0, 3.0, 45.0, 0.0, 45.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    let arr_otr_voda45 = [13.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 68.0, 0.0, 0.0, 6.0, 0.0, 0.0, 6.0];
    let arr_pd_voda45 = [2.0, 2.0, 78.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0, 6.0, 1.0, 1.0, 5.0];
    let arr_soprovoj_voda45 = [2.0, 2.0, 78.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0, 6.0, 1.0, 1.0, 5.0];
    let arr_rd_voda45 = [0.0, 3.0, 90.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.0];

    /*Суммирование и итог по секции 2 */
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section2') {
            if (data.matrix[i].types == 'kos') { arr_otr = arr_otr_kos }
            else if (data.matrix[i].types == 'vos') { arr_otr = arr_otr_vos }
            else if (data.matrix[i].types == 'vzu1' || data.matrix[i].types == 'vzu2' || data.matrix[i].types == 'vzu3') { arr_otr = arr_otr_vzu123 }
            else if (data.matrix[i].types == 'vzu4') { arr_otr = arr_otr_vzu4 }
            else if (data.matrix[i].types == 'out1' || data.matrix[i].types == 'out2' || data.matrix[i].types == 'voda9') { arr_otr = arr_otr_out }
            else if (data.matrix[i].types == 'voda6' || data.matrix[i].types == 'voda7' || data.matrix[i].types == 'voda8') { arr_otr = arr_otr_voda678 }
            else if (data.matrix[i].types == 'voda1' || data.matrix[i].types == 'voda2' || data.matrix[i].types == 'voda3') { arr_otr = arr_otr_voda123 }
            else if (data.matrix[i].types == 'voda4' || data.matrix[i].types == 'voda5') { arr_otr = arr_otr_voda45 }



            for (let k = 0; k < arr_otr.length; k++) {

                otr_data += `
                <td class="tbl_body" >${look(data.matrix[i].trud2 * arr_otr[k] / 100)}</td>
                `
                otr_data_sum += data.matrix[i].trud2 * arr_otr[k] / 100;

                arr_otr_sum.splice(k, 1, arr_otr_sum[k] + data.matrix[i].trud2 * arr_otr[k] / 100);

            }

            document.getElementById("tbl_body_data_trud").innerHTML += `
                <tr>
                <td class="tbl_body" >ОТР -${data.matrix[i].name}</td>
                ${otr_data}
                <td class="tbl_body">${look(otr_data_sum)}</td>
                </tr>
            `
            otr_data = '';
            otr_data_sum = 0;
        };


    }
    /*Суммирование и итог по секции 3 */
    for (let i = 0; i < data.matrix.length; i++) {

        if (data.matrix[i].section == 'section3') {

            if (data.matrix[i].types == 'kos') { arr_pd = arr_pd_kos }
            else if (data.matrix[i].types == 'vos') { arr_pd = arr_pd_vos }
            else if (data.matrix[i].types == 'vzu1' || data.matrix[i].types == 'vzu2' || data.matrix[i].types == 'vzu3') { arr_pd = arr_pd_vzu123 }
            else if (data.matrix[i].types == 'vzu4') { arr_pd = arr_pd_vzu4 }
            else if (data.matrix[i].types == 'out1' || data.matrix[i].types == 'out2' || data.matrix[i].types == 'voda9') { arr_pd = arr_pd_out }
            else if (data.matrix[i].types == 'voda6' || data.matrix[i].types == 'voda7' || data.matrix[i].types == 'voda8') { arr_pd = arr_pd_voda678 }
            else if (data.matrix[i].types == 'voda1' || data.matrix[i].types == 'voda2' || data.matrix[i].types == 'voda3') { arr_pd = arr_pd_voda123 }
            else if (data.matrix[i].types == 'voda4' || data.matrix[i].types == 'voda5') { arr_pd = arr_pd_voda45 }

            for (let k = 0; k < arr_pd.length; k++) {
                pd_data += `
                <td class="tbl_body" >${look(data.matrix[i].trud2 * arr_pd[k] / 100)}</td>
                `
                pd_data_sum += data.matrix[i].trud2 * arr_pd[k] / 100;

                arr_pd_sum.splice(k, 1, arr_pd_sum[k] + data.matrix[i].trud2 * arr_pd[k] / 100);
            };

            document.getElementById("tbl_body_data_trud").innerHTML += `
                <tr>
                <td class="tbl_body" >ПД - ${data.matrix[i].name}</td>
                ${pd_data}
                <td class="tbl_body">${look(pd_data_sum)}</td>
                </tr>
            `
            pd_data = '';
            pd_data_sum = 0;
        }
    }

    /*Суммирование и итог по секции 4 */
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section4') {

            if (data.matrix[i].types == 'kos') { arr_soprovoj = arr_soprovoj_kos }
            else if (data.matrix[i].types == 'vos') { arr_soprovoj = arr_soprovoj_vos }
            else if (data.matrix[i].types == 'vzu1' || data.matrix[i].types == 'vzu2' || data.matrix[i].types == 'vzu3') { arr_soprovoj = arr_soprovoj_vzu123 }
            else if (data.matrix[i].types == 'vzu4') { arr_soprovoj = arr_soprovoj_vzu4 }
            else if (data.matrix[i].types == 'out1' || data.matrix[i].types == 'out2' || data.matrix[i].types == 'voda9') { arr_soprovoj = arr_soprovoj_out }
            else if (data.matrix[i].types == 'voda6' || data.matrix[i].types == 'voda7' || data.matrix[i].types == 'voda8') { arr_soprovoj = arr_soprovoj_voda678 }
            else if (data.matrix[i].types == 'voda1' || data.matrix[i].types == 'voda2' || data.matrix[i].types == 'voda3') { arr_soprovoj = arr_soprovoj_voda123 }
            else if (data.matrix[i].types == 'voda4' || data.matrix[i].types == 'voda5') { arr_soprovoj = arr_soprovoj_voda45 }

            for (let k = 0; k < arr_soprovoj.length; k++) {

                soprovoj_data += `
                <td class="tbl_body" >${look(data.matrix[i].trud2 * arr_soprovoj[k] / 100)}</td>
                `
                soprovoj_data_sum += data.matrix[i].trud2 * arr_soprovoj[k] / 100;

                arr_soprovoj_sum.splice(k, 1, arr_soprovoj_sum[k] + data.matrix[i].trud2 * arr_soprovoj[k] / 100);
            }

            document.getElementById("tbl_body_data_trud").innerHTML += `
                <tr>
                <td class="tbl_body" >Сопровождение - ${data.matrix[i].name}</td>
                ${soprovoj_data}
                <td class="tbl_body">${look(soprovoj_data_sum)}</td>
                </tr>
            `
            soprovoj_data = '';
            soprovoj_data_sum = 0;

        }
    }
    /*Суммирование и итог по секции 5 */
    for (let i = 0; i < data.matrix.length; i++) {
        if (data.matrix[i].section == 'section5') {

            if (data.matrix[i].types == 'kos') { arr_rd = arr_rd_kos }
            else if (data.matrix[i].types == 'vos') { arr_rd = arr_rd_vos }
            else if (data.matrix[i].types == 'vzu1' || data.matrix[i].types == 'vzu2' || data.matrix[i].types == 'vzu3') { arr_rd = arr_rd_vzu123 }
            else if (data.matrix[i].types == 'vzu4') { arr_rd = arr_rd_vzu4 }
            else if (data.matrix[i].types == 'out1' || data.matrix[i].types == 'out2' || data.matrix[i].types == 'voda9') { arr_rd = arr_rd_out }
            else if (data.matrix[i].types == 'voda6' || data.matrix[i].types == 'voda7' || data.matrix[i].types == 'voda8') { arr_rd = arr_rd_voda678 }
            else if (data.matrix[i].types == 'voda1' || data.matrix[i].types == 'voda2' || data.matrix[i].types == 'voda3') { arr_rd = arr_rd_voda123 }
            else if (data.matrix[i].types == 'voda4' || data.matrix[i].types == 'voda5') { arr_rd = arr_rd_voda45 }

            for (let k = 0; k < arr_rd.length; k++) {

                rd_data += `
                <td class="tbl_body" >${look(data.matrix[i].trud2 * arr_rd[k] / 100)}</td>
                `
                rd_data_sum += data.matrix[i].trud2 * arr_rd[k] / 100;

                arr_rd_sum.splice(k, 1, arr_rd_sum[k] + data.matrix[i].trud2 * arr_rd[k] / 100);
            }

            document.getElementById("tbl_body_data_trud").innerHTML += `
                <tr>
                <td class="tbl_body" >РД - ${data.matrix[i].name}</td>
                ${rd_data}
                <td class="tbl_body">${look(rd_data_sum)}</td>
                </tr>
            `
            rd_data = '';
            rd_data_sum = 0;

        }
    }



    for (let i = 0; i < 16; i++) {

        sum += `<th class="tbl_body">${look(arr_otr_sum[i] + arr_pd_sum[i] + arr_soprovoj_sum[i] + arr_rd_sum[i])}</th>`
        //console.log(arr_rd_sum[i]);

    }

    for (let i = 0; i < data.matrix.length; i++) {

        sum2 += data.matrix[i].trud2;

    }


    document.getElementById("tbl_body_data_trud_sum").innerHTML = `
<tr>
<th class="tbl_body">Итого</th>
${sum}
<th class="tbl_body">${look(sum2)}</th>
    `
    document.getElementById("result_trud").innerHTML = look(sum2) + ' чел-дни';
};


function fill_card() {
    let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
    let data = JSON.parse(localStorage.getItem(fn));
    let _card;

    for (let i = 0; i < data.matrix.length; i++) {
        _card = new CardPrice(
            data.matrix[i].color,
            data.matrix[i].id,
            data.matrix[i].name,
            data.matrix[i].param,
            data.matrix[i].ei,
            data.matrix[i].cost,
            data.matrix[i].section,
            data.matrix[i].types,
            data.matrix[i].trud1,
            data.matrix[i].trud2
        );

        _card._card_info.style.display = 'none';


        document.getElementById(data.matrix[i].cell).appendChild(_card._card);

        document.getElementById(`value_${data.matrix[i].id}`).value = data.matrix[i].value;
        document.getElementById(`cost_${data.matrix[i].id}`).value = data.matrix[i].cost;
        document.getElementById(`price_${data.matrix[i].id}`).value = data.matrix[i].price;
        document.getElementById(`trud1_${data.matrix[i].id}`).value = data.matrix[i].trud1;
        document.getElementById(`trud2_${data.matrix[i].id}`).value = data.matrix[i].trud2;
    };
}

document.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        _close();
    }
})
document.addEventListener('click', (e) => {
    if (e.target.className === 'btn_isx') {
        let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
        let data1 = JSON.parse(localStorage.getItem(fn));
        let qwerty;
        let data = {};
        let matrix1 = data1.matrix;

        qwerty = {
            name: document.getElementById('_nameProject').value,
            author: document.getElementById('_author').value,
            profit: Number(document.getElementById('profit').value),
            tax: Number(document.getElementById('tax').value),
            matrix: matrix1
        };

        localStorage.setItem(fn, JSON.stringify(qwerty));
        window.location.reload();




    }

    else if (e.target.id === "btnProject_close") {
        document.getElementsByClassName('modal1')[0].style.display = 'none';
    }

    else if (e.target.className === 'btnapply') {
        let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
        let data1 = JSON.parse(localStorage.getItem(fn));
        let qwerty;
        let data = {};
        let count = e.target.parentElement.parentElement.id;
        let matrix1 = data1.matrix;
        let number = 0;
        for (let i = 0; i < matrix1.length; i++) {
            if (matrix1[i].id == count) {
                number = i;
            }
        }
        let cost1;
        if (document.getElementById(`cost_${matrix1[number].id}`).value == '-') {
            cost1 = matrix1[number].cost;
            document.getElementById(`cost_${matrix1[number].id}`).setAttribute("disabled", "true")
        }
        else { cost1 = Number(document.getElementById(`cost_${matrix1[number].id}`).value) }
        data = {
            color: matrix1[number].color,
            id: matrix1[number].id,
            name: document.getElementById(`name_${matrix1[number].id}`).value,
            param: document.getElementById(`param_${matrix1[number].id}`).value,
            ei: document.getElementById(`ei_${matrix1[number].id}`).value,
            cost: cost1,
            section: matrix1[number].section,
            types: matrix1[number].types,
            num: matrix1[number].num,
            value: Number(document.getElementById(`value_${matrix1[number].id}`).value),
            price: Number(document.getElementById(`price_${matrix1[number].id}`).value),
            cell: matrix1[number].cell,
            trud1: Number(document.getElementById(`trud1_${matrix1[number].id}`).value),
            trud2: Number(document.getElementById(`trud2_${matrix1[number].id}`).value),
        }
        matrix1.splice(number, 1, data);


        qwerty = {
            name: data1.name,
            author: data1.author,
            profit: data1.profit,
            tax: data1.tax,
            matrix: matrix1
        };

        localStorage.setItem(fn, JSON.stringify(qwerty));
        window.location.reload();
    }

    else if (e.target.className === 'delete_card') {

        let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
        let data1 = JSON.parse(localStorage.getItem(fn));
        let qwerty;
        let data = {};
        let count = e.target.parentElement.id;
        let matrix1 = data1.matrix;
        let number = 0;
        for (let i = 0; i < matrix1.length; i++) {
            if (matrix1[i].id == count) {
                number = i;
            }
        }
        matrix1.splice(number, 1);


        qwerty = {
            name: data1.name,
            author: data1.author,
            profit: data1.profit,
            tax: data1.tax,
            matrix: matrix1
        };

        localStorage.setItem(fn, JSON.stringify(qwerty));
        window.onbeforeunload = function () {
            localStorage.setItem('scrollPosition', document.getElementsByClassName('baza')[0].scrollTop);
        };

        window.location.reload();
    }
    else if (e.target.className === "open_card") {
        e.target.parentElement.parentElement.childNodes[5].style.left = (e.pageX) + 'px';
        e.target.parentElement.parentElement.childNodes[5].style.top = (e.pageY - 450) + 'px';
        e.target.parentElement.parentElement.childNodes[5].style.display = 'grid';
        
        let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
        let data1 = JSON.parse(localStorage.getItem(fn));
        let count = e.target.parentElement.parentElement.id;
        let matrix1 = data1.matrix;
        let number = 0;
        for (let i = 0; i < matrix1.length; i++) {
            if (matrix1[i].id == count) {
                number = i;
            }
        }
        if(document.getElementById(`cost_${matrix1[number].id}`).value == '-') { 
            document.getElementById(`cost_${matrix1[number].id}`).setAttribute("disabled", "true")}

    }
})

document.addEventListener('mousedown', (e) => {
    if (e.target.className === "cardPrice2") {
        e.target.draggable = true;

    }

})

document.addEventListener('mouseup', (e) => {
    if (e.target.classList.contains("cardPrice2")) {
        e.target.draggable = false;
    }

})

let dragged = null;
let dragged2 = null;
document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains("cardPrice")) {
        dragged = e.target;

    }
    if (e.target.classList.contains("cardPrice2")) {
        dragged2 = e.target;
    }


})

document.addEventListener('dragenter', (e) => {
    e.preventDefault();

    if (e.target.classList.contains("topodryad") && dragged != null && dragged.parentElement.classList.contains("frompodryad") ||
        e.target.classList.contains("tootr") && dragged != null && dragged.parentElement.classList.contains("fromotr") ||
        e.target.classList.contains("toproject") && dragged != null && dragged.parentElement.classList.contains("fromproject") ||
        e.target.classList.contains("tosoprovoj") && dragged != null && dragged.parentElement.classList.contains("fromsoprovoj") ||
        e.target.classList.contains("tord") && dragged != null && dragged.parentElement.classList.contains("fromrd")) {
        e.target.classList.add("dropzone")



    };
    if (dragged2 != null && dragged2.parentElement.classList.contains("topodryad") ||
        dragged2 != null && dragged2.parentElement.classList.contains("tootr") ||
        dragged2 != null && dragged2.parentElement.classList.contains("toproject") ||
        dragged2 != null && dragged2.parentElement.classList.contains("tosoprovoj") ||
        dragged2 != null && dragged2.parentElement.classList.contains("tootr")) {

        if (e.target != dragged2.parentElement && e.target.parentElement == dragged2.parentElement) {
            dragged2.classList.add('movecard')
            dragged2.parentElement.insertBefore(dragged2, e.target);
        }
        if (!e.target.classList.contains("cardPrice2")) { dragged2.classList.remove('movecard') }


    }



})

document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("topodryad") ||
        e.target.classList.contains("tootr") ||
        e.target.classList.contains("toproject") ||
        e.target.classList.contains("tosoprovoj") ||
        e.target.classList.contains("tord")) {
        e.target.classList.remove("dropzone")


    }


})

document.addEventListener("dragover", (e) => {
    e.preventDefault();
})





document.addEventListener('drop', (e) => {
    e.preventDefault();
    let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
    let data1 = JSON.parse(localStorage.getItem(fn));
    // console.log(e.target)
    if (dragged != null) {
        if (e.target.classList.contains("dropzone")) {
            let color = randomColor(150);
            let el;
            if (dragged.id === 'igdi') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Площадь', 'га', 80, 'section1', 'podryad') }
            else if (dragged.id === 'igi') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Глубина', 'пм', 8, 'section1', 'podryad') }
            else if (dragged.id === 'iei') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Площадь', 'га', 80, 'section1', 'podryad') }
            else if (dragged.id === 'igmi') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 700, 'section1', 'podryad') }
            else if (dragged.id === 'obsl') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 2000, 'section1', 'podryad') }
            else if (dragged.id === 'arch') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 700, 'section1', 'podryad') }
            else if (dragged.id === 'oo') { el = new CardPrice(color, dragged.id, dragged.textContent, 'услуга', 'шт', 150, 'section1', 'podryad') }
            else if (dragged.id === 'ovos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 700, 'section1', 'podryad') }
            else if (dragged.id === 'oos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 350, 'section1', 'podryad') }
            else if (dragged.id === 'oos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 250, 'section1', 'podryad') }
            else if (dragged.id === 'szz') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 500, 'section1', 'podryad') }
            else if (dragged.id === 'zso') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 500, 'section1', 'podryad') }
            else if (dragged.id === 'geo') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 2000, 'section1', 'podryad') }
            else if (dragged.id === 'vbr') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 800, 'section1', 'podryad') }
            else if (dragged.id === 'gge') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 2000, 'section1', 'podryad') }
            else if (dragged.id === 'gee') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 400, 'section1', 'podryad') }
            else if (dragged.id === 'sgee') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 10000, 'section1', 'podryad') }
            else if (dragged.id === 'tip') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 300, 'section1', 'podryad') }
            else if (dragged.id === 'kom') { el = new CardPrice(color, dragged.id, dragged.textContent, 'отчет', 'шт', 300, 'section1', 'podryad') }
            else if (dragged.id === 'nep') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Непредвиденные', '-', 500, 'section1', 'podryad') }

            else if (dragged.id === 'sthg') { el = new CardPrice(color, dragged.id, dragged.textContent, '', '', 0, 'section1', 'podryad') }

            else if (dragged.id === 'otr_kos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section2', 'kos') }
            else if (dragged.id === 'pd_kos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'kos') }
            else if (dragged.id === 'soprovoj_kos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'kos') }
            else if (dragged.id === 'rd_kos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'kos') }

            else if (dragged.id === 'otr_vos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section2', 'vos') }
            else if (dragged.id === 'pd_vos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'vos') }
            else if (dragged.id === 'soprovoj_vos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'vos') }
            else if (dragged.id === 'rd_vos') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'vos') }

            else if (dragged.id === 'pd_out1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'out1') }
            else if (dragged.id === 'pd_out2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'out2') }
            else if (dragged.id === 'soprovoj_out1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'out1') }
            else if (dragged.id === 'soprovoj_out2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'out2') }
            else if (dragged.id === 'rd_out1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'out1') }
            else if (dragged.id === 'rd_out2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'out2') }

            else if (dragged.id === 'pd_vzu1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'vzu1') }
            else if (dragged.id === 'pd_vzu2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'vzu2') }
            else if (dragged.id === 'pd_vzu3') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'vzu3') }
            else if (dragged.id === 'pd_vzu4') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section3', 'vzu4') }
            else if (dragged.id === 'soprovoj_vzu1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'vzu1') }
            else if (dragged.id === 'soprovoj_vzu2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'vzu2') }
            else if (dragged.id === 'soprovoj_vzu3') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'vzu3') }
            else if (dragged.id === 'soprovoj_vzu4') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section4', 'vzu4') }
            else if (dragged.id === 'rd_vzu1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'vzu1') }
            else if (dragged.id === 'rd_vzu2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'vzu2') }
            else if (dragged.id === 'rd_vzu3') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'vzu3') }
            else if (dragged.id === 'rd_vzu4') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Производительность', 'м3/сут', '-', 'section5', 'vzu4') }
            /*линейные объекты*/
            else if (dragged.id === 'pd_voda1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda1') }
            else if (dragged.id === 'pd_voda2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda2') }
            else if (dragged.id === 'pd_voda3') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda3') }
            else if (dragged.id === 'pd_voda4') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Камера', 'шт', '-', 'section3', 'voda4') }
            else if (dragged.id === 'pd_voda5') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Камера', 'шт', '-', 'section3', 'voda5') }
            else if (dragged.id === 'pd_voda6') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda6') }
            else if (dragged.id === 'pd_voda7') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda7') }
            else if (dragged.id === 'pd_voda8') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda8') }
            else if (dragged.id === 'pd_voda9') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'м', '-', 'section3', 'voda9') }

            else if (dragged.id === 'soprovoj_voda1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda1') }
            else if (dragged.id === 'soprovoj_voda2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda2') }
            else if (dragged.id === 'soprovoj_voda3') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda3') }
            else if (dragged.id === 'soprovoj_voda4') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Камера', 'шт', '-', 'section3', 'voda4') }
            else if (dragged.id === 'soprovoj_voda5') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Камера', 'шт', '-', 'section3', 'voda5') }
            else if (dragged.id === 'soprovoj_voda6') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda6') }
            else if (dragged.id === 'soprovoj_voda7') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda7') }
            else if (dragged.id === 'soprovoj_voda8') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda8') }
            else if (dragged.id === 'soprovoj_voda9') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'м', '-', 'section3', 'voda9') }

            else if (dragged.id === 'rd_voda1') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda1') }
            else if (dragged.id === 'rd_voda2') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda2') }
            else if (dragged.id === 'rd_voda3') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda3') }
            else if (dragged.id === 'rd_voda4') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Камера', 'шт', '-', 'section3', 'voda4') }
            else if (dragged.id === 'rd_voda5') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Камера', 'шт', '-', 'section3', 'voda5') }
            else if (dragged.id === 'rd_voda6') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda6') }
            else if (dragged.id === 'rd_voda7') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda7') }
            else if (dragged.id === 'rd_voda8') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'км', '-', 'section3', 'voda8') }
            else if (dragged.id === 'rd_voda9') { el = new CardPrice(color, dragged.id, dragged.textContent, 'Протяженность', 'м', '-', 'section3', 'voda9') }



            /*Создаем карточку */
            // e.target.appendChild(el._card);
            let matrix1 = data1.matrix;

            let data = {
                color: el.color,
                id: el._card.id + `_${data1.matrix.length}`,
                name: el.name,
                param: el.param,
                ei: el.ei,
                cost: el.cost,
                section: el.section,
                types: el.types,
                num: data1.matrix.length,
                value: 0,
                price: 0,
                cell: e.target.id,
                trud1: 0,
                trud2: 0

            };
            matrix1.push(data);

            let data2 = {
                name: data1.name,
                author: data1.author,
                profit: data1.profit,
                tax: data1.tax,
                matrix: matrix1
            }

            localStorage.setItem(fn, JSON.stringify(data2));

        }
    }
    /*Двигаем карточку */

    if (dragged2 != null) {
        if (dragged2.classList.contains('movecard')) {
            dragged2.classList.remove('movecard')

            let number = 0;
            let number1 = 0;

            let matrix1 = data1.matrix;
            for (let i = 0; i < matrix1.length; i++) {
                if (matrix1[i].id == e.target.id) {
                    number = i - 1;
                }
            }

            for (let i = 0; i < matrix1.length; i++) {
                if (matrix1[i].id == dragged2.id) {
                    number1 = i;
                }
            }
            console.log(number);
            console.log(number1)
            let data = {
                color: data1.matrix[number1].color,
                id: data1.matrix[number1].id,
                name: data1.matrix[number1].name,
                param: data1.matrix[number1].param,
                ei: data1.matrix[number1].ei,
                cost: data1.matrix[number1].cost,
                section: data1.matrix[number1].section,
                types: data1.matrix[number1].types,
                num: data1.matrix[number1].num,
                value: data1.matrix[number1].value,
                price: data1.matrix[number1].price,
                cell: data1.matrix[number1].cell,
                trud1: data1.matrix[number1].trud1,
                trud2: data1.matrix[number1].trud2,

            };



            matrix1.splice(number1, 1);
            matrix1.splice(number, 0, data);
            let data2 = {
                name: data1.name,
                author: data1.author,
                profit: data1.profit,
                tax: data1.tax,
                matrix: matrix1
            }

            localStorage.setItem(fn, JSON.stringify(data2));



        }
    }
    window.onbeforeunload = function () {
        localStorage.setItem('scrollPosition', document.getElementsByClassName('baza')[0].scrollTop);
    };
    window.location.reload();

})



function _close() {
    for (let i = 0; i < document.querySelectorAll("button.btnclose_").length; i++) {
        document.querySelectorAll("button.btnclose_")[i].parentElement.parentElement.style.display = 'none';

    }
}

window.addEventListener('load', (e) => {
    let w = createTab();
    if (w !== undefined) {
        document.getElementById('tabs').innerHTML = w;
    };


    changeTab();
    if (document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0] == undefined) {
        document.getElementById('main').innerHTML = `<div style="display:flex; justify-content: center; 
        align-items: center; background-color: lightgrey; padding: 30px; width: 100%; height: 100%; ; border: 1px solid red; border-radius: 10px"> <img class="MMImage-Origin"
         src="https://cdn-icons-png.flaticon.com/512/5169/5169216.png" alt="Picture background" aria-hidden="true"
         style="width:150px; height: 150px;">
        </div>`
    }
    else {
        let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
        data = JSON.parse(localStorage.getItem(fn));

        document.getElementById('_nameProject').value = data.name;
        document.getElementById('_author').value = data.author;
        document.getElementById('profit').value = data.profit;
        document.getElementById('tax').value = data.tax;

        fill();
        fill_trud();
        fill_card();

    }

    // Восстанавливаем позицию при загрузке
    const position = localStorage.getItem('scrollPosition');
    if (position) {
        document.getElementsByClassName('baza')[0].scrollTo(0, parseInt(position));
    }
});







function forwardAdminPanel() {
    window.location.href = "/adminPanel";
}

async function uploadFile() {

    if (document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0] == undefined) {
    }
    else {
        let fn = document.querySelectorAll('input[type="checkbox"]:checked[class="chooseFile"]')[0].value;
        data = JSON.parse(localStorage.getItem(fn));
        let saveDate = new Date();

        let response = await fetch('/project/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentUser: data.author,nameProject: fn, dataProject: localStorage.getItem(fn), dateProject: saveDate })
        });

        if (response.ok) alert('Проект сохранен на сервере');
        window.location.reload();

    }
}



document.addEventListener('click', async (e) => {
    if (e.target.className == 'open') {
        let id = e.target.id;

        let response = await fetch(`/open/${id}`)
        let data = await response.json();
        localStorage.setItem(data.nameProject, data.dataProject);

        window.location.reload();

    }
    else if (e.target.className == 'delete') {
        let msg = prompt('Введите пароль для удаления')
        let id = e.target.id;
        let response = await fetch(`/delete/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pass: msg })
        });


        window.location.reload();
    }

})
document.querySelector('#idisx').addEventListener('input', (e) => {
    if (e.target.id == '_nameProject') {
        document.getElementById('tbl_header_name').innerHTML = e.target.value;
    }
    if (e.target.id == 'profit') {
        document.getElementById('tbl_body_summary_value_section7').innerHTML = e.target.value + '%';
    }
    if (e.target.id == 'tax') {
        document.getElementById('tbl_body_summary_value_section9').innerHTML = e.target.value + '%';
    }
})

function randomColor(min) {
    // min: от 0 до 255, рекомендуем 180..230 для светлых цветов
    const r = Math.floor(Math.random() * (256 - min)) + min;
    const g = Math.floor(Math.random() * (256 - min)) + min;
    const b = Math.floor(Math.random() * (256 - min)) + min;
    return `rgb(${r}, ${g}, ${b})`;
}




//const expiresAt = new Date("2025-10-24T13:00:00Z").getTime();
const expiresAt = new Date(document.getElementById('clock').textContent).getTime();

setInterval(() => {
    const diff = expiresAt - Date.now();
    if (diff <= 0) return console.log("Сессия истекла");
    let m = Math.floor(diff / 60000);
    let s = Math.floor((diff % 60000) / 1000);
    //console.log(`${m} мин ${s} сек`);
    document.getElementById("watch").innerHTML = `Сессия истечет через ${m} мин ${s} сек`
    

  }, 1000);

      function formatTime(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      return `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }

    fetch("/session")
      .then((res) => res.json())
      .then((data) => {
        const expiresAt = new Date(data.expiresAt).getTime();
        const startTime = Date.now();
        const total = 900000//expiresAt - startTime;

        const countdownEl = document.getElementById("countdown");
        const progressBar = document.getElementById("progressBar");

        const timer = setInterval(() => {
          const now = Date.now();
          const diff = expiresAt - now;

          if (diff <= 0) {
            countdownEl.textContent = "Сессия истекла";
            progressBar.style.width = "0%";
            progressBar.style.background = "#f44336";
            clearInterval(timer);
            return;
          }

          // вычисляем оставшийся процент
          const percent = (diff / total) * 100;
          
          progressBar.style.width = percent + "%";
          countdownEl.textContent = percent.toFixed(0) + "%"//formatTime(diff);
        }, 1000);
      });