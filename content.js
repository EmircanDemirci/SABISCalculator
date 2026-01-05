// content.js - Versiyon 17.0 (Bütünleme/Final Öncelik Düzeltmesi & Dinamik Oran)

// --- SABİTLER ---
const LETTER_COEFFICIENTS = {
  'AA': 4.00, 'BA': 3.50, 'BB': 3.00, 'CB': 2.50,
  'CC': 2.00, 'DC': 1.50, 'DD': 1.00, 'FD': 0.50, 'FF': 0.00,
  'G': null, 'M': null, 'DZ': 0.00, 'GR': 0.00, 'YT': null, 'YZ': null, 'MU': null
};

const LETTER_COLORS = {
  'AA': '#28a745', 'BA': '#20c997', 'BB': '#17a2b8',
  'CB': '#6610f2', 'CC': '#fd7e14', 'DC': '#ffc107',
  'DD': '#dc3545', 'FD': '#6c757d', 'FF': '#343a40',
  'ALMADI': '#6c757d'
};

let MAX_SEMESTER_FOUND = 0;

// --- AGRESİF KARANLIK MOD CSS ---
const DARK_MODE_CSS = `
  /* 1. Temel Yapı ve Arka Planlar */
  html.sabis-dark-mode, body.sabis-dark-mode, .sabis-dark-mode #kt_header,
  .sabis-dark-mode #kt_header_mobile, .sabis-dark-mode #kt_footer { background-color: #121212 !important; background: #121212 !important; }

  /* 2. Kartlar ve Kutular */
  .sabis-dark-mode .card, .sabis-dark-mode .card-body, .sabis-dark-mode .portlet,
  .sabis-dark-mode .modal-content, .sabis-dark-mode .dropdown-menu, .sabis-dark-mode .offcanvas {
      background-color: #1e1e1e !important; border-color: #333 !important; box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
  }
  .sabis-dark-mode .card-header, .sabis-dark-mode .modal-header, .sabis-dark-mode .modal-footer {
      background-color: #252525 !important; border-bottom: 1px solid #333 !important; border-top: 1px solid #333 !important;
  }

  /* 3. Yazılar */
  .sabis-dark-mode, .sabis-dark-mode h1, .sabis-dark-mode h2, .sabis-dark-mode h3, 
  .sabis-dark-mode h4, .sabis-dark-mode h5, .sabis-dark-mode h6,
  .sabis-dark-mode span, .sabis-dark-mode div, .sabis-dark-mode p, 
  .sabis-dark-mode label, .sabis-dark-mode a:not(.btn) { color: #e0e0e0 !important; }
  .sabis-dark-mode a:hover { color: #667eea !important; }

  /* 4. Tablolar */
  .sabis-dark-mode table { background-color: #1e1e1e !important; color: #ddd !important; }
  .sabis-dark-mode th, .sabis-dark-mode td { border-color: #333 !important; background-color: #1e1e1e !important; }
  .sabis-dark-mode .table-hover tbody tr:hover td { background-color: #333 !important; }
  .sabis-dark-mode thead th { background-color: #2d2d2d !important; color: #fff !important; }

  /* 5. Inputlar */
  .sabis-dark-mode input, .sabis-dark-mode select, .sabis-dark-mode textarea, .sabis-dark-mode .form-control,
  .sabis-dark-mode .grade-input, .sabis-dark-mode .credit-select, .sabis-dark-mode .gpa-select, .sabis-dark-mode .dd-limit-input {
      background-color: #2d2d2d !important; color: #fff !important; border: 1px solid #444 !important;
  }

  /* 6. GNO Kutusu */
  .sabis-dark-mode #sabis-gpa-box { background-color: #1e1e1e !important; border-left-color: #bb86fc !important; box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important; }
  .sabis-dark-mode #sabis-gpa-box div { color: #ccc !important; }
  
  /* 7. İkonlar */
  .sabis-dark-mode i, .sabis-dark-mode .svg-icon svg g [fill] { color: #a0a0a0 !important; fill: #a0a0a0 !important; }

  /* 8. Symbol Renkleri */
  .sabis-dark-mode .symbol.symbol-light-primary .symbol-label, .sabis-dark-mode .symbol.symbol-60 .symbol-label {
      background-color: #0d2b5e !important; color: #ffffff !important; 
  }

  /* 9. Sol Menü (Aside) */
  .sabis-dark-mode .aside, .sabis-dark-mode .aside-left, .sabis-dark-mode .aside-menu, .sabis-dark-mode .brand {
      background-color: #1a1a1a !important; border-right: 1px solid #333 !important;
  }
  .sabis-dark-mode .aside .menu-text, .sabis-dark-mode .aside .menu-icon i, .sabis-dark-mode .aside .menu-link { color: #a0a0a0 !important; }
  
  .sabis-dark-mode .aside .menu-item.menu-item-hover > .menu-link, .sabis-dark-mode .aside .menu-item .menu-link:hover {
      background-color: #151515 !important; color: #ffffff !important;
  }
  .sabis-dark-mode .aside .menu-item.menu-item-hover > .menu-link .menu-text, .sabis-dark-mode .aside .menu-item.menu-item-hover > .menu-link .menu-icon i,
  .sabis-dark-mode .aside .menu-item .menu-link:hover .menu-text, .sabis-dark-mode .aside .menu-item .menu-link:hover .menu-icon i { color: #ffffff !important; }

  .sabis-dark-mode .aside .menu-item.menu-item-active > .menu-link { background-color: #152036 !important; border-left: 3px solid #3699ff !important; }
  .sabis-dark-mode .aside .menu-item.menu-item-active > .menu-link .menu-text, .sabis-dark-mode .aside .menu-item.menu-item-active > .menu-link .menu-icon i { color: #3699ff !important; }

  /* 10. Timeline ve Flex */
  .sabis-dark-mode .timeline-content { background-color: #152036 !important; color: #e0e0e0 !important; border: 1px solid #2b3a55 !important; }
  .sabis-dark-mode .d-flex.align-items-center.justify-content-between.mb-2 { background-color: transparent !important; background: none !important; }

  /* 11. Navi & Calendar */
  .sabis-dark-mode .navi .navi-item .navi-link:hover { background-color: #151515 !important; color: #fff !important; }
  .sabis-dark-mode .navi .navi-item.navi-item-active .navi-link, .sabis-dark-mode .navi .navi-item .navi-link.active {
      background-color: #152036 !important; color: #3699ff !important; border-radius: 4px;
  }
  .sabis-dark-mode .fc-content { background-color: #152036 !important; color: #ffffff !important; border: 1px solid #2b3a55 !important; }
`;

