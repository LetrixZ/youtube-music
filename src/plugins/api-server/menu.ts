import prompt from 'custom-electron-prompt';

import { t } from '@/i18n';
import promptOptions from '@/providers/prompt-options';

import { APIServerConfig, defaultAPIServerConfig } from './config';

import type { MenuContext } from '@/types/contexts';
import type { MenuTemplate } from '@/menu';

export const onMenu = async ({
  getConfig,
  setConfig,
  window,
}: MenuContext<APIServerConfig>): Promise<MenuTemplate> => {
  const config = await getConfig();

  return [
    {
      label: t('plugins.api-server.menu.hostname'),
      type: 'normal',
      async click() {
        const config = await getConfig();

        const newHostname = await prompt(
          {
            title: t('plugins.api-server.prompt.hostname.title'),
            label: t('plugins.api-server.prompt.hostname.label'),
            value: config.hostname,
            type: 'input',
            width: 380,
            ...promptOptions(),
          },
          window,
        ) ?? defaultAPIServerConfig.hostname;

        setConfig({ ...config, hostname: newHostname });
      },
    },
    {
      label: t('plugins.api-server.menu.port'),
      type: 'normal',
      async click() {
        const config = await getConfig();

        const newPort = await prompt(
          {
            title: t('plugins.api-server.prompt.port.title'),
            label: t('plugins.api-server.prompt.port.label'),
            value: config.port,
            type: 'counter',
            counterOptions: { minimum: 0, maximum: 65565, },
            width: 380,
            ...promptOptions(),
          },
          window,
        ) ?? defaultAPIServerConfig.port;

        setConfig({ ...config, port: newPort });
      },
    },
    {
      label: t('plugins.api-server.menu.auth-strategy.label'),
      type: 'submenu',
      submenu: [
        {
          label: t('plugins.api-server.menu.auth-strategy.submenu.auth-at-first.label'),
          toolTip: t('plugins.api-server.menu.auth-strategy.submenu.auth-at-first.tooltip'),
          type: 'radio',
          checked: config.authStrategy === 'AUTH_AT_FIRST',
          click() {
            setConfig({ ...config, authStrategy: 'AUTH_AT_FIRST' });
          },
        },
        {
          label: t('plugins.api-server.menu.auth-strategy.submenu.none.label'),
          type: 'radio',
          checked: config.authStrategy === 'NONE',
          click() {
            setConfig({ ...config, authStrategy: 'NONE' });
          },
        },
      ],
    },
  ];
};
