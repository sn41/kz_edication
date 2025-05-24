// js/spec_details.js
const loadSpecDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const specialityCode = urlParams.get("speciality_code");

    if (!specialityCode) {
        document.getElementById("error").innerText = "Не указан код специальности.";
        return;
    }

    const params = new URLSearchParams({
        action: "speciality-details",
        code:specialityCode,
    });

    try {
        const response = await fetch(`search.php?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("error").innerText = `Ошибка: ${data.error}`;
        } else {
            const { name, code: specCode, tasks, competencies, tools } = data.result;
            const html = `
        <h2>${name}</h2>
        <p><strong>Код:</strong> ${specCode}</p>
        <div><strong>Задачи:</strong> ${tasks}</div>
        <div><strong>Компетенции:</strong> ${competencies}</div>
        <div><strong>Инструменты и технологии:</strong> ${tools}</div>
        <p><a href="institute-by-speciality.html?speciality=${encodeURIComponent(name)}">Список учреждений с этой специальностью</a></p>
      `;
            document.getElementById("details").innerHTML = html;
        }
    } catch (err) {
        document.getElementById("error").innerText = `Ошибка: ${err}`;
    }
};

window.onload = loadSpecDetails;