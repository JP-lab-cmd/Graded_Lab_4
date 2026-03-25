const compareBtn = document.getElementById("compare-btn");
const clearBtn = document.getElementById("clear-btn");

const expected = document.getElementById("expected");
const actual = document.getElementById("actual");

const result = document.getElementById("result");

compareBtn.addEventListener("click", function () {
    result.innerHTML = "";
    result.className = "";

    let expectedText = expected.value.trim();
    let actualText = actual.value.trim();
    if (expectedText === "" && actualText === "") {
        result.innerHTML = "<li>Please enter text in both areas</li>";
        return;
    }

    let expectedLines = expectedText.split("\n");
    let actualLines = actualText.split("\n");

    let differences = [];

    if (expectedLines.length !== actualLines.length) {
        let li = document.createElement("li");
        li.textContent = `Line count differs: Expected ${expectedLines.length}, Actual ${actualLines.length}`;
        result.appendChild(li);
    }

    let maxLength = Math.max(expectedLines.length, actualLines.length);

    for (let i = 0; i < maxLength; i++) {
        if (expectedLines[i] !== actualLines[i]) {
            let li = document.createElement("li");
            li.textContent = `Line ${i + 1} differs:\nExpected: ${expectedLines[i] || ""}\nActual: ${actualLines[i] || ""}`;
            result.appendChild(li);
            differences.push(li);
        }
    }

    if (differences.length > 0) {
        result.classList.add("change");

        let msg = document.createElement("li");
        msg.textContent = "Texts are different";
        result.prepend(msg);
    } else {
        result.classList.add("nochange");

        let li = document.createElement("li");
        li.textContent = "No differences found";
        result.appendChild(li);
    }
});

clearBtn.addEventListener("click", function () {
    expected.value = "";
    actual.value = "";
    result.innerHTML = "";
    result.className = "";
});