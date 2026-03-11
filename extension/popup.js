// Cursus AI Extension - Popup Logic
document.getElementById('autofill-btn').addEventListener('click', async () => {
    const statusText = document.getElementById('status-text');
    statusText.innerText = "Analyzing Page...";
    
    // Simulate finding form fields
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: autofillProcess
        });
    });

    setTimeout(() => {
        statusText.innerText = "Application Autofilled!";
        alert("Cursus AI: Form fields detected and populated based on your profile.");
    }, 1500);
});

function autofillProcess() {
    // This runs in the context of the webpage
    console.log("Cursus AI: Starting autofill...");
    const fields = document.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        const name = (field.name || field.id || field.placeholder || "").toLowerCase();
        
        // Simple heuristic matching
        if (name.includes('name') || name.includes('full')) field.value = "John Doe";
        if (name.includes('email')) field.value = "john@example.com";
        if (name.includes('phone')) field.value = "+1 (555) 000-0000";
        if (name.includes('linkedin')) field.value = "https://linkedin.com/in/johndoe";
        if (name.includes('website') || name.includes('portfolio')) field.value = "https://johndoe.dev";
    });
}

document.getElementById('optimize-btn').addEventListener('click', () => {
    alert("Cursus AI: Analyzing job description... Match Score: 92%. Suggestions: Highlight your experience with React and System Design.");
});
