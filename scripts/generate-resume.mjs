import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateExactResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard Letter / A4 page size
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldOblique = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

  const black = rgb(0.1, 0.1, 0.1);
  const blue = rgb(0.1, 0.35, 0.7);
  const darkGray = rgb(0.2, 0.2, 0.2);
  const lineGray = rgb(0.7, 0.7, 0.7);

  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  // Helper for word wrapping
  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y1 = pageHeight - 45;

  // Name (Centered)
  const nameText = 'Mohamed Islam Elshourbagy';
  const nameSize = 17;
  const nameWidth = fontBold.widthOfTextAtSize(nameText, nameSize);
  page1.drawText(nameText, {
    x: (pageWidth - nameWidth) / 2,
    y: y1,
    size: nameSize,
    font: fontBold,
    color: black,
  });
  y1 -= 16;

  // Contact Info (Centered)
  const contactPart1 = 'Alexandria ,Egypt | +201280806343 | ';
  const linkedInText = 'LinkedIn';
  const contactPart2 = ' | ';
  const githubText = 'Github';
  const contactSize = 9.5;

  const w1 = fontRegular.widthOfTextAtSize(contactPart1, contactSize);
  const w2 = fontRegular.widthOfTextAtSize(linkedInText, contactSize);
  const w3 = fontRegular.widthOfTextAtSize(contactPart2, contactSize);
  const w4 = fontRegular.widthOfTextAtSize(githubText, contactSize);
  const totalContactWidth = w1 + w2 + w3 + w4;
  let curX = (pageWidth - totalContactWidth) / 2;

  page1.drawText(contactPart1, { x: curX, y: y1, size: contactSize, font: fontRegular, color: darkGray });
  curX += w1;

  page1.drawText(linkedInText, { x: curX, y: y1, size: contactSize, font: fontRegular, color: blue });
  curX += w2;

  page1.drawText(contactPart2, { x: curX, y: y1, size: contactSize, font: fontRegular, color: darkGray });
  curX += w3;

  page1.drawText(githubText, { x: curX, y: y1, size: contactSize, font: fontRegular, color: blue });
  y1 -= 22;

  function drawHeading(page, title, y) {
    page.drawText(title, {
      x: margin,
      y: y,
      size: 10.5,
      font: fontBold,
      color: black,
    });
    const lineY = y - 4;
    page.drawLine({
      start: { x: margin, y: lineY },
      end: { x: pageWidth - margin, y: lineY },
      thickness: 0.8,
      color: lineGray,
    });
    return lineY - 12;
  }

  // 1. PROFESSIONAL SUMMARY
  y1 = drawHeading(page1, 'PROFESSIONAL SUMMARY', y1);
  const summaryText = "Computer Science & AI student at Alamein International University with hands-on experience building intelligent systems, NLP pipelines, and full-stack AI applications. Proficient in Python, machine learning, deep learning, and REST API development, with practical exposure to containerized deployment, graph algorithms, and real-time systems. Demonstrated ability to deliver complete projects end-to-end from data preprocessing and model training to frontend integration and deployment. Seeking ML engineering roles to apply AI expertise in production environments.";
  const summaryLines = wrapText(summaryText, contentWidth, fontRegular, 9.5);
  for (const line of summaryLines) {
    page1.drawText(line, { x: margin, y: y1, size: 9.5, font: fontRegular, color: darkGray });
    y1 -= 13;
  }
  y1 -= 8;

  // 2. EDUCATION
  y1 = drawHeading(page1, 'EDUCATION', y1);
  page1.drawText('BSc Computer Science — Artificial Intelligence', {
    x: margin,
    y: y1,
    size: 10,
    font: fontBold,
    color: black,
  });
  const eduDate = 'Oct 2022 – Jul 2026 (Expected)';
  const eduDateW = fontOblique.widthOfTextAtSize(eduDate, 9.5);
  page1.drawText(eduDate, {
    x: pageWidth - margin - eduDateW,
    y: y1,
    size: 9.5,
    font: fontOblique,
    color: darkGray,
  });
  y1 -= 13;

  page1.drawText('Al Alamein International University (AIU), Egypt', {
    x: margin,
    y: y1,
    size: 9.5,
    font: fontOblique,
    color: darkGray,
  });
  y1 -= 14;

  const eduBullet = '• Specialization in Artificial Intelligence covering machine learning, deep learning, NLP, algorithms, and software engineering.';
  const eduBulletLines = wrapText(eduBullet, contentWidth - 10, fontRegular, 9.5);
  for (const line of eduBulletLines) {
    page1.drawText(line, { x: margin + 8, y: y1, size: 9.5, font: fontRegular, color: darkGray });
    y1 -= 13;
  }
  y1 -= 8;

  // 3. EXPERIENCE
  y1 = drawHeading(page1, 'EXPERIENCE', y1);

  // Exp 1: Game Dev
  page1.drawText('Game Development & Animation Intern', {
    x: margin,
    y: y1,
    size: 10,
    font: fontBold,
    color: black,
  });
  const exp1Date = 'Jul 2025 – Sep 2025';
  const exp1DateW = fontOblique.widthOfTextAtSize(exp1Date, 9.5);
  page1.drawText(exp1Date, {
    x: pageWidth - margin - exp1DateW,
    y: y1,
    size: 9.5,
    font: fontOblique,
    color: darkGray,
  });
  y1 -= 13;

  page1.drawText('City of Scientific Research and Technological Applications (SRTA-City), Egypt — Hybrid', {
    x: margin,
    y: y1,
    size: 9.5,
    font: fontOblique,
    color: darkGray,
  });
  y1 -= 14;

  const exp1Bullets = [
    '• Developed 3D character models with complete skeletal rigging in Blender, producing fluid animations and realistic movement for in-game characters.',
    '• Implemented AI agent behaviors using Unity’s NavMesh system for intelligent pathfinding and navigation, creating NPCs that dynamically respond to environmental obstacles and player actions.',
    '• Applied character rigging, AI agent behavior programming, and animation pipeline workflows for interactive game development in Unity.',
    '• Built and textured 3D assets using advanced modeling techniques, ensuring performance-optimized assets suitable for real-time rendering.',
  ];

  for (const bullet of exp1Bullets) {
    const lines = wrapText(bullet, contentWidth - 10, fontRegular, 9.5);
    for (const line of lines) {
      page1.drawText(line, { x: margin + 8, y: y1, size: 9.5, font: fontRegular, color: darkGray });
      y1 -= 13;
    }
    y1 -= 2;
  }
  y1 -= 6;

  // Exp 2: ITI
  page1.drawText('Software Development Trainee', {
    x: margin,
    y: y1,
    size: 10,
    font: fontBold,
    color: black,
  });
  const exp2Date = 'Jul 2024 – Aug 2024';
  const exp2DateW = fontOblique.widthOfTextAtSize(exp2Date, 9.5);
  page1.drawText(exp2Date, {
    x: pageWidth - margin - exp2DateW,
    y: y1,
    size: 9.5,
    font: fontOblique,
    color: darkGray,
  });
  y1 -= 13;

  page1.drawText('Information Technology Institute (ITI), Egypt — Hybrid', {
    x: margin,
    y: y1,
    size: 9.5,
    font: fontOblique,
    color: darkGray,
  });
  y1 -= 14;

  const exp2Bullets = [
    '• Developed a full-featured Chat Room Application in Java (JavaFX, FXML, Swing) with user authentication, real-time messaging, and active status indicators.',
    '• Implemented multi-threaded server architecture using Java socket programming to handle simultaneous user connections, improving system reliability and performance.',
    '• Designed responsive and intuitive user interfaces with JavaFX and FXML, applying UI/UX best practices to enhance the user experience.',
    '• Applied concurrent programming and multi-threading concepts to support real-time data processing across connected clients.',
  ];

  for (const bullet of exp2Bullets) {
    const lines = wrapText(bullet, contentWidth - 10, fontRegular, 9.5);
    for (const line of lines) {
      page1.drawText(line, { x: margin + 8, y: y1, size: 9.5, font: fontRegular, color: darkGray });
      y1 -= 13;
    }
    y1 -= 2;
  }
  y1 -= 6;

  // 4. PROJECTS (Title and First Project heading on Page 1)
  y1 = drawHeading(page1, 'PROJECTS', y1);

  const proj1Title = 'Efficient Sentiment Classification using GPT-2, LoRA & Knowledge Distillation';
  const proj1Tech = ' | Python, PyTorch, HuggingFace Transformers, LoRA (PEFT)';
  page1.drawText(proj1Title, {
    x: margin,
    y: y1,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  const proj1TitleW = fontBold.widthOfTextAtSize(proj1Title, 9.5);
  page1.drawText(proj1Tech, {
    x: margin + proj1TitleW,
    y: y1,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });

  // ==========================================
  // PAGE 2
  // ==========================================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - 45;

  // Proj 1 bullets
  const proj1Bullets = [
    '• Designed a parameter-efficient NLP pipeline combining Low-Rank Adaptation (LoRA) with Teacher-Student Knowledge Distillation for sentiment classification, training only 2.15% of total parameters while retaining competitive performance.',
    '• Fine-tuned a full GPT-2 model as a teacher and distilled its knowledge into a LoRA-adapted DistilGPT-2 student using KL-divergence loss with label smoothing and Focal Loss for class imbalance.',
    '• Engineered a hybrid pooling strategy (80% attention pooling, 20% mean pooling) replacing standard finaltoken extraction, producing richer sentence-level embeddings for the classification head.',
    '• Achieved 0.8962 Macro F1 on the IMDB dataset (vs. teacher’s 0.9245) and evaluated on SST-5 fine-grained 5-class sentiment, demonstrating strong generalization under resource constraints.',
    '• Applied Mixed Precision Training, Gradient Accumulation, Gradient Checkpointing, and Cosine LR Scheduling for training stability and efficiency.',
  ];

  for (const bullet of proj1Bullets) {
    const lines = wrapText(bullet, contentWidth - 10, fontRegular, 9.5);
    for (const line of lines) {
      page2.drawText(line, { x: margin + 8, y: y2, size: 9.5, font: fontRegular, color: darkGray });
      y2 -= 13;
    }
    y2 -= 2;
  }
  y2 -= 6;

  // Proj 2
  const proj2Title = 'Intelligent Cairo Transportation System';
  const proj2Tech = ' | Python, Scikit-Learn, Flask, Docker, Leaflet.js';
  page2.drawText(proj2Title, {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  const proj2TitleW = fontBold.widthOfTextAtSize(proj2Title, 9.5);
  page2.drawText(proj2Tech, {
    x: margin + proj2TitleW,
    y: y2,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });
  y2 -= 15;

  const proj2Bullets = [
    '• Developed a containerized full-stack web application to visualize and compare intelligent transport planning and routing algorithms across Greater Cairo.',
    '• Engineered a machine learning-assisted traffic prediction module using Scikit-Learn and NumPy to power time-dependent, adaptive pathfinding.',
    '• Implemented advanced graph routing (A*, Dijkstra) and dynamic programming algorithms to optimize emergency vehicle routing, bus allocation, and maintenance budgets.',
    '• Designed and exposed RESTful API endpoints using Flask to seamlessly integrate backend optimization logic with an interactive Leaflet map UI.',
  ];

  for (const bullet of proj2Bullets) {
    const lines = wrapText(bullet, contentWidth - 10, fontRegular, 9.5);
    for (const line of lines) {
      page2.drawText(line, { x: margin + 8, y: y2, size: 9.5, font: fontRegular, color: darkGray });
      y2 -= 13;
    }
    y2 -= 2;
  }
  y2 -= 8;

  // 5. COURSES & CERTIFICATIONS
  y2 = drawHeading(page2, 'COURSES & CERTIFICATIONS', y2);

  const certItems = [
    { title: 'Neural Networks and Deep Learning', org: ' — DeepLearning.AI | Coursera ', link: 'coursera.org/verify/H10PV0ENSIYL' },
    { title: 'NLP with Classification and Vector Spaces', org: ' — DeepLearning.AI | Coursera ', link: 'coursera.org/verify/27WE0B5L89X0' },
    { title: 'NLP in TensorFlow', org: ' — DeepLearning.AI | Coursera ', link: 'coursera.org/verify/SM9I2M78KLMY' },
    { title: 'Building Multi-Agent Systems', org: ' — Microsoft | Coursera ', link: 'coursera.org/verify/1L0A6BPBW69S' },
  ];

  for (const cert of certItems) {
    let cx = margin;
    page2.drawText(cert.title, { x: cx, y: y2, size: 9.5, font: fontBold, color: black });
    cx += fontBold.widthOfTextAtSize(cert.title, 9.5);

    page2.drawText(cert.org, { x: cx, y: y2, size: 9.5, font: fontRegular, color: darkGray });
    cx += fontRegular.widthOfTextAtSize(cert.org, 9.5);

    page2.drawText(cert.link, { x: cx, y: y2, size: 9, font: fontRegular, color: darkGray });
    y2 -= 14;
  }
  y2 -= 6;

  // 6. TECHNICAL SKILLS
  y2 = drawHeading(page2, 'TECHNICAL SKILLS', y2);

  const skillRows = [
    {
      label: 'Programming Languages: ',
      content: 'Python, Java, JavaScript, SQL, HTML, CSS, R, C#',
    },
    {
      label: 'Frameworks & Libraries: ',
      content: 'Scikit-Learn, PyTorch, TensorFlow/Keras, HuggingFace Transformers, NumPy, Pandas, Matplotlib, NLTK, spaCy, Flask, Streamlit, SymPy, JavaFX, Unity (NavMesh)',
    },
    {
      label: 'Tools & Platforms: ',
      content: 'Docker, Git/GitHub, VS Code, PyCharm, IntelliJ IDEA, ModelSim, Blender, Weka, RStudio',
    },
    {
      label: 'Concepts & Domains: ',
      content: 'Machine Learning, Deep Learning, NLP, Large Language Models (LLMs), ParameterEfficient Fine-Tuning (LoRA), Knowledge Distillation, LSTM Networks, Graph Algorithms (A*, Dijkstra), REST APIs, AI Agent Programming, Multi-threading, Socket Programming, OOP',
    },
    {
      label: 'Operating Systems: ',
      content: 'Windows, Linux',
    },
    {
      label: 'Soft Skills: ',
      content: 'Leadership, Analytical Thinking, Problem-Solving, Client Communication, Time Management',
    },
  ];

  for (const row of skillRows) {
    const labelW = fontBold.widthOfTextAtSize(row.label, 9.5);
    const fullText = row.label + row.content;
    const lines = wrapText(fullText, contentWidth, fontRegular, 9.5);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (i === 0) {
        page2.drawText(row.label, { x: margin, y: y2, size: 9.5, font: fontBold, color: black });
        const restOfFirstLine = line.slice(row.label.length);
        page2.drawText(restOfFirstLine, { x: margin + labelW, y: y2, size: 9.5, font: fontRegular, color: darkGray });
      } else {
        page2.drawText(line, { x: margin, y: y2, size: 9.5, font: fontRegular, color: darkGray });
      }
      y2 -= 13;
    }
    y2 -= 2;
  }
  y2 -= 6;

  // 7. LANGUAGES
  y2 = drawHeading(page2, 'LANGUAGES', y2);
  page2.drawText('Arabic: ', { x: margin, y: y2, size: 9.5, font: fontBold, color: black });
  const arW = fontBold.widthOfTextAtSize('Arabic: ', 9.5);
  page2.drawText('Native', { x: margin + arW, y: y2, size: 9.5, font: fontRegular, color: darkGray });
  
  const midX = margin + 120;
  page2.drawText('|', { x: midX, y: y2, size: 9.5, font: fontRegular, color: darkGray });
  
  page2.drawText('English: ', { x: midX + 20, y: y2, size: 9.5, font: fontBold, color: black });
  const enW = fontBold.widthOfTextAtSize('English: ', 9.5);
  page2.drawText('Fluent (Professional Working Proficiency)', { x: midX + 20 + enW, y: y2, size: 9.5, font: fontRegular, color: darkGray });

  // Save to public/resume.pdf
  const pdfBytes = await pdfDoc.save();
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);
  console.log('Successfully generated EXACT 2-page public/resume.pdf from user provided document');
}

generateExactResume().catch(console.error);
