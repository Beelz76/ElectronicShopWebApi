async function getTypes() {
    try {
        const response = await fetch(
            "https://localhost:7210/api/Type/GetTypes",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();

            const typeTable = document.getElementById("typeTable");
            typeTable.innerHTML = "";

            data.forEach((type) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${type.typeUid}</td>
                <td>${type.name}</td>
                <td style="text-align: center;"><input type="checkbox" value="${type.typeUid}"></td>
            `;
                typeTable.appendChild(row);
            });
        } else {
            console.log(await response.text());
            location.reload(true);
            throw new Error("���-�� ����� �� ���");
        }
    } catch (error) {
        console.error(error);
    }
}

async function createType() {
    const typeName = document.getElementById("typeName").value;

    if (!typeName) {
        alert("������� �������� ����");
        return;
    }

    try {
        const response = await fetch(
            `https://localhost:7210/api/Type/CreateType?name=${typeName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );

        const data = await response.text();

        if (response.ok) {
            console.log(data);
            getTypes();
        } else {
            console.log(data);
            throw new Error("���-�� ����� �� ���");
        }
    } catch (error) {
        console.error(error);
        alert("������");
    }
}

async function updateType() {
    const typeName = document.getElementById("typeName").value;

    const selectedCheckboxes = document.querySelectorAll(
        '#typeTable input[type="checkbox"]:checked'
    );

    if (selectedCheckboxes.length !== 1) {
        alert("�������� ���� ���");
        return;
    }

    if (!typeName) {
        alert("������� �������� ����");
        return;
    }

    const uid = selectedCheckboxes[0].value;

    try {
        const response = await fetch(
            `https://localhost:7210/api/Type/UpdateType?typeUid=${uid}&name=${typeName}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );

        const data = await response.text();

        if (response.ok) {
            console.log(data);
            getTypes();
        } else {
            console.log(data);
            throw new Error("�� ������� �������� ���");
        }
    } catch (error) {
        console.error(error);
        alert("������");
    }
}

async function deleteType() {
    const selectedCheckboxes = document.querySelectorAll(
        '#typeTable input[type="checkbox"]:checked'
    );

    if (selectedCheckboxes.length === 0) {
        alert("�������� ���� �� ���� ���");
        return;
    }

    let uids = [];
    for (let i = 0; i < selectedCheckboxes.length; i++) {
        if (selectedCheckboxes[i].checked) {
            uids.push(selectedCheckboxes[i].value);
        }
    }

    uids.forEach(async (uid) => {
        try {
            const response = await fetch(
                `https://localhost:7210/api/Type/DeleteType?typeUid=${uid}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            const data = await response.text();

            if (response.ok) {
                console.log(data);
                getTypes();
            } else {
                console.log(data);
                throw new Error("���-�� ����� �� ���");
            }
        } catch (error) {
            console.error(error);
            alert("������");
        }
    });
}
