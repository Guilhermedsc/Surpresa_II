fetch("cantadas.json")
    .then((response) => response.json())
    .then((cantadas) => {
        let currentOrder = "desc"

        function renderCantadas(limit = 10) {
            const container = document.getElementById("cantadasContainer")
            container.innerHTML = ""

            const sortedCantadas = cantadas.sort((a, b) => {
                return currentOrder === "desc" ? b.id - a.id : a.id - b.id
            })

            sortedCantadas.slice(0, limit).forEach((cantada) => {
                const div = document.createElement("div")
                div.classList.add("cantada")
                div.innerHTML = `
                    <h3>${cantada.id}</h3>
                    <p>${cantada.text}</p>
                    <small>Data: ${cantada.date} | Hora: ${cantada.time}</small>
                `
                container.appendChild(div)
            })
        }

        document.getElementById("toggleOrder").addEventListener("click", () => {
            currentOrder = currentOrder === "desc" ? "asc" : "desc"
            document.getElementById("toggleOrder").innerText = currentOrder === "desc" ? "Ordem: Mais recentes" : "Ordem: Mais antigas"
            renderCantadas(parseInt(document.getElementById("itemsPerPage").value))
        })

        document.getElementById("itemsPerPage").addEventListener("change", (event) => {
            renderCantadas(parseInt(event.target.value))
        })

        renderCantadas()
    })
    .catch((error) => console.error("Erro ao carregar as cantadas:", error))
