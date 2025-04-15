const cheerio = require('cheerio');

async function scraper() {
  try {
    const $ = await cheerio.fromURL('https://statbel.fgov.be/fr/themes/population/structure-de-la-population');

    const table = $('div.responsivetable table.statisticTable');

 
    const data = [];
    table.find('tr').each((rowIndex, row) => {
      const rowData = [];
      $(row).find('th, td').each((cellIndex, cell) => {
        rowData.push($(cell).text().trim());
      });
      data.push(rowData);
    });

    console.log('Données du tableau:', data);

  } catch (error) {
    console.error('Erreur lors de la récupération de la page:', error);
  }
}

scraper();
