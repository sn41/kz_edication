function createMenu(labelText, id, options) {
    let html = `<label>${labelText}: <select id="${id}-menu">`;
    options.forEach(optionValue => {
        html += `<option value="${optionValue}">${optionValue}</option>`;
    });
    html += `</select></label>`;
    return html;
}

// Пример использования:
const typeOptions = ["college", "university"];
const baseOptions = ["9 класс", "11 класс", "ТИПО"];

// Вставьте typeSelectHTML и baseSelectHTML в нужные места на HTML странице
document.getElementById('base').innerHTML = createMenu("База", "base", baseOptions);
document.getElementById('type').innerHTML = createMenu("Тип", "type", typeOptions);
