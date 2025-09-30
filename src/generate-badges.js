const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function generateBadge(label, value, color) {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='20' role='img' aria-label='${label}: ${value}'>
        <title>${label}: ${value}</title>
        <rect width='75' height='20' fill='#555'/>
        <rect x='75' width='75' height='20' fill='${color}'/>
        <text x='37.5' y='14' fill='#fff' font-family='Verdana' font-size='11' text-anchor='middle'>${label}</text>
        <text x='112.5' y='14' fill='#fff' font-family='Verdana' font-size='11' text-anchor='middle'>${value}</text>
    </svg>`;
}

function getBadgeColor(percentage) {
    if (percentage >= 75) return '#4c1'; // Green
    if (percentage >= 50) return '#dfb317'; // Yellow
    return '#e05d44'; // Red
}

function extractCoverageAndGenerateBadges(document) {
    const coverageElements = document.querySelectorAll('.clearfix .fl.pad1y.space-right2');
    const badges = [];

    coverageElements.forEach(element => {
        const valueText = element.querySelector('.strong').textContent.trim();
        const labelText = element.querySelector('.quiet').textContent.trim();
        const percentage = parseFloat(valueText.replace('%', ''));
        const badgeColor = getBadgeColor(percentage);

        const badge = generateBadge(labelText, valueText, badgeColor);
        badges.push({ label: labelText, svg: badge });
    });

    return badges;
}

async function main() {
    const filePath = path.resolve(__dirname, 'coverage/index.html');

    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;

        const badges = extractCoverageAndGenerateBadges(document);

        // Save the badges as individual SVG files
        const outputDir = path.resolve(__dirname, 'badges');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        badges.forEach(({ label, svg }) => {
            const fileName = `${label.toLowerCase().replace(/\\s+/g, '_')}.svg`;
            fs.writeFileSync(path.join(outputDir, fileName), svg, 'utf-8');
            console.log(`Generated badge: ${fileName}`);
        });

        console.log('Badges have been generated and saved in the "badges" directory.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
