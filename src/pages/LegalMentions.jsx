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

import Layout from '@/components/Layout/layout';
import { Container } from '@/components/container';
import useLocales from '@/hooks/useLocales';

function Section({ title, children }) {
  return (
    <div className="mt-10">
      <h2 className="font-primary text-primary text-xl lg:text-2xl font-semibold mb-4 uppercase tracking-wide">
        {title}
      </h2>
      <div className="space-y-4 font-secondary text-sm lg:text-base text-primary leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mt-6">
      <h3 className="font-primary text-primary text-base lg:text-lg font-medium mb-2">
        {title}
      </h3>
      <div className="space-y-3 font-secondary text-sm lg:text-base text-primary leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function LegalMentions() {
  const { translate } = useLocales();
  const t = (key) => translate(`legal.${key}`);

  return (
    <Layout>
      <Container>
        <div className="max-w-4xl mx-auto py-16 lg:py-24">
          <h1 className="font-primary text-primary text-3xl lg:text-5xl font-medium mb-2">
            {t('title')}
          </h1>
          <div className="h-[2px] w-16 bg-secondary mt-4 mb-10" />

          {/* ÉDITEUR */}
          <Section title={t('editor.title')}>
            <p>
              <strong>Uppli</strong>, société par actions simplifiée<br />
              {t('editor.address')}<br />
              {t('editor.capital')}<br />
              {t('editor.rcs')}<br />
              {t('editor.phone')}<br />
              {t('editor.email_label')}{' '}
              <a href="mailto:contact@billariz.com" className="text-secondary hover:underline">
                contact@billariz.com
              </a><br />
              {t('editor.legal_rep')}
            </p>
            <p>
              <strong>{t('editor.made_by')}</strong> Uppli SAS
            </p>
            <p>{t('editor.description')}</p>
            <p>{t('editor.acceptance')}</p>
          </Section>

          {/* CONDITIONS D'UTILISATION */}
          <Section title={t('terms.title')}>
            <SubSection title={t('terms.access.title')}>
              <p>{t('terms.access.content')}</p>
            </SubSection>
            <SubSection title={t('terms.content.title')}>
              <p>
                {t('terms.content.content_before')}{' '}
                <a href="mailto:contact@billariz.com" className="text-secondary hover:underline">
                  contact@billariz.com
                </a>.
              </p>
            </SubSection>
            <SubSection title={t('terms.links.title')}>
              <p>{t('terms.links.content')}</p>
            </SubSection>
            <SubSection title={t('terms.law.title')}>
              <p>{t('terms.law.content')}</p>
            </SubSection>
          </Section>

          {/* PROPRIÉTÉ INTELLECTUELLE */}
          <Section title={t('ip.title')}>
            <p>
              <strong>{t('ip.made_by')}</strong> Uppli SAS
            </p>
            <p>{t('ip.site_content')}</p>
            <p>
              {t('ip.license_before')}{' '}
              <a
                href="https://www.gnu.org/licenses/agpl-3.0.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                AGPL-3.0
              </a>
              {t('ip.license_after')}{' '}
              <a href="mailto:contact@billariz.com" className="text-secondary hover:underline">
                contact@billariz.com
              </a>.
            </p>
            <p>{t('ip.reproduction')}</p>
          </Section>

          {/* DONNÉES PERSONNELLES */}
          <Section title={t('data.title')}>
            <p>{t('data.intro')}</p>
            <p>
              {t('data.rgpd_before')}{' '}
              <a
                href="https://www.cnil.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                www.cnil.fr
              </a>
            </p>
            <SubSection title={t('data.contact_form.title')}>
              <p>{t('data.contact_form.content')}</p>
            </SubSection>
            <SubSection title={t('data.storage.title')}>
              <p>{t('data.storage.content')}</p>
            </SubSection>
            <SubSection title={t('data.rights.title')}>
              <p>
                {t('data.rights.content_before')}{' '}
                <a href="mailto:contact@billariz.com" className="text-secondary hover:underline">
                  contact@billariz.com
                </a>
              </p>
            </SubSection>
          </Section>

          {/* COOKIES */}
          <Section title={t('cookies.title')}>
            <p>{t('cookies.intro')}</p>
            <p>{t('cookies.settings')}</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Google Chrome :</strong> {t('cookies.chrome')}</li>
              <li><strong>Mozilla Firefox :</strong> {t('cookies.firefox')}</li>
              <li><strong>Safari :</strong> {t('cookies.safari')}</li>
              <li><strong>Microsoft Edge :</strong> {t('cookies.edge')}</li>
            </ul>
            <p>{t('cookies.warning')}</p>
          </Section>
        </div>
      </Container>
    </Layout>
  );
}
