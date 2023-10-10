import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { useStyle } from './styles';
import MessagePreview from '../MessagePreview/MessagePreview';

export const PowerBiDashboard = ({
  accessToken,
  filters,
  slicers,
  reportData,
}) => {
  const classes = useStyle();

  return (
    <PowerBIEmbed
      cssClassName={classes.container}
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual and qna
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportData?.reportId}&groupId=${reportData?.groupId}`,
        accessToken,
        viewMode: models.ViewMode.View,
        tokenType: models.TokenType.Embed,
        filters,
        slicers,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          localeSettings: {
            language: 'pt',
            formatLocale: 'pt-BR',
          },
        },
      }}
    />
  );
};
export default PowerBiDashboard;
