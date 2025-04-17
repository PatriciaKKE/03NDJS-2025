const cheerio = require('cheerio');

class TableRow {
  constructor(data) {
    this.data = data;
  }

  get(columnName) {
    return this.data[columnName];
  }

  toString() {
    return Object.values(this.data).join(' | ');
  }
}

class Table {
  constructor(rows) {
    this.rows = rows;
  }

  getRowCount() {
    return this.rows.length;
  }

  getRow(index) {
    return this.rows[index];
  }

  toString() {
    return this.rows.map(row => row.toString()).join('\n');
  }
}

async function scraper() {
  try {
    const $ = await cheerio.fromURL('https://statbel.fgov.be/fr/themes/population/structure-de-la-population');

    
    const villes = ['Bruxelles', 'Anvers', 'Gand', 'Charleroi', 'Liège'];

    
    const tableElement = $('div.responsivetable table.statisticTable');

    
    const columns = [];
    tableElement.find('thead th').each((index, element) => {
      columns.push($(element).text().trim());
    });

   
    const rows = [];
    villes.forEach(ville => {
     
      tableElement.find('tbody tr').each((rowIndex, row) => {
        const firstCellText = $(row).find('td, th').first().text().trim();
        if (firstCellText.includes(ville)) {
          const rowData = {};
          $(row).find('td, th').each((cellIndex, cell) => {
            const columnName = columns[cellIndex];
            rowData[columnName] = $(cell).text().trim();
          });
          rows.push(new TableRow(rowData));
        }
      });
    });

    const table = new Table(rows);

    console.log('Données du tableau:\n', table.toString());

  } catch (error) {
    console.error('Erreur lors de la récupération de la page:', error);
  }
}

scraper();
