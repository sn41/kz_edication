// js/inst_details.js
const instituteCode = "institute-code";
const instituteType = "institute-type";
const instituteName = "institute-name";
const loadInstDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const savedInstituteCode = urlParams.get(instituteCode);


    if (!savedInstituteCode) {
        document.getElementById("error").innerText = "Не указан код учебного заведения.";
        return;
    }

    //сохраняем в локальном хранилище
    localStorage.setItem(instituteCode, savedInstituteCode);


    const params = new URLSearchParams({
        action: "institute-details",
        code: savedInstituteCode,
    });

    try {
        const response = await fetch(`search.php?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("error").innerText = `Ошибка: ${data.error}`;
        } else {
            const {name, code: instCode, type, region, city, website} = data.result;
            document.getElementById("details").innerHTML = `
        <h2>${name}</h2>
        <p><strong>Код:</strong> ${instCode}</p>
        <p><strong>Тип:</strong> ${type}</p>
        <p><strong>Регион:</strong> ${region}</p>
        <p><strong>Город:</strong> ${city}</p>
        ${website ? `<p><strong>Веб-сайт:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ""}
      `;

            localStorage.setItem(instituteType, type);
            localStorage.setItem(instituteName, name);
        }
    } catch (err) {
        document.getElementById("error").innerText = `Ошибка: ${err}`;
    }
};

// Заполнение формы данных учебного заведения сразу при загрузке страницы
window.onload = loadInstDetails;


//js/specialities.js
const searchSpecialitiesByInstitute = async () => {

// Получаем от страницы регионов из локального хранилища выбранный регион, помещаем в строку поиска
    const savedRegion = localStorage.getItem('region');
    const savedCity = localStorage.getItem('city');
    // const savedInstituteCode = localStorage.getItem(instituteCode);
    const savedInstituteType = localStorage.getItem(instituteType);
    const savedInstituteName = localStorage.getItem(instituteName);


    const specialityName = document.getElementById("speciality").value || "";

    const base = document.getElementById("base-menu").value;

    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerText = "";

    const params = new URLSearchParams({
        action: "specialities",
        region: savedRegion,
        city: savedCity,
        institute_name: savedInstituteName,
        speciality_name: specialityName,
        type: savedInstituteType,
        base,
    });

    try {
        const response = await fetch(`search.php?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("error").innerText = `Ошибка: ${data.error}`;
        } else {
            let html = "<ul>";
            data.results.forEach(({code, name}) => {
                html += `<li>
                <p>${code}  <a href="speciality-details.html?speciality_code=${encodeURIComponent(code)}">${name}</a></p>
                </li>`;
            });
            html += "</ul>";

            document.getElementById("result").innerHTML = html;

        }
    } catch (err) {
        document.getElementById("error").innerText = `Ошибка: ${err}`;
    }
};

searchSpecialitiesByInstitute()