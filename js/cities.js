// js/cities.js

// Получаем от страницы регионов выбранный регион, помещаем в строку поиска
const urlParams = new URLSearchParams(window.location.search);
const savedRegion = urlParams.get('region');


// Если мы не хотим использовать строку поиска для региона - закомментируем
// document.getElementById('region').value = savedRegion; // если используем строку поиска региона, вставляем в строку поиска

localStorage.setItem('region', savedRegion); //сохраняем в локальном хранилище


const searchCities = async () => {
    // Если мы не хотим использовать строку поиска для региона - закомментируем
    // const region = document.getElementById("region").value || "";

    const city = document.getElementById("city").value || "";
    // Обращаемся к элементам выпадающих списков, созданных utils.js,
    // там для них определены id=type-menu и id=base-menu
    const type = document.getElementById("type-menu").value;
    const base = document.getElementById("base-menu").value;

    const result_out = document.getElementById("result");
    const error_out = document.getElementById("error");

    result_out.innerHTML = "";
    error_out.innerText = "";

    const params = new URLSearchParams({
        action: "cities",
        // region, //если используем строку поиска для региона
        region: savedRegion, // Используем savedRegion, если не хотим использовать строку поиска для региона
        city,
        type,
        base,
    });

    try {
        const response = await fetch(`search.php?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
            error_out.innerText = `Ошибка: ${data.error}`;
        } else {
            let html = "<ul>";
            data.results.forEach(({name, region, logo_path}) => {
                html += `<li>`;
                if (logo_path) {
                    html += `<img src="${logo_path}" alt="${name}" width="50" height="50"> `;
                }
                // Ссылка перехода на страницу institutes.html с передачей региона и имени города данной строки списка name
                html += `<a href="institutes.html?region=${encodeURIComponent(region)}&city=${encodeURIComponent(name)}">${name}</a>`;
                html += ` (${region})`;
                html += `</li>`;
            });
            html += "</ul>";
            result_out.innerHTML = html;
        }
    } catch (err) {
        error_out.innerText = `Ошибка: ${err}`;
    }
};

// Выполняем первый поиск сразу по загрузке страницы.
searchCities()