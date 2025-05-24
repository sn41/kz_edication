// js/inst_by_spec.js
const searchInstBySpec = async () => {
    const spec = document.getElementById("speciality").value || "";
    const city = document.getElementById("city").value || "";
    const type = document.getElementById("type").value;
    const base = document.getElementById("base").value;

    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerText = "";

    const params = new URLSearchParams({
        action: "inst_by_spec",
        spec,
        city,
        type,
        base,
    });

    try {
        const response = await fetch(`search.php?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("error").innerText = `Ошибка: ${data.error}`;
        } else {
            let html = "<ul>";
            data.results.forEach(({ logo_path, name, code, city, website }) => {
                html += `<li>`;
                if (logo_path) {
                    html += `<img src="${logo_path}" alt="${name}" width="50" height="50"> `;
                }
                html += `<a href="inst_details.html?code=${encodeURIComponent(code)}">${name}</a>`;
                html += ` (${city})`;
                if (website) {
                    html += ` - <a href="${website}" target="_blank">Сайт</a>`;
                }
                html += `</li>`;
            });
            html += "</ul>";
            document.getElementById("result").innerHTML = html;
        }
    } catch (err) {
        document.getElementById("error").innerText = `Ошибка: ${err}`;
    }
};

searchInstBySpec()