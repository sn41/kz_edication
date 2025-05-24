// js/regions.js

const searchRegions = async () => {
    const region = document.getElementById("region").value || "";
    const type = document.getElementById("type-menu")?.value;
    const base = document.getElementById("base-menu")?.value;

    const result_out = document.getElementById("result");
    const error_out = document.getElementById("error");

    result_out.innerHTML = "";
    error_out.innerText = "";

    const params = new URLSearchParams({
        action: "regions",
        region,
        type,
        base,
    });

    try {
        const response = await fetch(`search.php?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
            // Выводим ошибку данных в элементе с id = "error"
            error_out.innerText = `Ошибка: ${data.error}`;
        } else {

            let html = "<ul>";
            data.results.forEach(({ logo_path, name }) => {
                html += `<li>`;
                if (logo_path) {
                    html += `<img src="${logo_path}" alt="${name}" width="50" height="50"> `;
                }
                // Ссылка перехода на страницу cities.html с передачей имени региона данной строки списка name
                html += `<a href="cities.html?region=${encodeURIComponent(name)}">${name}</a>`;
                html += `</li>`;
            });
            html += "</ul>";
            // Выводим список в элементе с id = "result"
            result_out.innerHTML = html;


        }
    } catch (error) {
        // Выводим ошибку обмена данными в элементе с id = "error"
        error_out.innerText = `Ошибка: ${error}`;
    }
};


// Выполняем первый поиск сразу по загрузке страницы.
searchRegions()