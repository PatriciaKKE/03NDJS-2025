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
    const columns = ['Lieu', 'Année', 'Population'];

    const data = [
      { 'Lieu': 'Bruxelle', 'Année': '2020', 'Population': '11 500 000' },
      { 'Lieu': 'Flandre',  'Année': '2021', 'Population': '11 600 000' },
      { 'Lieu': 'Wallon', 'Année': '2022', 'Population': '11 700 000' }
    ];

    const rows = data.map(item => new TableRow(item));

    const table = new Table(rows);

    console.log('Données du tableau:\n', table.toString());

  } catch (error) {
    console.error('Erreur lors de la récupération de la page:', error);
  }
}

scraper();
