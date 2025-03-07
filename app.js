import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {createPersona} from './promptit/persoona.js';
import {assistant} from './funktiot/assistant.js';
import MarkdownIt from 'markdown-it';
import {createSegmentti} from './promptit/segmentti.js';
import {createKilpailijat} from './promptit/kilpailijat.js';
import {createCasenpaloittelu} from './promptit/casenpaloittelu.js';
import {createKehitysehdotus} from './promptit/Kehitysehdotus.js';
import {createImage} from './funktiot/createimage.js';
import {lisaaKuvat, poimiPersoona} from './funktiot/poimipersoona.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/kuvatesti', (req, res) => {
  res.render('kuvatesti');
});

app.get('/kehitysneuvottelu', (req, res) => {
  res.render('kehitysneuvottelu');
});

app.post('/neuvottelu', async (req, res) => {
  console.log(req.body);
  const assistant_id = 'asst_c6nZIrRK1eT1DokXPPzCvukb';
  const prompt = createCasenpaloittelu(req.body.kuvaus);
  const vastaus = await assistant(prompt, assistant_id);
  const prompt2 = createKehitysehdotus(vastaus);
  const vastaus2 = await assistant(prompt2, assistant_id);
  const md = MarkdownIt();
  const teksti1 = md.render(vastaus);
  const teksti2 = md.render(vastaus2);
  const teksti = `<h2>Case</h2>${teksti1}<h2>Kehitysehdotus</h2>${teksti2}`;
  res.render('kartoitusvastaus', {teksti});
});

app.post('/kartoitus', async (req, res) => {
  console.log(req.body);
  const assistant_id = 'asst_DkFLbzHboaLA6HXafHSDU6zL';
  let prompt = '';
  switch (req.body.toiminto) {
    case 'persoona':
      prompt = createPersona(req.body.kuvaus);
      break;
    case 'segmentti':
      prompt = createSegmentti(req.body.kuvaus);
      break;
    case 'kilpailijat':
      prompt = createKilpailijat(req.body.kuvaus);
      break;
    default:
      break;
  }
  const vastaus = await assistant(prompt, assistant_id);
  const md = MarkdownIt();
  const teksti = md.render(vastaus);
  if (req.body.toiminto === 'persoona') {
    const persoonaTekstit = poimiPersoona(teksti);
    console.log(persoonaTekstit);
    let prompt =
      '. Kuvan hahmo tulisi olla iloinen.  Generoi kuva seuraavalla tyylillä: sarjakuva. Ensure that there are absolutely no visible texts, words, or logos anywhere in the image.';
    const kuvaOsoitteet = await Promise.all(
      persoonaTekstit.map(async (persoona) => {
        const kuva = await createImage(
          persoona.otsikko + persoona.teksti + prompt
        );
        //console.log('jorma', kuva);
        return kuva;
      })
    );
    console.log('jorma', kuvaOsoitteet);
    const uusiHtml = lisaaKuvat(teksti, kuvaOsoitteet);
    res.render('kartoitusvastaus', {teksti: uusiHtml});
    return;
  }

  res.render('kartoitusvastaus', {teksti});
});

app.post('/kuva', async (req, res) => {
  console.log(req.body);
  let prompt =
    '. Kuvan hahmo tulisi olla iloinen.  Generoi kuva seuraavalla tyylillä: ' +
    req.body.tyyli +
    '. Ensure that there are absolutely no visible texts, words, or logos anywhere in the image.';
  const osoite = await createImage(req.body.kuvaus + prompt);
  res.render('kuvavastaus', {osoite});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
