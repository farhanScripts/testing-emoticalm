async function fetchAffirmation() {
  try {
    const response = await fetch('/api/affirmation');
    if (!response.ok) {
      throw new Error('Failed to fetch affirmation');
    }
    const data = await response.json();
    return data.affirmation;
  } catch (error) {
    console.error('Error fetching affirmation:', error);
    throw error;
  }
}

async function typeWriterEffect(textElement, text, speed) {
  let i = 0;
  while (i < text.length) {
    textElement.innerHTML += text.charAt(i);
    i++;
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
}

async function displayAffirmation() {
  const affirmationContainer = document.getElementById('affirmation-container');
  const affirmationText = document.createElement('h5');
  affirmationText.classList.add('affirmation', 'fst-italic');
  affirmationContainer.appendChild(affirmationText);

  try {
    const affirmation = await fetchAffirmation();
    await typeWriterEffect(affirmationText, `"${affirmation}"`, 50);
  } catch (error) {
    console.error('Error displaying affirmation:', error);
  }
}

displayAffirmation();
