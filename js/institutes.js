// js/institutes.js

// Получаем от страницы городов выбранный город, помещаем в строку поиска
const urlParams = new URLSearchParams(window.location.search);

const savedCity = urlParams.get('city');
// document.getElementById('city').value = savedCity; // вставляем в строку поиска
localStorage.setItem('city', savedCity); //сохраняем в локальном хранилище

// Получаем от страницы регионов из локального хранилища выбранный регион, помещаем в строку поиска
const savedRegion = localStorage.getItem('region');
// document.getElementById('region').value = region; // вставляем в строку поиска


const searchInstitutes = async () => {
    // const region = document.getElementById("region").value || "";
    // const city = document.getElementById("city").value || "";

    const institute = document.getElementById("institute").value || "";
    const type = document.getElementById("type-menu").value;
    const base = document.getElementById("base-menu").value;

    const result_out = document.getElementById("result");
    const error_out = document.getElementById("error");

    result_out.innerHTML = "";
    error_out.innerText = "";

    const params = new URLSearchParams({
        action: "institutes",
        // region,
        region:savedRegion,
        // city,
        city:savedCity,
        institute,
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
            data.results.forEach(({ logo_path, name, code: instituteCode, city, region, website }) => {
                html += `<li>`;
                if (logo_path) {
                    html += `<img src="${logo_path}" alt="${name}" width="50" height="50"> `;
                }
                // Ссылка перехода на страницу institute-details.html с передачей кода института
                html += `<a href="institute-details.html?institute-code=${encodeURIComponent(instituteCode)}">${name}</a>`;
                html += ` (${city}, ${region})`;
                if (website) {
                    html += ` - <a href="${website}" target="_blank">Сайт</a>`;
                }
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
searchInstitutes()