// --- YARDIMCI FONKSİYONLAR ---

function injectDarkModeStyles() {
  if (!document.getElementById('sabis-dark-style')) {
      const style = document.createElement('style');
      style.id = 'sabis-dark-style';
      style.textContent = DARK_MODE_CSS;
      document.head.appendChild(style);
  }
}

function applyTheme(isDark) {
  injectDarkModeStyles();
  if (isDark) {
      document.documentElement.classList.add('sabis-dark-mode');
      document.body.classList.add('sabis-dark-mode');
  } else {
      document.documentElement.classList.remove('sabis-dark-mode');
      document.body.classList.remove('sabis-dark-mode');
  }
}

function checkSettings(callback) {
  chrome.storage.sync.get(['extensionEnabled', 'darkModeEnabled'], function(data) {
    const isEnabled = data.extensionEnabled !== undefined ? data.extensionEnabled : true;
    const isDarkMode = data.darkModeEnabled !== undefined ? data.darkModeEnabled : false;
    
    if (data.extensionEnabled === undefined) {
      chrome.storage.sync.set({ extensionEnabled: true });
    }
    
    callback(isEnabled, isDarkMode);
  });
}

function removeAddedElements() {
  document.querySelectorAll('.average-grade-row').forEach(row => row.remove());
  document.querySelectorAll('.grade-input').forEach(input => {
    if(input.parentElement) input.parentElement.innerHTML = '';
  });
  const gpaBox = document.getElementById('sabis-gpa-box');
  if (gpaBox) gpaBox.remove();
}

