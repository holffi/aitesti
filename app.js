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
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
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
  res.render('kartoitusvastaus', {teksti});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
