/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

const fs = require('fs');

const fetchDataForInvoice = require('./fetchDataForInvoice');
const uploadToS3 = require('./uploadToS3');

const i18next = require('../locales/i18n');
const Handlebars = require('handlebars');
const registerHelpers = require('./handlebarsHelpers');
const puppeteer = require('puppeteer');


async function buildPDF(id, template, lang = 'fr') {
  console.log(
    `📄 Génération du PDF pour la facture ID: ${id} avec le template: ${template}`
  );

  try {
    // 🔹 Récupération des données nécessaires
    const {
      invoice_data,
      customer_data,
      individual_data,
      address_data,
      contact_data,
      meterReads_data,
      pos_data,
      contract_data,
      actor_data,
      configuration_data,
      estimate_data,
      capacities_data,
      meters_data,
      parameters_data,
      languages_data,
    } = await fetchDataForInvoice(id);

    if (!invoice_data || !invoice_data.id) {
      throw new Error(`Facture introuvable avec l'ID: ${id}`);
    }
    const { parameters } = parameters_data._embedded;
    const { languageMappings } = languages_data._embedded;

    if (!parameters || parameters.length === 0) {
      console.warn('No parameters found');
      return;
    }
    const translations = {};
    languageMappings.forEach((lng) => {
      translations[lng.locale] = { translations: {} };
    });

    // Ajout des traductions aux bundles
    parameters.forEach((param) => {
      languageMappings.forEach((lng) => {
        const { locale, labelColumn } = lng;
        if (param[labelColumn]) {
          translations[locale].translations[
            `param_${param.name}.${param.value}`
          ] = param[labelColumn];
        }
      });
    });
    i18next.addResourceBundle(
      lang,
      'translations',
      translations[lang].translations,
      true
    );

    console.log(`✅ Données récupérées avec succès pour la facture ${id}`);

    // 🔹 Génération de la date de paiement
    invoice_data.paymentDate = calculatePaymentDate(invoice_data.billDate);

    // 🔹 Organisation des détails de facturation
    invoice_data.details = sortInvoiceDetails(invoice_data.details);

    // 🔹 Détermination du mode de paiement
    actor_data['_embedded']['actors'][0]['titlePayment'] = getPaymentTitle(
      actor_data['_embedded']['actors'][0]['third']['financialInformation'][
        'paymentMode'
      ]
    );

    let totalQuantity_data = 0;
    meterReads_data['_embedded']['meterReads'].forEach(read => {
            totalQuantity_data += read.totalQuantity;
    });

    // 🔹 Lecture du template HTML
    let html = fs.readFileSync(`templates/${template}`, 'utf8');

    // 🔹 Enregistrer un helper Handlebars pour i18n
    // 🔹 Register Handlebars helper for dynamic translations
    registerHelpers(Handlebars);
    Handlebars.registerHelper('translate', function (key) {
      return i18next.t(key);
    });

    Handlebars.registerHelper('dynamicTranslate', function (prefix, suffix) {
      return i18next.t(`${prefix}.${suffix}`);
    });
    const templateCompiled = Handlebars.compile(html);
    html = templateCompiled({
      invoice: invoice_data,
      customer: customer_data,
      individual: individual_data,
      address: address_data,
      contact : contact_data,
      meterReads : meterReads_data['_embedded']['meterReads'],
      pos: pos_data['_embedded']['pointOfServices'][0],
      contrat: contract_data,
      actor: actor_data['_embedded']['actors'][0],
      configuration:
        configuration_data['_embedded']['pointOfServiceConfigurations'][0],
      estimate: estimate_data['_embedded']['pointOfServiceEstimates'][0],
      capacities: capacities_data['_embedded']['pointOfServiceCapacities'][0],
      meters: meters_data['_embedded']['meters'][0],
      totalQuantity : totalQuantity_data,
      icons: getIcon(),

    });

    // const html_path = `invoices/${id}_${getDateString()}_${Date.now()}.html`;
    // fs.writeFileSync(html_path, html, 'utf8');

    // 🔹 Configuration du document PDF
    const pdf_name = `${id}_${getDateString()}_${Date.now()}.pdf`;

    // 🔹 Création du PDF
    const browser = await puppeteer.launch({
      headless: "new", // "new" pour Puppeteer 20+, sinon true
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    await page.pdf({
      path: `invoices/${pdf_name}`,
      format: 'A4',
      printBackground: true,
    });

    await page.close();
    console.log(`✅ PDF créé avec succès: ${pdf_name}`);

    // 🔹 Upload sur S3
    return await uploadToS3(pdf_name, invoice_data.nature, invoice_data.billingRunId);
  } catch (error) {
    console.error(
      `❌ Erreur lors de la génération du PDF pour la facture ${id}:`,
      error
    );
    return { error: error.message };
  }
}

module.exports = buildPDF;

/**
 * 🔹 Calcule la date de paiement (15 jours après la date de facture)
 */
const calculatePaymentDate = (billDate) => {
  let date = new Date(billDate);
  date.setDate(date.getDate() + 15);
  return date.toISOString().split('T')[0];
};

/**
 * 🔹 Trie et organise les détails de la facture par catégorie et sous-catégorie
 */
const sortInvoiceDetails = (details) => {
  const sortedTable = [];

  details.forEach((item) => {
    item.vatRate = item.vatRate === 'NORMAL_RATE' ? 20 : 5.5;
    const category = item.billLineCategory;
    const existingItem = sortedTable.find((el) => el.category === category);

    if (existingItem) {
      existingItem.data.push(item);
      existingItem.total += item.totalWithoutVat;
    } else {
      sortedTable.push({ category, data: [item], total: item.totalWithoutVat });
    }
  });

  sortedTable.forEach((item) => {
    item.total = item.total.toFixed(2);
    item.data.sort(customSort);
  });

  return sortedTable;
};

/**
 * 🔹 Détermine le titre du mode de paiement
 */
const getPaymentTitle = (paymentMode) => {
  const titles = {
    directDebit: 'Prélèvement automatique',
    bankTransfer: 'Paiement par virement',
    check: 'Paiement par chèque',
  };
  return titles[paymentMode] || 'Mode de paiement inconnu';
};

function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function customSort(a, b) {
  if (a.billLineSubCategory === b.billLineSubCategory) {
    return a.tou.localeCompare(b.tou);
  } else {
    return a.billLineSubCategory.localeCompare(b.billLineSubCategory);
  }
}

function getIcon() {
  const iconBill = fs.readFileSync('assets/icon-bill.png');
  const iconClock = fs.readFileSync('assets/icon-clock.png');
  const iconComputer = fs.readFileSync('assets/icon-computer.png');
  const iconEuro = fs.readFileSync('assets/icon-euro.png');
  const iconHome = fs.readFileSync('assets/icon-home.png');
  const iconLetter = fs.readFileSync('assets/icon-letter.png');
  const iconPhone = fs.readFileSync('assets/icon-phone.png');

  const icons = {
    bill: iconBill.toString('base64'),
    clock: iconClock.toString('base64'),
    computer: iconComputer.toString('base64'),
    euro: iconEuro.toString('base64'),
    home: iconHome.toString('base64'),
    letter: iconLetter.toString('base64'),
    phone: iconPhone.toString('base64'),
  };
  return icons;
}