// --- BÖLÜM 1: DERS İÇİ ORTALAMA ---

function getLetterGradeFromScore(score, ddLimit = 50, finalScore = null) {
  const roundedScore = Math.round(score);
  const shift = 50 - ddLimit;
  
  const limits = {
    AA: 90 - shift, BA: 85 - shift, BB: 80 - shift, CB: 75 - shift,
    CC: 65 - shift, DC: 58 - shift, DD: 50 - shift, FD: 40 - shift
  };

  if (finalScore !== null && finalScore < 40) {
      return { letter: 'FF', color: LETTER_COLORS.FF, reason: 'Final Barajı' };
  }

  if (roundedScore >= limits.AA) return { letter: 'AA', color: LETTER_COLORS.AA };
  if (roundedScore >= limits.BA) return { letter: 'BA', color: LETTER_COLORS.BA };
  if (roundedScore >= limits.BB) return { letter: 'BB', color: LETTER_COLORS.BB };
  if (roundedScore >= limits.CB) return { letter: 'CB', color: LETTER_COLORS.CB };
  if (roundedScore >= limits.CC) return { letter: 'CC', color: LETTER_COLORS.CC };
  if (roundedScore >= limits.DC) return { letter: 'DC', color: LETTER_COLORS.DC };
  if (roundedScore >= limits.DD) return { letter: 'DD', color: LETTER_COLORS.DD };
  
  if (roundedScore >= limits.FD) {
      return { letter: 'FD', color: LETTER_COLORS.FD };
  } else {
      if (finalScore !== null && finalScore >= 40) return { letter: 'FD', color: LETTER_COLORS.FD };
      return { letter: 'FF', color: LETTER_COLORS.FF };
  }
}

