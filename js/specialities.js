//js/specialities.js
const searchSpecialities = async () => {
    const region = document.getElementById("region").value || "";
    const city = document.getElementById("city").value || "";
    const instituteName = document.getElementById("institute").value || "";
    const specialityName = document.getElementById("speciality").value || "";
    const type = document.getElementById("type").value;
    const base = document.getElementById("base").value;

    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerText = "";

    const params = new URLSearchParams({
        action: "specialities",
        region,
        city,
        institute_name: instituteName,
        speciality_name: specialityName,
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
            data.results.forEach(({ code, name }) => {
                html += `<li><a href="speciality-details.js${encodeURIComponent(code)}">${name}</a></li>`;
            });
            html += "</ul>";
            document.getElementById("result").innerHTML = html;
        }
    } catch (err) {
        document.getElementById("error").innerText = `Ошибка: ${err}`;
    }
};