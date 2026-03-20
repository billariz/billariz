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

const apiFetch = require('./apiFetch');

const API_PREFIX = process.env.BILLARIZ_CORP_URL;
const end_point = `${API_PREFIX}/bills`;
const customer_end_point = `${API_PREFIX}/customers`;
const pos_end_point = `${API_PREFIX}/pointOfServices/search/findPointOfService?contractId=`;
const pos_conf_end_point = `${API_PREFIX}/pointOfServiceConfigurations/search/findPosConfiguration?contractId=`;
const mrd_end_point = `${API_PREFIX}/meterReads/search/findMeterReadByBillId?billId=`;
const pos_estimate_end_point = `${API_PREFIX}/pointOfServiceEstimates/search/findPosEstimate?contractId=`;
const pos_capacity_end_point = `${API_PREFIX}/pointOfServiceCapacities/search/findPosCapacity?contractId=`;
const pos_meter_end_point = `${API_PREFIX}/meters/search/findMeter?contractId=`;
const contract_end_point = `${API_PREFIX}/contracts`;
const actor_end_point = `${API_PREFIX}/perimeters`;
const parameters_end_point = `${API_PREFIX}/parameters/search/findAll/`;
const languages_end_point = `${API_PREFIX}/languageMappings`;

let cachedParametersData = null;
let cachedLanguagesData = null;

async function fetchDataForInvoice(id) {
  const invoice_data = await apiFetch(`${end_point}/${id}`);
  const customer_data = await apiFetch(
    `${customer_end_point}/${invoice_data.customerId}`
  );
  const individual_data = await apiFetch(
    `${customer_end_point}/${invoice_data.customerId}/individual`
  );
  const address_data = await apiFetch(
    `${customer_end_point}/${invoice_data.customerId}/address`
  );
  const contact_data = await apiFetch(
    `${customer_end_point}/${invoice_data.customerId}/contact`
  );
  const pos_data = await apiFetch(`${pos_end_point}${invoice_data.contractId}`);
  const contract_data = await apiFetch(
    `${contract_end_point}/${invoice_data.contractId}`
  );
  const actor_data = await apiFetch(
    `${actor_end_point}/${invoice_data.perimeterId}/actors`
  );
   const meterReads_data = await apiFetch(
    `${mrd_end_point}${id}`
  );
  const configuration_data = await apiFetch(
    `${pos_conf_end_point}${invoice_data.contractId}`
  );
  const estimate_data = await apiFetch(
    `${pos_estimate_end_point}${invoice_data.contractId}`
  );
  const capacities_data = await apiFetch(
    `${pos_capacity_end_point}${invoice_data.contractId}`
  );
  const meters_data = await apiFetch(
    `${pos_meter_end_point}${invoice_data.contractId}`
  );

  // Utilisation du cache si déjà chargé
  if (!cachedParametersData) {
    cachedParametersData = await apiFetch(`${parameters_end_point}`);
  }

  if (!cachedLanguagesData) {
    cachedLanguagesData = await apiFetch(`${languages_end_point}`);
  }

  return {
    invoice_data,
    customer_data,
    individual_data,
    address_data,
    contact_data,
    pos_data,
    contract_data,
    actor_data,
    meterReads_data,
    configuration_data,
    estimate_data,
    capacities_data,
    meters_data,
    parameters_data: cachedParametersData,
    languages_data: cachedLanguagesData,
  };
}
module.exports = fetchDataForInvoice;