function initializeGradeCalculator() {
  const lessonCards = document.querySelectorAll('.card-custom.card-stretch');

  lessonCards.forEach((card) => {
    const gradeTable = card.querySelector('table');
    if (!gradeTable) return;
    if (gradeTable.innerText.includes('AKTS') || gradeTable.innerText.includes('Kredi')) return;

    const gradeRows = gradeTable.querySelectorAll('tbody tr');
    gradeRows.forEach((row) => {
      const gradeCell = row.querySelector('.text-right');
      if (!gradeCell) return;

      if (!gradeCell.textContent.trim() && !gradeCell.querySelector('input')) {
        gradeCell.innerHTML = `
          <input type="number" class="grade-input" placeholder="Not" 
            style="width: 60px; height: 28px; text-align: right; border: 1.5px solid #e4e6ef; 
            border-radius: 6px; padding: 4px 8px; font-size: 13px; transition: all 0.2s;">
        `;
        const input = gradeCell.querySelector('.grade-input');
        input.addEventListener('focus', () => input.style.borderColor = '#3699ff');
        input.addEventListener('blur', () => input.style.borderColor = '#e4e6ef');
        input.addEventListener('click', (e) => e.stopPropagation());
        input.addEventListener('input', (e) => {
            if (e.target.value.includes(',')) e.target.value = e.target.value.replace(',', '.');
            let val = parseFloat(e.target.value);
            if (val < 0) val = 0; if (val > 100) val = 100;
            if (!isNaN(val)) e.target.value = val;
            updateAverageGrade();
        });
      }
    });

    const updateAverageGrade = () => {
      let ddInput = gradeTable.querySelector('.dd-limit-input');
      let currentDDLimit = ddInput ? parseFloat(ddInput.value) : 50;
      if (isNaN(currentDDLimit)) currentDDLimit = 50;

      const result = calculateDisplayAverageGrade(gradeTable);
      const displayAverageGrade = result.average;
      const finalScore = result.finalScore;

      const letterData = getLetterGradeFromScore(displayAverageGrade, currentDDLimit, finalScore);

      let averageGradeRow = gradeTable.querySelector('.average-grade-row');

      if (!averageGradeRow) {
        averageGradeRow = document.createElement('tr');
        averageGradeRow.classList.add('average-grade-row');
        averageGradeRow.innerHTML = `
          <td style="vertical-align: middle;">
              <div style="font-size: 10px; color: #999; margin-bottom: 2px;">Çan (DD Sınırı)</div>
              <input type="number" class="dd-limit-input" value="${currentDDLimit}" 
                     style="width: 50px; border: 1px solid #ddd; border-radius: 4px; text-align: center; padding: 2px; font-size: 12px;">
          </td>
          <td class="font-weight-bold" style="vertical-align: middle;">
              Ortalama (Tahmini)
              <div class="aa-limit-text" style="font-size: 10px; color: #aaa; font-weight: normal;">AA Sınırı: --</div>
          </td>
          <td class="text-right font-weight-bold">
            <div style="display: flex; flex-direction: column; align-items: flex-end;">
              <span class="avg-score-text" style="font-size: 1.2em; color: #333;">--</span>
              <span class="letter-grade-badge" style="background-color: #ccc; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-top: 4px; display: inline-block;">--</span>
            </div>
          </td>
        `;
        gradeTable.querySelector('tbody').appendChild(averageGradeRow);
        const newDDInput = averageGradeRow.querySelector('.dd-limit-input');
        newDDInput.addEventListener('input', () => updateAverageGrade());
        newDDInput.addEventListener('click', (e) => e.stopPropagation());
      }

      const aaLimitText = averageGradeRow.querySelector('.aa-limit-text');
      if (aaLimitText) aaLimitText.textContent = `AA Sınırı: ${Math.round(90 - (50 - currentDDLimit))}`;

      const avgScoreText = averageGradeRow.querySelector('.avg-score-text');
      if (avgScoreText) avgScoreText.textContent = displayAverageGrade.toFixed(2);

      const letterBadge = averageGradeRow.querySelector('.letter-grade-badge');
      if (letterBadge) {
          letterBadge.textContent = letterData.letter;
          letterBadge.style.backgroundColor = letterData.color;
          if(letterData.reason === 'Final Barajı') {
              letterBadge.title = "Final 40'ın altında!";
          } else {
              letterBadge.removeAttribute('title');
          }
      }
    };
    
    updateAverageGrade();
  });
}

function calculateDisplayAverageGrade(gradeTable) {
  const gradeRows = gradeTable.querySelectorAll('tbody tr');
  
  // ÖNCE BÜTÜNLEME KONTROLÜ
  // Eğer Bütünleme satırında geçerli bir sayı varsa (GR, DZ veya boş değilse), Final yerine o kullanılır.
  let validButunlemeExists = false;

  gradeRows.forEach((row) => {
    const type = row.querySelector('td:nth-child(2)');
    if (type && type.textContent.trim().toLowerCase().includes('bütünleme')) {
        const gradeCell = row.querySelector('.text-right');
        if (gradeCell) {
             const gradeInput = gradeCell.querySelector('.grade-input');
             let gradeText = gradeInput ? gradeInput.value.trim() : gradeCell.textContent.trim();
             if (gradeText && !isNaN(parseFloat(gradeText.replace(',', '.')))) {
                 validButunlemeExists = true;
             }
        }
    }
  });

  let weightedSum = 0; 
  let totalWeight = 0; 
  let finalScore = null;

  gradeRows.forEach((row) => {
    const typeCell = row.querySelector('td:nth-child(2)');
    if (!typeCell) return;
    
    const type = typeCell.textContent.trim().toLowerCase();
    
    // Eğer geçerli bir Bütünleme notu varsa (input veya açıklanmış), Final satırını atla.
    if (validButunlemeExists && type.includes('final') && !type.includes('bütünleme')) return;

    // Eğer geçerli bir Bütünleme notu YOKSA, ama bu satır Bütünleme ise, bunu hesaba katma (çünkü GR veya boştur).
    if (!validButunlemeExists && type.includes('bütünleme')) return;

    const ratioText = row.querySelector('td:first-child').textContent.trim();
    const ratioValue = parseFloat(ratioText.replace(',', '.'));
    const gradeCell = row.querySelector('.text-right');
    if (!gradeCell) return;
    
    const gradeInput = gradeCell.querySelector('.grade-input');
    let gradeText = gradeInput ? gradeInput.value.trim() : gradeCell.textContent.trim();
    
    if (gradeText === "") gradeText = "0"; 

    const grade = parseFloat(gradeText.replace(',', '.'));

    if (!isNaN(grade) && !isNaN(ratioValue)) {
      weightedSum += (grade * ratioValue);
      totalWeight += ratioValue;

      if (type.includes('final') || type.includes('bütünleme')) {
          finalScore = grade;
      }
    }
  });

  let average = 0;
  
  if (totalWeight > 0) {
      average = weightedSum / totalWeight;
  }

  return { average: average, finalScore: finalScore };
}

