document.addEventListener("DOMContentLoaded", function() {
    const sectionConverter = document.getElementById("converter");
    const sectionMain = document.getElementById("main");
    const sectionLinks = document.getElementById("links");
    const sectionText1 = document.getElementById("sec-1");
    const sectionText2 = document.getElementById("sec-2");
    const bar1 = document.getElementById("bar-1");
    const bar2 = document.getElementById("bar-2");
    const inputUrlElement = document.getElementById("inputUrl");
    const inputFNElement = document.getElementById("input-FN");
    const outputTextElementQuality = document.getElementById("down");
    const copyButton = document.getElementById("copyButton");
    const convertButton = document.getElementById("convertButton");
    const clearButton = document.getElementById("clearButton");
    const historyLink = document.getElementById("history");
    const clearMsg = document.getElementById("clearMsg");
    const darkButton = document.getElementById("dark");
    const lightButton = document.getElementById("light");
    const body = document.getElementById("body");
    const txt1 = document.getElementById("txt-1");
    const txt2 = document.getElementById("txt-2");
    const previousLinksContainer = document.getElementById("previousLinks");

    // Dark mode
    darkButton.addEventListener("click", function() {
        lightButton.style.display = "block";
        darkButton.style.display = "none";
        body.style.background = "black";
        txt1.style.color = "white";
        txt2.style.color = "white";
    });

    lightButton.addEventListener("click", function() {
        lightButton.style.display = "none";
        darkButton.style.display = "block";
        body.style.background = "white";
        txt1.style.color = "black";
        txt2.style.color = "black";
    });

    // Load previously converted links from local storage
    let previousLinks = JSON.parse(localStorage.getItem("previousLinks")) || [];

    // Function to update the list of previous links in local storage
    function updatePreviousLinks(newLink) {
        previousLinks.unshift(newLink); // Add the new link at the beginning
        if (previousLinks.length > 15) {
            previousLinks.pop(); // Remove the oldest link if there are more than 15
        }
        localStorage.setItem("previousLinks", JSON.stringify(previousLinks));
    }

    // Function to display the list of previous links
    function displayPreviousLinks() {
        previousLinksContainer.innerHTML = "";
        if (previousLinks.length === 0) {
            clearMsg.style.display = "inline";
            clearButton.style.display = "none";
        } else {
            previousLinks.forEach((link) => {
                const linkElement = document.createElement("p");
                linkElement.textContent = link;
                previousLinksContainer.appendChild(linkElement);
            });
            clearMsg.style.display = "none";
            clearButton.style.display = "inline";
        }
    }

    // Display previous links on page load
    displayPreviousLinks();

    // Click On converter
    sectionLinks.addEventListener("click", function() {
        sectionText1.style.color = "white";
        sectionText2.style.color = "rgb(4, 213, 250)";
        bar2.style.width = "100%";
        bar1.style.width = "0";
        sectionMain.style.display = "none";
        historyLink.style.display = "block";
    });

    sectionConverter.addEventListener("click", function() {
        sectionText2.style.color = "white";
        sectionText1.style.color = "rgb(4, 213, 250)";
        bar1.style.width = "100%";
        bar2.style.width = "0";
        sectionMain.style.display = "block";
        historyLink.style.display = "none";
    });

    convertButton.addEventListener("click", function() {
        const inputUrl = inputUrlElement.value;
        const [convertedLink] = convertUrl(inputUrl);

        outputTextElementQuality.textContent = convertedLink;
        copyButton.setAttribute("data-clipboard-text-qlt", convertedLink); // Set the text to copy
        clearMsg.style.display = "none";

        // Update the list of previous links and display them      
        if (convertedLink !== "Invalid input URL") {
            outputTextElementQuality.textContent = convertedLink;
            copyButton.style.display = "block"; // Show the copy button
            copyButton.setAttribute("data-clipboard-text-qlt", convertedLink); // Set the text to copy
            clearButton.style.display = "inline";
            // Update the list of previous links and display them
            updatePreviousLinks(convertedLink);
            displayPreviousLinks();
        }
    });

    copyButton.addEventListener("click", function() {
        const textToCopy = this.getAttribute("data-clipboard-text-qlt");

        const tempInput = document.createElement("input");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        alert("URL copied to clipboard!");
    });

    clearButton.addEventListener("click", function() {
        // Clear all previous outputs from local storage and the displayed list
        previousLinks = [];
        localStorage.removeItem("previousLinks");
        displayPreviousLinks();
        clearMsg.style.display = "inline";
        clearMsg.style.color = "rgb(2, 190, 224)";
    });

    function convertUrl(inputUrl) {
        const parts = inputUrl.split('/');
        if (parts.length < 7) {
            return ["Invalid input URL"];
        }

        const uniqueId = parts[3];
        const inputFN = inputFNElement.value;
        const convertedLink = `${inputFN}: https://pw-url-api.onrender.com/process?v=https://d1d34p8vz63oiq.cloudfront.net/${uniqueId}/master.mpd&quality=720`;

        return [convertedLink, uniqueId];
    }
});
