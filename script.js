// Project descriptions and links as a single JavaScript object
const projects = {
    'RTST': {
        description: '"Rtst" is a Python package for comprehensive speech processing. It integrates speech recognition, language detection, translation, and text-to-speech functionalities into a single, easy-to-use function.',
        link: 'https://github.com/SweatyCrayfish/Real-Time-Speech-Translator-rtst'
    },
    'Simple Deployment': {
        description: 'This project is a chatbot interface that integrates the Hugging Face Transformers library with a Flask backend. It serves a frontend built with HTML, CSS, and JavaScript to interact with the user. The user can input text, which is then processed by the Flask backend and fed into a pre-trained language model. The model-generated text is then sent back to the frontend and displayed.',
        link: 'https://github.com/SweatyCrayfish/simple-deployment/tree/main'
    },
    'Ubuntu Llama-2-7B': {
        description: 'Building dialogue systems, where a human can have a natural-feeling conversation with a virtual agent, is a challenging task in Natural Language Processing and the focus of much ongoing research. Some of the challenges include linking references to the same entity over time, tracking what has happened in the conversation previously, and generating appropriate responses. This paper delves into our experiment in building such a virtual agent. We scrutinized various models such as CodeLLaMa, OPT, FlanT5, and Llama2. We outline the rationale behind our choice of Llama2-chat-instruct and how the model stands out due to its high-quality, instruction-tuned capabilities, and inherent ability for summarizing text. To further augment the quality of inferences drawn by the model, we implement a complete fine-tuning approach. Furthermore, we will explore Parameter Efficient Fine-Tuning (PEFT), demonstrating how it reduces memory and time resource requirements while maintaining model performance. Finally, we will assess these results using ROUGE metrics - a popular choice for evaluating models - and deploy the model to Hugging Face for serving.',
        link: 'https://github.com/SweatyCrayfish/Ubuntu-Lllama-2/tree/main'
    },
    'Web-Scraping-NLP': {
        description: 'Designed to extract text from video. Extract question description for videos if it does exist, including a time stamps',
        link: 'https://github.com/SweatyCrayfish/Web-Scraping-NLP'
    },
    'Cyber-Security': {
        description: 'Test for most cybersecurity vulnerabilities before software release.',
        link: 'https://github.com/SweatyCrayfish/Cyber-Security'
    },
    'Real-world-model-test': {
        description: 'We use the CRAFT test set, which contains about 1.2 million raw characters, for benchmarking the syntactic analysis pipeline, and the test split of the JNLPBA NER dataset, which contains about 101,000 tokens, for benchmarking the NER task.',
        link: 'https://github.com/SweatyCrayfish/Real-world-model-test'
    },
    'Google-Apps': {
        description: 'This project was created to increase the quality of app development and decrease the cost of app development by increasing the success rate of an app during its execution.',
        link: 'https://github.com/SweatyCrayfish/Google-Apps'
    }
};

// Get all project frames
const projectFrames = document.querySelectorAll('.project-frame');
// Get the project description element
const projectDescriptionElement = document.getElementById('project-description');
// Get the learn more link
const learnMoreLink = document.getElementById('learn-more');

// Event listeners to project frames
projectFrames.forEach(frame => {
    frame.addEventListener('click', () => {
        // Retrieve the project name from the data attribute
        const projectName = frame.getAttribute('data-project');
        projectDescriptionElement.textContent = projects[projectName].description;
        learnMoreLink.href = projects[projectName].link;
        projectFrames.forEach(f => f.classList.remove('active'));
        frame.classList.add('active');
        document.getElementById('project-description-container').classList.add('active');
        document.getElementById('project-description-container').style.display = 'block';
    });
});

// Simulate a click on the first project frame
if (projectFrames.length > 0) {
    projectFrames[0].click();
}

// Circle positions for each section
const circlePositions = {
    summary: [
        { top: '10%', left: '10%' },
        { top: '30%', left: '70%' },
        { top: '50%', left: '20%' },
        { top: '70%', left: '60%' },
        { top: '90%', left: '40%' },
    ],
    skills: [
        { top: '20%', left: '80%' },
        { top: '40%', left: '30%' },
        { top: '60%', left: '50%' },
        { top: '80%', left: '10%' },
        { top: '30%', left: '50%' },
    ],
    projects: [
        { top: '15%', left: '60%' },
        { top: '35%', left: '20%' },
        { top: '55%', left: '70%' },
        { top: '75%', left: '30%' },
        { top: '95%', left: '50%' },
    ],
    contact: [
        { top: '25%', left: '40%' },
        { top: '45%', left: '80%' },
        { top: '65%', left: '20%' },
        { top: '85%', left: '60%' },
        { top: '35%', left: '10%' },
    ]
};

// Function to move circles to the positions for a specific section
function moveCirclesToPositions(section) {
    const circles = document.querySelectorAll('.circle');
    const positions = circlePositions[section];
    circles.forEach((circle, index) => {
        const position = positions[index];
        circle.style.transition = `all 1s ease-in-out`;
        circle.style.top = position.top;
        circle.style.left = position.left;
    });
}

// Intersection Observer for sections
const sections = document.querySelectorAll('.content-section');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            moveCirclesToPositions(sectionId);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Initial positions
moveCirclesToPositions('summary');

// Smooth scroll for sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ----------------------------------------------------------------------------------
// Chatbot functionality
// ----------------------------------------------------------------------------------

let chatHistory = [];

document.getElementById('chatbot-header').addEventListener('click', () => {
    const chatbotBody = document.getElementById('chatbot-body');
    chatbotBody.style.display = chatbotBody.style.display === 'none' || chatbotBody.style.display === '' ? 'flex' : 'none';
});

async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
        appendMessage(message, 'user');
        input.value = '';
        chatHistory.push({ role: 'user', content: message });

        try {
            const response = await fetch('https://y6wp4nhty2.execute-api.us-east-2.amazonaws.com/prod/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: chatHistory })
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data); 

            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                const chatContent = data.choices[0].message.content;
                appendMessage(chatContent, 'bot');
                chatHistory.push({ role: 'assistant', content: chatContent });

            } else {
                throw new Error('Response structure is not as expected.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}

function appendMessage(text, type) {
    const messageElement = document.createElement('p');
    messageElement.textContent = text;
    if (type === 'bot') {
        messageElement.style.backgroundColor = '#555';
    } else if (type === 'error') {
        messageElement.style.backgroundColor = 'red';
    }
    document.getElementById('chatbot-messages').appendChild(messageElement);
}

document.getElementById('chatbot-send').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