// --- BÖLÜM 2: TRANSKRİPT GNO HESAPLAMA ---

function initializeTranscriptCalculator() {
  const cards = document.querySelectorAll('.card');
  MAX_SEMESTER_FOUND = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const table = card.querySelector('table');
    if (!table) continue;

    let semesterNum = i + 1; 
    const titleElement = card.querySelector('.card-header .card-title, .card-label');
    if (titleElement) {
        const titleText = titleElement.textContent.trim();
        const semesterMatch = titleText.match(/(\d+)\./);
        if (semesterMatch) {
            semesterNum = parseInt(semesterMatch[1]);
        }
    }
    
    if (semesterNum > MAX_SEMESTER_FOUND) MAX_SEMESTER_FOUND = semesterNum;

    let headerRow = table.querySelector('thead tr') || table.querySelector('tr');
    if (!headerRow) continue;

    const headers = Array.from(headerRow.querySelectorAll('th, td')).map(h => h.textContent.trim().toUpperCase());
    
    let creditIndex = headers.findIndex(h => h === 'AKTS' || h.includes('AKTS'));
    if (creditIndex === -1) creditIndex = headers.findIndex(h => h === 'KREDİ' || h.includes('KREDİ') || h === 'T' || h === 'U');
    let nameIndex = headers.findIndex(h => h === 'DERS ADI' || h.includes('DERS'));
    
    if (creditIndex === -1) continue;

    const bodyRows = table.querySelectorAll('tbody tr');
    
    bodyRows.forEach(row => {
      row.dataset.semester = semesterNum;

      const cells = row.querySelectorAll('td');
      if (cells.length <= creditIndex) return;
      
      let isStaj = false;
      if (nameIndex !== -1 && cells.length > nameIndex) {
          const courseName = cells[nameIndex].textContent.trim().toUpperCase();
          if (courseName.includes('STAJ')) isStaj = true;
      }

      let initialCreditText = cells[creditIndex].textContent.trim().replace(',', '.');
      let credit = isStaj ? 0 : parseFloat(initialCreditText);
      if (isNaN(credit)) credit = 0;

      if (!cells[creditIndex].querySelector('.credit-select')) {
          const creditCell = cells[creditIndex];
          const creditSelect = document.createElement('select');
          creditSelect.className = 'credit-select';
          creditSelect.style.cssText = `
              border: 1px solid #e4e6ef; border-radius: 4px; padding: 0 2px;
              background: #f9f9f9; font-weight: normal; font-size: 12px;
              color: #333; cursor: pointer; width: 45px; text-align: center;
          `;
          
          const commonCredits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30];
          if (!commonCredits.includes(credit)) commonCredits.push(credit);
          commonCredits.sort((a, b) => a - b);

          commonCredits.forEach(c => {
             const opt = document.createElement('option');
             opt.value = c;
             opt.text = c;
             if (c === credit) opt.selected = true;
             creditSelect.appendChild(opt);
          });

          creditSelect.addEventListener('change', (e) => {
              const newCredit = parseFloat(e.target.value);
              row.dataset.credit = newCredit;
              calculateTotalGPA();
          });
          creditSelect.addEventListener('click', (e) => e.stopPropagation());

          creditCell.innerHTML = '';
          creditCell.appendChild(creditSelect);
      } else {
          const existingSelect = cells[creditIndex].querySelector('.credit-select');
          credit = parseFloat(existingSelect.value);
      }

      for (let cell of cells) {
        const text = cell.textContent.trim();
        const isLetterGrade = LETTER_COEFFICIENTS.hasOwnProperty(text);
        const isAlmadi = text === 'ALMADI' || text === 'MUAF';
        
        if (!cell.querySelector('.gpa-select') && (isLetterGrade || isAlmadi)) {
             const originalGrade = isLetterGrade ? text : (text === 'MUAF' ? 'MU' : 'FF');

             const select = document.createElement('select');
             select.className = 'gpa-select';
             select.style.cssText = `
                border: 1px solid #ccc; border-radius: 4px; padding: 1px 2px;
                background: #fff; font-weight: bold; font-size: 12px;
                color: ${isAlmadi ? '#6c757d' : (LETTER_COLORS[originalGrade] || '#333')}; 
                cursor: pointer; width: 100%; text-align: center;
             `;

             Object.keys(LETTER_COEFFICIENTS).forEach(grade => {
                if (['G', 'M', 'DZ', 'GR', 'YT', 'YZ', 'MU'].includes(grade) && grade !== originalGrade) return;
                
                const option = document.createElement('option');
                option.value = grade;
                option.text = grade;
                
                if (grade === originalGrade) option.selected = true;
                if (isAlmadi && grade === 'FF') option.selected = true; 
                
                select.appendChild(option);
             });

             select.addEventListener('change', (e) => {
                const newGrade = e.target.value;
                e.target.style.color = LETTER_COLORS[newGrade] || '#333';
                row.dataset.currentGrade = newGrade;
                calculateTotalGPA();
             });
             select.addEventListener('click', (e) => e.stopPropagation());

             cell.innerHTML = '';
             cell.appendChild(select);
             
             row.dataset.credit = credit;
             row.dataset.currentGrade = originalGrade;
             break;
        }
      }
    });
  }

  calculateTotalGPA();
}

