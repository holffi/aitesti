import * as cheerio from 'cheerio';
const poimiPersoona = (html) => {
  const $ = cheerio.load(html);

  // Taulukot <h2> ja ensimmäisille <li> elementeille
  const h2Texts = [];
  const liTexts = [];

  // Poimitaan kaikki <h2> elementit ja ensimmäiset <li> elementit
  $('h2').each((index, element) => {
    h2Texts.push($(element).text());
  });

  $('li:first-child').each((index, element) => {
    liTexts.push($(element).text());
  });

  // Tulostetaan taulukot
  //console.log('h2-elementtien sisältö:', h2Texts);
  // console.log('Ensimmäisten li-elementtien sisältö:', liTexts);
  const tulos = [];
  for (let i = 0; i < h2Texts.length; i++) {
    tulos.push({otsikko: h2Texts[i], teksti: liTexts[i]});
  }
  return tulos;
};

const lisaaKuvat = (html, imgUrls) => {
  const $ = cheerio.load(html);

  // Käydään läpi kaikki h2-elementit ja lisätään niille kuvia
  $('h2').each((index, element) => {
    const imgTag = `<img src="${imgUrls[index]}" class="img-fluid" style="width: 320" alt="Persoona ${index + 1}">`;
    $(element).after(imgTag); // Lisätään img-elementti h2:n jälkeen
  });

  // Muutettu HTML
  return $.html();
};
export {poimiPersoona, lisaaKuvat};