function calculateTotalGPA() {
  const filterSelect = document.getElementById('semester-filter-select');
  const limitSemester = filterSelect ? parseInt(filterSelect.value) : MAX_SEMESTER_FOUND;

  const rows = document.querySelectorAll('tr[data-credit][data-current-grade]');
  if (rows.length === 0) return;

  let totalPoints = 0;
  let totalCredits = 0;

  rows.forEach(row => {
    const rowSemester = parseInt(row.dataset.semester);
    if (!isNaN(rowSemester) && rowSemester > limitSemester) return;

    const credit = parseFloat(row.dataset.credit);
    const grade = row.dataset.currentGrade;
    const coefficient = LETTER_COEFFICIENTS[grade];

    if (coefficient !== null && !isNaN(coefficient) && credit > 0) {
      totalPoints += (coefficient * credit);
      totalCredits += credit;
    }
  });

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  showGPABox(gpa, totalCredits);
}

function showGPABox(gpa, totalCredits) {
  let box = document.getElementById('sabis-gpa-box');
  
  if (!box) {
    box = document.createElement('div');
    box.id = 'sabis-gpa-box';
    box.style.cssText = `
      position: fixed; bottom: 30px; right: 30px;
      background: white; padding: 15px 20px; border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15); z-index: 10000;
      display: flex; flex-direction: column; align-items: center;
      border-left: 6px solid #667eea;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      min-width: 160px;
    `;
    const style = document.createElement('style');
    style.innerHTML = `@keyframes slideInRight { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
    document.head.appendChild(style);
    document.body.appendChild(box);
  }

  let filterContainer = document.getElementById('semester-filter-container');
  if (!filterContainer) {
      filterContainer = document.createElement('div');
      filterContainer.id = 'semester-filter-container';
      filterContainer.style.marginBottom = '10px';
      filterContainer.style.width = '100%';

      const label = document.createElement('label');
      label.textContent = 'Şuna kadar hesapla:';
      label.style.fontSize = '10px';
      label.style.color = '#999';
      label.style.display = 'block';
      label.style.marginBottom = '2px';
      
      const select = document.createElement('select');
      select.id = 'semester-filter-select';
      select.style.width = '100%';
      select.style.padding = '4px';
      select.style.borderRadius = '4px';
      select.style.border = '1px solid #ddd';
      select.style.fontSize = '12px';

      for (let i = 1; i <= MAX_SEMESTER_FOUND; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = `${i}. Yarıyıl Sonu`;
          if (i === MAX_SEMESTER_FOUND) option.selected = true;
          select.appendChild(option);
      }

      select.addEventListener('change', () => {
          calculateTotalGPA();
      });

      filterContainer.appendChild(label);
      filterContainer.appendChild(select);
      
      if (box.firstChild) {
          box.insertBefore(filterContainer, box.firstChild);
      } else {
          box.appendChild(filterContainer);
      }
  }

  let gpaVal = parseFloat(gpa);
  let gpaColor = '#dc3545';
  let statusText = '';
  
  if (gpaVal >= 3.50) { gpaColor = '#28a745'; statusText = 'Mükemmel'; }
  else if (gpaVal >= 3.00) { gpaColor = '#20c997'; statusText = 'Çok İyi'; }
  else if (gpaVal >= 2.50) { gpaColor = '#17a2b8'; statusText = 'İyi'; }
  else if (gpaVal >= 2.00) { gpaColor = '#fd7e14'; statusText = 'Orta'; }
  else { statusText = 'Düşük'; }

  let contentDiv = document.getElementById('gpa-content-area');
  if (!contentDiv) {
      contentDiv = document.createElement('div');
      contentDiv.id = 'gpa-content-area';
      contentDiv.style.width = '100%';
      contentDiv.style.textAlign = 'center';
      box.appendChild(contentDiv);
  }

  contentDiv.innerHTML = `
    <div style="width: 100%; height: 1px; background: #eee; margin: 8px 0;"></div>
    <div style="font-size: 13px; color: #888; font-weight: 600; margin-bottom: 2px;">GNO</div>
    <div style="font-size: 32px; font-weight: 800; color: ${gpaColor}; line-height: 1;">${gpa}</div>
    <div style="font-size: 11px; font-weight: 600; color: ${gpaColor}; margin-top: 2px;">${statusText}</div>
    <div style="font-size: 10px; color: #aaa; margin-top: 5px;">Kredi: <b>${totalCredits}</b></div>
  `;
}

function runExtension() {
  checkSettings(function(isEnabled, isDarkMode) {
    applyTheme(isDarkMode);
    if (!isEnabled) {
      removeAddedElements();
      return;
    }
    initializeGradeCalculator();
    initializeTranscriptCalculator();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runExtension);
} else {
  runExtension();
}

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.extensionEnabled) setTimeout(runExtension, 100);
  if (changes.darkModeEnabled) applyTheme(changes.darkModeEnabled.newValue);
});

const observer = new MutationObserver(function(mutations) {
    let shouldReinit = false;
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
            for (let node of mutation.addedNodes) {
                 if (node.nodeType === 1) {
                     if (node.classList.contains('average-grade-row') ||
                         node.classList.contains('grade-input') ||
                         node.id === 'sabis-gpa-box' ||
                         node.classList.contains('credit-select') ||
                         node.classList.contains('gpa-select')) {
                         continue;
                     }
                     if (node.querySelector && (node.querySelector('.average-grade-row') || node.querySelector('.grade-input'))) {
                         continue;
                     }
                     shouldReinit = true;
                 }
            }
        }
    });
    if(shouldReinit) {
        if (window.sabisTimeout) clearTimeout(window.sabisTimeout);
        window.sabisTimeout = setTimeout(runExtension, 800);
    }
});
observer.observe(document.body, { childList: true, subtree: true });